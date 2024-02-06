/**
 * base types for GraphQL query layer
 *
 * @package: HoloREA
 * @since:   2019-05-20
 */
import { AppSignalCb, CellId } from '@holochain/client';
import { IResolvers } from '@graphql-tools/utils';
import { GraphQLScalarType } from 'graphql';
import Big from 'big.js';
export interface DNAIdMappings {
    agent?: CellId;
    agreement?: CellId;
    observation?: CellId;
    planning?: CellId;
    proposal?: CellId;
    specification?: CellId;
}
export { CellId };
export interface ResolverOptions {
    enabledVFModules: VfModule[];
    dnaConfig: DNAIdMappings;
    conductorUri: string;
    adminConductorUri: string;
    appId: string;
    traceAppSignals?: AppSignalCb;
}
export interface ExtensionOptions {
    extensionSchemas?: string[];
    extensionResolvers?: IResolvers;
}
export declare type BindSchemaOptions = Pick<ResolverOptions, 'dnaConfig' | 'conductorUri' | 'adminConductorUri' | 'appId' | 'traceAppSignals'> & {
    enabledVFModules?: VfModule[];
} & ExtensionOptions;
export interface ReadParams {
    address: AddressableIdentifier;
}
export interface ById {
    id: AddressableIdentifier;
}
export interface ByRevision {
    revisionId: AddressableIdentifier;
}
export declare type AddressableIdentifier = string;
export declare type CommitmentAddress = AddressableIdentifier;
export declare type ProcessAddress = AddressableIdentifier;
export declare type FulfillmentAddress = AddressableIdentifier;
export declare type SatisfactionAddress = AddressableIdentifier;
export declare type AgreementAddress = AddressableIdentifier;
export declare type PlanAddress = AddressableIdentifier;
export declare type ProposalAddress = AddressableIdentifier;
export declare type IntentAddress = AddressableIdentifier;
export declare type AgentAddress = AddressableIdentifier;
export declare type EconomicResourceAddress = AddressableIdentifier;
export declare type EconomicEventAddress = AddressableIdentifier;
export declare type ResourceSpecificationAddress = AddressableIdentifier;
export declare type ProposedIntentAddress = AddressableIdentifier;
export declare type ProcessSpecificationAddress = AddressableIdentifier;
export declare type RecipeProcessAddress = AddressableIdentifier;
export interface ByRevision {
    revisionId: string;
}
declare type ObjDecorator<T> = (obj: T) => T;
declare type Resolver<T> = (root: any, args: any) => Promise<T>;
export declare function addTypename<T>(name: string): ObjDecorator<T>;
export declare function injectTypename<T>(name: string, fn: Resolver<T>): Resolver<T>;
export declare enum VfModule {
    Util = "util",
    Pagination = "pagination",
    History = "history",
    Agent = "agent",
    Agreement = "agreement",
    Action = "action",
    ProcessSpecification = "process_specification",
    ResourceSpecification = "resource_specification",
    Measurement = "measurement",
    Observation = "observation",
    Process = "process",
    Plan = "plan",
    Fulfillment = "fulfillment",
    Intent = "intent",
    Commitment = "commitment",
    Satisfaction = "satisfaction",
    Proposal = "proposal",
    Recipe = "recipe"
}
export declare const DEFAULT_VF_MODULES: VfModule[];
export declare const URI: GraphQLScalarType<unknown, unknown>;
export declare const Decimal: GraphQLScalarType<Big, number>;
