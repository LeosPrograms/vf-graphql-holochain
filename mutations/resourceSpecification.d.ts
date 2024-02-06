/**
 * Mutations for manipulating resource specification
 *
 * @package: HoloREA
 * @since:   2019-09-12
 */
import { DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { ResourceSpecificationCreateParams, ResourceSpecificationUpdateParams, ResourceSpecificationResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    resourceSpecification: ResourceSpecificationCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<ResourceSpecificationResponse>;
export interface UpdateArgs {
    resourceSpecification: ResourceSpecificationUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<ResourceSpecificationResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createResourceSpecification: createHandler;
    updateResourceSpecification: updateHandler;
    deleteResourceSpecification: deleteHandler;
};
export default _default;
