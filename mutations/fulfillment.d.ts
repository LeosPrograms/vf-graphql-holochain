/**
 * Fulfillment mutations
 *
 * @package: HoloREA
 * @since:   2019-08-28
 */
import { DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { FulfillmentCreateParams, FulfillmentUpdateParams, FulfillmentResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    fulfillment: FulfillmentCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<FulfillmentResponse>;
export interface UpdateArgs {
    fulfillment: FulfillmentUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<FulfillmentResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createFulfillment: createHandler;
    updateFulfillment: updateHandler;
    deleteFulfillment: deleteHandler;
};
export default _default;
