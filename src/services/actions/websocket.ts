import type { Middleware, MiddlewareAPI } from "redux";
import type { ApplicationActions, RootState, AppDispatch } from "../..";
import { WsResponse, WsOrders } from "../../types/websocket";
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'; 
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export type WsConnectionStartAction = {
    readonly type: typeof WS_CONNECTION_START;
}

export type WsConnectionSuccessAction = {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export type WsConnectionErrorAction = {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: Event;
}

export type WsConnectionClosedAction = {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export type WsGetDataAction = {
    readonly type: typeof WS_GET_MESSAGE;
    readonly orders: WsOrders[];
    readonly total: number;
    readonly totalToday: number;
}

export type WsSendDataAction = {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: { accessToken: string};
}

export type TWSStoreActions = {
    wsInit: typeof  WS_CONNECTION_START,
    wsSendMessage: typeof  WS_SEND_MESSAGE,
    onOpen: typeof  WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof  WS_CONNECTION_ERROR,
    onMessage: typeof  WS_GET_MESSAGE,
};

export const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export type WsActions = WsConnectionStartAction | WsConnectionSuccessAction | WsConnectionErrorAction | WsConnectionClosedAction | WsGetDataAction | WsSendDataAction;


export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: ApplicationActions) => {
      const { dispatch, getState } = store;
      const { type } = action;
 
      if (type === 'WS_CONNECTION_START') {
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: WsResponse = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          console.log(restParsedData.orders)
          dispatch({ type: 'WS_GET_MESSAGE', orders: restParsedData.orders, total: restParsedData.total, totalToday: restParsedData.totalToday});
        };

        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }) as Middleware;
}; 