import { SET_INGREDIENTS, ADD_DRAGGED_INGREDIENT, DELETE_DRUGGED_INGREDIENT, SET_BUN, SET_TOTAL_INGREDIENTS } from "../actions/constructor-ingredients";

const initialState = {
    ingredients: [],
    draggedIngredients: [],
    totalConstructorIngredients: [],

    ingredientsId: [],

    selectedBun: [],
    totalPrice: null
}

export const constructorIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENTS: {
          return {
            ...state,
            ingredients: action.ingredients
          };
        }
        case ADD_DRAGGED_INGREDIENT: {
            if(state.ingredients.filter(ingredient => ingredient._id === action._id && ingredient.type === "bun").length) {
                return {
                    ...state,
                  selectedBun: state.ingredients.filter(ingredient => ingredient._id === action._id)[0]
                }
            } else {
                return {
                    ...state,
                    draggedIngredients: [...state.draggedIngredients, ...state.ingredients.filter(ingredient => ingredient._id === action._id)]
                }
            }
        }
        case DELETE_DRUGGED_INGREDIENT: {
            return {
                ...state,
                draggedIngredients: [...state.draggedIngredients].filter((ingredient, index) => index !== action.id)
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