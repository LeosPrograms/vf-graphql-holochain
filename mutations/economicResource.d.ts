/**
 * Economic resource mutations
 *
 * @package: HoloREA
 * @since:   2019-10-31
 */
import { DNAIdMappings } from '../types.js';
import { EconomicResourceUpdateParams, EconomicResourceResponse } from '@valueflows/vf-graphql';
export interface UpdateArgs {
    resource: EconomicResourceUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<EconomicResourceResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    updateEconomicResource: updateHandler;
};
export default _default;
