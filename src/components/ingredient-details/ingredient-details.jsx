import React from "react";
import detailsStyles from "../../components/ingredient-details/ingredient-details.module.css";
import CaloriesItem from "../calories-item/calories-item";
import { useSelector } from "react-redux";
import { ingredientDetailsData } from "../../selectors/selectors";

function IngredientDetails() {
  const data = useSelector(ingredientDetailsData);

  return (
    <main className={detailsStyles.main}>
      <img src={data.image} alt={data.type} />
      <p className="text text_type_main-medium mt-4 mb-8">{data.name}</p>
      <div className={detailsStyles.calories}>
        <CaloriesItem name="Калории, ккал" value={data.calories} />
        <CaloriesItem name="Белки, г" value={data.proteins} />
        <CaloriesItem name="Жиры, г" value={data.fat} />
        <CaloriesItem name="Углеводы, г" value={data.carbohydrates} />
      </div>
    </main>
  );
}

export default IngredientDetails;
