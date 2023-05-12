import React, { useMemo, useContext } from "react";
import PropTypes from "prop-types";
import Item from "../item/item";
import ingredientsStyles from "../../components/ingredients/ingredients.module.css";
import { DataContext } from "../../services/data-context";
function Ingredients({ name, type, id }) {
  const { state, setState } = useContext(DataContext);
  const data = state.data.data;

  const list = useMemo(() => data.filter((item) => item.type === type), [data]);

  return (
    <article>
      <h2
        className={`${ingredientsStyles.header} mt-10 text text_type_main-medium`}
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
