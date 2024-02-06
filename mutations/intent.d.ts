/**
 * Intent mutations
 *
 * @package: HoloREA
 * @since:   2019-08-31
 */
import { DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { IntentCreateParams, IntentUpdateParams, IntentResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    intent: IntentCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<IntentResponse>;
export interface UpdateArgs {
    intent: IntentUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<IntentResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createIntent: createHandler;
    updateIntent: updateHandler;
    deleteIntent: deleteHandler;
};
export default _default;
