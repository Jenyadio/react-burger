import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import itemStyles from "../../components/item/item.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch } from "react-redux";
import {
  ADD_DATA,
  DELETE_DATA,
} from "../../services/actions/ingredient-details";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

function Item({
  _id,
  image,
  type,
  price,
  name,
  image_large,
  calories,
  proteins,
  fat,
  carbohydrates,
  count,
}) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const { totalConstructorIngredients } = useSelector(
    (store) => store.constructorIngredients
  );

  useMemo(() => {
    const quantity = totalConstructorIngredients.filter(
      (item) => item._id === _id
    ).length;
    totalConstructorIngredients.find((item) =>
      item._id === _id && item.type === "bun"
        ? (count = 2)
        : item._id === _id && item.type !== "bun"
        ? (count = quantity)
        : (count = 0)
    );
  }, [totalConstructorIngredients]);

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { _id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const handleOpenModal = () => {
    setActive(true);
    dispatch({
      type: ADD_DATA,
      data: {
        image: image_large,
        name,
        calories,
        proteins,
        fat,
        carbohydrates,
        type,
      },
    });
  };

  const handleCloseModal = () => {
    setActive(false);
    dispatch({
      type: DELETE_DATA,
    });
  };

  return (
    <>
      <div
        className={`${itemStyles.box} mb-8`}
        onClick={handleOpenModal}
        ref={dragRef}
        style={{ opacity }}
      >
        {count !== 0 && (
          <Counter count={count} size="default" extraClass="m-1" />
        )}
        <img className="pr-4 pl-4" src={image} alt={type} />
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
        <Modal header="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

Item.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
};

export default Item;
