/**
 * Connection wrapper for Holochain DNA method calls
 *
 * :TODO: :WARNING:
 *
 * This layer is currently unsuitable for mixing with DNAs that use dna-local identifier formats, and
 * will cause encoding errors if 2-element lists of identifiers are passed.
 *
 * Such tuples are interpreted as [`DnaHash`, `AnyDhtHash`] pairs by the GraphQL <-> Holochain
 * serialisation layer and transformed into compound IDs at I/O time. So, this adapter should
 * *only* be used to wrap DNAs explicitly developed with multi-DNA references in mind.
 *
 * Also :TODO: - standardise a binary format for universally unique Holochain entry/header identifiers.
 *
 * @package: hREA
 * @since:   2019-05-20
 */
import { AppWebsocket, AdminWebsocket, CellType } from '@holochain/client';
import deepForEach from 'deep-for-each';
import isObject from 'is-object';
import { Buffer } from 'buffer';
import { format, parse } from 'fecha';
import { fromByteArray, toByteArray } from 'base64-js';
//----------------------------------------------------------------------------------------------------------------------
// Connection persistence and multi-conductor / multi-agent handling
//----------------------------------------------------------------------------------------------------------------------
// :NOTE: when calling AppWebsocket.connect for the Launcher Context
// it just expects an empty string for the socketURI. Other environments require it.
let ENV_CONNECTION_URI = process.env.REACT_APP_HC_CONN_URL || '';
let ENV_ADMIN_CONNECTION_URI = process.env.REACT_APP_HC_ADMIN_CONN_URL || '';
let ENV_HOLOCHAIN_APP_ID = process.env.REACT_APP_HC_APP_ID || '';
const CONNECTION_CACHE = {};
/**
 * If no `conductorUri` is provided or is otherwise empty or undefined,
 * a connection is attempted via the `REACT_APP_HC_CONN_URL` environment variable.
 * Only if running in a Holochain Launcher context, can both of the before-mentioned values
 * be left undefined or empty, and the websocket connection can still be established.
 */
export async function autoConnect(conductorUri, adminConductorUri, appID, traceAppSignals) {
    conductorUri = conductorUri || ENV_CONNECTION_URI;
    adminConductorUri = adminConductorUri || ENV_ADMIN_CONNECTION_URI;
    const conn = await openConnection(conductorUri, traceAppSignals);
    const { dnaConfig, appId: realAppId, } = await sniffHolochainAppCells(conn, appID);
    let adminConn = null;
    if (adminConductorUri) {
        adminConn = await AdminWebsocket.connect(adminConductorUri);
        for await (let cellId of Object.values(dnaConfig)) {
            await adminConn.authorizeSigningCredentials(cellId);
        }
    }
    return {
        conn,
        adminConn,
        dnaConfig,
        conductorUri,
        adminConductorUri,
        appId: realAppId
    };
}
/**
 * Inits a connection for the given websocket URI.
 *
 * This method gives calling code an opportunity to register globals for all future
 * instances of a connection of the same `socketURI`. To ensure this is done reliably,
 * a runtime error will be thrown by `getConnection` if no `openConnection` has
 * been previously performed for the same `socketURI`.
 */
export const openConnection = (appSocketURI, traceAppSignals) => {
    console.log(`Init Holochain connection: ${appSocketURI}`);
    CONNECTION_CACHE[appSocketURI] = AppWebsocket.connect(appSocketURI)
        .then((client) => {
        console.log(`Holochain connection to ${appSocketURI} OK`);
        if (traceAppSignals) {
            client.on('signal', traceAppSignals);
        }
        return client;
    });
    return CONNECTION_CACHE[appSocketURI];
};
const getConnection = (appSocketURI) => {
    if (!CONNECTION_CACHE[appSocketURI]) {
        throw new Error(`Connection for ${appSocketURI} not initialised! Please call openConnection() first.`);
    }
    return CONNECTION_CACHE[appSocketURI];
};
/**
 * Introspect an active Holochain connection's app cells to determine cell IDs
 * for mapping to the schema resolvers.
 * If no `appId` is provided or is otherwise empty or undefined,
 * it will try to use the `REACT_APP_HC_APP_ID` environment variable.
 * Only if running in a Holochain Launcher context, can both of the before-mentioned values
 * be left undefined or empty, and the AppWebsocket will know which appId to introspect into.
 */
export async function sniffHolochainAppCells(conn, appId) {
    // use the default set by the environment variable
    // and furthermore, note that both of these will be ignored
    // in the Holochain Launcher context
    // which will override any given value to the AppWebsocket
    // for installed_app_id
    appId = appId || ENV_HOLOCHAIN_APP_ID;
    const appInfo = await conn.appInfo({ installed_app_id: appId });
    if (!appInfo) {
        throw new Error(`appInfo call failed for Holochain app '${appId}' - ensure the name is correct and that the app installation has succeeded`);
    }
    let dnaConfig = {};
    Object.entries(appInfo.cell_info).forEach(([roleName, cellInfos]) => {
        // this is the "magic pattern" of having for
        // example the "agreement" DNA, it should have
        // an assigned "role_name" in the happ of
        // "hrea_agreement_1" or "hrea_observation_2"
        // and the middle section should match the expected name
        // for DNAIdMappings, which are also used during zome calls
        const hrea_cell_match = roleName.match(/hrea_(\w+)_\d+/);
        if (!hrea_cell_match)
            return;
        const hreaRole = hrea_cell_match[1];
        const firstCell = cellInfos[0];
        if (CellType.Provisioned in firstCell) {
            dnaConfig[hreaRole] = firstCell[CellType.Provisioned].cell_id;
        }
    });
    console.info('Connecting to detected Holochain cells:', dnaConfig);
    return {
        dnaConfig,
        appId,
    };
}
//----------------------------------------------------------------------------------------------------------------------
// Holochain / GraphQL type translation layer
//----------------------------------------------------------------------------------------------------------------------
// @see https://crates.io/crates/holo_hash
const HOLOCHAIN_IDENTIFIER_LEN = 39;
// @see holo_hash::hash_type::primitive
const HOLOHASH_PREFIX_DNA = [0x84, 0x2d, 0x24]; // uhC0k
const HOLOHASH_PREFIX_ENTRY = [0x84, 0x21, 0x24]; // uhCEk
const HOLOHASH_PREFIX_HEADER = [0x84, 0x29, 0x24]; // uhCkk
const HOLOHASH_PREFIX_AGENT = [0x84, 0x20, 0x24]; // uhCAk
const serializedHashMatchRegex = /^[A-Za-z0-9_+\-/]{53}={0,2}$/;
const idMatchRegex = /^[A-Za-z0-9_+\-/]{53}={0,2}:[A-Za-z0-9_+\-/]{53}={0,2}$/;
// something like
// $:uhC0k1mcUqQIbtT0mkdTldhBaAvR6KlKxIV2IYwJemHt-NO92uXG5
// or kg:uhC0k1mcUqQIbtT0mkdTldhBaAvR6KlKxIV2IYwJemHt-NO92uXG5
// but not 9:uhC0k1mcUqQIbtT0mkdTldhBaAvR6KlKxIV2IYwJemHt-NO92uXG5 (i.e. no digits in the id)
const stringIdRegex = /^\D+?:[A-Za-z0-9_+\-/]{53}={0,2}$/;
// @see https://github.com/holochain-open-dev/core-types/blob/main/src/utils.ts
export function deserializeHash(hash) {
    // return Base64.toUint8Array(hash.slice(1))
    return toByteArray(hash.slice(1));
}
export function deserializeId(field) {
    const matches = field.split(':');
    return [
        Buffer.from(deserializeHash(matches[1])),
        Buffer.from(deserializeHash(matches[0])),
    ];
}
function deserializeStringId(field) {
    const matches = field.split(':');
    return [
        Buffer.from(deserializeHash(matches[1])),
        matches[0],
    ];
}
// @see https://github.com/holochain-open-dev/core-types/blob/main/src/utils.ts
export function serializeHash(hash) {
    // return `u${Base64.fromUint8Array(hash, true)}`
    return `u${fromByteArray(hash)}`;
}
function serializeId(id) {
    return `${serializeHash(id[1])}:${serializeHash(id[0])}`;
}
function seralizeStringId(id) {
    return `${id[1]}:${serializeHash(id[0])}`;
}
// Construct appropriate IDs for records in associated DNAs by substituting
// the CellId portion of the ID with that of an appropriate destination record
export function remapCellId(originalId, newCellId) {
    const [origId, _origCell] = originalId.split(':');
    return `${origId}:${newCellId.split(':')[1]}`;
}
const LONG_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
const SHORT_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';
const isoDateRegex = /^\d{4}-\d\d-\d\d(T\d\d:\d\d:\d\d(\.\d\d\d)?)?([+-]\d\d:\d\d)?$/;
/**
 * Decode raw data input coming from Holochain API websocket.
 *
 * Mutates in place- we have no need for the non-normalised primitive format and this saves memory.
 */
