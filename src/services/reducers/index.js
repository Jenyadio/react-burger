import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from '../reducers/burger-ingredients';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
  });

