import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "../../components/burger-constructor/burger-constructor.module.css";
import OrderTotal from "../order-total/order-total";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  SET_INGREDIENTS,
  ADD_DRAGGED_INGREDIENT,
  SET_BUN,
  SET_TOTAL_INGREDIENTS,
  DELETE_DRUGGED_INGREDIENT,
} from "../../services/actions/constructor-ingredients";

function BurgerConstructor({ active, onClose, onOpen }) {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.burgerIngredients.items);

  const [ingredientsId, setIngredientsId] = useState([]);
  const { draggedIngredients, selectedBun } = useSelector(
    (store) => store.constructorIngredients
  );

  useEffect(() => {
    dispatch({
      type: SET_INGREDIENTS,
      ingredients: items,
    });
    dispatch({
      type: SET_BUN,
      bun: items[0],
    });
    dispatch({
      type: SET_TOTAL_INGREDIENTS,
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
  }, [draggedIngredients, selectedBun]);

  const deleteIngredient = (id) => {
    dispatch({
      type: DELETE_DRUGGED_INGREDIENT,
      id,
    });
  };

  useMemo(() => {
    const id = draggedIngredients.map((item) => item._id);
    setIngredientsId(id);
  }, [draggedIngredients]);

  return (
    <section>
      <div className={`${constructorStyles.box} mt-25 mb-10`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={selectedBun.name}
          price={selectedBun.price}
          thumbnail={selectedBun.image}
        />
        <div className={`${constructorStyles.boxInside} pr-2`} ref={dropTarget}>
          {draggedIngredients.length ? (
            draggedIngredients.map((item, index) => (
              <div key={index} className={constructorStyles.container}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  handleClose={() => deleteIngredient(index)}
                />
              </div>
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
