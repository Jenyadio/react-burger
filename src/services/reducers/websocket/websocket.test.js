import { wsReducer, initialState } from "./websocket";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../../actions/websocket";

describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true,
    });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    const action = {
      type: WS_CONNECTION_ERROR,
      payload: "Error",
    };
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      error: action.payload,
      wsConnected: false,
    });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false,
    });
  });

  it("should handle WS_GET_MESSAGE", () => {
    const action = {
      type: WS_GET_MESSAGE,
      orders: [1, 2, 3],
      total: 100,
      totalToday: 12,
    };
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      error: undefined,
      orders: action.orders,
      total: action.total,
      totalToday: action.totalToday,
    });
  });
});
