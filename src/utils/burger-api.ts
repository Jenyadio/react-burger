import { setCookie, getCookie } from "./cookie";

type UserData = {
  email?: string;
  password?: number;
  name?: string;
  token?: string;
}

const NORMA_API = "https://norma.nomoreparties.space/api";

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((e: Error) => Promise.reject(e))
};

const checkSuccess = (res: { success: boolean } & any) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = async (endpoint: string, options?: RequestInit) => {
  return fetch(`${NORMA_API}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess)
};

export const getIngredients = () => {
    return request('/ingredients')
}
 
export const sendRequest = (body: string[]) => {
    return request(`/orders`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: body,
      }),
    })
}

export const registerRequest = ({email, password, name,}: UserData) => {
  return request(`/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, 
      password, 
      name,
    })
  })
};

export const loginRequest = ({email, password}: UserData) => {
  return request(`/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email, 
        password, 
    }) 
  })
};

export const restorePasswordRequest = ({email}: UserData) => {
  return request(`/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email 
    }) 
  })
};

export const resetPasswordRequest = ({password, token}: UserData) => {
  return request(`/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        password, 
        token,
    }) 
  })
};

export const logoutRequest = () => {
  return request(`/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"), 
    }) 
  })
};

export const saveTokens = (refreshToken: string, accessToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const refreshTokenRequest = () => {
  return request(`/auth/token`, {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json;charset=utf-8'
   },
   body: JSON.stringify({
    token: localStorage.getItem('refreshToken')
   })
  })
 }

export const getUserDataRequest = () => {
  return request(`/auth/user`, {
    headers: {
      authorization: String(getCookie("accessToken")),
    },
  })
}

export const updateUserDataRequest = ({name, email, password}: UserData) => {
  return request(`/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: String(getCookie("accessToken")),
    },
    body: JSON.stringify({
      name,
      email,
      password
     })
  })
}