/**
 * Recipe Process mutations
 *
 * @package: HoloREA
 * @since:   2019-08-31
 */
import { DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { RecipeProcessCreateParams, RecipeProcessUpdateParams, RecipeProcessResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    recipeProcess: RecipeProcessCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<RecipeProcessResponse>;
export interface UpdateArgs {
    recipeProcess: RecipeProcessUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<RecipeProcessResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createRecipeProcess: createHandler;
    updateRecipeProcess: updateHandler;
    deleteRecipeProcess: deleteHandler;
};
export default _default;
