import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "../../components/burger-constructor/burger-constructor.module.css";
import OrderTotal from "../order-total/order-total";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ADD_DRAGGED_INGREDIENT,
  SET_TOTAL_INGREDIENTS,
} from "../../services/actions/constructor-ingredients";
import ConstructorElementWrapper from "../constructor-element-wrapper/constructor-element-wrapper";
import uuid from "react-uuid";
import { constructorIngredients } from "../../selectors/selectors";
function BurgerConstructor({ active, onClose, onOpen }) {
  const dispatch = useDispatch();
  const { draggedIngredients, selectedBun, totalConstructorIngredients } =
    useSelector(constructorIngredients);
  const [ingredientsId, setIngredientsId] = useState([]);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch({
        type: ADD_DRAGGED_INGREDIENT,
        item: {
          ...item,
          dragId: uuid(),
        },
      });
      dispatch({
        type: SET_TOTAL_INGREDIENTS,
      });
    },
  });

  useEffect(() => {
    dispatch({
      type: SET_TOTAL_INGREDIENTS,
    });
  }, [draggedIngredients, selectedBun, dispatch]);

  useMemo(() => {
    const id = totalConstructorIngredients.map((item) => item._id);
    setIngredientsId(id);
  }, [totalConstructorIngredients]);

  return (
    <section ref={dropTarget}>
      <div className={`${constructorStyles.box} mt-25 mb-10`}>
        {selectedBun.type ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedBun.name} (верх)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        ) : null}
        <div className={`${constructorStyles.boxInside} pr-2`}>
          {draggedIngredients.length ? (
            draggedIngredients.map((item, index) => (
              <ConstructorElementWrapper
                key={item.dragId}
                index={index}
                item={item}
              />
            ))
          ) : (
            <p className="pl-15 pt-8 pb-8">
              Перетащите сюда булку и ингредиенты бургера
            </p>
          )}
        </div>
        {selectedBun.type ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedBun.name} (низ)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        ) : null}
      </div>
      <OrderTotal
        ingredientsId={ingredientsId}
        active={active}
        onClose={onClose}
        onOpen={onOpen}
      />
    </section>
  );
}

BurgerConstructor.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default BurgerConstructor;
