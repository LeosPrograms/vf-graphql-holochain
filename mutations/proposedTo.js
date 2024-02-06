/**
 * Mutations for manipulating proposed to
 *
 * @package: HoloREA
 * @since:   2019-09-12
 */
import { mapZomeFn } from '../connection.js';
export default (dnaConfig, conductorUri) => {
    const runCreate = mapZomeFn(dnaConfig, conductorUri, 'proposal', 'proposed_to', 'create_proposed_to');
    const runDelete = mapZomeFn(dnaConfig, conductorUri, 'proposal', 'proposed_to', 'delete_proposed_to');
    const proposeTo = async (root, args) => {
        return runCreate({ proposedTo: args });
    };
    const deleteProposedTo = async (root, args) => {
        return runDelete(args);
    };
    return {
        proposeTo,
        deleteProposedTo,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcG9zZWRUby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL211dGF0aW9ucy9wcm9wb3NlZFRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBR0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBZ0I1QyxlQUFlLENBQUMsU0FBd0IsRUFBRSxZQUFvQixFQUFFLEVBQUU7SUFDaEUsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFtQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsb0JBQW9CLENBQUMsQ0FBQTtJQUN2SSxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQXNCLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFBO0lBRTFILE1BQU0sU0FBUyxHQUFrQixLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3BELE9BQU8sU0FBUyxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDeEMsQ0FBQyxDQUFBO0lBRUQsTUFBTSxnQkFBZ0IsR0FBa0IsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUMzRCxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QixDQUFDLENBQUE7SUFFRCxPQUFPO1FBQ0wsU0FBUztRQUNULGdCQUFnQjtLQUNqQixDQUFBO0FBQ0gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNdXRhdGlvbnMgZm9yIG1hbmlwdWxhdGluZyBwcm9wb3NlZCB0b1xuICpcbiAqIEBwYWNrYWdlOiBIb2xvUkVBXG4gKiBAc2luY2U6ICAgMjAxOS0wOS0xMlxuICovXG5cbmltcG9ydCB7IEFnZW50QWRkcmVzcywgQnlSZXZpc2lvbiwgRE5BSWRNYXBwaW5ncywgUHJvcG9zYWxBZGRyZXNzIH0gZnJvbSAnLi4vdHlwZXMuanMnXG5pbXBvcnQgeyBtYXBab21lRm4gfSBmcm9tICcuLi9jb25uZWN0aW9uLmpzJ1xuaW1wb3J0IHsgZGVsZXRlSGFuZGxlciB9IGZyb20gJy4vJ1xuXG5pbXBvcnQge1xuICBQcm9wb3NlZFRvUmVzcG9uc2UsXG59IGZyb20gJ0B2YWx1ZWZsb3dzL3ZmLWdyYXBocWwnXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3JlYXRlUGFyYW1zIHtcbiAgcHJvcG9zZWRUbzogQ3JlYXRlUmVxdWVzdCxcbn1cbmludGVyZmFjZSBDcmVhdGVSZXF1ZXN0IHtcbiAgICBwcm9wb3NlZDogUHJvcG9zYWxBZGRyZXNzLFxuICAgIHByb3Bvc2VkVG86IEFnZW50QWRkcmVzcyxcbn1cbmV4cG9ydCB0eXBlIGNyZWF0ZUhhbmRsZXIgPSAocm9vdDogYW55LCBhcmdzOiBDcmVhdGVSZXF1ZXN0KSA9PiBQcm9taXNlPFByb3Bvc2VkVG9SZXNwb25zZT5cblxuZXhwb3J0IGRlZmF1bHQgKGRuYUNvbmZpZzogRE5BSWRNYXBwaW5ncywgY29uZHVjdG9yVXJpOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgcnVuQ3JlYXRlID0gbWFwWm9tZUZuPENyZWF0ZVBhcmFtcywgUHJvcG9zZWRUb1Jlc3BvbnNlPihkbmFDb25maWcsIGNvbmR1Y3RvclVyaSwgJ3Byb3Bvc2FsJywgJ3Byb3Bvc2VkX3RvJywgJ2NyZWF0ZV9wcm9wb3NlZF90bycpXG4gIGNvbnN0IHJ1bkRlbGV0ZSA9IG1hcFpvbWVGbjxCeVJldmlzaW9uLCBib29sZWFuPihkbmFDb25maWcsIGNvbmR1Y3RvclVyaSwgJ3Byb3Bvc2FsJywgJ3Byb3Bvc2VkX3RvJywgJ2RlbGV0ZV9wcm9wb3NlZF90bycpXG5cbiAgY29uc3QgcHJvcG9zZVRvOiBjcmVhdGVIYW5kbGVyID0gYXN5bmMgKHJvb3QsIGFyZ3MpID0+IHtcbiAgICByZXR1cm4gcnVuQ3JlYXRlKHsgcHJvcG9zZWRUbzogYXJncyB9KVxuICB9XG5cbiAgY29uc3QgZGVsZXRlUHJvcG9zZWRUbzogZGVsZXRlSGFuZGxlciA9IGFzeW5jIChyb290LCBhcmdzKSA9PiB7XG4gICAgcmV0dXJuIHJ1bkRlbGV0ZShhcmdzKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9wb3NlVG8sXG4gICAgZGVsZXRlUHJvcG9zZWRUbyxcbiAgfVxufVxuIl19