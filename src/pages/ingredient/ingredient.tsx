import { useSelector } from "react-redux";
import styles from "./ingredient.module.css";
import { useParams } from "react-router-dom";
import {IngredientDetails} from "../../components/ingredient-details/ingredient-details";
import { burgerItems } from "../../selectors/selectors";
import { Card } from '../../types/ingredient'

const IngredientPage = () => {
  const { id } = useParams();
  const items = useSelector(burgerItems);

  return (
    <section className={styles.main}>
      <h2 className="text text_type_main-large mb-6">Детали ингредиента</h2>
      {items
        .filter((item: Card) => item._id === id)
        .map((item: Card) => (
          <IngredientDetails ingredient={item} key={id} />
        ))}
    </section>
  );
};

export default IngredientPage;
