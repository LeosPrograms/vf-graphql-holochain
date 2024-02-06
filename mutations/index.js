/**
 * Mutations manifest for HoloREA
 *
 * @package: HoloREA
 * @since:   2019-05-22
 */
import { DEFAULT_VF_MODULES, VfModule } from '../types.js';
import ResourceSpecification from './resourceSpecification.js';
import ProcessSpecification from './processSpecification.js';
import Unit from './unit.js';
import Process from './process.js';
import EconomicResource from './economicResource.js';
import EconomicEvent from './economicEvent.js';
import Commitment from './commitment.js';
import Fulfillment from './fulfillment.js';
import Intent from './intent.js';
import Satisfaction from './satisfaction.js';
import Proposal from './proposal.js';
import ProposedTo from './proposedTo.js';
import ProposedIntent from './proposedIntent.js';
import Agreement from './agreement.js';
import Plan from './plan.js';
import Agent from './agent.js';
import RecipeFlow from './recipeFlow.js';
import RecipeProcess from './recipeProcess.js';
export default (enabledVFModules = DEFAULT_VF_MODULES, dnaConfig, conductorUri) => {
    const hasAgent = -1 !== enabledVFModules.indexOf(VfModule.Agent);
    const hasMeasurement = -1 !== enabledVFModules.indexOf(VfModule.Measurement);
    const hasProcessSpecification = -1 !== enabledVFModules.indexOf(VfModule.ProcessSpecification);
    const hasResourceSpecification = -1 !== enabledVFModules.indexOf(VfModule.ResourceSpecification);
    const hasObservation = -1 !== enabledVFModules.indexOf(VfModule.Observation);
    const hasProcess = -1 !== enabledVFModules.indexOf(VfModule.Process);
    const hasFulfillment = -1 !== enabledVFModules.indexOf(VfModule.Fulfillment);
    const hasIntent = -1 !== enabledVFModules.indexOf(VfModule.Intent);
    const hasCommitment = -1 !== enabledVFModules.indexOf(VfModule.Commitment);
    const hasSatisfaction = -1 !== enabledVFModules.indexOf(VfModule.Satisfaction);
    const hasProposal = -1 !== enabledVFModules.indexOf(VfModule.Proposal);
    const hasAgreement = -1 !== enabledVFModules.indexOf(VfModule.Agreement);
    const hasPlan = -1 !== enabledVFModules.indexOf(VfModule.Plan);
    const hasRecipe = -1 !== enabledVFModules.indexOf(VfModule.Recipe);
    return Object.assign((hasMeasurement ? { ...Unit(dnaConfig, conductorUri) } : {}), (hasResourceSpecification ? {
        ...ResourceSpecification(dnaConfig, conductorUri),
    } : {}), (hasProcessSpecification ? {
        ...ProcessSpecification(dnaConfig, conductorUri),
    } : {}), (hasObservation ? {
        ...EconomicResource(dnaConfig, conductorUri),
        ...EconomicEvent(dnaConfig, conductorUri),
    } : {}), (hasProcess ? {
        ...Process(dnaConfig, conductorUri),
    } : {}), (hasCommitment ? {
        ...Commitment(dnaConfig, conductorUri),
    } : {}), (hasFulfillment ? {
        ...Fulfillment(dnaConfig, conductorUri),
    } : {}), (hasIntent ? {
        ...Intent(dnaConfig, conductorUri),
    } : {}), (hasSatisfaction ? {
        ...Satisfaction(dnaConfig, conductorUri),
    } : {}), (hasProposal ? {
        ...Proposal(dnaConfig, conductorUri),
        ...ProposedIntent(dnaConfig, conductorUri),
    } : {}), (hasProposal && hasAgent ? {
        ...ProposedTo(dnaConfig, conductorUri),
    } : {}), (hasAgreement ? { ...Agreement(dnaConfig, conductorUri) } : {}), (hasPlan ? { ...Plan(dnaConfig, conductorUri) } : {}), (hasAgent ? { ...Agent(dnaConfig, conductorUri) } : {}), (hasRecipe ? {
        ...RecipeFlow(dnaConfig, conductorUri),
        ...RecipeProcess(dnaConfig, conductorUri),
    } : {}));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9tdXRhdGlvbnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFFSCxPQUFPLEVBQWlCLGtCQUFrQixFQUFFLFFBQVEsRUFBYyxNQUFNLGFBQWEsQ0FBQTtBQUVyRixPQUFPLHFCQUFxQixNQUFNLDRCQUE0QixDQUFBO0FBQzlELE9BQU8sb0JBQW9CLE1BQU0sMkJBQTJCLENBQUE7QUFDNUQsT0FBTyxJQUFJLE1BQU0sV0FBVyxDQUFBO0FBQzVCLE9BQU8sT0FBTyxNQUFNLGNBQWMsQ0FBQTtBQUNsQyxPQUFPLGdCQUFnQixNQUFNLHVCQUF1QixDQUFBO0FBQ3BELE9BQU8sYUFBYSxNQUFNLG9CQUFvQixDQUFBO0FBQzlDLE9BQU8sVUFBVSxNQUFNLGlCQUFpQixDQUFBO0FBQ3hDLE9BQU8sV0FBVyxNQUFNLGtCQUFrQixDQUFBO0FBQzFDLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQTtBQUNoQyxPQUFPLFlBQVksTUFBTSxtQkFBbUIsQ0FBQTtBQUM1QyxPQUFPLFFBQVEsTUFBTSxlQUFlLENBQUE7QUFDcEMsT0FBTyxVQUFVLE1BQU0saUJBQWlCLENBQUE7QUFDeEMsT0FBTyxjQUFjLE1BQU0scUJBQXFCLENBQUE7QUFDaEQsT0FBTyxTQUFTLE1BQU0sZ0JBQWdCLENBQUE7QUFDdEMsT0FBTyxJQUFJLE1BQU0sV0FBVyxDQUFBO0FBQzVCLE9BQU8sS0FBSyxNQUFNLFlBQVksQ0FBQTtBQUM5QixPQUFPLFVBQVUsTUFBTSxpQkFBaUIsQ0FBQTtBQUN4QyxPQUFPLGFBQWEsTUFBTSxvQkFBb0IsQ0FBQTtBQUs5QyxlQUFlLENBQUMsbUJBQStCLGtCQUFrQixFQUFFLFNBQXdCLEVBQUUsWUFBb0IsRUFBRSxFQUFFO0lBQ25ILE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxD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RUFBRSxZQUFZLENBQUM7UUFDdEMsR0FBRyxhQUFhLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztLQUMxQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FDUixDQUFBO0FBQ0gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNdXRhdGlvbnMgbWFuaWZlc3QgZm9yIEhvbG9SRUFcbiAqXG4gKiBAcGFja2FnZTogSG9sb1JFQVxuICogQHNpbmNlOiAgIDIwMTktMDUtMjJcbiAqL1xuXG5pbXBvcnQgeyBETkFJZE1hcHBpbmdzLCBERUZBVUxUX1ZGX01PRFVMRVMsIFZmTW9kdWxlLCBCeVJldmlzaW9uIH0gZnJvbSAnLi4vdHlwZXMuanMnXG5cbmltcG9ydCBSZXNvdXJjZVNwZWNpZmljYXRpb24gZnJvbSAnLi9yZXNvdXJjZVNwZWNpZmljYXRpb24uanMnXG5pbXBvcnQgUHJvY2Vzc1NwZWNpZmljYXRpb24gZnJvbSAnLi9wcm9jZXNzU3BlY2lmaWNhdGlvbi5qcydcbmltcG9ydCBVbml0IGZyb20gJy4vdW5pdC5qcydcbmltcG9ydCBQcm9jZXNzIGZyb20gJy4vcHJvY2Vzcy5qcydcbmltcG9ydCBFY29ub21pY1Jlc291cmNlIGZyb20gJy4vZWNvbm9taWNSZXNvdXJjZS5qcydcbmltcG9ydCBFY29ub21pY0V2ZW50IGZyb20gJy4vZWNvbm9taWNFdmVudC5qcydcbmltcG9ydCBDb21taXRtZW50IGZyb20gJy4vY29tbWl0bWVudC5qcydcbmltcG9ydCBGdWxmaWxsbWVudCBmcm9tICcuL2Z1bGZpbGxtZW50LmpzJ1xuaW1wb3J0IEludGVudCBmcm9tICcuL2ludGVudC5qcydcbmltcG9ydCBTYXRpc2ZhY3Rpb24gZnJvbSAnLi9zYXRpc2ZhY3Rpb24uanMnXG5pbXBvcnQgUHJvcG9zYWwgZnJvbSAnLi9wcm9wb3NhbC5qcydcbmltcG9ydCBQcm9wb3NlZFRvIGZyb20gJy4vcHJvcG9zZWRUby5qcydcbmltcG9ydCBQcm9wb3NlZEludGVudCBmcm9tICcuL3Byb3Bvc2VkSW50ZW50LmpzJ1xuaW1wb3J0IEFncmVlbWVudCBmcm9tICcuL2FncmVlbWVudC5qcydcbmltcG9ydCBQbGFuIGZyb20gJy4vcGxhbi5qcydcbmltcG9ydCBBZ2VudCBmcm9tICcuL2FnZW50LmpzJ1xuaW1wb3J0IFJlY2lwZUZsb3cgZnJvbSAnLi9yZWNpcGVGbG93LmpzJ1xuaW1wb3J0IFJlY2lwZVByb2Nlc3MgZnJvbSAnLi9yZWNpcGVQcm9jZXNzLmpzJ1xuXG4vLyBnZW5lcmljIGRlbGV0aW9uIGNhbGxpbmcgZm9ybWF0IHVzZWQgYnkgYWxsIG11dGF0aW9uc1xuZXhwb3J0IHR5cGUgZGVsZXRlSGFuZGxlciA9IChyb290OiBhbnksIGFyZ3M6IEJ5UmV2aXNpb24pID0+IFByb21pc2U8Ym9vbGVhbj5cblxuZXhwb3J0IGRlZmF1bHQgKGVuYWJsZWRWRk1vZHVsZXM6IFZmTW9kdWxlW10gPSBERUZBVUxUX1ZGX01PRFVMRVMsIGRuYUNvbmZpZzogRE5BSWRNYXBwaW5ncywgY29uZHVjdG9yVXJpOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgaGFzQWdlbnQgPSAtMSAhPT0gZW5hYmxlZFZGTW9kdWxlcy5pbmRleE9mKFZmTW9kdWxlLkFnZW50KVxuICBjb25zdCBoYXNNZWFzdXJlbWVudCA9IC0xICE9PSBlbmFibGVkVkZNb2R1bGVzLmluZGV4T2YoVmZNb2R1bGUuTWVhc3VyZW1lbnQpXG4gIGNvbnN0IGhhc1Byb2Nlc3NTcGVjaWZpY2F0aW9uID0gLTEgIT09IGVuYWJsZWRWRk1vZHVsZXMuaW5kZXhPZihWZk1vZHVsZS5Qcm9jZXNzU3BlY2lmaWNhdGlvbilcbiAgY29uc3QgaGFzUmVzb3VyY2VTcGVjaWZpY2F0aW9uID0gLTEgIT09IGVuYWJsZWRWRk1vZHVsZXMuaW5kZXhPZihWZk1vZHVsZS5SZXNvdXJjZVNwZWNpZmljYXRpb24pXG4gIGNvbnN0IGhhc09ic2VydmF0aW9uID0gLTEgIT09IGVuYWJsZWRWRk1vZHVsZXMuaW5kZXhPZihWZk1vZHVsZS5PYnNlcnZhdGlvbilcbiAgY29uc3QgaGFzUHJvY2VzcyA9IC0xICE9PSBlbmFibGVkVkZNb2R1bGVzLmluZGV4T2YoVmZNb2R1bGUuUHJvY2VzcylcbiAgY29uc3QgaGFzRnVsZmlsbG1lbnQgPSAtMSAhPT0gZW5hYmxlZFZGTW9kdWxlcy5pbmRleE9mKFZmTW9kdWxlLkZ1bGZpbGxtZW50KVxuICBjb25zdCBoYXNJbnRlbnQgPSAtMSAhPT0gZW5hYmxlZFZGTW9kdWxlcy5pbmRleE9mKFZmTW9kdWxlLkludGVudClcbiAgY29uc3QgaGFzQ29tbWl0bWVudCA9IC0xICE9PSBlbmFibGVkVkZNb2R1bGVzLmluZGV4T2YoVmZNb2R1bGUuQ29tbWl0bWVudClcbiAgY29uc3QgaGFzU2F0aXNmYWN0aW9uID0gLTEgIT09IGVuYWJsZWRWRk1vZHVsZXMuaW5kZXhPZihWZk1vZHVsZS5TYXRpc2ZhY3Rpb24pXG4gIGNvbnN0IGhhc1Byb3Bvc2FsID0gLTEgIT09IGVuYWJsZWRWRk1vZHVsZXMuaW5kZXhPZihWZk1vZHVsZS5Qcm9wb3NhbClcbiAgY29uc3QgaGFzQWdyZWVtZW50ID0gLTEgIT09IGVuYWJsZWRWRk1vZHVsZXMuaW5kZXhPZihWZk1vZHVsZS5BZ3JlZW1lbnQpXG4gIGNvbnN0IGhhc1BsYW4gPSAtMSAhPT0gZW5hYmxlZFZGTW9kdWxlcy5pbmRleE9mKFZmTW9kdWxlLlBsYW4pXG4gIGNvbnN0IGhhc1JlY2lwZSA9IC0xICE9PSBlbmFibGVkVkZNb2R1bGVzLmluZGV4T2YoVmZNb2R1bGUuUmVjaXBlKVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgIChoYXNNZWFzdXJlbWVudCA/IHsgLi4uVW5pdChkbmFDb25maWcsIGNvbmR1Y3RvclVyaSkgfSA6IHt9KSxcbiAgICAoaGFzUmVzb3VyY2VTcGVjaWZpY2F0aW9uID8ge1xuICAgICAgLi4uUmVzb3VyY2VTcGVjaWZpY2F0aW9uKGRuYUNvbmZpZywgY29uZHVjdG9yVXJpKSxcbiAgICB9IDoge30pLFxuICAgIChoYXNQcm9jZXNzU3BlY2lmaWNhdGlvbiA/IHtcbiAgICAgIC4uLlByb2Nlc3NTcGVjaWZpY2F0aW9uKGRuYUNvbmZpZywgY29uZHVjdG9yVXJpKSxcbiAgICB9IDoge30pLFxuICAgIChoYXNPYnNlcnZhdGlvbiA/IHtcbiAgICAgIC4uLkVjb25vbWljUmVzb3VyY2UoZG5hQ29uZmlnLCBjb25kdWN0b3JVcmkpLFxuICAgICAgLi4uRWNvbm9taWNFdmVudChkbmFDb25maWcsIGNvbmR1Y3RvclVyaSksXG4gICAgfSA6IHt9KSxcbiAgICAoaGFzUHJvY2VzcyA/IHtcbiAgICAgIC4uLlByb2Nlc3MoZG5hQ29uZmlnLCBjb25kdWN0b3JVcmkpLFxuICAgIH0gOiB7fSksXG4gICAgKGhhc0NvbW1pdG1lbnQgPyB7XG4gICAgICAuLi5Db21taXRtZW50KGRuYUNvbmZpZywgY29uZHVjdG9yVXJpKSxcbiAgICB9IDoge30pLFxuICAgIChoYXNGdWxmaWxsbWVudCA/IHtcbiAgICAgIC4uLkZ1bGZpbGxtZW50KGRuYUNvbmZpZywgY29uZHVjdG9yVXJpKSxcbiAgICB9IDoge30pLFxuICAgIChoYXNJbnRlbnQgPyB7XG4gICAgICAuLi5JbnRlbnQoZG5hQ29uZmlnLCBjb25kdWN0b3JVcmkpLFxuICAgIH0gOiB7fSksXG4gICAgKGhhc1NhdGlzZmFjdGlvbiA/IHtcbiAgICAgIC4uLlNhdGlzZmFjdGlvbihkbmFDb25maWcsIGNvbmR1Y3RvclVyaSksXG4gICAgfSA6IHt9KSxcbiAgICAoaGFzUHJvcG9zYWwgPyB7XG4gICAgICAuLi5Qcm9wb3NhbChkbmFDb25maWcsIGNvbmR1Y3RvclVyaSksXG4gICAgICAuLi5Qcm9wb3NlZEludGVudChkbmFDb25maWcsIGNvbmR1Y3RvclVyaSksXG4gICAgfSA6IHt9KSxcbiAgICAoaGFzUHJvcG9zYWwgJiYgaGFzQWdlbnQgPyB7XG4gICAgICAuLi5Qcm9wb3NlZFRvKGRuYUNvbmZpZywgY29uZHVjdG9yVXJpKSxcbiAgICB9IDoge30pLFxuICAgIChoYXNBZ3JlZW1lbnQgPyB7IC4uLkFncmVlbWVudChkbmFDb25maWcsIGNvbmR1Y3RvclVyaSkgfSA6IHt9KSxcbiAgICAoaGFzUGxhbiA/IHsgLi4uUGxhbihkbmFDb25maWcsIGNvbmR1Y3RvclVyaSkgfSA6IHt9KSxcbiAgICAoaGFzQWdlbnQgPyB7IC4uLkFnZW50KGRuYUNvbmZpZywgY29uZHVjdG9yVXJpKSB9IDoge30pLFxuICAgIChoYXNSZWNpcGUgPyB7IFxuICAgICAgLi4uUmVjaXBlRmxvdyhkbmFDb25maWcsIGNvbmR1Y3RvclVyaSksIFxuICAgICAgLi4uUmVjaXBlUHJvY2VzcyhkbmFDb25maWcsIGNvbmR1Y3RvclVyaSksXG4gICAgfSA6IHt9KSxcbiAgKVxufVxuIl19