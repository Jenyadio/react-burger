import {
  GET_NUMBER_REQUEST,
  GET_NUMBER_FAILED,
  GET_NUMBER_SUCCESS,
} from "../actions/order-details";
import { GetNumberActions } from "../actions/order-details";
import { Reducer } from "redux";

type OrderState = {
  orderNumber: number | null;
  dataRequest: boolean;
  dataFailed: boolean;
};

const initialState = {
  orderNumber: null,
  dataRequest: false,
  dataFailed: false,
};

export const orderDetailsReducer: Reducer<OrderState, GetNumberActions> = (
  state = initialState,
  action: GetNumberActions
) => {
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
    default: {
      return state;
    }
  }
};
