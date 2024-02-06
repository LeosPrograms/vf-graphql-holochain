/**
 * Economic event mutations
 *
 * @package: HoloREA
 * @since:   2019-05-27
 */
import { DNAIdMappings } from '../types.js';
import { EconomicEventCreateParams, EconomicResourceCreateParams, EconomicEventUpdateParams, EconomicEventResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    event: EconomicEventCreateParams;
    newInventoriedResource?: EconomicResourceCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<EconomicEventResponse>;
export interface UpdateArgs {
    event: EconomicEventUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<EconomicEventResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createEconomicEvent: createHandler;
    updateEconomicEvent: updateHandler;
};
export default _default;
