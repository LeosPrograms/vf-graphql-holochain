/**
 * Mutations for manipulating processes
 *
 * @package: HoloREA
 * @since:   2019-09-12
 */
import { mapZomeFn } from '../connection.js';
export default (dnaConfig, conductorUri) => {
    const createHandler = mapZomeFn(dnaConfig, conductorUri, 'observation', 'process', 'create_process');
    const updateHandler = mapZomeFn(dnaConfig, conductorUri, 'observation', 'process', 'update_process');
    const deleteHandler = mapZomeFn(dnaConfig, conductorUri, 'observation', 'process', 'delete_process');
    const createProcess = async (root, args) => {
        return createHandler(args);
    };
    const updateProcess = async (root, args) => {
        return updateHandler(args);
    };
    const deleteProcess = async (root, args) => {
        return deleteHandler(args);
    };
    return {
        createProcess,
        updateProcess,
        deleteProcess,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL211dGF0aW9ucy9wcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBR0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBbUI1QyxlQUFlLENBQUMsU0FBd0IsRUFBRSxZQUFvQixFQUFFLEVBQUU7SUFDaEUsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUE4QixTQUFTLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtJQUNqSSxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQThCLFNBQVMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ2pJLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBc0IsU0FBUyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUE7SUFFekgsTUFBTSxhQUFhLEdBQWtCLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDeEQsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUIsQ0FBQyxDQUFBO0lBRUQsTUFBTSxhQUFhLEdBQWtCLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDeEQsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUIsQ0FBQyxDQUFBO0lBRUQsTUFBTSxhQUFhLEdBQWtCLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDeEQsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUIsQ0FBQyxDQUFBO0lBRUQsT0FBTztRQUNMLGFBQWE7UUFDYixhQUFhO1FBQ2IsYUFBYTtLQUNkLENBQUE7QUFDSCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE11dGF0aW9ucyBmb3IgbWFuaXB1bGF0aW5nIHByb2Nlc3Nlc1xuICpcbiAqIEBwYWNrYWdlOiBIb2xvUkVBXG4gKiBAc2luY2U6ICAgMjAxOS0wOS0xMlxuICovXG5cbmltcG9ydCB7IEJ5UmV2aXNpb24sIEROQUlkTWFwcGluZ3MgfSBmcm9tICcuLi90eXBlcy5qcydcbmltcG9ydCB7IG1hcFpvbWVGbiB9IGZyb20gJy4uL2Nvbm5lY3Rpb24uanMnXG5pbXBvcnQgeyBkZWxldGVIYW5kbGVyIH0gZnJvbSAnLi8nXG5cbmltcG9ydCB7XG4gIFByb2Nlc3NDcmVhdGVQYXJhbXMsXG4gIFByb2Nlc3NVcGRhdGVQYXJhbXMsXG4gIFByb2Nlc3NSZXNwb25zZSxcbn0gZnJvbSAnQHZhbHVlZmxvd3MvdmYtZ3JhcGhxbCdcblxuZXhwb3J0IGludGVyZmFjZSBDcmVhdGVBcmdzIHtcbiAgcHJvY2VzczogUHJvY2Vzc0NyZWF0ZVBhcmFtcyxcbn1cbmV4cG9ydCB0eXBlIGNyZWF0ZUhhbmRsZXIgPSAocm9vdDogYW55LCBhcmdzOiBDcmVhdGVBcmdzKSA9PiBQcm9taXNlPFByb2Nlc3NSZXNwb25zZT5cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVBcmdzIHtcbiAgcHJvY2VzczogUHJvY2Vzc1VwZGF0ZVBhcmFtcyxcbn1cbmV4cG9ydCB0eXBlIHVwZGF0ZUhhbmRsZXIgPSAocm9vdDogYW55LCBhcmdzOiBVcGRhdGVBcmdzKSA9PiBQcm9taXNlPFByb2Nlc3NSZXNwb25zZT5cblxuZXhwb3J0IGRlZmF1bHQgKGRuYUNvbmZpZzogRE5BSWRNYXBwaW5ncywgY29uZHVjdG9yVXJpOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgY3JlYXRlSGFuZGxlciA9IG1hcFpvbWVGbjxDcmVhdGVBcmdzLCBQcm9jZXNzUmVzcG9uc2U+KGRuYUNvbmZpZywgY29uZHVjdG9yVXJpLCAnb2JzZXJ2YXRpb24nLCAncHJvY2VzcycsICdjcmVhdGVfcHJvY2VzcycpXG4gIGNvbnN0IHVwZGF0ZUhhbmRsZXIgPSBtYXBab21lRm48VXBkYXRlQXJncywgUHJvY2Vzc1Jlc3BvbnNlPihkbmFDb25maWcsIGNvbmR1Y3RvclVyaSwgJ29ic2VydmF0aW9uJywgJ3Byb2Nlc3MnLCAndXBkYXRlX3Byb2Nlc3MnKVxuICBjb25zdCBkZWxldGVIYW5kbGVyID0gbWFwWm9tZUZuPEJ5UmV2aXNpb24sIGJvb2xlYW4+KGRuYUNvbmZpZywgY29uZHVjdG9yVXJpLCAnb2JzZXJ2YXRpb24nLCAncHJvY2VzcycsICdkZWxldGVfcHJvY2VzcycpXG5cbiAgY29uc3QgY3JlYXRlUHJvY2VzczogY3JlYXRlSGFuZGxlciA9IGFzeW5jIChyb290LCBhcmdzKSA9PiB7XG4gICAgcmV0dXJuIGNyZWF0ZUhhbmRsZXIoYXJncylcbiAgfVxuXG4gIGNvbnN0IHVwZGF0ZVByb2Nlc3M6IHVwZGF0ZUhhbmRsZXIgPSBhc3luYyAocm9vdCwgYXJncykgPT4ge1xuICAgIHJldHVybiB1cGRhdGVIYW5kbGVyKGFyZ3MpXG4gIH1cblxuICBjb25zdCBkZWxldGVQcm9jZXNzOiBkZWxldGVIYW5kbGVyID0gYXN5bmMgKHJvb3QsIGFyZ3MpID0+IHtcbiAgICByZXR1cm4gZGVsZXRlSGFuZGxlcihhcmdzKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVQcm9jZXNzLFxuICAgIHVwZGF0ZVByb2Nlc3MsXG4gICAgZGVsZXRlUHJvY2VzcyxcbiAgfVxufVxuIl19