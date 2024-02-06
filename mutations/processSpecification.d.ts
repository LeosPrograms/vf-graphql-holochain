/**
 * Mutations for manipulating process specification
 *
 * @package: HoloREA
 * @since:   2019-09-12
 */
import { DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { ProcessSpecificationCreateParams, ProcessSpecificationUpdateParams, ProcessSpecificationResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    processSpecification: ProcessSpecificationCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<ProcessSpecificationResponse>;
export interface UpdateArgs {
    processSpecification: ProcessSpecificationUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<ProcessSpecificationResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createProcessSpecification: createHandler;
    updateProcessSpecification: updateHandler;
    deleteProcessSpecification: deleteHandler;
};
export default _default;
