import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "../../components/burger-constructor/burger-constructor.module.css";
import OrderTotal from "../order-total/order-total";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  SET_INGREDIENTS,
  ADD_DRAGGED_INGREDIENT,
  SET_BUN,
  SET_TOTAL_INGREDIENTS,
} from "../../services/actions/constructor-ingredients";
import ConstructorElementWrapper from "../constructor-element-wrapper/constructor-element-wrapper";
function BurgerConstructor({ active, onClose, onOpen }) {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.burgerIngredients.items);

  const [ingredientsId, setIngredientsId] = useState([]);
  const { draggedIngredients, selectedBun, totalConstructorIngredients } =
    useSelector((store) => store.constructorIngredients);

  useEffect(() => {
    dispatch({
      type: SET_INGREDIENTS,
      ingredients: items,
    });
    dispatch({
      type: SET_BUN,
      bun: {
        name: "Булка",
        price: 0,
        image: items[0].image,
      },
    });
  }, []);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId) {
      dispatch({
        type: ADD_DRAGGED_INGREDIENT,
        ...itemId,
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
        <ConstructorElement
          type="top"
          isLocked={true}
          text={selectedBun.name}
          price={selectedBun.price}
          thumbnail={selectedBun.image}
        />
        <div className={`${constructorStyles.boxInside} pr-2`}>
          {draggedIngredients.length ? (
            draggedIngredients.map((item, index) => (
              <ConstructorElementWrapper
                key={index}
                index={index}
                item={item}
              />
            ))
          ) : (
            <p className="pl-15 pt-8 pb-8">
              Перетащите сюда ингредиенты бургера
            </p>
          )}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={selectedBun.name}
          price={selectedBun.price}
          thumbnail={selectedBun.image}
        />
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
