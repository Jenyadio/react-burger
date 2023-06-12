import React from "react";
import { useSelector } from "react-redux";
import { ingredientDetailsData } from "../../selectors/selectors";
import CaloriesItem from "../../components/calories-item/calories-item";
import styles from "./ingredient.module.css";

const IngredientPage = () => {
  const data = useSelector(ingredientDetailsData);

  return (
    <main className={styles.main}>
      <img src={data.image} alt={data.type} />
      <p className="text text_type_main-medium mt-4 mb-8">{data.name}</p>
      <div className={styles.calories}>
        <CaloriesItem name="Калории, ккал" value={data.calories} />
        <CaloriesItem name="Белки, г" value={data.proteins} />
        <CaloriesItem name="Жиры, г" value={data.fat} />
        <CaloriesItem name="Углеводы, г" value={data.carbohydrates} />
      </div>
    </main>
  );
};

export default IngredientPage;
