import { REGISTER_SUCCESS, REGISTER_REQUEST, REGISTER_FAILED, LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILED, AUTHORIZE_USER, RESTORE_PASSWORD_REQUEST, RESTORE_PASSWORD_SUCCESS, RESTORE_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, LOGOUT_SUCCESS, LOGOUT_FAILED, LOGOUT_REQUEST } from "../actions/auth";

const initialState = {
    registerRequest: false,
    registerSuccess: false,
    registerFailed: false,

    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,

    restoreRequest: false,
    restoreFailed: false,

    resetRequest: false,
    resetFailed: false,

    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,

    isAuthorized: false,
    message: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST: {
          return {
            ...state,
            registerRequest: true
          };
        }
        case REGISTER_SUCCESS: {
          return { ...state, registerFailed: false, registerRequest: false, registerSuccess: true };
        }
        case REGISTER_FAILED: {
          return { ...state, registerFailed: true, registerRequest: false };
        }
        case LOGIN_REQUEST: {
          return {
            ...state,
            loginRequest: true
          };
        }
        case LOGIN_SUCCESS: {
          return { ...state, loginFailed: false, loginRequest: false, loginSuccess: true };
        }
        case LOGIN_FAILED: {
          return { ...state, loginFailed: true, loginRequest: false };
        }
        case AUTHORIZE_USER: {
            return { ...state, isAuthorized: true };
        }
         case RESTORE_PASSWORD_REQUEST: {
            return {
              ...state,
              restoreRequest: true
            };
        }
        case RESTORE_PASSWORD_SUCCESS: {
            return { ...state, restoreFailed: false, message: action.message, restoreRequest: false };
        }
        case RESTORE_PASSWORD_FAILED: {
            return { ...state, restoreFailed: true, restoreRequest: false };
        }
        case RESET_PASSWORD_REQUEST: {
            return {
              ...state,
              resetRequest: true
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return { ...state, resetFailed: false, message: action.message, resetRequest: false };
        }
        case RESET_PASSWORD_FAILED: {
            return { ...state, resetFailed: true, resetRequest: false };
        }
        case LOGOUT_REQUEST: {
          return {
            ...state,
            logoutRequest: true
          };
        }
        case LOGOUT_SUCCESS: {
          return { ...state, message: action.message, isAuthorized: false, logoutRequest: false, logoutSuccess: true };
        }
        case LOGOUT_FAILED: {
          return { ...state, logoutFailed: true, logoutRequest: false };
        }
        default: {
            return state;
        }
    }
}