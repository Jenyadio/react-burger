import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { orderDetailsReducer } from './order-details';
import { constructorIngredientsReducer } from './constructor-ingredients';
import { authReducer } from './auth';
import { userInfoReducer } from './user';
import { wsReducer } from './websocket';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    orderDetails: orderDetailsReducer,
    auth: authReducer,
    userInfo: userInfoReducer,
    websocket: wsReducer,
  });