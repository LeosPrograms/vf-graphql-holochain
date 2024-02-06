/**
 * plan mutations
 *
 * @package: hREA
 * @since:   2022-05-23
 */
import { DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { PlanCreateParams, PlanUpdateParams, PlanResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    plan: PlanCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<PlanResponse>;
export interface UpdateArgs {
    plan: PlanUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<PlanResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createPlan: createHandler;
    updatePlan: updateHandler;
    deletePlan: deleteHandler;
};
export default _default;
