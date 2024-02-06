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
import { AppSignalCb, AppWebsocket, AdminWebsocket, HoloHash } from '@holochain/client';
import { DNAIdMappings } from './types';
declare type RecordId = [HoloHash, HoloHash];
/**
 * If no `conductorUri` is provided or is otherwise empty or undefined,
 * a connection is attempted via the `REACT_APP_HC_CONN_URL` environment variable.
 * Only if running in a Holochain Launcher context, can both of the before-mentioned values
 * be left undefined or empty, and the websocket connection can still be established.
 */
export declare function autoConnect(conductorUri?: string, adminConductorUri?: string, appID?: string, traceAppSignals?: AppSignalCb): Promise<{
    conn: AppWebsocket;
    adminConn: AdminWebsocket | null;
    dnaConfig: DNAIdMappings;
    conductorUri: string;
    adminConductorUri: string;
    appId: string;
}>;
/**
 * Inits a connection for the given websocket URI.
 *
 * This method gives calling code an opportunity to register globals for all future
 * instances of a connection of the same `socketURI`. To ensure this is done reliably,
 * a runtime error will be thrown by `getConnection` if no `openConnection` has
 * been previously performed for the same `socketURI`.
 */
export declare const openConnection: (appSocketURI: string, traceAppSignals?: AppSignalCb | undefined) => Promise<AppWebsocket>;
/**
 * Introspect an active Holochain connection's app cells to determine cell IDs
 * for mapping to the schema resolvers.
 * If no `appId` is provided or is otherwise empty or undefined,
 * it will try to use the `REACT_APP_HC_APP_ID` environment variable.
 * Only if running in a Holochain Launcher context, can both of the before-mentioned values
 * be left undefined or empty, and the AppWebsocket will know which appId to introspect into.
 */
export declare function sniffHolochainAppCells(conn: AppWebsocket, appId?: string): Promise<{
    dnaConfig: DNAIdMappings;
    appId: string;
}>;
export declare function deserializeHash(hash: string): Uint8Array;
export declare function deserializeId(field: string): RecordId;
export declare function serializeHash(hash: Uint8Array): string;
export declare function remapCellId(originalId: any, newCellId: any): string;
export declare type BoundZomeFn<InputType, OutputType> = (args: InputType) => OutputType;
/**
 * External API for accessing zome methods, passing them through an optional intermediary DNA ID mapping
 *
 * @param mappings  DNAIdMappings to use for this collaboration space.
 *                  `instance` must be present in the mapping, and the mapped CellId will be used instead of `instance` itself.
 * @param socketURI If provided, connects to the Holochain conductor on a different URI.
 *
 * @return bound async zome function which can be called directly
 */
export declare const mapZomeFn: <InputType, OutputType>(mappings: DNAIdMappings, socketURI: string, instance: string, zome: string, fn: string, skipEncodeDecode?: boolean | undefined) => BoundZomeFn<InputType, Promise<OutputType>>;
export declare const extractEdges: <T>(withEdges: {
    edges: {
        node: T;
    }[];
}) => T[];
export {};
