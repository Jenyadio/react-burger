import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
} from "../../actions/burger-ingredients";

import { Card } from "../../../types/ingredient";
import { GetItemsActions } from "../../actions/burger-ingredients";

type IngredientsState = {
  items: Card[];
  itemsRequest: boolean;
  itemsFailed: boolean;
};

export const initialState: IngredientsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: GetItemsActions
): IngredientsState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    default: {
      return state;
    }
  }
};
