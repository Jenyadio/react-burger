import { RootState } from "..";

export const burgerIngredients = (store: RootState) => store.burgerIngredients;
export const burgerItems = (store: RootState) => store.burgerIngredients.items;

export const constructorIngredients = (store: RootState) => store.constructorIngredients;
export const draggedConstructorIngredients = (store: RootState) => store.constructorIngredients.draggedIngredients;
export const totalIngredients = (store: RootState) => store.constructorIngredients.totalConstructorIngredients;

export const orderDetails = (store: RootState) => store.orderDetails;
export const orderNumber = (store: RootState) => store.orderDetails.orderNumber;

export const auth = (store: RootState) => store.auth;
export const authLoginSuccess = (store: RootState) => store.auth.loginSuccess;
export const authStep = (store: RootState) => store.auth.step;

export const userInfo = (store: RootState) => store.userInfo;
export const userData = (store: RootState) => store.userInfo.user;
