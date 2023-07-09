import { sendRequest } from "../../utils/burger-api";
import { CLEAR_CONSTRUCTOR } from "./constructor-ingredients";
import { AppDispatch } from "../..";
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export type GetOrderRequestAction = {
  readonly type: typeof GET_ORDER_REQUEST;
}

export type GetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly number: number;
}

export type GetOrderFailedAction = {
  readonly type: typeof GET_ORDER_FAILED;
}

export type GetOrderActions = GetOrderRequestAction | GetOrderSuccessAction | GetOrderFailedAction;


export const getOrderNumber = (body: string[]) => {
    return function(dispatch: AppDispatch) {
      dispatch({
        type: GET_ORDER_REQUEST
      });
      sendRequest(body).then(res => {
          dispatch({
            type: GET_ORDER_SUCCESS,
            number: res.order.number
          });
          dispatch({
            type: CLEAR_CONSTRUCTOR,
          });
      })
      .catch((e) => {
        console.log(e);
        dispatch({
          type: GET_ORDER_FAILED
        });
      })
    };
  }