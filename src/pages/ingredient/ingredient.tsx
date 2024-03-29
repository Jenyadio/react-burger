import styles from "./ingredient.module.css";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { burgerItems } from "../../selectors/selectors";
import { useAppSelector } from "../../hooks/dispatch-selector-hooks";

const IngredientPage = () => {
  const { id } = useParams();
  const items = useAppSelector(burgerItems);

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
