/**
 * Satisfaction mutations
 *
 * @package: HoloREA
 * @since:   2019-08-31
 */
import { DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { SatisfactionCreateParams, SatisfactionUpdateParams, SatisfactionResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    satisfaction: SatisfactionCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<SatisfactionResponse>;
export interface UpdateArgs {
    satisfaction: SatisfactionUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<SatisfactionResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createSatisfaction: createHandler;
    updateSatisfaction: updateHandler;
    deleteSatisfaction: deleteHandler;
};
export default _default;
