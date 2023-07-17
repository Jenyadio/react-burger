import { getIngredients } from "../../utils/burger-api";
import { Card } from "../../types/ingredient";
import { AppDispatch } from "../..";
export const GET_ITEMS_REQUEST: "GET_ITEMS_REQUEST" = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS" = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED: "GET_ITEMS_FAILED" = "GET_ITEMS_FAILED";

export type GetItemsRequestAction = {
  readonly type: typeof GET_ITEMS_REQUEST;
};

export type GetItemsSuccessAction = {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: Card[];
};

export type GetItemsFailedAction = {
  readonly type: typeof GET_ITEMS_FAILED;
};

export type GetItemsActions =
  | GetItemsRequestAction
  | GetItemsSuccessAction
  | GetItemsFailedAction;

export const getItems = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getIngredients()
      .then((res) => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data.map((item) => {
            item.count = 0;
            return item;
          }),
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      });
  };
};
