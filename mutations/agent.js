/**
 * agent mutations
 *
 * @package: hREA
 * @since:   2022-06-08
 */
import { mapZomeFn } from '../connection.js';
export default (dnaConfig, conductorUri) => {
    const runCreateAgent = mapZomeFn(dnaConfig, conductorUri, 'agent', 'agent', 'create_agent');
    const runAssociateMyAgent = mapZomeFn(dnaConfig, conductorUri, 'agent', 'agent', 'associate_my_agent');
    const runUpdateAgent = mapZomeFn(dnaConfig, conductorUri, 'agent', 'agent', 'update_agent');
    const runDeleteAgent = mapZomeFn(dnaConfig, conductorUri, 'agent', 'agent', 'delete_agent');
    const createPerson = async (root, args) => {
        const createAgentArgs = {
            agent: {
                ...args.person,
                agentType: 'Person',
            }
        };
        return (await runCreateAgent(createAgentArgs));
    };
    const associateMyAgent = async (root, args) => {
        return runAssociateMyAgent({ agentAddress: args.agentId });
    };
    const updatePerson = async (root, args) => {
        const updateAgentArgs = {
            agent: {
                ...args.person,
            }
        };
        return (await runUpdateAgent(updateAgentArgs));
    };
    const deletePerson = async (root, args) => {
        return runDeleteAgent(args);
    };
    const createOrganization = async (root, args) => {
        const createAgentArgs = {
            agent: {
                ...args.organization,
                agentType: 'Organization',
            }
        };
        return (await runCreateAgent(createAgentArgs));
    };
    const updateOrganization = async (root, args) => {
        const updateAgentArgs = {
            agent: {
                ...args.organization,
            }
        };
        return (await runUpdateAgent(updateAgentArgs));
    };
    const deleteOrganization = async (root, args) => {
        return runDeleteAgent(args);
    };
    const createAgentRelationship = () => {
        throw new Error('mutation unimplemented');
    };
    const updateAgentRelationship = () => {
        throw new Error('mutation unimplemented');
    };
    const deleteAgentRelationship = () => {
        throw new Error('mutation unimplemented');
    };
    const createAgentRelationshipRole = () => {
        throw new Error('mutation unimplemented');
    };
    const updateAgentRelationshipRole = () => {
        throw new Error('mutation unimplemented');
    };
    const deleteAgentRelationshipRole = () => {
        throw new Error('mutation unimplemented');
    };
    return {
        associateMyAgent,
        createPerson,
        updatePerson,
        deletePerson,
        createOrganization,
        updateOrganization,
        deleteOrganization,
        createAgentRelationship,
        updateAgentRelationship,
        deleteAgentRelationship,
        createAgentRelationshipRole,
        updateAgentRelationshipRole,
        deleteAgentRelationshipRole,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9tdXRhdGlvbnMvYWdlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFHSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFpRDVDLGVBQWUsQ0FBQyxTQUF3QixFQUFFLFlBQW9CLEVBQUUsRUFBRTtJQUNoRSxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQWlDLFNBQVMsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUMzSCxNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBZ0MsU0FBUyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUE7SUFDckksTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFpQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUE7SUFDM0gsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFzQixTQUFTLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUE7SUFFaEgsTUFBTSxZQUFZLEdBQXdCLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDN0QsTUFBTSxlQUFlLEdBQUc7WUFDcEIsS0FBSyxFQUFFO2dCQUNILEdBQUcsSUFBSSxDQUFDLE1BQU07Z0JBQ2QsU0FBUyxFQUFFLFFBQVE7YUFDdEI7U0FDSixDQUFBO1FBQ0QsT0FBTyxDQUFDLE1BQU0sY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFtQixDQUFBO0lBQ2xFLENBQUMsQ0FBQTtJQUVELE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxJQUErQixFQUFFLEVBQUU7UUFDdkUsT0FBTyxtQkFBbUIsQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtJQUM1RCxDQUFDLENBQUE7SUFFRCxNQUFNLFlBQVksR0FBd0IsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUM3RCxNQUFNLGVBQWUsR0FBb0I7WUFDckMsS0FBSyxFQUFFO2dCQUNILEdBQUcsSUFBSSxDQUFDLE1BQU07YUFDakI7U0FDSixDQUFBO1FBQ0QsT0FBTyxDQUFFLE1BQU0sY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFtQixDQUFBO0lBQ25FLENBQUMsQ0FBQTtJQUVELE1BQU0sWUFBWSxHQUFrQixLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3ZELE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdCLENBQUMsQ0FBQTtJQUVELE1BQU0sa0JBQWtCLEdBQThCLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDekUsTUFBTSxlQUFlLEdBQW9CO1lBQ3JDLEtBQUssRUFBRTtnQkFDSCxHQUFHLElBQUksQ0FBQyxZQUFZO2dCQUNwQixTQUFTLEVBQUUsY0FBYzthQUM1QjtTQUNKLENBQUE7UUFDRCxPQUFPLENBQUMsTUFBTSxjQUFjLENBQUMsZUFBZSxDQUFDLENBQXlCLENBQUE7SUFDeEUsQ0FBQyxDQUFBO0lBRUQsTUFBTSxrQkFBa0IsR0FBOEIsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN6RSxNQUFNLGVBQWUsR0FBb0I7WUFDckMsS0FBSyxFQUFFO2dCQUNILEdBQUcsSUFBSSxDQUFDLFlBQVk7YUFDdkI7U0FDSixDQUFBO1FBQ0QsT0FBTyxDQUFDLE1BQU0sY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUF5QixDQUFBO0lBQ3hFLENBQUMsQ0FBQTtJQUVELE1BQU0sa0JBQWtCLEdBQWtCLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDN0QsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0IsQ0FBQyxDQUFBO0lBRUQsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO0lBQzNDLENBQUMsQ0FBQTtJQUNELE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtJQUMzQyxDQUFDLENBQUE7SUFDRCxNQUFNLHVCQUF1QixHQUFHLEdBQUcsRUFBRTtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7SUFDM0MsQ0FBQyxDQUFBO0lBQ0QsTUFBTSwyQkFBMkIsR0FBRyxHQUFHLEVBQUU7UUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO0lBQzNDLENBQUMsQ0FBQTtJQUNELE1BQU0sMkJBQTJCLEdBQUcsR0FBRyxFQUFFO1FBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtJQUMzQyxDQUFDLENBQUE7SUFDRCxNQUFNLDJCQUEyQixHQUFHLEdBQUcsRUFBRTtRQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7SUFDM0MsQ0FBQyxDQUFBO0lBRUQsT0FBTztRQUNMLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixrQkFBa0I7UUFDbEIsa0JBQWtCO1FBQ2xCLGtCQUFrQjtRQUNsQix1QkFBdUI7UUFDdkIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2QiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDJCQUEyQjtLQUM1QixDQUFBO0FBQ0gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBhZ2VudCBtdXRhdGlvbnNcbiAqXG4gKiBAcGFja2FnZTogaFJFQVxuICogQHNpbmNlOiAgIDIwMjItMDYtMDhcbiAqL1xuXG5pbXBvcnQgeyBBZ2VudEFkZHJlc3MsIEJ5UmV2aXNpb24sIEROQUlkTWFwcGluZ3MgfSBmcm9tICcuLi90eXBlcy5qcydcbmltcG9ydCB7IG1hcFpvbWVGbiB9IGZyb20gJy4uL2Nvbm5lY3Rpb24uanMnXG5pbXBvcnQgeyBkZWxldGVIYW5kbGVyIH0gZnJvbSAnLi8nXG5cbmltcG9ydCB7XG4gIEFnZW50Q3JlYXRlUGFyYW1zLFxuICBBZ2VudFVwZGF0ZVBhcmFtcyxcbiAgUGVyc29uUmVzcG9uc2UsXG4gIE9yZ2FuaXphdGlvbkNyZWF0ZVBhcmFtcyxcbiAgT3JnYW5pemF0aW9uVXBkYXRlUGFyYW1zLFxuICBPcmdhbml6YXRpb25SZXNwb25zZSxcbiAgQWNjb3VudGluZ1Njb3BlLFxuICBQZXJzb24sXG59IGZyb20gJ0B2YWx1ZWZsb3dzL3ZmLWdyYXBocWwnXG5cbi8vIGV4cG9ydCB0eXBlIEFnZW50UmVzcG9uc2UgPSBPcmdhbml6YXRpb25SZXNwb25zZVxuZXhwb3J0IGludGVyZmFjZSBBZ2VudFJlc3BvbnNlIHtcbiAgICBhZ2VudDogQWNjb3VudGluZ1Njb3BlLFxufVxuZXhwb3J0IGludGVyZmFjZSBQZXJzb25DcmVhdGVBcmdzIHtcbiAgICBwZXJzb246IEFnZW50Q3JlYXRlUGFyYW1zLFxufVxuZXhwb3J0IHR5cGUgY3JlYXRlUGVyc29uSGFuZGxlciA9IChyb290OiBhbnksIGFyZ3M6IFBlcnNvbkNyZWF0ZUFyZ3MpID0+IFByb21pc2U8UGVyc29uUmVzcG9uc2U+XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGVyc29uVXBkYXRlQXJncyB7XG4gIHBlcnNvbjogQWdlbnRVcGRhdGVQYXJhbXMsXG59XG5leHBvcnQgdHlwZSB1cGRhdGVQZXJzb25IYW5kbGVyID0gKHJvb3Q6IGFueSwgYXJnczogUGVyc29uVXBkYXRlQXJncykgPT4gUHJvbWlzZTxQZXJzb25SZXNwb25zZT5cblxuZXhwb3J0IGludGVyZmFjZSBPcmdhbml6YXRpb25DcmVhdGVBcmdzIHtcbiAgICBvcmdhbml6YXRpb246IE9yZ2FuaXphdGlvbkNyZWF0ZVBhcmFtcyxcbn1cbmV4cG9ydCB0eXBlIGNyZWF0ZU9yZ2FuaXphdGlvbkhhbmRsZXIgPSAocm9vdDogYW55LCBhcmdzOiBPcmdhbml6YXRpb25DcmVhdGVBcmdzKSA9PiBQcm9taXNlPE9yZ2FuaXphdGlvblJlc3BvbnNlPlxuXG5leHBvcnQgaW50ZXJmYWNlIE9yZ2FuaXphdGlvblVwZGF0ZUFyZ3Mge1xuICBvcmdhbml6YXRpb246IE9yZ2FuaXphdGlvblVwZGF0ZVBhcmFtcyxcbn1cbmV4cG9ydCB0eXBlIHVwZGF0ZU9yZ2FuaXphdGlvbkhhbmRsZXIgPSAocm9vdDogYW55LCBhcmdzOiBPcmdhbml6YXRpb25VcGRhdGVBcmdzKSA9PiBQcm9taXNlPE9yZ2FuaXphdGlvblJlc3BvbnNlPlxuXG5leHBvcnQgaW50ZXJmYWNlIEFnZW50Q3JlYXRlQXJncyB7XG4gICAgYWdlbnQ6IE9yZ2FuaXphdGlvbkNyZWF0ZVBhcmFtcyAmIHsgYWdlbnRUeXBlOiBzdHJpbmcgfSxcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQWdlbnRVcGRhdGVBcmdzIHtcbiAgICBhZ2VudDogT3JnYW5pemF0aW9uVXBkYXRlUGFyYW1zLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFzc29jaWF0ZUFnZW50UGFyYW1zIHtcbiAgYWdlbnRBZGRyZXNzOiBBZ2VudEFkZHJlc3MsXG59XG5cbmV4cG9ydCBkZWZhdWx0IChkbmFDb25maWc6IEROQUlkTWFwcGluZ3MsIGNvbmR1Y3RvclVyaTogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHJ1bkNyZWF0ZUFnZW50ID0gbWFwWm9tZUZuPEFnZW50Q3JlYXRlQXJncywgQWdlbnRSZXNwb25zZT4oZG5hQ29uZmlnLCBjb25kdWN0b3JVcmksICdhZ2VudCcsICdhZ2VudCcsICdjcmVhdGVfYWdlbnQnKVxuICBjb25zdCBydW5Bc3NvY2lhdGVNeUFnZW50ID0gbWFwWm9tZUZuPEFzc29jaWF0ZUFnZW50UGFyYW1zLCBib29sZWFuPihkbmFDb25maWcsIGNvbmR1Y3RvclVyaSwgJ2FnZW50JywgJ2FnZW50JywgJ2Fzc29jaWF0ZV9teV9hZ2VudCcpXG4gIGNvbnN0IHJ1blVwZGF0ZUFnZW50ID0gbWFwWm9tZUZuPEFnZW50VXBkYXRlQXJncywgQWdlbnRSZXNwb25zZT4oZG5hQ29uZmlnLCBjb25kdWN0b3JVcmksICdhZ2VudCcsICdhZ2VudCcsICd1cGRhdGVfYWdlbnQnKVxuICBjb25zdCBydW5EZWxldGVBZ2VudCA9IG1hcFpvbWVGbjxCeVJldmlzaW9uLCBib29sZWFuPihkbmFDb25maWcsIGNvbmR1Y3RvclVyaSwgJ2FnZW50JywgJ2FnZW50JywgJ2RlbGV0ZV9hZ2VudCcpXG5cbiAgY29uc3QgY3JlYXRlUGVyc29uOiBjcmVhdGVQZXJzb25IYW5kbGVyID0gYXN5bmMgKHJvb3QsIGFyZ3MpID0+IHtcbiAgICBjb25zdCBjcmVhdGVBZ2VudEFyZ3MgPSB7XG4gICAgICAgIGFnZW50OiB7XG4gICAgICAgICAgICAuLi5hcmdzLnBlcnNvbixcbiAgICAgICAgICAgIGFnZW50VHlwZTogJ1BlcnNvbicsXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChhd2FpdCBydW5DcmVhdGVBZ2VudChjcmVhdGVBZ2VudEFyZ3MpKSBhcyBQZXJzb25SZXNwb25zZVxuICB9XG5cbiAgY29uc3QgYXNzb2NpYXRlTXlBZ2VudCA9IGFzeW5jIChyb290LCBhcmdzOiB7IGFnZW50SWQ6IEFnZW50QWRkcmVzcyB9KSA9PiB7XG4gICAgcmV0dXJuIHJ1bkFzc29jaWF0ZU15QWdlbnQoeyBhZ2VudEFkZHJlc3M6IGFyZ3MuYWdlbnRJZCB9KVxuICB9XG5cbiAgY29uc3QgdXBkYXRlUGVyc29uOiB1cGRhdGVQZXJzb25IYW5kbGVyID0gYXN5bmMgKHJvb3QsIGFyZ3MpID0+IHtcbiAgICBjb25zdCB1cGRhdGVBZ2VudEFyZ3M6IEFnZW50VXBkYXRlQXJncyA9IHtcbiAgICAgICAgYWdlbnQ6IHtcbiAgICAgICAgICAgIC4uLmFyZ3MucGVyc29uLFxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoIGF3YWl0IHJ1blVwZGF0ZUFnZW50KHVwZGF0ZUFnZW50QXJncykpIGFzIFBlcnNvblJlc3BvbnNlXG4gIH1cblxuICBjb25zdCBkZWxldGVQZXJzb246IGRlbGV0ZUhhbmRsZXIgPSBhc3luYyAocm9vdCwgYXJncykgPT4ge1xuICAgIHJldHVybiBydW5EZWxldGVBZ2VudChhcmdzKVxuICB9XG5cbiAgY29uc3QgY3JlYXRlT3JnYW5pemF0aW9uOiBjcmVhdGVPcmdhbml6YXRpb25IYW5kbGVyID0gYXN5bmMgKHJvb3QsIGFyZ3MpID0+IHtcbiAgICBjb25zdCBjcmVhdGVBZ2VudEFyZ3M6IEFnZW50Q3JlYXRlQXJncyA9IHtcbiAgICAgICAgYWdlbnQ6IHtcbiAgICAgICAgICAgIC4uLmFyZ3Mub3JnYW5pemF0aW9uLFxuICAgICAgICAgICAgYWdlbnRUeXBlOiAnT3JnYW5pemF0aW9uJyxcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKGF3YWl0IHJ1bkNyZWF0ZUFnZW50KGNyZWF0ZUFnZW50QXJncykpIGFzIE9yZ2FuaXphdGlvblJlc3BvbnNlXG4gIH1cblxuICBjb25zdCB1cGRhdGVPcmdhbml6YXRpb246IHVwZGF0ZU9yZ2FuaXphdGlvbkhhbmRsZXIgPSBhc3luYyAocm9vdCwgYXJncykgPT4ge1xuICAgIGNvbnN0IHVwZGF0ZUFnZW50QXJnczogQWdlbnRVcGRhdGVBcmdzID0ge1xuICAgICAgICBhZ2VudDoge1xuICAgICAgICAgICAgLi4uYXJncy5vcmdhbml6YXRpb24sXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChhd2FpdCBydW5VcGRhdGVBZ2VudCh1cGRhdGVBZ2VudEFyZ3MpKSBhcyBPcmdhbml6YXRpb25SZXNwb25zZVxuICB9XG5cbiAgY29uc3QgZGVsZXRlT3JnYW5pemF0aW9uOiBkZWxldGVIYW5kbGVyID0gYXN5bmMgKHJvb3QsIGFyZ3MpID0+IHtcbiAgICByZXR1cm4gcnVuRGVsZXRlQWdlbnQoYXJncylcbiAgfVxuXG4gIGNvbnN0IGNyZWF0ZUFnZW50UmVsYXRpb25zaGlwID0gKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcignbXV0YXRpb24gdW5pbXBsZW1lbnRlZCcpXG4gIH1cbiAgY29uc3QgdXBkYXRlQWdlbnRSZWxhdGlvbnNoaXAgPSAoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtdXRhdGlvbiB1bmltcGxlbWVudGVkJylcbiAgfVxuICBjb25zdCBkZWxldGVBZ2VudFJlbGF0aW9uc2hpcCA9ICgpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211dGF0aW9uIHVuaW1wbGVtZW50ZWQnKVxuICB9XG4gIGNvbnN0IGNyZWF0ZUFnZW50UmVsYXRpb25zaGlwUm9sZSA9ICgpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211dGF0aW9uIHVuaW1wbGVtZW50ZWQnKVxuICB9XG4gIGNvbnN0IHVwZGF0ZUFnZW50UmVsYXRpb25zaGlwUm9sZSA9ICgpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211dGF0aW9uIHVuaW1wbGVtZW50ZWQnKVxuICB9XG4gIGNvbnN0IGRlbGV0ZUFnZW50UmVsYXRpb25zaGlwUm9sZSA9ICgpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211dGF0aW9uIHVuaW1wbGVtZW50ZWQnKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhc3NvY2lhdGVNeUFnZW50LFxuICAgIGNyZWF0ZVBlcnNvbixcbiAgICB1cGRhdGVQZXJzb24sXG4gICAgZGVsZXRlUGVyc29uLFxuICAgIGNyZWF0ZU9yZ2FuaXphdGlvbixcbiAgICB1cGRhdGVPcmdhbml6YXRpb24sXG4gICAgZGVsZXRlT3JnYW5pemF0aW9uLFxuICAgIGNyZWF0ZUFnZW50UmVsYXRpb25zaGlwLFxuICAgIHVwZGF0ZUFnZW50UmVsYXRpb25zaGlwLFxuICAgIGRlbGV0ZUFnZW50UmVsYXRpb25zaGlwLFxuICAgIGNyZWF0ZUFnZW50UmVsYXRpb25zaGlwUm9sZSxcbiAgICB1cGRhdGVBZ2VudFJlbGF0aW9uc2hpcFJvbGUsXG4gICAgZGVsZXRlQWdlbnRSZWxhdGlvbnNoaXBSb2xlLFxuICB9XG59XG5cblxuIl19