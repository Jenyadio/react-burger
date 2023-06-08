import { setCookie, getCookie } from "./cookie";

const NORMA_API = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((e) => Promise.reject(e))
};

export default async function getIngredients() {
    return await fetch(`${NORMA_API}/ingredients`)
     .then(checkResponse)
}
 
export async function sendRequest(method, body) {
    return await fetch(`${NORMA_API}/orders`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: body,
      }),
    })
    .then(checkResponse)
}

export async function registerRequest(userEmail, userPassword, userName) {
  return await fetch(`${NORMA_API}/auth/register`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
        email: userEmail, 
        password: userPassword, 
        name: userName 
    })
  })
  .then(checkResponse)
};

export async function loginRequest(userEmail, userPassword) {
  return await fetch(`${NORMA_API}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
        email: userEmail, 
        password: userPassword, 
    }) 
  })
  .then(checkResponse)
};

export async function restorePasswordRequest(userEmail) {
  return await fetch(`${NORMA_API}/password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
        email: userEmail, 
    }) 
  })
  .then(checkResponse)
};

export async function resetPasswordRequest(userPassword, userToken) {
  return await fetch(`${NORMA_API}/password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
        password: userPassword, 
        token: userToken,
    }) 
  })
  .then(checkResponse)
};

export async function logoutRequest() {
  return await fetch(`${NORMA_API}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"), 
    }) 
  })
  .then(checkResponse)
};

export const saveTokens = (refreshToken, accessToken) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const refreshTokenRequest = () => {
  return fetch(`${NORMA_API}/auth/token`, {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json;charset=utf-8'
   },
   body: JSON.stringify({
    token: localStorage.getItem('refreshToken')
   })
  })
   .then(checkResponse)
 }

export async function getUserDataRequest() {
  return await fetch(`${NORMA_API}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie("accessToken"),
    },
  })
   .then(checkResponse)
}

export async function updateUserDataRequest(userName, userEmail, userPassword) {
  return await fetch(`${NORMA_API}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({
      name: userName,
      email: userEmail,
      password: userPassword
     })
  })
   .then(checkResponse)
}