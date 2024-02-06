/**
 * Top-level queries relating to Proposal
 *
 * @package: HoloREA
 * @since:   2019-09-12
 */

import { DNAIdMappings, ReadParams } from '../types.js'
import { mapZomeFn } from '../connection.js'
import {
  Proposal,
  ProposedTo,
  ProposedIntent,
  ProposalResponse,
  ProposalConnection,
} from '@valueflows/vf-graphql'
import { PagingParams } from '../resolvers/zomeSearchInputTypes.js'


export default (dnaConfig: DNAIdMappings, conductorUri: string) => {
  const readOne = mapZomeFn<ReadParams, ProposalResponse>(dnaConfig, conductorUri, 'proposal', 'proposal', 'get_proposal')
  const readAll = mapZomeFn<PagingParams, ProposalConnection>(dnaConfig, conductorUri, 'proposal', 'proposal_index', 'read_all_proposals')

  return {
    proposal: async (root, args): Promise<Proposal> => {
      return (await readOne({ address: args.id })).proposal
    },
    proposals: async (root, args: PagingParams): Promise<ProposalConnection> => {
      return await readAll(args)
    },
    requests: async (root, args): Promise<Proposal> => {
      throw new Error('query unimplemented')
    },
    offers: async (root, args): Promise<Proposal> => {
      throw new Error('query unimplemented')
    },
  }
}
