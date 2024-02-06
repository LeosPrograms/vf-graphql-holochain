/**
 * agent mutations
 *
 * @package: hREA
 * @since:   2022-06-08
 */
import { AgentAddress, DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { AgentCreateParams, AgentUpdateParams, PersonResponse, OrganizationCreateParams, OrganizationUpdateParams, OrganizationResponse, AccountingScope } from '@valueflows/vf-graphql';
export interface AgentResponse {
    agent: AccountingScope;
}
export interface PersonCreateArgs {
    person: AgentCreateParams;
}
export declare type createPersonHandler = (root: any, args: PersonCreateArgs) => Promise<PersonResponse>;
export interface PersonUpdateArgs {
    person: AgentUpdateParams;
}
export declare type updatePersonHandler = (root: any, args: PersonUpdateArgs) => Promise<PersonResponse>;
export interface OrganizationCreateArgs {
    organization: OrganizationCreateParams;
}
export declare type createOrganizationHandler = (root: any, args: OrganizationCreateArgs) => Promise<OrganizationResponse>;
export interface OrganizationUpdateArgs {
    organization: OrganizationUpdateParams;
}
export declare type updateOrganizationHandler = (root: any, args: OrganizationUpdateArgs) => Promise<OrganizationResponse>;
export interface AgentCreateArgs {
    agent: OrganizationCreateParams & {
        agentType: string;
    };
}
export interface AgentUpdateArgs {
    agent: OrganizationUpdateParams;
}
export interface AssociateAgentParams {
    agentAddress: AgentAddress;
}
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    associateMyAgent: (root: any, args: {
        agentId: AgentAddress;
    }) => Promise<boolean>;
    createPerson: createPersonHandler;
    updatePerson: updatePersonHandler;
    deletePerson: deleteHandler;
    createOrganization: createOrganizationHandler;
    updateOrganization: updateOrganizationHandler;
    deleteOrganization: deleteHandler;
    createAgentRelationship: () => never;
    updateAgentRelationship: () => never;
    deleteAgentRelationship: () => never;
    createAgentRelationshipRole: () => never;
    updateAgentRelationshipRole: () => never;
    deleteAgentRelationshipRole: () => never;
};
export default _default;
