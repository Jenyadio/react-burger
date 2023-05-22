import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from '../reducers/burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer
  });

