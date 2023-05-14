import React from "react";
import PropTypes from "prop-types";
import detailsStyles from "../../components/ingredient-details/ingredient-details.module.css";
import CaloriesItem from "../calories-item/calories-item";

function IngredientDetails({
  image,
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
  type,
}) {
  return (
    <main className={detailsStyles.main}>
      <img
        src={image}
        alt={type}
      />
      <p className="text text_type_main-medium mt-4 mb-8">{name}</p>
      <div className={detailsStyles.calories}>
        <CaloriesItem
          name="Калории, ккал"
          value={calories}
        />
        <CaloriesItem
          name="Белки, г"
          value={proteins}
        />
        <CaloriesItem
          name="Жиры, г"
          value={fat}
        />
        <CaloriesItem
          name="Углеводы, г"
          value={carbohydrates}
        />
      </div>
    </main>
  );
}

IngredientDetails.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientDetails;
