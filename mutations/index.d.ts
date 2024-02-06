/**
 * Mutations manifest for HoloREA
 *
 * @package: HoloREA
 * @since:   2019-05-22
 */
import { DNAIdMappings, VfModule, ByRevision } from '../types.js';
export declare type deleteHandler = (root: any, args: ByRevision) => Promise<boolean>;
declare const _default: (enabledVFModules: VfModule[] | undefined, dnaConfig: DNAIdMappings, conductorUri: string) => any;
export default _default;