const decodeFields = (result) => {
    deepForEach(result, (value, prop, subject) => {
        // ActionHash or AgentPubKey
        if ((value instanceof Buffer || value instanceof Uint8Array) && value.length === HOLOCHAIN_IDENTIFIER_LEN &&
            (checkLeadingBytes(value, HOLOHASH_PREFIX_HEADER) || checkLeadingBytes(value, HOLOHASH_PREFIX_AGENT))) {
            subject[prop] = serializeHash(value);
        }
        // RecordId | StringId (Agent, for now)
        if (Array.isArray(value) && value.length == 2 &&
            (value[0] instanceof Buffer || value[0] instanceof Uint8Array) &&
            value[0].length === HOLOCHAIN_IDENTIFIER_LEN &&
            checkLeadingBytes(value[0], HOLOHASH_PREFIX_DNA)) {
            // Match 2-element arrays of Buffer objects as IDs.
            // Since we check the hash prefixes, this should make it safe to mix with fields which reference arrays of plain EntryHash / ActionHash data.
            if ((value[1] instanceof Buffer || value[1] instanceof Uint8Array) && value[1].length === HOLOCHAIN_IDENTIFIER_LEN &&
                (checkLeadingBytes(value[1], HOLOHASH_PREFIX_ENTRY) || checkLeadingBytes(value[1], HOLOHASH_PREFIX_HEADER) || checkLeadingBytes(value[1], HOLOHASH_PREFIX_AGENT))) {
                subject[prop] = serializeId(value);
                // Match 2-element pairs of Buffer/String as a "DNA-scoped identifier" (eg. UnitId)
                // :TODO: This one probably isn't safe for regular ID field mixing.
                //        Custom serde de/serializer would make bind this handling to the appropriate fields without duck-typing issues.
            }
            else {
                subject[prop] = seralizeStringId(value);
            }
        }
        // recursively check for Date strings and convert to JS date objects upon receiving
        if (value && value.match && value.match(isoDateRegex)) {
            subject[prop] = parse(value, LONG_DATETIME_FORMAT);
            if (subject[prop] === null) {
                subject[prop] = parse(value, SHORT_DATETIME_FORMAT);
            }
        }
    });
};
function checkLeadingBytes(ofVar, against) {
    return ofVar[0] === against[0] &&
        ofVar[1] === against[1] &&
        ofVar[2] === against[2];
}
/**
 * Encode application runtime data into serialisable format for transmitting to API websocket.
 *
 * Clones data in order to keep input data pristine.
 */
const encodeFields = (args) => {
    if (!args)
        return args;
    let res = args;
    // encode dates as ISO8601 DateTime strings
    if (args instanceof Date) {
        return format(args, LONG_DATETIME_FORMAT);
    }
    // deserialise any identifiers back to their binary format
    else if (args.match && args.match(serializedHashMatchRegex)) {
        return deserializeHash(args);
    }
    else if (args.match && args.match(idMatchRegex)) {
        return deserializeId(args);
    }
    else if (args.match && args.match(stringIdRegex)) {
        return deserializeStringId(args);
    }
    // recurse into child fields
    else if (Array.isArray(args)) {
        res = [];
        args.forEach((value, key) => {
            res[key] = encodeFields(value);
        });
    }
    else if (isObject(args)) {
        res = {};
        for (const key in args) {
            res[key] = encodeFields(args[key]);
        }
    }
    return res;
};
/**
 * Higher-order function to generate async functions for calling zome RPC methods
 */
const zomeFunction = (socketURI, cell_id, zome_name, fn_name, skipEncodeDecode) => async (args) => {
    const { callZome } = await getConnection(socketURI);
    const res = await callZome({
        cell_id,
        zome_name,
        fn_name,
        provenance: cell_id[1],
        payload: skipEncodeDecode ? args : encodeFields(args),
    }, 60000);
    if (!skipEncodeDecode)
        decodeFields(res);
    return res;
};
/**
 * External API for accessing zome methods, passing them through an optional intermediary DNA ID mapping
 *
 * @param mappings  DNAIdMappings to use for this collaboration space.
 *                  `instance` must be present in the mapping, and the mapped CellId will be used instead of `instance` itself.
 * @param socketURI If provided, connects to the Holochain conductor on a different URI.
 *
 * @return bound async zome function which can be called directly
 */
