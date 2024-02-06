/**
 * Fulfillment mutations
 *
 * @package: HoloREA
 * @since:   2019-08-28
 */
import { mapZomeFn } from '../connection.js';
export default (dnaConfig, conductorUri) => {
    const runCreate = mapZomeFn(dnaConfig, conductorUri, 'planning', 'fulfillment', 'create_fulfillment');
    const runUpdate = mapZomeFn(dnaConfig, conductorUri, 'planning', 'fulfillment', 'update_fulfillment');
    const runDelete = mapZomeFn(dnaConfig, conductorUri, 'planning', 'fulfillment', 'delete_fulfillment');
    const createFulfillment = async (root, args) => {
        return runCreate(args);
    };
    const updateFulfillment = async (root, args) => {
        return runUpdate(args);
    };
    const deleteFulfillment = async (root, args) => {
        return runDelete(args);
    };
    return {
        createFulfillment,
        updateFulfillment,
        deleteFulfillment,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsZmlsbG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9tdXRhdGlvbnMvZnVsZmlsbG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFHSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFtQjVDLGVBQWUsQ0FBQyxTQUF3QixFQUFFLFlBQW9CLEVBQUUsRUFBRTtJQUNoRSxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQWtDLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFBO0lBQ3RJLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBa0MsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixDQUFDLENBQUE7SUFDdEksTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFzQixTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsb0JBQW9CLENBQUMsQ0FBQTtJQUUxSCxNQUFNLGlCQUFpQixHQUFrQixLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO1FBQzVELE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCLENBQUMsQ0FBQTtJQUVELE1BQU0saUJBQWlCLEdBQWtCLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDNUQsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDeEIsQ0FBQyxDQUFBO0lBRUQsTUFBTSxpQkFBaUIsR0FBa0IsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUM1RCxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QixDQUFDLENBQUE7SUFFRCxPQUFPO1FBQ0wsaUJBQWlCO1FBQ2pCLGlCQUFpQjtRQUNqQixpQkFBaUI7S0FDbEIsQ0FBQTtBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRnVsZmlsbG1lbnQgbXV0YXRpb25zXG4gKlxuICogQHBhY2thZ2U6IEhvbG9SRUFcbiAqIEBzaW5jZTogICAyMDE5LTA4LTI4XG4gKi9cblxuaW1wb3J0IHsgQnlSZXZpc2lvbiwgRE5BSWRNYXBwaW5ncyB9IGZyb20gJy4uL3R5cGVzLmpzJ1xuaW1wb3J0IHsgbWFwWm9tZUZuIH0gZnJvbSAnLi4vY29ubmVjdGlvbi5qcydcbmltcG9ydCB7IGRlbGV0ZUhhbmRsZXIgfSBmcm9tICcuLydcblxuaW1wb3J0IHtcbiAgRnVsZmlsbG1lbnRDcmVhdGVQYXJhbXMsXG4gIEZ1bGZpbGxtZW50VXBkYXRlUGFyYW1zLFxuICBGdWxmaWxsbWVudFJlc3BvbnNlLFxufSBmcm9tICdAdmFsdWVmbG93cy92Zi1ncmFwaHFsJ1xuXG5leHBvcnQgaW50ZXJmYWNlIENyZWF0ZUFyZ3Mge1xuICBmdWxmaWxsbWVudDogRnVsZmlsbG1lbnRDcmVhdGVQYXJhbXMsXG59XG5leHBvcnQgdHlwZSBjcmVhdGVIYW5kbGVyID0gKHJvb3Q6IGFueSwgYXJnczogQ3JlYXRlQXJncykgPT4gUHJvbWlzZTxGdWxmaWxsbWVudFJlc3BvbnNlPlxuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZUFyZ3Mge1xuICBmdWxmaWxsbWVudDogRnVsZmlsbG1lbnRVcGRhdGVQYXJhbXMsXG59XG5leHBvcnQgdHlwZSB1cGRhdGVIYW5kbGVyID0gKHJvb3Q6IGFueSwgYXJnczogVXBkYXRlQXJncykgPT4gUHJvbWlzZTxGdWxmaWxsbWVudFJlc3BvbnNlPlxuXG5leHBvcnQgZGVmYXVsdCAoZG5hQ29uZmlnOiBETkFJZE1hcHBpbmdzLCBjb25kdWN0b3JVcmk6IHN0cmluZykgPT4ge1xuICBjb25zdCBydW5DcmVhdGUgPSBtYXBab21lRm48Q3JlYXRlQXJncywgRnVsZmlsbG1lbnRSZXNwb25zZT4oZG5hQ29uZmlnLCBjb25kdWN0b3JVcmksICdwbGFubmluZycsICdmdWxmaWxsbWVudCcsICdjcmVhdGVfZnVsZmlsbG1lbnQnKVxuICBjb25zdCBydW5VcGRhdGUgPSBtYXBab21lRm48VXBkYXRlQXJncywgRnVsZmlsbG1lbnRSZXNwb25zZT4oZG5hQ29uZmlnLCBjb25kdWN0b3JVcmksICdwbGFubmluZycsICdmdWxmaWxsbWVudCcsICd1cGRhdGVfZnVsZmlsbG1lbnQnKVxuICBjb25zdCBydW5EZWxldGUgPSBtYXBab21lRm48QnlSZXZpc2lvbiwgYm9vbGVhbj4oZG5hQ29uZmlnLCBjb25kdWN0b3JVcmksICdwbGFubmluZycsICdmdWxmaWxsbWVudCcsICdkZWxldGVfZnVsZmlsbG1lbnQnKVxuXG4gIGNvbnN0IGNyZWF0ZUZ1bGZpbGxtZW50OiBjcmVhdGVIYW5kbGVyID0gYXN5bmMgKHJvb3QsIGFyZ3MpID0+IHtcbiAgICByZXR1cm4gcnVuQ3JlYXRlKGFyZ3MpXG4gIH1cblxuICBjb25zdCB1cGRhdGVGdWxmaWxsbWVudDogdXBkYXRlSGFuZGxlciA9IGFzeW5jIChyb290LCBhcmdzKSA9PiB7XG4gICAgcmV0dXJuIHJ1blVwZGF0ZShhcmdzKVxuICB9XG5cbiAgY29uc3QgZGVsZXRlRnVsZmlsbG1lbnQ6IGRlbGV0ZUhhbmRsZXIgPSBhc3luYyAocm9vdCwgYXJncykgPT4ge1xuICAgIHJldHVybiBydW5EZWxldGUoYXJncylcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlRnVsZmlsbG1lbnQsXG4gICAgdXBkYXRlRnVsZmlsbG1lbnQsXG4gICAgZGVsZXRlRnVsZmlsbG1lbnQsXG4gIH1cbn1cbiJdfQ==