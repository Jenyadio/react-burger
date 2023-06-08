import {registerRequest, loginRequest, restorePasswordRequest, resetPasswordRequest, logoutRequest } from "../../utils/burger-api";
import { setCookie } from "../../utils/cookie";
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const AUTHORIZE_USER = 'AUTHORIZE_USER';
export const RESTORE_PASSWORD_REQUEST = 'RESTORE_PASSWORD_REQUEST';
export const RESTORE_PASSWORD_SUCCESS = 'RESTORE_PASSWORD_SUCCESS';
export const RESTORE_PASSWORD_FAILED = 'RESTORE_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export function registerUser(userEmail, userPassword, userName) {
    return function(dispatch) {
      dispatch({
        type: REGISTER_REQUEST
      }); 
      registerRequest(userEmail, userPassword, userName).then(res => {
        console.log(res)
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
          });
         let accessToken = res.accessToken;
         let refreshToken = res.refreshToken;
         setCookie('accessToken', accessToken);
         localStorage.setItem('refreshToken', refreshToken);
        } else {
          dispatch({
            type: REGISTER_FAILED
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: REGISTER_FAILED
        });
      })
    };
  }

  export function loginUser(userEmail, userPassword) {
    return function(dispatch) {
      dispatch({
        type: LOGIN_REQUEST
      });
      loginRequest(userEmail, userPassword).then(res => {
        console.log(res)
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
          });
          dispatch({
            type: AUTHORIZE_USER,
          });
         let accessToken = res.accessToken;
         let refreshToken = res.refreshToken;
         let userEmail = res.user.email;
         let userName = res.user.name;
         setCookie('accessToken', accessToken);
         localStorage.setItem('refreshToken', refreshToken);
         localStorage.setItem('userEmail', userEmail);
         localStorage.setItem('userName', userName);
        } else {
          dispatch({
            type: LOGIN_FAILED
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: LOGIN_FAILED
        });
      })
    };
  }

  export function restorePassword(userEmail) {
    return function(dispatch) {
      dispatch({
        type: RESTORE_PASSWORD_REQUEST
      });
      restorePasswordRequest(userEmail).then(res => {
        console.log(res)
        if (res && res.success) {
          dispatch({
            type: RESTORE_PASSWORD_SUCCESS,
            message: res.message,
          });
        } else {
          dispatch({
            type: RESTORE_PASSWORD_FAILED
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: RESTORE_PASSWORD_FAILED
        });
      })
    };
  }

  export function resetPassword(userPassword, userToken) {
    return function(dispatch) {
      dispatch({
        type: RESET_PASSWORD_REQUEST
      });
      resetPasswordRequest(userPassword, userToken).then(res => {
        console.log(res)
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            message: res.message,
          });
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
      })
    };
  }

  export function logoutUser() {
    return function(dispatch) {
      dispatch({
        type: LOGOUT_REQUEST,
      });
      logoutRequest().then(res => {
        console.log(res)
        if (res && res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
            message: res.message,
          });
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userName');
        } else {
          dispatch({
            type: LOGOUT_FAILED
          });
        }
      })
      .catch((e) => {
        console.log(e)
        dispatch({
          type: LOGOUT_FAILED
        });
      })
    };
  }