export const mapZomeFn = (mappings, socketURI, instance, zome, fn, skipEncodeDecode) => zomeFunction(socketURI, (mappings && mappings[instance]), zome, fn, skipEncodeDecode);
export const extractEdges = (withEdges) => {
    if (!withEdges.edges || !withEdges.edges.length) {
        return [];
    }
    return withEdges.edges.map(({ node }) => node);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2Nvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxPQUFPLEVBQWUsWUFBWSxFQUFFLGNBQWMsRUFBVSxRQUFRLEVBQVksTUFBTSxtQkFBbUIsQ0FBQTtBQUN6RyxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUE7QUFDdkMsT0FBTyxRQUFRLE1BQU0sV0FBVyxDQUFBO0FBQ2hDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDL0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxPQUFPLENBQUE7QUFFckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFJdkQsd0hBQXdIO0FBQ3hILG9FQUFvRTtBQUNwRSx3SEFBd0g7QUFFeEgsb0VBQW9FO0FBQ3BFLG9GQUFvRjtBQUNwRixJQUFJLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQStCLElBQUksRUFBRSxDQUFBO0FBQzFFLElBQUksd0JBQXdCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBcUMsSUFBSSxFQUFFLENBQUE7QUFDdEYsSUFBSSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUE2QixJQUFJLEVBQUUsQ0FBQTtBQUUxRSxNQUFNLGdCQUFnQixHQUEyQyxFQUFFLENBQUE7QUFFbkU7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLFdBQVcsQ0FBQyxZQUFxQixFQUFFLGlCQUEwQixFQUFFLEtBQWMsRUFBRSxlQUE2QjtJQUNoSSxZQUFZLEdBQUcsWUFBWSxJQUFJLGtCQUFrQixDQUFBO0lBQ2pELGlCQUFpQixHQUFHLGlCQUFpQixJQUFJLHdCQUF3QixDQUFBO0lBRWpFLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLFlB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RSxFQUFVLEVBQUUsZ0JBQTBCLEVBQUUsRUFBRSxDQUNySyxZQUFZLENBQXdCLFNBQVMsRUFBRSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUE7QUFHOUcsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUksU0FBbUMsRUFBTyxFQUFFO0lBQzFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDL0MsT0FBTyxFQUFFLENBQUE7S0FDVjtJQUNELE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNoRCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbm5lY3Rpb24gd3JhcHBlciBmb3IgSG9sb2NoYWluIEROQSBtZXRob2QgY2FsbHNcbiAqXG4gKiA6VE9ETzogOldBUk5JTkc6XG4gKlxuICogVGhpcyBsYXllciBpcyBjdXJyZW50bHkgdW5zdWl0YWJsZSBmb3IgbWl4aW5nIHdpdGggRE5BcyB0aGF0IHVzZSBkbmEtbG9jYWwgaWRlbnRpZmllciBmb3JtYXRzLCBhbmRcbiAqIHdpbGwgY2F1c2UgZW5jb2RpbmcgZXJyb3JzIGlmIDItZWxlbWVudCBsaXN0cyBvZiBpZGVudGlmaWVycyBhcmUgcGFzc2VkLlxuICpcbiAqIFN1Y2ggdHVwbGVzIGFyZSBpbnRlcnByZXRlZCBhcyBbYERuYUhhc2hgLCBgQW55RGh0SGFzaGBdIHBhaXJzIGJ5IHRoZSBHcmFwaFFMIDwtPiBIb2xvY2hhaW5cbiAqIHNlcmlhbGlzYXRpb24gbGF5ZXIgYW5kIHRyYW5zZm9ybWVkIGludG8gY29tcG91bmQgSURzIGF0IEkvTyB0aW1lLiBTbywgdGhpcyBhZGFwdGVyIHNob3VsZFxuICogKm9ubHkqIGJlIHVzZWQgdG8gd3JhcCBETkFzIGV4cGxpY2l0bHkgZGV2ZWxvcGVkIHdpdGggbXVsdGktRE5BIHJlZmVyZW5jZXMgaW4gbWluZC5cbiAqXG4gKiBBbHNvIDpUT0RPOiAtIHN0YW5kYXJkaXNlIGEgYmluYXJ5IGZvcm1hdCBmb3IgdW5pdmVyc2FsbHkgdW5pcXVlIEhvbG9jaGFpbiBlbnRyeS9oZWFkZXIgaWRlbnRpZmllcnMuXG4gKlxuICogQHBhY2thZ2U6IGhSRUFcbiAqIEBzaW5jZTogICAyMDE5LTA1LTIwXG4gKi9cblxuaW1wb3J0IHsgQXBwU2lnbmFsQ2IsIEFwcFdlYnNvY2tldCwgQWRtaW5XZWJzb2NrZXQsIENlbGxJZCwgQ2VsbFR5cGUsIEhvbG9IYXNoIH0gZnJvbSAnQGhvbG9jaGFpbi9jbGllbnQnXG5pbXBvcnQgZGVlcEZvckVhY2ggZnJvbSAnZGVlcC1mb3ItZWFjaCdcbmltcG9ydCBpc09iamVjdCBmcm9tICdpcy1vYmplY3QnXG5pbXBvcnQgeyBCdWZmZXIgfSBmcm9tICdidWZmZXInXG5pbXBvcnQgeyBmb3JtYXQsIHBhcnNlIH0gZnJvbSAnZmVjaGEnXG5pbXBvcnQgeyBETkFJZE1hcHBpbmdzIH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB7IGZyb21CeXRlQXJyYXksIHRvQnl0ZUFycmF5IH0gZnJvbSAnYmFzZTY0LWpzJztcblxudHlwZSBSZWNvcmRJZCA9IFtIb2xvSGFzaCwgSG9sb0hhc2hdXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQ29ubmVjdGlvbiBwZXJzaXN0ZW5jZSBhbmQgbXVsdGktY29uZHVjdG9yIC8gbXVsdGktYWdlbnQgaGFuZGxpbmdcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyA6Tk9URTogd2hlbiBjYWxsaW5nIEFwcFdlYnNvY2tldC5jb25uZWN0IGZvciB0aGUgTGF1bmNoZXIgQ29udGV4dFxuLy8gaXQganVzdCBleHBlY3RzIGFuIGVtcHR5IHN0cmluZyBmb3IgdGhlIHNvY2tldFVSSS4gT3RoZXIgZW52aXJvbm1lbnRzIHJlcXVpcmUgaXQuXG5sZXQgRU5WX0NPTk5FQ1RJT05fVVJJID0gcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0hDX0NPTk5fVVJMIGFzIHN0cmluZyB8fCAnJ1xubGV0IEVOVl9BRE1JTl9DT05ORUNUSU9OX1VSSSA9IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9IQ19BRE1JTl9DT05OX1VSTCBhcyBzdHJpbmcgfHwgJydcbmxldCBFTlZfSE9MT0NIQUlOX0FQUF9JRCA9IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9IQ19BUFBfSUQgYXMgc3RyaW5nIHx8ICcnXG5cbmNvbnN0IENPTk5FQ1RJT05fQ0FDSEU6IHsgW2k6IHN0cmluZ106IFByb21pc2U8QXBwV2Vic29ja2V0PiB9ID0ge31cblxuLyoqXG4gKiBJZiBubyBgY29uZHVjdG9yVXJpYCBpcyBwcm92aWRlZCBvciBpcyBvdGhlcndpc2UgZW1wdHkgb3IgdW5kZWZpbmVkLFxuICogYSBjb25uZWN0aW9uIGlzIGF0dGVtcHRlZCB2aWEgdGhlIGBSRUFDVF9BUFBfSENfQ09OTl9VUkxgIGVudmlyb25tZW50IHZhcmlhYmxlLlxuICogT25seSBpZiBydW5uaW5nIGluIGEgSG9sb2NoYWluIExhdW5jaGVyIGNvbnRleHQsIGNhbiBib3RoIG9mIHRoZSBiZWZvcmUtbWVudGlvbmVkIHZhbHVlc1xuICogYmUgbGVmdCB1bmRlZmluZWQgb3IgZW1wdHksIGFuZCB0aGUgd2Vic29ja2V0IGNvbm5lY3Rpb24gY2FuIHN0aWxsIGJlIGVzdGFibGlzaGVkLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXV0b0Nvbm5lY3QoY29uZHVjdG9yVXJpPzogc3RyaW5nLCBhZG1pbkNvbmR1Y3RvclVyaT86IHN0cmluZywgYXBwSUQ/OiBzdHJpbmcsIHRyYWNlQXBwU2lnbmFscz86IEFwcFNpZ25hbENiKSB7XG4gIGNvbmR1Y3RvclVyaSA9IGNvbmR1Y3RvclVyaSB8fCBFTlZfQ09OTkVDVElPTl9VUklcbiAgYWRtaW5Db25kdWN0b3JVcmkgPSBhZG1pbkNvbmR1Y3RvclVyaSB8fCBFTlZfQURNSU5fQ09OTkVDVElPTl9VUklcblxuICBjb25zdCBjb25uID0gYXdhaXQgb3BlbkNvbm5lY3Rpb24oY29uZHVjdG9yVXJpLCB0cmFjZUFwcFNpZ25hbHMpXG4gIGNvbnN0IHtcbiAgICBkbmFDb25maWcsXG4gICAgYXBwSWQ6IHJlYWxBcHBJZCxcbiAgIH0gPSBhd2FpdCBzbmlmZkhvbG9jaGFpbkFwcENlbGxzKGNvbm4sIGFwcElEKVxuICBsZXQgYWRtaW5Db25uOiBBZG1pbldlYnNvY2tldCB8IG51bGwgPSBudWxsXG4gIGlmIChhZG1pbkNvbmR1Y3RvclVyaSkge1xuICAgIGFkbWluQ29ubiA9IGF3YWl0IEFkbWluV2Vic29ja2V0LmNvbm5lY3QoYWRtaW5Db25kdWN0b3JVcmkpXG4gICAgZm9yIGF3YWl0IChsZXQgY2VsbElkIG9mIE9iamVjdC52YWx1ZXMoZG5hQ29uZmlnKSkge1xuICAgICAgYXdhaXQgYWRtaW5Db25uLmF1dGhvcml6ZVNpZ25pbmdDcmVkZW50aWFscyhjZWxsSWQpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjb25uLFxuICAgIGFkbWluQ29ubixcbiAgICBkbmFDb25maWcsXG4gICAgY29uZHVjdG9yVXJpLFxuICAgIGFkbWluQ29uZHVjdG9yVXJpLFxuICAgIGFwcElkOiByZWFsQXBwSWRcbiAgfVxufVxuXG4vKipcbiAqIEluaXRzIGEgY29ubmVjdGlvbiBmb3IgdGhlIGdpdmVuIHdlYnNvY2tldCBVUkkuXG4gKlxuICogVGhpcyBtZXRob2QgZ2l2ZXMgY2FsbGluZyBjb2RlIGFuIG9wcG9ydHVuaXR5IHRvIHJlZ2lzdGVyIGdsb2JhbHMgZm9yIGFsbCBmdXR1cmVcbiAqIGluc3RhbmNlcyBvZiBhIGNvbm5lY3Rpb24gb2YgdGhlIHNhbWUgYHNvY2tldFVSSWAuIFRvIGVuc3VyZSB0aGlzIGlzIGRvbmUgcmVsaWFibHksXG4gKiBhIHJ1bnRpbWUgZXJyb3Igd2lsbCBiZSB0aHJvd24gYnkgYGdldENvbm5lY3Rpb25gIGlmIG5vIGBvcGVuQ29ubmVjdGlvbmAgaGFzXG4gKiBiZWVuIHByZXZpb3VzbHkgcGVyZm9ybWVkIGZvciB0aGUgc2FtZSBgc29ja2V0VVJJYC5cbiAqL1xuZXhwb3J0IGNvbnN0IG9wZW5Db25uZWN0aW9uID0gKGFwcFNvY2tldFVSSTogc3RyaW5nLCB0cmFjZUFwcFNpZ25hbHM/OiBBcHBTaWduYWxDYikgPT4ge1xuICBjb25zb2xlLmxvZyhgSW5pdCBIb2xvY2hhaW4gY29ubmVjdGlvbjogJHthcHBTb2NrZXRVUkl9YClcblxuICBDT05ORUNUSU9OX0NBQ0hFW2FwcFNvY2tldFVSSV0gPSBBcHBXZWJzb2NrZXQuY29ubmVjdChhcHBTb2NrZXRVUkkpXG4gICAgLnRoZW4oKGNsaWVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgSG9sb2NoYWluIGNvbm5lY3Rpb24gdG8gJHthcHBTb2NrZXRVUkl9IE9LYClcbiAgICAgICAgaWYgKHRyYWNlQXBwU2lnbmFscykge1xuICAgICAgICAgIGNsaWVudC5vbignc2lnbmFsJywgdHJhY2VBcHBTaWduYWxzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbGllbnRcbiAgICAgIH0pXG5cbiAgcmV0dXJuIENPTk5FQ1RJT05fQ0FDSEVbYXBwU29ja2V0VVJJXVxufVxuXG5jb25zdCBnZXRDb25uZWN0aW9uID0gKGFwcFNvY2tldFVSSTogc3RyaW5nKSA9PiB7XG4gIGlmICghQ09OTkVDVElPTl9DQUNIRVthcHBTb2NrZXRVUkldKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb25uZWN0aW9uIGZvciAke2FwcFNvY2tldFVSSX0gbm90IGluaXRpYWxpc2VkISBQbGVhc2UgY2FsbCBvcGVuQ29ubmVjdGlvbigpIGZpcnN0LmApXG4gIH1cblxuICByZXR1cm4gQ09OTkVDVElPTl9DQUNIRVthcHBTb2NrZXRVUkldXG59XG5cbi8qKlxuICogSW50cm9zcGVjdCBhbiBhY3RpdmUgSG9sb2NoYWluIGNvbm5lY3Rpb24ncyBhcHAgY2VsbHMgdG8gZGV0ZXJtaW5lIGNlbGwgSURzXG4gKiBmb3IgbWFwcGluZyB0byB0aGUgc2NoZW1hIHJlc29sdmVycy5cbiAqIElmIG5vIGBhcHBJZGAgaXMgcHJvdmlkZWQgb3IgaXMgb3RoZXJ3aXNlIGVtcHR5IG9yIHVuZGVmaW5lZCxcbiAqIGl0IHdpbGwgdHJ5IHRvIHVzZSB0aGUgYFJFQUNUX0FQUF9IQ19BUFBfSURgIGVudmlyb25tZW50IHZhcmlhYmxlLlxuICogT25seSBpZiBydW5uaW5nIGluIGEgSG9sb2NoYWluIExhdW5jaGVyIGNvbnRleHQsIGNhbiBib3RoIG9mIHRoZSBiZWZvcmUtbWVudGlvbmVkIHZhbHVlc1xuICogYmUgbGVmdCB1bmRlZmluZWQgb3IgZW1wdHksIGFuZCB0aGUgQXBwV2Vic29ja2V0IHdpbGwga25vdyB3aGljaCBhcHBJZCB0byBpbnRyb3NwZWN0IGludG8uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzbmlmZkhvbG9jaGFpbkFwcENlbGxzKGNvbm46IEFwcFdlYnNvY2tldCwgYXBwSWQ/OiBzdHJpbmcpIHtcbiAgLy8gdXNlIHRoZSBkZWZhdWx0IHNldCBieSB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGVcbiAgLy8gYW5kIGZ1cnRoZXJtb3JlLCBub3RlIHRoYXQgYm90aCBvZiB0aGVzZSB3aWxsIGJlIGlnbm9yZWRcbiAgLy8gaW4gdGhlIEhvbG9jaGFpbiBMYXVuY2hlciBjb250ZXh0XG4gIC8vIHdoaWNoIHdpbGwgb3ZlcnJpZGUgYW55IGdpdmVuIHZhbHVlIHRvIHRoZSBBcHBXZWJzb2NrZXRcbiAgLy8gZm9yIGluc3RhbGxlZF9hcHBfaWRcbiAgYXBwSWQgPSBhcHBJZCB8fCBFTlZfSE9MT0NIQUlOX0FQUF9JRFxuICBjb25zdCBhcHBJbmZvID0gYXdhaXQgY29ubi5hcHBJbmZvKHsgaW5zdGFsbGVkX2FwcF9pZDogYXBwSWQgfSlcbiAgaWYgKCFhcHBJbmZvKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBhcHBJbmZvIGNhbGwgZmFpbGVkIGZvciBIb2xvY2hhaW4gYXBwICcke2FwcElkfScgLSBlbnN1cmUgdGhlIG5hbWUgaXMgY29ycmVjdCBhbmQgdGhhdCB0aGUgYXBwIGluc3RhbGxhdGlvbiBoYXMgc3VjY2VlZGVkYClcbiAgfVxuXG4gIGxldCBkbmFDb25maWc6IEROQUlkTWFwcGluZ3MgPSB7fVxuICBPYmplY3QuZW50cmllcyhhcHBJbmZvLmNlbGxfaW5mbykuZm9yRWFjaCgoW3JvbGVOYW1lLCBjZWxsSW5mb3NdKSA9PiB7XG4gICAgLy8gdGhpcyBpcyB0aGUgXCJtYWdpYyBwYXR0ZXJuXCIgb2YgaGF2aW5nIGZvclxuICAgIC8vIGV4YW1wbGUgdGhlIFwiYWdyZWVtZW50XCIgRE5BLCBpdCBzaG91bGQgaGF2ZVxuICAgIC8vIGFuIGFzc2lnbmVkIFwicm9sZV9uYW1lXCIgaW4gdGhlIGhhcHAgb2ZcbiAgICAvLyBcImhyZWFfYWdyZWVtZW50XzFcIiBvciBcImhyZWFfb2JzZXJ2YXRpb25fMlwiXG4gICAgLy8gYW5kIHRoZSBtaWRkbGUgc2VjdGlvbiBzaG91bGQgbWF0Y2ggdGhlIGV4cGVjdGVkIG5hbWVcbiAgICAvLyBmb3IgRE5BSWRNYXBwaW5ncywgd2hpY2ggYXJlIGFsc28gdXNlZCBkdXJpbmcgem9tZSBjYWxsc1xuICAgIGNvbnN0IGhyZWFfY2VsbF9tYXRjaCA9IHJvbGVOYW1lLm1hdGNoKC9ocmVhXyhcXHcrKV9cXGQrLylcbiAgICBpZiAoIWhyZWFfY2VsbF9tYXRjaCkgcmV0dXJuXG4gICAgY29uc3QgaHJlYVJvbGUgPSBocmVhX2NlbGxfbWF0Y2hbMV0gYXMga2V5b2YgRE5BSWRNYXBwaW5nc1xuICAgIGNvbnN0IGZpcnN0Q2VsbCA9IGNlbGxJbmZvc1swXVxuICAgIGlmIChDZWxsVHlwZS5Qcm92aXNpb25lZCBpbiBmaXJzdENlbGwpIHtcbiAgICAgIGRuYUNvbmZpZ1tocmVhUm9sZV0gPSBmaXJzdENlbGxbQ2VsbFR5cGUuUHJvdmlzaW9uZWRdLmNlbGxfaWRcbiAgICB9XG4gIH0pXG5cbiAgY29uc29sZS5pbmZvKCdDb25uZWN0aW5nIHRvIGRldGVjdGVkIEhvbG9jaGFpbiBjZWxsczonLCBkbmFDb25maWcpXG5cbiAgcmV0dXJuIHtcbiAgICBkbmFDb25maWcsXG4gICAgYXBwSWQsXG4gIH1cbn1cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEhvbG9jaGFpbiAvIEdyYXBoUUwgdHlwZSB0cmFuc2xhdGlvbiBsYXllclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIEBzZWUgaHR0cHM6Ly9jcmF0ZXMuaW8vY3JhdGVzL2hvbG9faGFzaFxuY29uc3QgSE9MT0NIQUlOX0lERU5USUZJRVJfTEVOID0gMzlcbi8vIEBzZWUgaG9sb19oYXNoOjpoYXNoX3R5cGU6OnByaW1pdGl2ZVxuY29uc3QgSE9MT0hBU0hfUFJFRklYX0ROQSA9IFsweDg0LCAweDJkLCAweDI0XSAgICAgLy8gdWhDMGtcbmNvbnN0IEhPTE9IQVNIX1BSRUZJWF9FTlRSWSA9IFsweDg0LCAweDIxLCAweDI0XSAgIC8vIHVoQ0VrXG5jb25zdCBIT0xPSEFTSF9QUkVGSVhfSEVBREVSID0gWzB4ODQsIDB4MjksIDB4MjRdICAvLyB1aENra1xuY29uc3QgSE9MT0hBU0hfUFJFRklYX0FHRU5UID0gWzB4ODQsIDB4MjAsIDB4MjRdICAgLy8gdWhDQWtcblxuY29uc3Qgc2VyaWFsaXplZEhhc2hNYXRjaFJlZ2V4ID0gL15bQS1aYS16MC05XytcXC0vXXs1M309ezAsMn0kL1xuY29uc3QgaWRNYXRjaFJlZ2V4ID0gL15bQS1aYS16MC05XytcXC0vXXs1M309ezAsMn06W0EtWmEtejAtOV8rXFwtL117NTN9PXswLDJ9JC9cbi8vIHNvbWV0aGluZyBsaWtlXG4vLyAkOnVoQzBrMW1jVXFRSWJ0VDBta2RUbGRoQmFBdlI2S2xLeElWMklZd0plbUh0LU5POTJ1WEc1XG4vLyBvciBrZzp1aEMwazFtY1VxUUlidFQwbWtkVGxkaEJhQXZSNktsS3hJVjJJWXdKZW1IdC1OTzkydVhHNVxuLy8gYnV0IG5vdCA5OnVoQzBrMW1jVXFRSWJ0VDBta2RUbGRoQmFBdlI2S2xLeElWMklZd0plbUh0LU5POTJ1WEc1IChpLmUuIG5vIGRpZ2l0cyBpbiB0aGUgaWQpXG5jb25zdCBzdHJpbmdJZFJlZ2V4ID0gL15cXEQrPzpbQS1aYS16MC05XytcXC0vXXs1M309ezAsMn0kL1xuXG4vLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ob2xvY2hhaW4tb3Blbi1kZXYvY29yZS10eXBlcy9ibG9iL21haW4vc3JjL3V0aWxzLnRzXG5leHBvcnQgZnVuY3Rpb24gZGVzZXJpYWxpemVIYXNoKGhhc2g6IHN0cmluZyk6IFVpbnQ4QXJyYXkge1xuICAvLyByZXR1cm4gQmFzZTY0LnRvVWludDhBcnJheShoYXNoLnNsaWNlKDEpKVxuICByZXR1cm4gdG9CeXRlQXJyYXkoaGFzaC5zbGljZSgxKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplSWQoZmllbGQ6IHN0cmluZyk6IFJlY29yZElkIHtcbiAgY29uc3QgbWF0Y2hlcyA9IGZpZWxkLnNwbGl0KCc6JylcbiAgcmV0dXJuIFtcbiAgICBCdWZmZXIuZnJvbShkZXNlcmlhbGl6ZUhhc2gobWF0Y2hlc1sxXSkpLFxuICAgIEJ1ZmZlci5mcm9tKGRlc2VyaWFsaXplSGFzaChtYXRjaGVzWzBdKSksXG4gIF1cbn1cblxuZnVuY3Rpb24gZGVzZXJpYWxpemVTdHJpbmdJZChmaWVsZDogc3RyaW5nKTogW0J1ZmZlcixzdHJpbmddIHtcbiAgY29uc3QgbWF0Y2hlcyA9IGZpZWxkLnNwbGl0KCc6JylcbiAgcmV0dXJuIFtcbiAgICBCdWZmZXIuZnJvbShkZXNlcmlhbGl6ZUhhc2gobWF0Y2hlc1sxXSkpLFxuICAgIG1hdGNoZXNbMF0sXG4gIF1cbn1cblxuLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vaG9sb2NoYWluLW9wZW4tZGV2L2NvcmUtdHlwZXMvYmxvYi9tYWluL3NyYy91dGlscy50c1xuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUhhc2goaGFzaDogVWludDhBcnJheSk6IHN0cmluZyB7XG4gIC8vIHJldHVybiBgdSR7QmFzZTY0LmZyb21VaW50OEFycmF5KGhhc2gsIHRydWUpfWBcbiAgcmV0dXJuIGB1JHtmcm9tQnl0ZUFycmF5KGhhc2gpfWBcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplSWQoaWQ6IFJlY29yZElkKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3NlcmlhbGl6ZUhhc2goaWRbMV0pfToke3NlcmlhbGl6ZUhhc2goaWRbMF0pfWBcbn1cblxuZnVuY3Rpb24gc2VyYWxpemVTdHJpbmdJZChpZDogW0J1ZmZlcixzdHJpbmddKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke2lkWzFdfToke3NlcmlhbGl6ZUhhc2goaWRbMF0pfWBcbn1cblxuLy8gQ29uc3RydWN0IGFwcHJvcHJpYXRlIElEcyBmb3IgcmVjb3JkcyBpbiBhc3NvY2lhdGVkIEROQXMgYnkgc3Vic3RpdHV0aW5nXG4vLyB0aGUgQ2VsbElkIHBvcnRpb24gb2YgdGhlIElEIHdpdGggdGhhdCBvZiBhbiBhcHByb3ByaWF0ZSBkZXN0aW5hdGlvbiByZWNvcmRcbmV4cG9ydCBmdW5jdGlvbiByZW1hcENlbGxJZChvcmlnaW5hbElkLCBuZXdDZWxsSWQpIHtcbiAgY29uc3QgW29yaWdJZCwgX29yaWdDZWxsXSA9IG9yaWdpbmFsSWQuc3BsaXQoJzonKVxuICByZXR1cm4gYCR7b3JpZ0lkfToke25ld0NlbGxJZC5zcGxpdCgnOicpWzFdfWBcbn1cblxuY29uc3QgTE9OR19EQVRFVElNRV9GT1JNQVQgPSAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1NaJ1xuY29uc3QgU0hPUlRfREFURVRJTUVfRk9STUFUID0gJ1lZWVktTU0tRERUSEg6bW06c3NaJ1xuY29uc3QgaXNvRGF0ZVJlZ2V4ID0gL15cXGR7NH0tXFxkXFxkLVxcZFxcZChUXFxkXFxkOlxcZFxcZDpcXGRcXGQoXFwuXFxkXFxkXFxkKT8pPyhbKy1dXFxkXFxkOlxcZFxcZCk/JC9cblxuLyoqXG4gKiBEZWNvZGUgcmF3IGRhdGEgaW5wdXQgY29taW5nIGZyb20gSG9sb2NoYWluIEFQSSB3ZWJzb2NrZXQuXG4gKlxuICogTXV0YXRlcyBpbiBwbGFjZS0gd2UgaGF2ZSBubyBuZWVkIGZvciB0aGUgbm9uLW5vcm1hbGlzZWQgcHJpbWl0aXZlIGZvcm1hdCBhbmQgdGhpcyBzYXZlcyBtZW1vcnkuXG4gKi9cbmNvbnN0IGRlY29kZUZpZWxkcyA9IChyZXN1bHQ6IGFueSk6IHZvaWQgPT4ge1xuICBkZWVwRm9yRWFjaChyZXN1bHQsICh2YWx1ZSwgcHJvcCwgc3ViamVjdCkgPT4ge1xuXG4gICAgLy8gQWN0aW9uSGFzaCBvciBBZ2VudFB1YktleVxuICAgIGlmICgodmFsdWUgaW5zdGFuY2VvZiBCdWZmZXIgfHwgdmFsdWUgaW5zdGFuY2VvZiBVaW50OEFycmF5KSAmJiB2YWx1ZS5sZW5ndGggPT09IEhPTE9DSEFJTl9JREVOVElGSUVSX0xFTiAmJlxuICAgICAgKGNoZWNrTGVhZGluZ0J5dGVzKHZhbHVlLCBIT0xPSEFTSF9QUkVGSVhfSEVBREVSKSB8fCBjaGVja0xlYWRpbmdCeXRlcyh2YWx1ZSwgSE9MT0hBU0hfUFJFRklYX0FHRU5UKSkpIHtcbiAgICAgIHN1YmplY3RbcHJvcF0gPSBzZXJpYWxpemVIYXNoKHZhbHVlIGFzIHVua25vd24gYXMgVWludDhBcnJheSlcbiAgICB9XG5cbiAgICAvLyBSZWNvcmRJZCB8IFN0cmluZ0lkIChBZ2VudCwgZm9yIG5vdylcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09IDIgJiZcbiAgICAodmFsdWVbMF0gaW5zdGFuY2VvZiBCdWZmZXIgfHwgdmFsdWVbMF0gaW5zdGFuY2VvZiBVaW50OEFycmF5KSAmJlxuICAgIHZhbHVlWzBdLmxlbmd0aCA9PT0gSE9MT0NIQUlOX0lERU5USUZJRVJfTEVOICYmXG4gICAgY2hlY2tMZWFkaW5nQnl0ZXModmFsdWVbMF0sIEhPTE9IQVNIX1BSRUZJWF9ETkEpKVxuICAgIHtcbiAgICAgIC8vIE1hdGNoIDItZWxlbWVudCBhcnJheXMgb2YgQnVmZmVyIG9iamVjdHMgYXMgSURzLlxuICAgICAgLy8gU2luY2Ugd2UgY2hlY2sgdGhlIGhhc2ggcHJlZml4ZXMsIHRoaXMgc2hvdWxkIG1ha2UgaXQgc2FmZSB0byBtaXggd2l0aCBmaWVsZHMgd2hpY2ggcmVmZXJlbmNlIGFycmF5cyBvZiBwbGFpbiBFbnRyeUhhc2ggLyBBY3Rpb25IYXNoIGRhdGEuXG4gICAgICBpZiAoKHZhbHVlWzFdIGluc3RhbmNlb2YgQnVmZmVyIHx8IHZhbHVlWzFdIGluc3RhbmNlb2YgVWludDhBcnJheSkgJiYgdmFsdWVbMV0ubGVuZ3RoID09PSBIT0xPQ0hBSU5fSURFTlRJRklFUl9MRU4gJiZcbiAgICAgICAgKGNoZWNrTGVhZGluZ0J5dGVzKHZhbHVlWzFdLCBIT0xPSEFTSF9QUkVGSVhfRU5UUlkpIHx8IGNoZWNrTGVhZGluZ0J5dGVzKHZhbHVlWzFdLCBIT0xPSEFTSF9QUkVGSVhfSEVBREVSKSB8fCBjaGVja0xlYWRpbmdCeXRlcyh2YWx1ZVsxXSwgSE9MT0hBU0hfUFJFRklYX0FHRU5UKSkpXG4gICAgICB7XG4gICAgICAgIHN1YmplY3RbcHJvcF0gPSBzZXJpYWxpemVJZCh2YWx1ZSBhcyBSZWNvcmRJZClcbiAgICAgIC8vIE1hdGNoIDItZWxlbWVudCBwYWlycyBvZiBCdWZmZXIvU3RyaW5nIGFzIGEgXCJETkEtc2NvcGVkIGlkZW50aWZpZXJcIiAoZWcuIFVuaXRJZClcbiAgICAgIC8vIDpUT0RPOiBUaGlzIG9uZSBwcm9iYWJseSBpc24ndCBzYWZlIGZvciByZWd1bGFyIElEIGZpZWxkIG1peGluZy5cbiAgICAgIC8vICAgICAgICBDdXN0b20gc2VyZGUgZGUvc2VyaWFsaXplciB3b3VsZCBtYWtlIGJpbmQgdGhpcyBoYW5kbGluZyB0byB0aGUgYXBwcm9wcmlhdGUgZmllbGRzIHdpdGhvdXQgZHVjay10eXBpbmcgaXNzdWVzLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ViamVjdFtwcm9wXSA9IHNlcmFsaXplU3RyaW5nSWQodmFsdWUgYXMgW0J1ZmZlciwgc3RyaW5nXSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZWN1cnNpdmVseSBjaGVjayBmb3IgRGF0ZSBzdHJpbmdzIGFuZCBjb252ZXJ0IHRvIEpTIGRhdGUgb2JqZWN0cyB1cG9uIHJlY2VpdmluZ1xuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5tYXRjaCAmJiB2YWx1ZS5tYXRjaChpc29EYXRlUmVnZXgpKSB7XG4gICAgICBzdWJqZWN0W3Byb3BdID0gcGFyc2UodmFsdWUsIExPTkdfREFURVRJTUVfRk9STUFUKVxuICAgICAgaWYgKHN1YmplY3RbcHJvcF0gPT09IG51bGwpIHtcbiAgICAgICAgc3ViamVjdFtwcm9wXSA9IHBhcnNlKHZhbHVlLCBTSE9SVF9EQVRFVElNRV9GT1JNQVQpXG4gICAgICB9XG4gICAgfVxuXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNoZWNrTGVhZGluZ0J5dGVzKG9mVmFyLCBhZ2FpbnN0KSB7XG4gIHJldHVybiBvZlZhclswXSA9PT0gYWdhaW5zdFswXSAmJlxuICAgIG9mVmFyWzFdID09PSBhZ2FpbnN0WzFdICYmXG4gICAgb2ZWYXJbMl0gPT09IGFnYWluc3RbMl1cbn1cblxuLyoqXG4gKiBFbmNvZGUgYXBwbGljYXRpb24gcnVudGltZSBkYXRhIGludG8gc2VyaWFsaXNhYmxlIGZvcm1hdCBmb3IgdHJhbnNtaXR0aW5nIHRvIEFQSSB3ZWJzb2NrZXQuXG4gKlxuICogQ2xvbmVzIGRhdGEgaW4gb3JkZXIgdG8ga2VlcCBpbnB1dCBkYXRhIHByaXN0aW5lLlxuICovXG5jb25zdCBlbmNvZGVGaWVsZHMgPSAoYXJnczogYW55KTogYW55ID0+IHtcbiAgaWYgKCFhcmdzKSByZXR1cm4gYXJnc1xuICBsZXQgcmVzID0gYXJnc1xuXG4gIC8vIGVuY29kZSBkYXRlcyBhcyBJU084NjAxIERhdGVUaW1lIHN0cmluZ3NcbiAgaWYgKGFyZ3MgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGZvcm1hdChhcmdzLCBMT05HX0RBVEVUSU1FX0ZPUk1BVClcbiAgfVxuXG4gIC8vIGRlc2VyaWFsaXNlIGFueSBpZGVudGlmaWVycyBiYWNrIHRvIHRoZWlyIGJpbmFyeSBmb3JtYXRcbiAgZWxzZSBpZiAoYXJncy5tYXRjaCAmJiBhcmdzLm1hdGNoKHNlcmlhbGl6ZWRIYXNoTWF0Y2hSZWdleCkpIHtcbiAgICByZXR1cm4gZGVzZXJpYWxpemVIYXNoKGFyZ3MpXG4gIH1cbiAgZWxzZSBpZiAoYXJncy5tYXRjaCAmJiBhcmdzLm1hdGNoKGlkTWF0Y2hSZWdleCkpIHtcbiAgICByZXR1cm4gZGVzZXJpYWxpemVJZChhcmdzKVxuICB9XG4gIGVsc2UgaWYgKGFyZ3MubWF0Y2ggJiYgYXJncy5tYXRjaChzdHJpbmdJZFJlZ2V4KSkge1xuICAgIHJldHVybiBkZXNlcmlhbGl6ZVN0cmluZ0lkKGFyZ3MpXG4gIH1cblxuICAvLyByZWN1cnNlIGludG8gY2hpbGQgZmllbGRzXG4gIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJncykpIHtcbiAgICByZXMgPSBbXVxuICAgIGFyZ3MuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgcmVzW2tleV0gPSBlbmNvZGVGaWVsZHModmFsdWUpXG4gICAgfSlcbiAgfSBlbHNlIGlmIChpc09iamVjdChhcmdzKSkge1xuICAgIHJlcyA9IHt9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXJncykge1xuICAgICAgcmVzW2tleV0gPSBlbmNvZGVGaWVsZHMoYXJnc1trZXldKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXNcbn1cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEhvbG9jaGFpbiBjZWxsIEFQSSBtZXRob2QgYmluZGluZyBBUElcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBleHBsaWNpdCB0eXBlLWxvc3MgYXQgdGhlIGJvdW5kYXJ5XG5leHBvcnQgdHlwZSBCb3VuZFpvbWVGbjxJbnB1dFR5cGUsIE91dHB1dFR5cGU+ID0gKGFyZ3M6IElucHV0VHlwZSkgPT4gT3V0cHV0VHlwZTtcblxuLyoqXG4gKiBIaWdoZXItb3JkZXIgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYXN5bmMgZnVuY3Rpb25zIGZvciBjYWxsaW5nIHpvbWUgUlBDIG1ldGhvZHNcbiAqL1xuY29uc3Qgem9tZUZ1bmN0aW9uID0gPElucHV0VHlwZSwgT3V0cHV0VHlwZT4oc29ja2V0VVJJOiBzdHJpbmcsIGNlbGxfaWQ6IENlbGxJZCwgem9tZV9uYW1lOiBzdHJpbmcsIGZuX25hbWU6IHN0cmluZywgc2tpcEVuY29kZURlY29kZT86IGJvb2xlYW4pOiBCb3VuZFpvbWVGbjxJbnB1dFR5cGUsIFByb21pc2U8T3V0cHV0VHlwZT4+ID0+IGFzeW5jIChhcmdzKTogUHJvbWlzZTxPdXRwdXRUeXBlPiA9PiB7XG4gIGNvbnN0IHsgY2FsbFpvbWUgfSA9IGF3YWl0IGdldENvbm5lY3Rpb24oc29ja2V0VVJJKVxuICBjb25zdCByZXMgPSBhd2FpdCBjYWxsWm9tZSh7XG4gICAgY2VsbF9pZCxcbiAgICB6b21lX25hbWUsXG4gICAgZm5fbmFtZSxcbiAgICBwcm92ZW5hbmNlOiBjZWxsX2lkWzFdLFxuICAgIHBheWxvYWQ6IHNraXBFbmNvZGVEZWNvZGUgPyBhcmdzIDogZW5jb2RlRmllbGRzKGFyZ3MpLFxuICB9LCA2MDAwMClcbiAgaWYgKCFza2lwRW5jb2RlRGVjb2RlKSBkZWNvZGVGaWVsZHMocmVzKVxuICByZXR1cm4gcmVzXG59XG5cbi8qKlxuICogRXh0ZXJuYWwgQVBJIGZvciBhY2Nlc3Npbmcgem9tZSBtZXRob2RzLCBwYXNzaW5nIHRoZW0gdGhyb3VnaCBhbiBvcHRpb25hbCBpbnRlcm1lZGlhcnkgRE5BIElEIG1hcHBpbmdcbiAqXG4gKiBAcGFyYW0gbWFwcGluZ3MgIEROQUlkTWFwcGluZ3MgdG8gdXNlIGZvciB0aGlzIGNvbGxhYm9yYXRpb24gc3BhY2UuXG4gKiAgICAgICAgICAgICAgICAgIGBpbnN0YW5jZWAgbXVzdCBiZSBwcmVzZW50IGluIHRoZSBtYXBwaW5nLCBhbmQgdGhlIG1hcHBlZCBDZWxsSWQgd2lsbCBiZSB1c2VkIGluc3RlYWQgb2YgYGluc3RhbmNlYCBpdHNlbGYuXG4gKiBAcGFyYW0gc29ja2V0VVJJIElmIHByb3ZpZGVkLCBjb25uZWN0cyB0byB0aGUgSG9sb2NoYWluIGNvbmR1Y3RvciBvbiBhIGRpZmZlcmVudCBVUkkuXG4gKlxuICogQHJldHVybiBib3VuZCBhc3luYyB6b21lIGZ1bmN0aW9uIHdoaWNoIGNhbiBiZSBjYWxsZWQgZGlyZWN0bHlcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcFpvbWVGbiA9IDxJbnB1dFR5cGUsIE91dHB1dFR5cGU+KG1hcHBpbmdzOiBETkFJZE1hcHBpbmdzLCBzb2NrZXRVUkk6IHN0cmluZywgaW5zdGFuY2U6IHN0cmluZywgem9tZTogc3RyaW5nLCBmbjogc3RyaW5nLCBza2lwRW5jb2RlRGVjb2RlPzogYm9vbGVhbikgPT5cbiAgem9tZUZ1bmN0aW9uPElucHV0VHlwZSwgT3V0cHV0VHlwZT4oc29ja2V0VVJJLCAobWFwcGluZ3MgJiYgbWFwcGluZ3NbaW5zdGFuY2VdKSwgem9tZSwgZm4sIHNraXBFbmNvZGVEZWNvZGUpXG5cblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RFZGdlcyA9IDxUPih3aXRoRWRnZXM6IHsgZWRnZXM6IHsgbm9kZTogVCB9W10gfSk6IFRbXSA9PiB7XG4gIGlmICghd2l0aEVkZ2VzLmVkZ2VzIHx8ICF3aXRoRWRnZXMuZWRnZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgcmV0dXJuIHdpdGhFZGdlcy5lZGdlcy5tYXAoKHsgbm9kZSB9KSA9PiBub2RlKVxufVxuIl19