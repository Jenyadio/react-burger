import { getUserDataRequest, updateUserDataRequest, saveTokens, refreshTokenRequest} from "../../utils/burger-api";
import { getCookie, setCookie } from "../../utils/cookie";
import { AppDispatch } from "../..";
export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';
export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED'; 

export type GetUserRequestAction = {
  readonly type: typeof GET_USER_REQUEST;
}

export type GetUserSuccessAction = {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: {
    name: string;
    email: string;
    password: string;
  };
}

export type GetUserFailedAction = {
  readonly type: typeof GET_USER_FAILED;
  readonly message: string;
}

export type UpdateUserRequestAction = {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export type UpdateUserSuccessAction = {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: {
    name: string;
    email: string;
    password: string | number;
  };
}

export type UpdateUserFailedAction = {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly message: string;
}

export type UserActions = GetUserRequestAction | GetUserSuccessAction | GetUserFailedAction | UpdateUserRequestAction | UpdateUserSuccessAction | UpdateUserFailedAction;

export const getUserData = () => {
    return function(dispatch: AppDispatch) {
      dispatch({
        type: GET_USER_REQUEST
      });
      getUserDataRequest().then(res => {
        console.log(res)
          dispatch({
            type: GET_USER_SUCCESS,
            payload: {
              name: res.user.name,
              email: res.user.email,
              password: String(getCookie('password'))
            },
          });
         localStorage.setItem('userEmail', res.user.email);
         localStorage.setItem('userName', res.user.name);
      })
      .catch((e) => {
        if (e.message === 'jwt expired') {
          dispatch(refreshToken(getUserData()));
         } else {
          dispatch({
            type: GET_USER_FAILED,
            message: e.message
          });
         }
      })
    };
  }

  export const updateUserData = ({name, email, password}: {name: string; email: string; password: string | number}) => {
    return function(dispatch: AppDispatch) {
      dispatch({
        type: UPDATE_USER_REQUEST
      });
      updateUserDataRequest({name, email, password}).then(res => {
        console.log(res)
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: {
              name: res.user.name,
              email: res.user.email,
              password: password
            }
          });
         localStorage.setItem('userEmail', res.user.email);
         localStorage.setItem('userName', res.user.name);
         setCookie("password", password);
      })
      .catch((e) => {
        if (e.message === 'jwt expired') {
          dispatch(refreshToken(updateUserData({name, email, password})));
         } else {
          dispatch({
            type: UPDATE_USER_FAILED,
            message: e.message
          });
         }
      })
    };
  }

  const refreshToken = (afterRefresh: { (dispatch: AppDispatch): void; (dispatch: AppDispatch): void; }) => (dispatch: AppDispatch) => {
    refreshTokenRequest()
     .then((res) => {
      saveTokens(res.refreshToken, res.accessToken);
      dispatch(afterRefresh);
     })
   };
