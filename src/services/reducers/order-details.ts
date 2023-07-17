import {
  GET_NUMBER_REQUEST,
  GET_NUMBER_FAILED,
  GET_NUMBER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "../actions/order-details";
import { GetNumberAndOrderActions } from "../actions/order-details";
import { Reducer } from "redux";
import { WsOrders } from "../../types/websocket";

type OrderState = {
  orderNumber: number | null;
  dataRequest: boolean;
  dataFailed: boolean;
  userOrder: WsOrders | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState = {
  orderNumber: null,
  dataRequest: false,
  dataFailed: false,
  userOrder: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderDetailsReducer: Reducer<
  OrderState,
  GetNumberAndOrderActions
> = (state = initialState, action: GetNumberAndOrderActions) => {
  switch (action.type) {
    case GET_NUMBER_REQUEST: {
      return {
        ...state,
        dataRequest: true,
      };
    }
    case GET_NUMBER_SUCCESS: {
      return {
        ...state,
        dataFailed: false,
        orderNumber: action.number,
        dataRequest: false,
      };
    }
    case GET_NUMBER_FAILED: {
      return { ...state, dataFailed: true, dataRequest: false };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        userOrder: action.userOrder,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    default: {
      return state;
    }
  }
};
