import {registerRequest, loginRequest, restorePasswordRequest, resetPasswordRequest, logoutRequest } from "../../utils/burger-api";
import { setCookie, deleteCookie } from "../../utils/cookie";
import { AppDispatch } from "../..";
export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';
export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const RESTORE_PASSWORD_REQUEST: 'RESTORE_PASSWORD_REQUEST' = 'RESTORE_PASSWORD_REQUEST';
export const RESTORE_PASSWORD_SUCCESS: 'RESTORE_PASSWORD_SUCCESS' = 'RESTORE_PASSWORD_SUCCESS';
export const RESTORE_PASSWORD_FAILED: 'RESTORE_PASSWORD_FAILED' = 'RESTORE_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

type Register = {
  email: string;
  password: string | number;
  name: string;
  route: () => void;
}

type Login = {
  email: string;
  password: string | number;
}

type Restore = {
  email: string;
  route: () => void;
}

type Reset = {
  password: string | number;
  token: string;
  route: () => void;
}

export type RegisterRequestAction = {
  readonly type: typeof REGISTER_REQUEST;
}

export type RegisterSuccessAction = {
  readonly type: typeof REGISTER_SUCCESS;
}

export type RegisterFailedAction = {
  readonly type: typeof REGISTER_FAILED;
  readonly message: string;
}

export type LoginRequestAction = {
  readonly type: typeof LOGIN_REQUEST;
}

export type LoginSuccessAction = {
  readonly type: typeof LOGIN_SUCCESS;
}

export type LoginFailedAction = {
  readonly type: typeof LOGIN_FAILED;
  readonly message: string;
}

export type RestorePasswordRequestAction = {
  readonly type: typeof RESTORE_PASSWORD_REQUEST;
}

export type RestorePasswordSuccessAction = {
  readonly type: typeof RESTORE_PASSWORD_SUCCESS;
  readonly message: string;
  readonly password_step: number;
}

export type RestorePasswordFailedAction = {
  readonly type: typeof RESTORE_PASSWORD_FAILED;
  readonly message: string;
}

export type ResetPasswordRequestAction = {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export type ResetPasswordSuccessAction = {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly message: string;
}

export type ResetPasswordFailedAction = {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly message: string;
}

export type LogoutRequestAction = {
  readonly type: typeof LOGOUT_REQUEST;
}

export type LogoutSuccessAction = {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly message: string;
}

export type LogoutFailedAction = {
  readonly type: typeof LOGOUT_FAILED;
  readonly message: string;
}

export type AuthActions = RegisterRequestAction | RegisterSuccessAction | RegisterFailedAction | LoginRequestAction | LoginSuccessAction | LoginFailedAction | RestorePasswordRequestAction | RestorePasswordSuccessAction | RestorePasswordFailedAction | ResetPasswordRequestAction | ResetPasswordSuccessAction | ResetPasswordFailedAction | LogoutRequestAction | LogoutSuccessAction | LogoutFailedAction;


export const registerUser = ({email, password, name, route}: Register) => {
    return function(dispatch: AppDispatch) {
      dispatch({
        type: REGISTER_REQUEST
      }); 
      registerRequest({email, password, name}).then(res => {
        console.log(res)
          dispatch({
            type: REGISTER_SUCCESS,
          });
         let accessToken = res.accessToken;
         let refreshToken = res.refreshToken;
         setCookie('accessToken', String(accessToken));
         localStorage.setItem('refreshToken', String(refreshToken));
         route();
      })
      .catch((e) => {
        dispatch({
          type: REGISTER_FAILED,
          message: e.message
        });
      })
    };
  }

  export const loginUser = ({email, password}: Login) => {
    return function(dispatch: AppDispatch) {
      dispatch({
        type: LOGIN_REQUEST
      });
      loginRequest({email, password}).then(res => {
        console.log(res)
        dispatch({
          type: LOGIN_SUCCESS,
        });
         let accessToken = res.accessToken;
         let refreshToken = res.refreshToken;
         let userEmail = res.user.email;
         let userName = res.user.name;
         setCookie('accessToken', String(accessToken));
         setCookie("password", password);
         localStorage.setItem('refreshToken', String(refreshToken));
         localStorage.setItem('userEmail', userEmail);
         localStorage.setItem('userName', userName);
      })
      .catch((e) => {
        dispatch({
          type: LOGIN_FAILED,
          message: e.message
        });
      })
    };
  }

  export const restorePassword = ({email, route}: Restore) => {
    return function(dispatch: AppDispatch) {
      dispatch({
        type: RESTORE_PASSWORD_REQUEST
      });
      restorePasswordRequest({email}).then(res => {
        console.log(res)
          dispatch({
            type: RESTORE_PASSWORD_SUCCESS,
            message: res.message,
            password_step: 2,
          });
          route();
      })
      .catch((e) => {
        dispatch({
          type: RESTORE_PASSWORD_FAILED,
          message: e.message
        });
      })
    };
  }

  export const resetPassword = ({password, token, route}: Reset) => {
    return function(dispatch: AppDispatch) {
      dispatch({
        type: RESET_PASSWORD_REQUEST
      });
      resetPasswordRequest({password, token}).then(res => {
        console.log(res)
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            message: res.message,
          });
          route();
      })
      .catch((e) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
         message: e.message
        });
      })
    };
  }

  export const logoutUser = ({route}: {  route: () => void}) => {
    return function(dispatch: AppDispatch) {
      dispatch({
        type: LOGOUT_REQUEST,
      });
      logoutRequest().then(res => {
        console.log(res)
          dispatch({
            type: LOGOUT_SUCCESS,
            message: res.message,
          });
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userName');
          localStorage.removeItem('refreshToken');
          deleteCookie('password');
          deleteCookie('accessToken');
          route();
      })
      .catch((e) => {
        dispatch({
          type: LOGOUT_FAILED,
          message: e.message
        });
      })
    };
  }