/**
 * Mutations for manipulating proposals
 *
 * @package: HoloREA
 * @since:   2019-09-12
 */
import { mapZomeFn } from '../connection.js';
export default (dnaConfig, conductorUri) => {
    const runCreate = mapZomeFn(dnaConfig, conductorUri, 'proposal', 'proposal', 'create_proposal');
    const runUpdate = mapZomeFn(dnaConfig, conductorUri, 'proposal', 'proposal', 'update_proposal');
    const runDelete = mapZomeFn(dnaConfig, conductorUri, 'proposal', 'proposal', 'delete_proposal');
    const createProposal = async (root, args) => {
        return runCreate(args);
    };
    const updateProposal = async (root, args) => {
        return runUpdate(args);
    };
    const deleteProposal = async (root, args) => {
        return runDelete(args);
    };
    return {
        createProposal,
        updateProposal,
        deleteProposal,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcG9zYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9tdXRhdGlvbnMvcHJvcG9zYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFHSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFtQjVDLGVBQWUsQ0FBQyxTQUF3QixFQUFFLFlBQW9CLEVBQUUsRUFBRTtJQUNoRSxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQStCLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO0lBQzdILE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBK0IsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQUE7SUFDN0gsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFzQixTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtJQUVwSCxNQUFNLGNBQWMsR0FBa0IsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN6RCxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QixDQUFDLENBQUE7SUFFRCxNQUFNLGNBQWMsR0FBa0IsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN6RCxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QixDQUFDLENBQUE7SUFFRCxNQUFNLGNBQWMsR0FBa0IsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN6RCxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QixDQUFDLENBQUE7SUFFRCxPQUFPO1FBQ0wsY0FBYztRQUNkLGNBQWM7UUFDZCxjQUFjO0tBQ2YsQ0FBQTtBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTXV0YXRpb25zIGZvciBtYW5pcHVsYXRpbmcgcHJvcG9zYWxzXG4gKlxuICogQHBhY2thZ2U6IEhvbG9SRUFcbiAqIEBzaW5jZTogICAyMDE5LTA5LTEyXG4gKi9cblxuaW1wb3J0IHsgQnlSZXZpc2lvbiwgRE5BSWRNYXBwaW5ncyB9IGZyb20gJy4uL3R5cGVzLmpzJ1xuaW1wb3J0IHsgbWFwWm9tZUZuIH0gZnJvbSAnLi4vY29ubmVjdGlvbi5qcydcbmltcG9ydCB7IGRlbGV0ZUhhbmRsZXIgfSBmcm9tICcuLydcblxuaW1wb3J0IHtcbiAgUHJvcG9zYWxDcmVhdGVQYXJhbXMsXG4gIFByb3Bvc2FsVXBkYXRlUGFyYW1zLFxuICBQcm9wb3NhbFJlc3BvbnNlLFxufSBmcm9tICdAdmFsdWVmbG93cy92Zi1ncmFwaHFsJ1xuXG5leHBvcnQgaW50ZXJmYWNlIENyZWF0ZUFyZ3Mge1xuICBwcm9wb3NhbDogUHJvcG9zYWxDcmVhdGVQYXJhbXMsXG59XG5leHBvcnQgdHlwZSBjcmVhdGVIYW5kbGVyID0gKHJvb3Q6IGFueSwgYXJnczogQ3JlYXRlQXJncykgPT4gUHJvbWlzZTxQcm9wb3NhbFJlc3BvbnNlPlxuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZUFyZ3Mge1xuICAgIHByb3Bvc2FsOiBQcm9wb3NhbFVwZGF0ZVBhcmFtcyxcbn1cbmV4cG9ydCB0eXBlIHVwZGF0ZUhhbmRsZXIgPSAocm9vdDogYW55LCBhcmdzOiBVcGRhdGVBcmdzKSA9PiBQcm9taXNlPFByb3Bvc2FsUmVzcG9uc2U+XG5cbmV4cG9ydCBkZWZhdWx0IChkbmFDb25maWc6IEROQUlkTWFwcGluZ3MsIGNvbmR1Y3RvclVyaTogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHJ1bkNyZWF0ZSA9IG1hcFpvbWVGbjxDcmVhdGVBcmdzLCBQcm9wb3NhbFJlc3BvbnNlPihkbmFDb25maWcsIGNvbmR1Y3RvclVyaSwgJ3Byb3Bvc2FsJywgJ3Byb3Bvc2FsJywgJ2NyZWF0ZV9wcm9wb3NhbCcpXG4gIGNvbnN0IHJ1blVwZGF0ZSA9IG1hcFpvbWVGbjxVcGRhdGVBcmdzLCBQcm9wb3NhbFJlc3BvbnNlPihkbmFDb25maWcsIGNvbmR1Y3RvclVyaSwgJ3Byb3Bvc2FsJywgJ3Byb3Bvc2FsJywgJ3VwZGF0ZV9wcm9wb3NhbCcpXG4gIGNvbnN0IHJ1bkRlbGV0ZSA9IG1hcFpvbWVGbjxCeVJldmlzaW9uLCBib29sZWFuPihkbmFDb25maWcsIGNvbmR1Y3RvclVyaSwgJ3Byb3Bvc2FsJywgJ3Byb3Bvc2FsJywgJ2RlbGV0ZV9wcm9wb3NhbCcpXG5cbiAgY29uc3QgY3JlYXRlUHJvcG9zYWw6IGNyZWF0ZUhhbmRsZXIgPSBhc3luYyAocm9vdCwgYXJncykgPT4ge1xuICAgIHJldHVybiBydW5DcmVhdGUoYXJncylcbiAgfVxuXG4gIGNvbnN0IHVwZGF0ZVByb3Bvc2FsOiB1cGRhdGVIYW5kbGVyID0gYXN5bmMgKHJvb3QsIGFyZ3MpID0+IHtcbiAgICByZXR1cm4gcnVuVXBkYXRlKGFyZ3MpXG4gIH1cblxuICBjb25zdCBkZWxldGVQcm9wb3NhbDogZGVsZXRlSGFuZGxlciA9IGFzeW5jIChyb290LCBhcmdzKSA9PiB7XG4gICAgcmV0dXJuIHJ1bkRlbGV0ZShhcmdzKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVQcm9wb3NhbCxcbiAgICB1cGRhdGVQcm9wb3NhbCxcbiAgICBkZWxldGVQcm9wb3NhbCxcbiAgfVxufVxuIl19