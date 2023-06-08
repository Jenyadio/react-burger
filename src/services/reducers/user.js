import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED } from "../actions/user";

const initialState = {
    getUserRequest: false,
    getUserFailed: false,

    updateUserRequest: false,
    updateUserFailed: false,
}

export const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST: {
          return {
            ...state,
            getUserRequest: true
          };
        }
        case GET_USER_SUCCESS: {
          return { ...state, getUserFailed: false, getUserRequest: false };
        }
        case GET_USER_FAILED: {
          return { ...state, getUserFailed: true, getUserRequest: false };
        }
        case UPDATE_USER_REQUEST: {
          return {
            ...state,
            updateUserRequest: true
          };
        }
        case UPDATE_USER_SUCCESS: {
          return { ...state, updateUserFailed: false, updateUserRequest: false };
        }
        case UPDATE_USER_FAILED: {
          return { ...state, updateUserFailed: true, updateUserRequest: false };
        }
        default: {
            return state;
        }
    }
}