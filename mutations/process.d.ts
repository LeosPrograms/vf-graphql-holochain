/**
 * Mutations for manipulating processes
 *
 * @package: HoloREA
 * @since:   2019-09-12
 */
import { DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { ProcessCreateParams, ProcessUpdateParams, ProcessResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    process: ProcessCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<ProcessResponse>;
export interface UpdateArgs {
    process: ProcessUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<ProcessResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createProcess: createHandler;
    updateProcess: updateHandler;
    deleteProcess: deleteHandler;
};
export default _default;
