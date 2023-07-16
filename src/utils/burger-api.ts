import { setCookie, getCookie } from "./cookie";
import { Card } from "../types/ingredient";
import { WsOrders } from "../types/websocket";

type UserData = {
  email?: string;
  password?: number | string;
  name?: string;
  token?: string;
};

type ServerResponse<T> = {
  success: boolean;
} & T;

type IngredientsResponse = ServerResponse<{
  data: Card[];
}>;

type OrderResponse = ServerResponse<{
  name: string;
  order: { number: number };
}>;

type AuthResponse = ServerResponse<{
  name: string;
  user: { email: string; name: string };
  accessToken?: string;
  refreshToken?: string;
}>;

type PasswordResponse = ServerResponse<{
  message: string;
}>;

type LogoutResponse = ServerResponse<{
  message: string;
}>;

type RefreshTokenResponse = ServerResponse<{
  accessToken: string;
  refreshToken: string;
}>;

type UserOrderResponse = ServerResponse<{
  orders: WsOrders;
}>;

const NORMA_API = "https://norma.nomoreparties.space/api";

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((e: Error) => Promise.reject(e));
};

const checkSuccess = (res: { success: boolean } & any) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(`${NORMA_API}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const getIngredients = () => {
  return request<IngredientsResponse>("/ingredients");
};

export const orderRequest = (body: string[]) => {
  return request<OrderResponse>(`/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: String(`Bearer ${getCookie("accessToken")}`),
    },
    body: JSON.stringify({
      ingredients: body,
    }),
  });
};

export const orderByNumberRequest = (number: number) => {
  return request<UserOrderResponse>(`/orders/${number}`);
};

export const registerRequest = ({ email, password, name }: UserData) => {
  return request<AuthResponse>(`/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
};

export const loginRequest = ({ email, password }: UserData) => {
  return request<AuthResponse>(`/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const restorePasswordRequest = ({ email }: UserData) => {
  return request<PasswordResponse>(`/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
};

export const resetPasswordRequest = ({ password, token }: UserData) => {
  return request<PasswordResponse>(`/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token,
    }),
  });
};

export const logoutRequest = () => {
  return request<LogoutResponse>(`/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const saveTokens = (refreshToken: string, accessToken: string) => {
  setCookie("accessToken", String(accessToken));
  localStorage.setItem("refreshToken", refreshToken);
};

export const refreshTokenRequest = () => {
  return request<RefreshTokenResponse>(`/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const getUserDataRequest = () => {
  return request<AuthResponse>(`/auth/user`, {
    headers: {
      authorization: String(`Bearer ${getCookie("accessToken")}`),
    },
  });
};

export const updateUserDataRequest = ({ name, email, password }: UserData) => {
  return request<AuthResponse>(`/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: String(`Bearer ${getCookie("accessToken")}`),
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};
