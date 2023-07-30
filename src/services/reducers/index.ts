import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients/burger-ingredients";
import { orderDetailsReducer } from "./order-details/order-details";
import { constructorIngredientsReducer } from "./constructor-ingredients/constructor-ingredients";
import { authReducer } from "./auth/auth";
import { userInfoReducer } from "./user/user";
import { wsReducer } from "./websocket/websocket";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  orderDetails: orderDetailsReducer,
  auth: authReducer,
  userInfo: userInfoReducer,
  websocket: wsReducer,
});
