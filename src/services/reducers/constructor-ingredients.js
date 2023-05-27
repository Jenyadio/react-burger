import { ADD_DRAGGED_INGREDIENT, DELETE_DRUGGED_INGREDIENT, SET_BUN, SET_TOTAL_INGREDIENTS, MOVE_INGREDIENT } from "../actions/constructor-ingredients";

const initialState = {
    draggedIngredients: [],
    totalConstructorIngredients: [],

    ingredientsId: [],

    selectedBun: [],
    totalPrice: null
}

export const constructorIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DRAGGED_INGREDIENT: {
            if(action.item.type === 'bun') {
                return {
                    ...state,
                    selectedBun: action.item
                }
            } else {
                return {
                    ...state,
                    draggedIngredients: [...state.draggedIngredients, action.item]
                }
            }
        }
        case DELETE_DRUGGED_INGREDIENT: {
            return {
                ...state,
                draggedIngredients: [...state.draggedIngredients].filter((ingredient, index) => index !== action.id)
            }
        }
        case MOVE_INGREDIENT: {
            return {
                ...state,
                draggedIngredients: action.ingredients
            }
        }
        case SET_BUN: {
            return {
                ...state,
                selectedBun: action.bun
            }
        }
        case SET_TOTAL_INGREDIENTS: {
            return {
                ...state,
                totalConstructorIngredients: [...state.draggedIngredients, ...[state.selectedBun]]
            }
        }
        default: {
            return state;
        }
    }
}