import { getUserDataRequest, updateUserDataRequest, saveTokens, refreshTokenRequest} from "../../utils/burger-api";
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export function getUserData() {
    return function(dispatch) {
      dispatch({
        type: GET_USER_REQUEST
      });
      getUserDataRequest().then(res => {
        console.log(res)
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
          });
         localStorage.setItem('userEmail', res.user.email);
         localStorage.setItem('userName', res.user.name);
        } else {
          dispatch({
            type: GET_USER_FAILED
          });
        }
      })
      .catch((e) => {
        if (e.message === 'jwt expired') {
          dispatch(refreshToken(getUserData()));
         } else {
          dispatch({
            type: GET_USER_FAILED
          });
         }
      })
    };
  }

  export function updateUserData(userName, userEmail, userPassword) {
    return function(dispatch) {
      dispatch({
        type: UPDATE_USER_REQUEST
      });
      updateUserDataRequest(userName, userEmail, userPassword).then(res => {
        console.log(res)
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
          });
         localStorage.setItem('userEmail', res.user.email);
         localStorage.setItem('userName', res.user.name);
        } else {
          dispatch({
            type: UPDATE_USER_FAILED
          });
        }
      })
      .catch((e) => {
        if (e.message === 'jwt expired') {
          dispatch(refreshToken(updateUserData()));
         } else {
          dispatch({
            type: UPDATE_USER_FAILED
          });
         }
      })
    };
  }

  const refreshToken = (afterRefresh) => (dispatch) => {
    refreshTokenRequest()
     .then((res) => {
      console.log(res)
      saveTokens(res.refreshToken, res.accessToken);
      dispatch(afterRefresh);
     })
   };