import {
    GET_ORDER_REQUEST,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
  } from '../actions/order-details';
import { GetOrderActions } from '../actions/order-details';
import { Reducer } from 'redux';

type OrderState = {
  orderNumber: number | null,
  dataRequest: boolean,
  dataFailed: boolean,
};

const initialState = {
    orderNumber: null,
    dataRequest: false,
    dataFailed: false,
};

export const orderDetailsReducer: Reducer<OrderState,GetOrderActions> = (state = initialState, action: GetOrderActions) => {
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