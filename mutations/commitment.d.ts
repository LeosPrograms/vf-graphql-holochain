/**
 * Commitment mutations
 *
 * @package: HoloREA
 * @since:   2019-08-28
 */
import { DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { CommitmentCreateParams, CommitmentUpdateParams, CommitmentResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    commitment: CommitmentCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<CommitmentResponse>;
export interface UpdateArgs {
    commitment: CommitmentUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<CommitmentResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createCommitment: createHandler;
    updateCommitment: updateHandler;
    deleteCommitment: deleteHandler;
};
export default _default;
