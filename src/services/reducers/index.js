import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { constructorIngredientsReducer } from './constructor-ingredients';
import { authReducer } from './auth';
import { userInfoReducer } from './user';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    auth: authReducer,
    userInfo: userInfoReducer,
  });