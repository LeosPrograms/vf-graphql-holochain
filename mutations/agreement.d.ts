/**
 * Agreement CRUD operations
 *
 * @package: hREA
 * @since:   2020-06-19
 */
import { DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { AgreementCreateParams, AgreementUpdateParams, AgreementResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    agreement: AgreementCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<AgreementResponse>;
export interface UpdateArgs {
    agreement: AgreementUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<AgreementResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createAgreement: createHandler;
    updateAgreement: updateHandler;
    deleteAgreement: deleteHandler;
};
export default _default;
