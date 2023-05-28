export const burgerIngredients = store => store.burgerIngredients;
export const burgerItems = store => store.burgerIngredients.items;

export const constructorIngredients = store => store.constructorIngredients;
export const draggedConstructorIngredients = store => store.constructorIngredients.draggedIngredients;
export const ingredientDetailsData = store => store.ingredientDetails.data;
export const totalIngredients = store => store.constructorIngredients.totalConstructorIngredients;

export const orderDetails = store => store.orderDetails;
export const orderNumber = store => store.orderDetails.orderNumber;