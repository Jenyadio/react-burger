import React from "react";
import PropTypes from "prop-types";
import caloriesStyles from "../../components/calories-item/calories-item.module.css";

function CaloriesItem({ name, value }) {
  return (
    <div className={caloriesStyles.box}>
      <p className="text text_type_main-default text_color_inactive">{name}</p>
      <p className="text text_type_digits-default text_color_inactive">
        {value}
      </p>
    </div>
  );
}

CaloriesItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default CaloriesItem;
