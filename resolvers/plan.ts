/**
 * Resolvers for Plan fields
 *
 * @package: HoloREA
 * @since:   2019-08-27
 */

import { DNAIdMappings, DEFAULT_VF_MODULES, VfModule, AgentAddress, ByRevision, AddressableIdentifier } from '../types.js'
import { extractEdges, mapZomeFn } from '../connection.js'

import {
  Process,
  PlanProcessFilterParams,
  Plan,
  PlanResponse,
  Commitment,
  ProcessConnection,
  CommitmentConnection,
  AccountingScope
} from '@valueflows/vf-graphql'
import { CommitmentSearchInput, ProcessSearchInput } from './zomeSearchInputTypes.js'
import agentQueries from '../queries/agent.js'


export default (enabledVFModules: VfModule[] = DEFAULT_VF_MODULES, dnaConfig: DNAIdMappings, conductorUri: string) => {
  const hasHistory = -1 !== enabledVFModules.indexOf(VfModule.History)
  const hasProcess = -1 !== enabledVFModules.indexOf(VfModule.Process)
  const hasCommitment = -1 !== enabledVFModules.indexOf(VfModule.Commitment)
  const hasAgent = -1 !== enabledVFModules.indexOf(VfModule.Agent)

  const readRevision = mapZomeFn<ByRevision, PlanResponse>(dnaConfig, conductorUri, 'plan', 'plan', 'get_revision')
  const readProcesses = mapZomeFn<ProcessSearchInput, ProcessConnection>(dnaConfig, conductorUri, 'observation', 'process_index', 'query_processes')
  const queryCommitments = mapZomeFn<CommitmentSearchInput, CommitmentConnection>(dnaConfig, conductorUri, 'planning', 'commitment_index', 'query_commitments')
  const readAgent = agentQueries(dnaConfig, conductorUri)['agent']

  return Object.assign(
    (hasProcess ? {
      processes: async (record: Plan): Promise<Process[]> => {
        const processes = await readProcesses({ params: { plannedWithin: record.id } })
        return extractEdges(processes)
      },
    } : {}),
    (hasCommitment ? {
      independentDemands: async (record: Plan): Promise<Commitment[]> => {
        const commitments = await queryCommitments({ params: { independentDemandOf: record.id } })
        return extractEdges(commitments)
      },
      nonProcessCommitments: async (record: Plan): Promise<Commitment[]> => {
        const commitments = await queryCommitments({ params: { plannedWithin: record.id } })
        return extractEdges(commitments)
      },
    } : {}),
    (hasAgent ? {
      involvedAgents: () => {
        throw new Error('resolver unimplemented')
      },
      inScopeOf: async (record: { inScopeOf: AgentAddress[] }): Promise<AccountingScope[]> => {
        return (await Promise.all((record.inScopeOf || []).map((address)=>readAgent(record, {address}))))
      },
    } : {}),
    (hasHistory ? {
      revision: async (record: Plan, args: { revisionId: AddressableIdentifier }): Promise<Plan> => {
        return (await readRevision(args)).plan
      },
    } : {}),
  )
}

