import { userInfoReducer, initialState } from "./user";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from "../../actions/user";

describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(userInfoReducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it("should handle GET_USER_REQUEST", () => {
    expect(
      userInfoReducer(initialState, {
        type: GET_USER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      getUserRequest: true,
    });
  });

  it("should handle GET_USER_SUCCESS", () => {
    const action = {
      type: GET_USER_SUCCESS,
      payload: [1, 2, 3],
    };
    expect(userInfoReducer(initialState, action)).toEqual({
      ...initialState,
      getUserFailed: false,
      getUserRequest: false,
      user: action.payload,
    });
  });

  it("should handle GET_USER_FAILED", () => {
    const action = {
      type: GET_USER_FAILED,
      message: "Failed to get user",
    };
    expect(userInfoReducer(initialState, action)).toEqual({
      ...initialState,
      getUserFailed: true,
      getUserRequest: false,
      errMessage: action.message,
    });
  });

  it("should handle UPDATE_USER_REQUEST", () => {
    expect(
      userInfoReducer(initialState, {
        type: UPDATE_USER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      updateUserRequest: true,
    });
  });

  it("should handle UPDATE_USER_SUCCESS", () => {
    const action = {
      type: UPDATE_USER_SUCCESS,
      payload: [1, 2, 3],
    };
    expect(userInfoReducer(initialState, action)).toEqual({
      ...initialState,
      updateUserFailed: false,
      updateUserRequest: false,
      user: action.payload,
    });
  });

  it("should handle UPDATE_USER_FAILED", () => {
    const action = {
      type: UPDATE_USER_FAILED,
      message: "Failed to update user",
    };
    expect(userInfoReducer(initialState, action)).toEqual({
      ...initialState,
      updateUserFailed: true,
      updateUserRequest: false,
      errMessage: action.message,
    });
  });
});
