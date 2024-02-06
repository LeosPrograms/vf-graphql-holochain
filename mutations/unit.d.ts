/**
 * Mutations for manipulating unit
 *
 * @package: HoloREA
 * @since:   2019-09-12
 */
import { DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { UnitCreateParams, UnitUpdateParams, UnitResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    unit: UnitCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<UnitResponse>;
export interface UpdateArgs {
    unit: UnitUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<UnitResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createUnit: createHandler;
    updateUnit: updateHandler;
    deleteUnit: deleteHandler;
};
export default _default;
