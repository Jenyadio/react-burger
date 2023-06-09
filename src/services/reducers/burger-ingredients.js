import {
    GET_ITEMS_FAILED,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
  } from '../actions/burger-ingredients';

const initialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST: {
          return {
            ...state,
            itemsRequest: true
          };
        }
        case GET_ITEMS_SUCCESS: {
          return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
        }
        case GET_ITEMS_FAILED: {
          return { ...state, itemsFailed: true, itemsRequest: false };
        }
        default: {
            return state;
        }
    }
}