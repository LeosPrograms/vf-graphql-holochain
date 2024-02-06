/**
 * HoloREA GraphQL schema interface
 *
 * A GraphQL schema (suitable for use with `apollo-link-schema`) which defines
 * bindings between the ValueFlows protocol and a Holochain backend.
 *
 * @package: HoloREA
 * @since:   2019-05-20
 */
import { ResolverOptions, ExtensionOptions, BindSchemaOptions, DEFAULT_VF_MODULES, DNAIdMappings, CellId, VfModule } from './types.js';
import generateResolvers from './resolvers/index.js';
import * as hreaExtensionSchemas from './schema-extensions.js';
import { mapZomeFn, autoConnect, openConnection, sniffHolochainAppCells, remapCellId } from './connection.js';
export { generateResolvers, hreaExtensionSchemas, autoConnect, openConnection, sniffHolochainAppCells, mapZomeFn, DNAIdMappings, CellId, BindSchemaOptions, ExtensionOptions, ResolverOptions, VfModule, DEFAULT_VF_MODULES, remapCellId, };
/**
 * Generates a schema ready to be plugged in to a GraphQL client
 *
 * @return GraphQLSchema
 */
declare const bindSchema: (options: BindSchemaOptions) => Promise<import("graphql").GraphQLSchema>;
export default bindSchema;
