import {registerRequest, loginRequest, forgotPasswordRequest, resetPasswordRequest} from "../../utils/burger-api";
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const AUTHORIZE_USER = 'AUTHORIZE_USER';
export const RENEW_PASSWORD_REQUEST = 'RENEW_PASSWORD_REQUEST';
export const RENEW_PASSWORD_SUCCESS = 'RENEW_PASSWORD_SUCCESS';
export const RENEW_PASSWORD_FAILED = 'RENEW_PASSWORD_FAILED';

export function getNewUser(userEmail, userPassword, userName) {
    return function(dispatch) {
      dispatch({
        type: GET_USER_REQUEST
      });
      registerRequest(userEmail, userPassword, userName).then(res => {
        console.log(res)
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            email: res.user.email,
            name: res.user.name
          });
         let accessToken = res.accessToken;
         let refreshToken = res.refreshToken;
         localStorage.setItem('token', accessToken);
         localStorage.setItem('refreshToken', refreshToken);
        } else {
          dispatch({
            type: GET_USER_FAILED
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: GET_USER_FAILED
        });
      })
    };
  }

  export function getOldUser(userEmail, userPassword) {
    return function(dispatch) {
      dispatch({
        type: GET_USER_REQUEST
      });
      loginRequest(userEmail, userPassword).then(res => {
        console.log(res)
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            email: res.user.email,
            name: res.user.name
          });
          dispatch({
            type: AUTHORIZE_USER,
          });
         let accessToken = res.accessToken;
         let refreshToken = res.refreshToken;
         localStorage.setItem('token', accessToken);
         localStorage.setItem('refreshToken', refreshToken);
        } else {
          dispatch({
            type: GET_USER_FAILED
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: GET_USER_FAILED
        });
      })
    };
  }

  export function getCodeToRenewPassword(userEmail) {
    return function(dispatch) {
      dispatch({
        type: RENEW_PASSWORD_REQUEST
      });
      forgotPasswordRequest(userEmail).then(res => {
        console.log(res)
        if (res && res.success) {
          dispatch({
            type: RENEW_PASSWORD_SUCCESS,
            message: res.message,
          });
        } else {
          dispatch({
            type: RENEW_PASSWORD_FAILED
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: RENEW_PASSWORD_FAILED
        });
      })
    };
  }

  export function resetPassword(userPassword, userToken) {
    return function(dispatch) {
      dispatch({
        type: RENEW_PASSWORD_REQUEST
      });
      resetPasswordRequest(userPassword, userToken).then(res => {
        console.log(res)
        if (res && res.success) {
          dispatch({
            type: RENEW_PASSWORD_SUCCESS,
            message: res.message,
          });
        } else {
          dispatch({
            type: RENEW_PASSWORD_FAILED
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: RENEW_PASSWORD_FAILED
        });
      })
    };
  }