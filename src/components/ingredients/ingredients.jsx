import React from "react";
import PropTypes from "prop-types";
import Item from "../item/item";
import ingredientsStyles from "../../components/ingredients/ingredients.module.css";
import dataStructure from "../../utils/data-proptype-structure";
function Ingredients({ data, name, type, id }) {
  const list = data.filter((item) => item.type === type);

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
          <Item
            key={index}
            {...item}
          />
        ))}
      </div>
    </article>
  );
}

Ingredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(dataStructure).isRequired).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Ingredients;
