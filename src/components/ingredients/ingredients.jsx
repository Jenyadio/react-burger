import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Item from "../item/item";
import ingredientsStyles from "../../components/ingredients/ingredients.module.css";
import { useSelector } from "react-redux";
function Ingredients({ name, type, id }) {
  const items = useSelector((store) => store.burgerIngredients.items);

  const list = useMemo(
    () => items.filter((item) => item.type === type),
    [items]
  );

  return (
    <article data-section id={id}>
      <h2
        className={`${ingredientsStyles.header} pt-10 text text_type_main-medium`}
        id={id}
      >
        {name}
      </h2>
      <div className={`${ingredientsStyles.box} mt-6 ml-4 mr-4`}>
        {list.map((item, index) => (
          <Item key={index} {...item} />
        ))}
      </div>
    </article>
  );
}

Ingredients.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Ingredients;
