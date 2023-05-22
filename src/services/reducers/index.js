import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from '../reducers/burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer
  });

