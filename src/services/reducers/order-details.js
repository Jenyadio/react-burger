import {
    GET_ORDER_REQUEST,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
  } from '../actions/order-details';

const initialState = {
    orderNumber: null,
    dataRequest: false,
    dataFailed: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
          return {
            ...state,
            dataRequest: true
          };
        }
        case GET_ORDER_SUCCESS: {
          return { ...state, dataFailed: false, orderNumber: action.number, dataRequest: false };
        }
        case GET_ORDER_FAILED: {
          return { ...state, dataFailed: true, dataRequest: false };
        }
        default: {
            return state;
        }
    }
}