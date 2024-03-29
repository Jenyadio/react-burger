import React, { FC } from "react";
import detailsStyles from "../../components/ingredient-details/ingredient-details.module.css";
import { CaloriesItem } from "../calories-item/calories-item";
import { Card } from "../../types/ingredient";

type IngredientDetailsProps = {
  ingredient: Card;
};

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  ingredient,
}) => {
  return (
    <main className={detailsStyles.main}>
      <img src={ingredient.image_large} alt={ingredient.type} />
      <p
        className="text text_type_main-medium mt-4 mb-8"
        data-test="ingredient-name"
      >
        {ingredient.name}
      </p>
      <div className={detailsStyles.calories}>
        <CaloriesItem name="Калории, ккал" value={ingredient.calories} />
        <CaloriesItem name="Белки, г" value={ingredient.proteins} />
        <CaloriesItem name="Жиры, г" value={ingredient.fat} />
        <CaloriesItem name="Углеводы, г" value={ingredient.carbohydrates} />
      </div>
    </main>
  );
};
