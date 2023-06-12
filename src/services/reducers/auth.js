import { REGISTER_SUCCESS, REGISTER_REQUEST, REGISTER_FAILED, LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILED, RESTORE_PASSWORD_REQUEST, RESTORE_PASSWORD_SUCCESS, RESTORE_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, LOGOUT_SUCCESS, LOGOUT_FAILED, LOGOUT_REQUEST } from "../actions/auth";

const initialState = {
    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    restoreRequest: false,
    restoreSuccess: false,
    restoreFailed: false,

    resetRequest: false,
    resetSuccess: false,
    resetFailed: false,

    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,

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
          return { ...state, registerFailed: false, registerRequest: false };
        }
        case REGISTER_FAILED: {
          return { ...state, registerFailed: true, registerRequest: false, message: action.message };
        }
        case LOGIN_REQUEST: {
          return {
            ...state,
            loginRequest: true
          };
        }
        case LOGIN_SUCCESS: {
          return { ...state, loginFailed: false, loginRequest: false };
        }
        case LOGIN_FAILED: {
          return { ...state, loginFailed: true, message: action.message, loginRequest: false };
        }
         case RESTORE_PASSWORD_REQUEST: {
            return {
              ...state,
              restoreRequest: true
            };
        }
        case RESTORE_PASSWORD_SUCCESS: {
            return { ...state, restoreFailed: false, message: action.message, restoreRequest: false, restoreSuccess: true };
        }
        case RESTORE_PASSWORD_FAILED: {
            return { ...state, restoreFailed: true, restoreRequest: false, message: action.message };
        }
        case RESET_PASSWORD_REQUEST: {
            return {
              ...state,
              resetRequest: true
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return { ...state, resetFailed: false, message: action.message, resetRequest: false , resetSuccess: true};
        }
        case RESET_PASSWORD_FAILED: {
            return { ...state, resetFailed: true, resetRequest: false, message: action.message };
        }
        case LOGOUT_REQUEST: {
          return {
            ...state,
            logoutRequest: true
          };
        }
        case LOGOUT_SUCCESS: {
          return { ...state, message: action.message, logoutRequest: false, logoutSuccess: true };
        }
        case LOGOUT_FAILED: {
          return { ...state, logoutFailed: true, logoutRequest: false, message: action.message };
        }
        default: {
            return state;
        }
    }
}