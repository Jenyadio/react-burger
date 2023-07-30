import { authReducer, initialState } from "./auth";
import {
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILED,
  RESTORE_PASSWORD_REQUEST,
  RESTORE_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
} from "../../actions/auth";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it("should handle REGISTER_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: REGISTER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      registerRequest: true,
    });
  });

  it("should handle REGISTER_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: REGISTER_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      registerRequest: false,
    });
  });

  it("should handle REGISTER_FAILED", () => {
    const action = {
      type: REGISTER_FAILED,
      message: "Registration failed",
    };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      registerFailed: true,
      registerRequest: false,
      message: action.message,
    });
  });

  it("should handle LOGIN_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: LOGIN_REQUEST,
      })
    ).toEqual({
      ...initialState,
      loginRequest: true,
    });
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: LOGIN_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      loginFailed: false,
      loginRequest: false,
      loginSuccess: true,
    });
  });

  it("should handle LOGIN_FAILED", () => {
    const action = {
      type: LOGIN_FAILED,
      message: "Registration failed",
    };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      loginFailed: true,
      message: action.message,
      loginRequest: false,
    });
  });

  it("should handle RESTORE_PASSWORD_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: RESTORE_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...initialState,
      restoreRequest: true,
    });
  });

  it("should handle RESTORE_PASSWORD_SUCCESS", () => {
    const action = {
      type: RESTORE_PASSWORD_SUCCESS,
      message: "Code was sent to your email",
      password_step: 2,
    };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      restoreFailed: false,
      message: action.message,
      restoreRequest: false,
      restoreSuccess: true,
      step: action.password_step,
    });
  });

  it("should handle RESTORE_PASSWORD_FAILED", () => {
    const action = {
      type: RESTORE_PASSWORD_FAILED,
      message: "Couldn't send code, try again",
    };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      restoreFailed: true,
      restoreRequest: false,
      message: action.message,
    });
  });

  it("should handle RESET_PASSWORD_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: RESET_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...initialState,
      resetRequest: true,
    });
  });

  it("should handle RESET_PASSWORD_SUCCESS", () => {
    const action = {
      type: RESET_PASSWORD_SUCCESS,
      message: "Password successfully reset",
    };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      resetFailed: false,
      message: action.message,
      resetRequest: false,
      resetSuccess: true,
    });
  });

  it("should handle RESET_PASSWORD_FAILED", () => {
    const action = {
      type: RESET_PASSWORD_FAILED,
      message: "Couldn't reset password, try again",
    };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      resetFailed: true,
      resetRequest: false,
      message: action.message,
    });
  });

  it("should handle LOGOUT_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: LOGOUT_REQUEST,
      })
    ).toEqual({
      ...initialState,
      logoutRequest: true,
    });
  });

  it("should handle LOGOUT_SUCCESS", () => {
    const action = {
      type: LOGOUT_SUCCESS,
      message: "Successfully logout",
    };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      message: action.message,
      logoutRequest: false,
      logoutSuccess: true,
    });
  });

  it("should handle LOGOUT_FAILED", () => {
    const action = {
      type: LOGOUT_FAILED,
      message: "Logout failed",
    };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      logoutFailed: true,
      logoutRequest: false,
      message: action.message,
    });
  });
});
