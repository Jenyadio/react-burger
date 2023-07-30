import {
  constructorIngredientsReducer,
  initialState,
} from "./constructor-ingredients";
import {
  ADD_DRAGGED_INGREDIENT,
  DELETE_DRUGGED_INGREDIENT,
  SET_TOTAL_INGREDIENTS,
  MOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
} from "../../actions/constructor-ingredients";

describe("constructor-ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(constructorIngredientsReducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it("should handle ADD_DRAGGED_INGREDIENT type bun", () => {
    const action = {
      type: ADD_DRAGGED_INGREDIENT,
      item: { type: "bun", items: 10 },
    };
    expect(constructorIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      selectedBun: [action.item],
    });
  });

  it("should handle ADD_DRAGGED_INGREDIENT type main", () => {
    const action = {
      type: ADD_DRAGGED_INGREDIENT,
      item: { type: "main", items: 10 },
    };
    expect(constructorIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      draggedIngredients: [...initialState.draggedIngredients, action.item],
    });
  });

  it("should handle DELETE_DRUGGED_INGREDIENT", () => {
    const action = {
      type: DELETE_DRUGGED_INGREDIENT,
      id: 2,
    };
    expect(constructorIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      draggedIngredients: [...initialState.draggedIngredients].filter(
        (ingredient, index) => index !== action.id
      ),
    });
  });

  it("should handle MOVE_INGREDIENT", () => {
    const action = {
      type: MOVE_INGREDIENT,
      ingredients: [1, 2, 3],
    };
    expect(constructorIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      draggedIngredients: action.ingredients,
    });
  });

  it("should handle SET_TOTAL_INGREDIENTS", () => {
    expect(
      constructorIngredientsReducer(initialState, {
        type: SET_TOTAL_INGREDIENTS,
      })
    ).toEqual({
      ...initialState,
      totalConstructorIngredients: [
        ...initialState.draggedIngredients,
        ...initialState.selectedBun,
      ],
    });
  });

  it("should handle CLEAR_CONSTRUCTOR", () => {
    expect(
      constructorIngredientsReducer(initialState, {
        type: CLEAR_CONSTRUCTOR,
      })
    ).toEqual({
      ...initialState,
      draggedIngredients: initialState.draggedIngredients,
    });
  });
});
