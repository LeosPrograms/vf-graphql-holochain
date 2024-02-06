/**
 * Recipe Flow mutations
 *
 * @package: HoloREA
 * @since:   2019-08-31
 */
import { DNAIdMappings } from '../types.js';
import { deleteHandler } from './';
import { RecipeFlowCreateParams, RecipeFlowUpdateParams, RecipeFlowResponse } from '@valueflows/vf-graphql';
export interface CreateArgs {
    recipeFlow: RecipeFlowCreateParams;
}
export declare type createHandler = (root: any, args: CreateArgs) => Promise<RecipeFlowResponse>;
export interface UpdateArgs {
    recipeFlow: RecipeFlowUpdateParams;
}
export declare type updateHandler = (root: any, args: UpdateArgs) => Promise<RecipeFlowResponse>;
declare const _default: (dnaConfig: DNAIdMappings, conductorUri: string) => {
    createRecipeFlow: createHandler;
    updateRecipeFlow: updateHandler;
    deleteRecipeFlow: deleteHandler;
};
export default _default;
