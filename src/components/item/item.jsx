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
import dataStructure from "../../utils/data-proptype-structure";
import { totalIngredients } from "../../selectors/selectors";

function Item({ item }) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const totalConstructorIngredients = useSelector(totalIngredients);

  useMemo(() => {
    const quantity = totalConstructorIngredients.filter(
      (elem) => elem._id === item._id
    ).length;
    totalConstructorIngredients.find((elem) =>
      elem._id === item._id && elem.type === "bun"
        ? (item.count = 2)
        : elem._id === item._id && elem.type !== "bun"
        ? (item.count = quantity)
        : (item.count = 0)
    );
  }, [totalConstructorIngredients]);

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const handleOpenModal = () => {
    setActive(true);
    dispatch({
      type: ADD_DATA,
      data: {
        image: item.image_large,
        name: item.name,
        calories: item.calories,
        proteins: item.proteins,
        fat: item.fat,
        carbohydrates: item.carbohydrates,
        type: item.type,
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
        {item.count !== 0 && (
          <Counter count={item.count} size="default" extraClass="m-1" />
        )}
        <img className="pr-4 pl-4" src={item.image} alt={item.type} />
        <div className={`${itemStyles.price} mt-1 mb-1`}>
          <p className="text text_type_digits-default">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p
          className={`${itemStyles.description} text text_type_main-default mb-6`}
        >
          {item.name}
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
  item: PropTypes.shape(dataStructure).isRequired,
};

export default Item;
