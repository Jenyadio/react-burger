import { GET_USER_SUCCESS, GET_USER_REQUEST, GET_USER_FAILED, AUTHORIZE_USER, RENEW_PASSWORD_REQUEST, RENEW_PASSWORD_SUCCESS, RENEW_PASSWORD_FAILED } from "../actions/user";

const initialState = {
    userEmail: null,
    userName: null,

    userRequest: false,
    userFailed: false,

    passwordRequest: false,
    passwordFailed: false,

    isAuthorized: false,
    message: null,
}

export const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case GET_USER_SUCCESS: {
          return { ...state, userFailed: false, userEmail: action.email, userName: action.name, userRequest: false };
        }
        case GET_USER_FAILED: {
          return { ...state, userFailed: true, userRequest: false };
        }
        case AUTHORIZE_USER: {
            return { ...state, isAuthorized: true };
          }
        case RENEW_PASSWORD_REQUEST: {
            return {
              ...state,
              passwordRequest: true
            };
        }
        case RENEW_PASSWORD_SUCCESS: {
            return { ...state, passwordFailed: false, message: action.message, passwordRequest: false };
        }
        case RENEW_PASSWORD_FAILED: {
            return { ...state, passwordFailed: true, passwordRequest: false };
        }
        default: {
            return state;
        }
    }
}