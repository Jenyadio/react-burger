import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED } from "../actions/user";

const initialState = {
    user: {},
    getUserRequest: false,
    getUserFailed: false,

    updateUserRequest: false,
    updateUserFailed: false,

    errMessage: null
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
          return { ...state, getUserFailed: false, getUserRequest: false, user: action.payload };
        }
        case GET_USER_FAILED: {
          return { ...state, getUserFailed: true, getUserRequest: false, errMessage: action.message };
        }
        case UPDATE_USER_REQUEST: {
          return {
            ...state,
            updateUserRequest: true
          };
        }
        case UPDATE_USER_SUCCESS: {
          return { ...state, updateUserFailed: false, updateUserRequest: false, user: action.payload };
        }
        case UPDATE_USER_FAILED: {
          return { ...state, updateUserFailed: true, updateUserRequest: false, errMessage: action.message };
        }
        default: {
            return state;
        }
    }
}