import { burgerIngredientsReducer, initialState } from "./burger-ingredients";
import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
} from "../../actions/burger-ingredients";

describe("burger-ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it("should handle GET_ITEMS_REQUEST", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_ITEMS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      itemsRequest: true,
    });
  });

  it("should handle GET_ITEMS_SUCCESS", () => {
    const action = {
      type: GET_ITEMS_SUCCESS,
      items: [1, 2, 3],
    };
    expect(burgerIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      items: action.items,
      itemsRequest: false,
    });
  });

  it("should handle GET_ITEMS_FAILED", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_ITEMS_FAILED,
      })
    ).toEqual({
      ...initialState,
      itemsFailed: true,
    });
  });
});
