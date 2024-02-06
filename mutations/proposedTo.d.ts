/**
 * Mutations for manipulating proposed to
 *
 * @package: HoloREA
 * @since:   2019-09-12
 */
import { AgentAddress, DNAIdMappings, ProposalAddress } from '../types.js';
import { deleteHandler } from './';
import { ProposedToResponse } from '@valueflows/vf-graphql';
export interface CreateParams {
    proposedTo: CreateRequest;
}
interface CreateRequest {
    proposed: ProposalAddress;
    proposedTo: AgentAddress;
}
export declare type createHandler = (root: any, args: CreateRequest) => Promise<ProposedToResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    proposeTo: createHandler;
    deleteProposedTo: deleteHandler;
};
export default _default;
