import { ADD_DATA, DELETE_DATA } from "../actions/ingredient-details";

const initialState = {
    data: {},
};

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case DELETE_DATA: {
            return {
                ...state,
                data: {}
            }
        }
        default: {
            return state;
        }
    }
} 