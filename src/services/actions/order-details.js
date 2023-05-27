import { sendRequest } from "../../utils/burger-api";
import { CLEAR_CONSTRUCTOR } from "./constructor-ingredients";
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getOrderNumber(method, body) {
    return function(dispatch) {
      dispatch({
        type: GET_ORDER_REQUEST
      });
      sendRequest(method, body).then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            number: res.order.number
          });
          dispatch({
            type: CLEAR_CONSTRUCTOR,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_FAILED
        });
      })
    };
  }