/**
 * Economic resource mutations
 *
 * @package: HoloREA
 * @since:   2019-10-31
 */
import { mapZomeFn } from '../connection.js';
export default (dnaConfig, conductorUri) => {
    const runUpdate = mapZomeFn(dnaConfig, conductorUri, 'observation', 'economic_resource', 'update_economic_resource');
    const updateEconomicResource = async (root, args) => {
        return runUpdate(args);
    };
    return {
        updateEconomicResource,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNvbm9taWNSZXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL211dGF0aW9ucy9lY29ub21pY1Jlc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBR0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBWTVDLGVBQWUsQ0FBQyxTQUF3QixFQUFFLFlBQW9CLEVBQUUsRUFBRTtJQUNoRSxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQXVDLFNBQVMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixFQUFFLDBCQUEwQixDQUFDLENBQUE7SUFFMUosTUFBTSxzQkFBc0IsR0FBa0IsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNqRSxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QixDQUFDLENBQUE7SUFFRCxPQUFPO1FBQ0wsc0JBQXNCO0tBQ3ZCLENBQUE7QUFDSCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEVjb25vbWljIHJlc291cmNlIG11dGF0aW9uc1xuICpcbiAqIEBwYWNrYWdlOiBIb2xvUkVBXG4gKiBAc2luY2U6ICAgMjAxOS0xMC0zMVxuICovXG5cbmltcG9ydCB7IEROQUlkTWFwcGluZ3MgfSBmcm9tICcuLi90eXBlcy5qcydcbmltcG9ydCB7IG1hcFpvbWVGbiB9IGZyb20gJy4uL2Nvbm5lY3Rpb24uanMnXG5cbmltcG9ydCB7XG4gIEVjb25vbWljUmVzb3VyY2VVcGRhdGVQYXJhbXMsXG4gIEVjb25vbWljUmVzb3VyY2VSZXNwb25zZSxcbn0gZnJvbSAnQHZhbHVlZmxvd3MvdmYtZ3JhcGhxbCdcblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVBcmdzIHtcbiAgcmVzb3VyY2U6IEVjb25vbWljUmVzb3VyY2VVcGRhdGVQYXJhbXMsXG59XG5leHBvcnQgdHlwZSB1cGRhdGVIYW5kbGVyID0gKHJvb3Q6IGFueSwgYXJnczogVXBkYXRlQXJncykgPT4gUHJvbWlzZTxFY29ub21pY1Jlc291cmNlUmVzcG9uc2U+XG5cbmV4cG9ydCBkZWZhdWx0IChkbmFDb25maWc6IEROQUlkTWFwcGluZ3MsIGNvbmR1Y3RvclVyaTogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHJ1blVwZGF0ZSA9IG1hcFpvbWVGbjxVcGRhdGVBcmdzLCBFY29ub21pY1Jlc291cmNlUmVzcG9uc2U+KGRuYUNvbmZpZywgY29uZHVjdG9yVXJpLCAnb2JzZXJ2YXRpb24nLCAnZWNvbm9taWNfcmVzb3VyY2UnLCAndXBkYXRlX2Vjb25vbWljX3Jlc291cmNlJylcblxuICBjb25zdCB1cGRhdGVFY29ub21pY1Jlc291cmNlOiB1cGRhdGVIYW5kbGVyID0gYXN5bmMgKHJvb3QsIGFyZ3MpID0+IHtcbiAgICByZXR1cm4gcnVuVXBkYXRlKGFyZ3MpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHVwZGF0ZUVjb25vbWljUmVzb3VyY2UsXG4gIH1cbn1cbiJdfQ==