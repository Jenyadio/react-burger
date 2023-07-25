import {
  ADD_DRAGGED_INGREDIENT,
  DELETE_DRUGGED_INGREDIENT,
  SET_TOTAL_INGREDIENTS,
  MOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
} from "../../actions/constructor-ingredients";
import { ConstructorIngredientsActions } from "../../actions/constructor-ingredients";
import { Card } from "../../../types/ingredient";

type ConstructorState = {
  draggedIngredients: Card[];
  totalConstructorIngredients: Card[];

  ingredientsId: string[];

  selectedBun: Card[];
};

export const initialState: ConstructorState = {
  draggedIngredients: [],
  totalConstructorIngredients: [],

  ingredientsId: [],

  selectedBun: [],
};

export const constructorIngredientsReducer = (
  state = initialState,
  action: ConstructorIngredientsActions
): ConstructorState => {
  switch (action.type) {
    case ADD_DRAGGED_INGREDIENT: {
      if (action.item.type === "bun") {
        return {
          ...state,
          selectedBun: [action.item],
        };
      } else {
        return {
          ...state,
          draggedIngredients: [...state.draggedIngredients, action.item],
        };
      }
    }
    case DELETE_DRUGGED_INGREDIENT: {
      return {
        ...state,
        draggedIngredients: [...state.draggedIngredients].filter(
          (ingredient, index) => index !== action.id
        ),
      };
    }
    case MOVE_INGREDIENT: {
      return {
        ...state,
        draggedIngredients: action.ingredients,
      };
    }
    case SET_TOTAL_INGREDIENTS: {
      return {
        ...state,
        totalConstructorIngredients: [
          ...state.draggedIngredients,
          ...state.selectedBun,
        ],
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        draggedIngredients: initialState.draggedIngredients,
        //selectedBun: initialState.selectedBun
      };
    }
    default: {
      return state;
    }
  }
};
