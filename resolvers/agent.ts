/**
 * Resolvers for agent fields
 *
 * @package: hREA
 * @since:   2020-05-28
 */

import {
  Process,
  PlanProcessFilterParams,
  Plan,
  Commitment,
  ProcessConnection,
  CommitmentConnection,
  Agent,
  PersonResponse, OrganizationResponse,
  IntentConnection,
  EconomicEventConnection,
  EconomicResourceConnection,
  PlanConnection,
  ProposalConnection,
  AgentRelationshipConnection,
  AgentRelationshipRole
} from '@valueflows/vf-graphql'
import { extractEdges, mapZomeFn } from '../connection.js'
import { DNAIdMappings, DEFAULT_VF_MODULES, VfModule, ByRevision, AddressableIdentifier } from '../types.js'
import { CommitmentSearchInput, EconomicEventSearchInput, EconomicResourceSearchInput, IntentSearchInput, PlanSearchInput, ProcessSearchInput, ProposalSearchInput } from './zomeSearchInputTypes.js'


export default (enabledVFModules: VfModule[] = DEFAULT_VF_MODULES, dnaConfig: DNAIdMappings, conductorUri: string) => {
  const hasHistory = -1 !== enabledVFModules.indexOf(VfModule.History)
  const hasProcess = -1 !== enabledVFModules.indexOf(VfModule.Process)
  const hasCommitment = -1 !== enabledVFModules.indexOf(VfModule.Commitment)
  const hasIntent = -1 !== enabledVFModules.indexOf(VfModule.Intent)
  const hasObservation = -1 !== enabledVFModules.indexOf(VfModule.Observation)
  const hasPlan = -1 !== enabledVFModules.indexOf(VfModule.Plan)
  const hasProposal = -1 !== enabledVFModules.indexOf(VfModule.Proposal)

  const readRevision = mapZomeFn<ByRevision, PersonResponse | OrganizationResponse>(dnaConfig, conductorUri, 'agent', 'agent', 'get_revision')
  const readProcesses = mapZomeFn<ProcessSearchInput, ProcessConnection>(dnaConfig, conductorUri, 'observation', 'process_index', 'query_processes')
  const queryCommitments = mapZomeFn<CommitmentSearchInput, CommitmentConnection>(dnaConfig, conductorUri, 'planning', 'commitment_index', 'query_commitments')
  const queryIntents = mapZomeFn<IntentSearchInput, IntentConnection>(dnaConfig, conductorUri, 'planning', 'intent_index', 'query_intents')
  const queryEconomicEvents = mapZomeFn<EconomicEventSearchInput, EconomicEventConnection>(dnaConfig, conductorUri, 'observation', 'economic_event_index', 'query_economic_events')
  const queryEconomicResources = mapZomeFn<EconomicResourceSearchInput, EconomicResourceConnection>(dnaConfig, conductorUri, 'observation', 'economic_resource_index', 'query_economic_resources')
  const queryPlans = mapZomeFn<PlanSearchInput, PlanConnection>(dnaConfig, conductorUri, 'plan', 'plan_index', 'query_plans')
  const queryProposals = mapZomeFn<ProposalSearchInput, ProposalConnection>(dnaConfig, conductorUri, 'plan', 'plan_index', 'query_plans')

  return Object.assign(
    { __resolveType: (obj, ctx, info) => obj.__typename },
    {
      relationships: async (record: Agent): Promise<AgentRelationshipConnection> => {
        throw new Error('resolver unimplemented')
      },
      relationshipsAsSubject: async (record: Agent): Promise<AgentRelationshipConnection> => {
        throw new Error('resolver unimplemented')
      },
      relationshipsAsObject: async (record: Agent): Promise<AgentRelationshipConnection> => {
        throw new Error('resolver unimplemented')
      },
      roles: async (record: Agent): Promise<AgentRelationshipRole[]> => {
        throw new Error('resolver unimplemented')
      },
    },
    (hasProcess ? {
      processes: async (record: Agent): Promise<ProcessConnection> => {
        // const results = await readProcesses({ params: { inScopeOf: record.id } })
        // return results
        throw new Error('resolver unimplemented')
      },
    } : {}),
    (hasCommitment ? {
      commitments: async (record: Agent): Promise<CommitmentConnection> => {
        // const commitments = await queryCommitments({ params: { inScopeOf: record.id } })
        // return commitments
        throw new Error('resolver unimplemented')
      },
      commitmentsInScope: async (record: Agent): Promise<CommitmentConnection> => {
        throw new Error('resolver unimplemented')
      },
      commitmentsAsProvider: async (record: Agent): Promise<CommitmentConnection> => {
        return await queryCommitments({ params: { provider: record.id } })
      },
      commitmentsAsReceiver: async (record: Agent): Promise<CommitmentConnection> => {
        return await queryCommitments({ params: { receiver: record.id } })
      },
    } : {}),
    (hasIntent ? {
      intents: async (record: Agent): Promise<IntentConnection> => {
        // const intents = await queryIntents({ params: { inScopeOf: record.id } })
        // return intents
        throw new Error('resolver unimplemented')
      },
      intentsAsProvider: async (record: Agent): Promise<IntentConnection> => {
        return await queryIntents({ params: { provider: record.id } })
      },
      intentsAsReceiver: async (record: Agent): Promise<IntentConnection> => {
        return await queryIntents({ params: { receiver: record.id } })
      },
    } : {}),
    (hasObservation ? {
      economicEvents: async (record: Agent): Promise<EconomicEventConnection> => {
        // const economicEvents = await queryEconomicEvents({ params: { inScopeOf: record.id } })
        // return economicEvents
        throw new Error('resolver unimplemented')
      },
      economicEventsInScope: async (record: Agent): Promise<EconomicEventConnection> => {
        throw new Error('resolver unimplemented')
      },
      inventoriedEconomicResources: async (record: Agent): Promise<EconomicResourceConnection> => {
        const economicResources = await queryEconomicResources({ params: { primaryAccountable: record.id } })
        return economicResources
      },
      economicEventsAsProvider: async (record: Agent): Promise<EconomicEventConnection> => {
        return await queryEconomicEvents({ params: { provider: record.id } })
      },
      economicEventsAsReceiver: async (record: Agent): Promise<EconomicEventConnection> => {
        return await queryEconomicEvents({ params: { receiver: record.id } })
      },
    } : {}),
    (hasPlan ? {
      plans: async (record: Agent): Promise<PlanConnection> => {
        // const plans = await queryPlans({ params: { inScopeOf: record.id } })
        // return plans
        throw new Error('resolver unimplemented')
      },
    } : {}),
    (hasProposal ? {
      proposals: async (record: Agent): Promise<ProposalConnection> => {
        // const proposals = await queryProposals({ params: { inScopeOf: record.id } })
        // return proposals
        throw new Error('resolver unimplemented')
      },
      proposalsInScope: async (record: Agent): Promise<ProposalConnection> => {
        throw new Error('resolver unimplemented')
      },
      proposalsTo: async (record: Agent): Promise<ProposalConnection> => {
        throw new Error('resolver unimplemented')
      },
    } : {}),
    (hasHistory ? {
      revision: async (record: Agent, args: { revisionId: AddressableIdentifier }): Promise<Agent> => {
        return (await readRevision(args)).agent
      },
    } : {}),
  )
}

