/**
 * Mutations for manipulating proposed intents
 *
 * @package: HoloREA
 * @since:   2019-09-12
 */
import { DNAIdMappings, IntentAddress, ProposalAddress } from '../types.js';
import { deleteHandler } from './';
import { ProposedIntentResponse } from '@valueflows/vf-graphql';
export interface CreateParams {
    proposedIntent: CreateRequest;
}
interface CreateRequest {
    publishedIn: ProposalAddress;
    publishes: IntentAddress;
    reciprocal: boolean;
}
export declare type createHandler = (root: any, args: CreateRequest) => Promise<ProposedIntentResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    proposeIntent: createHandler;
    deleteProposedIntent: deleteHandler;
};
export default _default;
