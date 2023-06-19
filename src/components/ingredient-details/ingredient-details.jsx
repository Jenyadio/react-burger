import React from "react";
import detailsStyles from "../../components/ingredient-details/ingredient-details.module.css";
import CaloriesItem from "../calories-item/calories-item";
import PropTypes from "prop-types";
import dataStructure from "../../utils/data-proptype-structure";
function IngredientDetails({ ingredient }) {
  return (
    <main className={detailsStyles.main}>
      <img src={ingredient.image_large} alt={ingredient.type} />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
      <div className={detailsStyles.calories}>
        <CaloriesItem name="Калории, ккал" value={ingredient.calories} />
        <CaloriesItem name="Белки, г" value={ingredient.proteins} />
        <CaloriesItem name="Жиры, г" value={ingredient.fat} />
        <CaloriesItem name="Углеводы, г" value={ingredient.carbohydrates} />
      </div>
    </main>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(dataStructure).isRequired,
};

export default IngredientDetails;
