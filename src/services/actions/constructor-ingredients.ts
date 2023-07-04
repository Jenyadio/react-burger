import { Card } from "../../types/ingredient";
export const ADD_DRAGGED_INGREDIENT: 'ADD_DRAGGED_INGREDIENT' = 'ADD_DRAGGED_INGREDIENT';
export const SET_TOTAL_INGREDIENTS: 'SET_TOTAL_INGREDIENTS' = 'SET_TOTAL_INGREDIENTS';
export const DELETE_DRUGGED_INGREDIENT: 'DELETE_DRUGGED_INGREDIENT' = 'DELETE_DRUGGED_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

export type AddDruggedIngredientAction = {
    readonly type: typeof ADD_DRAGGED_INGREDIENT;
    readonly item: Card;
}

export type SetTotalIngredientsAction = {
    readonly type: typeof SET_TOTAL_INGREDIENTS;
}

export type DeleteDruggedIngredientAction = {
    readonly type: typeof DELETE_DRUGGED_INGREDIENT;
    readonly id: number;
}

export type MoveIngredientAction = {
    readonly type: typeof MOVE_INGREDIENT;
    readonly ingredients: Card[];
}

export type ClearConstructorAction = {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type ConstructorIngredientsActions = AddDruggedIngredientAction | SetTotalIngredientsAction | DeleteDruggedIngredientAction | MoveIngredientAction | ClearConstructorAction;



