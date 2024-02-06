/**
 * Economic resource mutations
 *
 * @package: HoloREA
 * @since:   2019-10-31
 */

import { DNAIdMappings } from '../types.js'
import { mapZomeFn } from '../connection.js'

import {
  EconomicResourceUpdateParams,
  EconomicResourceResponse,
} from '@valueflows/vf-graphql'

export interface UpdateArgs {
  resource: EconomicResourceUpdateParams,
}
export type updateHandler = (root: any, args: UpdateArgs) => Promise<EconomicResourceResponse>

export default (dnaConfig: DNAIdMappings, conductorUri: string) => {
  const runUpdate = mapZomeFn<UpdateArgs, EconomicResourceResponse>(dnaConfig, conductorUri, 'observation', 'economic_resource', 'update_economic_resource')

  const updateEconomicResource: updateHandler = async (root, args) => {
    return runUpdate(args)
  }

  return {
    updateEconomicResource,
  }
}
