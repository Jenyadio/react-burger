import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from '../reducers/burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { constructorIngredientsReducer } from './constructor-ingredients';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer
  });

