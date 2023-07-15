import { orderRequest } from "../../utils/burger-api";
import { CLEAR_CONSTRUCTOR } from "./constructor-ingredients";
import { AppDispatch } from "../..";
import { refreshToken } from "./user";
export const GET_NUMBER_REQUEST: "GET_NUMBER_REQUEST" = "GET_NUMBER_REQUEST";
export const GET_NUMBER_SUCCESS: "GET_NUMBER_SUCCESS" = "GET_NUMBER_SUCCESS";
export const GET_NUMBER_FAILED: "GET_NUMBER_FAILED" = "GET_NUMBER_FAILED";

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

export type GetNumberActions =
  | GetNumberRequestAction
  | GetNumberSuccessAction
  | GetNumberFailedAction;

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
