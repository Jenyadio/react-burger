import { orderRequest } from "../../utils/burger-api";
import { CLEAR_CONSTRUCTOR } from "./constructor-ingredients";
import { AppDispatch } from "../..";
import { refreshToken } from "./user";
import { orderByNumberRequest } from "../../utils/burger-api";
import { WsOrders } from "../../types/websocket";
export const GET_NUMBER_REQUEST: "GET_NUMBER_REQUEST" = "GET_NUMBER_REQUEST";
export const GET_NUMBER_SUCCESS: "GET_NUMBER_SUCCESS" = "GET_NUMBER_SUCCESS";
export const GET_NUMBER_FAILED: "GET_NUMBER_FAILED" = "GET_NUMBER_FAILED";
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

export type GetNumberRequestAction = {
  readonly type: typeof GET_NUMBER_REQUEST;
};

export type GetNumberSuccessAction = {
  readonly type: typeof GET_NUMBER_SUCCESS;
  readonly number: number;
};

export type GetNumberFailedAction = {
  readonly type: typeof GET_NUMBER_FAILED;
};

export type GetOrderRequestAction = {
  readonly type: typeof GET_ORDER_REQUEST;
};

export type GetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly userOrder: WsOrders;
};

export type GetOrderFailedAction = {
  readonly type: typeof GET_ORDER_FAILED;
};

export type GetNumberAndOrderActions =
  | GetNumberRequestAction
  | GetNumberSuccessAction
  | GetNumberFailedAction
  | GetOrderRequestAction
  | GetOrderSuccessAction
  | GetOrderFailedAction;

export const getOrderNumber = (body: string[]) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_NUMBER_REQUEST,
    });
    orderRequest(body)
      .then((res) => {
        dispatch({
          type: GET_NUMBER_SUCCESS,
          number: res.order.number,
        });
        dispatch({
          type: CLEAR_CONSTRUCTOR,
        });
      })
      .catch((e) => {
        console.log(e);
        if (e.message === "jwt expired") {
          dispatch(refreshToken(getOrderNumber(body)));
        } else {
          dispatch({
            type: GET_NUMBER_FAILED,
          });
        }
      });
  };
};

export const getOrderByNumber = (number: number) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    orderByNumberRequest(number)
      .then((res: any) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          userOrder: res.orders[0],
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};
