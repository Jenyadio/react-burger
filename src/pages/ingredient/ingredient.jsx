import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ingredient.module.css";
import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { getItems } from "../../services/actions/burger-ingredients";

const IngredientPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const items = useSelector((store) => store.burgerIngredients.items);

  return (
    <section className={styles.main}>
      <h2 className="text text_type_main-large mb-6">Детали ингредиента</h2>
      {items
        .filter((item) => item._id === id)
        .map((item) => (
          <IngredientDetails ingredient={item} key={id} />
        ))}
    </section>
  );
};

export default IngredientPage;
