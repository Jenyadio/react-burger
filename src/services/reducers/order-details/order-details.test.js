import { orderDetailsReducer, initialState } from "./order-details";
import {
  GET_NUMBER_REQUEST,
  GET_NUMBER_FAILED,
  GET_NUMBER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "../../actions/order-details";

describe("order-details reducer", () => {
  it("should return the initial state", () => {
    expect(orderDetailsReducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it("should handle GET_NUMBER_REQUEST", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: GET_NUMBER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      dataRequest: true,
    });
  });

  it("should handle GET_NUMBER_SUCCESS", () => {
    const action = {
      type: GET_NUMBER_SUCCESS,
      number: 123,
    };
    expect(orderDetailsReducer(initialState, action)).toEqual({
      ...initialState,
      dataFailed: false,
      orderNumber: action.number,
      dataRequest: false,
    });
  });

  it("should handle GET_NUMBER_FAILED", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: GET_NUMBER_FAILED,
      })
    ).toEqual({
      ...initialState,
      dataFailed: true,
      dataRequest: false,
    });
  });

  it("should handle GET_ORDER_REQUEST", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: GET_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      orderRequest: true,
    });
  });

  it("should handle GET_ORDER_SUCCESS", () => {
    const action = {
      type: GET_ORDER_SUCCESS,
      userOrder: [1, 2, 3],
    };
    expect(orderDetailsReducer(initialState, action)).toEqual({
      ...initialState,
      orderFailed: false,
      userOrder: action.userOrder,
      orderRequest: false,
    });
  });

  it("should handle GET_ORDER_FAILED", () => {
    const action = {
      type: GET_ORDER_FAILED,
    };
    expect(orderDetailsReducer(initialState, action)).toEqual({
      ...initialState,
      orderFailed: true,
      orderRequest: false,
    });
  });
});
