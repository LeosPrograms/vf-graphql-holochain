/**
 * Mutations for manipulating proposals
 *
 * @package: HoloREA
 * @since:   2019-09-12
 */
import { DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { ProposalCreateParams, ProposalUpdateParams, ProposalResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    proposal: ProposalCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<ProposalResponse>;
export interface UpdateArgs {
    proposal: ProposalUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<ProposalResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createProposal: createHandler;
    updateProposal: updateHandler;
    deleteProposal: deleteHandler;
};
export default _default;
