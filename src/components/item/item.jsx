import React, { useState } from "react";
import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import itemStyles from "../../components/item/item.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function Item({
  image,
  type,
  price,
  name,
  image_large,
  calories,
  proteins,
  fat,
  carbohydrates,
}) {
  const [active, setActive] = useState(false);

  const handleOpenModal = () => {
    setActive(true);
  };

  const handleCloseModal = () => {
    setActive(false);
  };

  return (
    <>
      <div
        className={`${itemStyles.box} mb-8`}
        onClick={handleOpenModal}
      >
        <img
          className="pr-4 pl-4"
          src={image}
          alt={type}
        />
        <div className={`${itemStyles.price} mt-1 mb-1`}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p
          className={`${itemStyles.description} text text_type_main-default mb-6`}
        >
          {name}
        </p>
      </div>
      {active && (
        <Modal
          header="Детали ингредиента"
          onClose={handleCloseModal}
        >
          <IngredientDetails
            image={image_large}
            name={name}
            calories={calories}
            proteins={proteins}
            fat={fat}
            carbohydrates={carbohydrates}
            type={type}
          />
        </Modal>
      )}
    </>
  );
}

Item.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
};

export default Item;
