export const totalPriceSelector = state => {
    const {
      constructorIngredients: { selectedBun, draggedIngredients },
    } = state;
    const ingredientsPrice = draggedIngredients.reduce(
        (acc, item) => acc + item.price, 0
      );
      const total = selectedBun.price * 2 + ingredientsPrice;
      return total;
  };