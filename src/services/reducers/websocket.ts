import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from "../actions/websocket";
import { WsActions } from "../actions/websocket";
import { WsOrders } from "../../types/websocket";

type WsState = {
    wsConnected: boolean;
    orders: WsOrders[] | null;
    total: number;
    totalToday: number;

    error?: Event;
}

const initialState: WsState = {
    wsConnected: false,
    orders: null,
    total: 0,
    totalToday: 0,
}

export const wsReducer = (state = initialState, action: WsActions): WsState => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          error: undefined,
          wsConnected: true
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload,
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          error: undefined,
          wsConnected: false
        };
  
      case WS_GET_MESSAGE:
        return {
          ...state,
          error: undefined,
          orders: action.orders,
          total: action.total,
          totalToday: action.totalToday,
        };
  
      default:
        return state;
    }
  };