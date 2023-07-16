import React, { useState, useMemo, useEffect, FC } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "../../components/burger-constructor/burger-constructor.module.css";
import { OrderTotal } from "../order-total/order-total";
import { useDrop } from "react-dnd";
import {
  ADD_DRAGGED_INGREDIENT,
  SET_TOTAL_INGREDIENTS,
} from "../../services/actions/constructor-ingredients";
import { ConstructorElementWrapper } from "../constructor-element-wrapper/constructor-element-wrapper";
import uuid from "react-uuid";
import { constructorIngredients } from "../../selectors/selectors";
import { Card } from "../../types/ingredient";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/dispatch-selector-hooks";

type BurgerConstructorProps = {
  active: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const BurgerConstructor: FC<BurgerConstructorProps> = ({
  active,
  onClose,
  onOpen,
}) => {
  const dispatch = useAppDispatch();
  const { draggedIngredients, selectedBun, totalConstructorIngredients } =
    useAppSelector(constructorIngredients);
  const [ingredientsId, setIngredientsId] = useState<string[]>([]);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: Card) {
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
        {selectedBun.length ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedBun[0].name} (верх)`}
            price={selectedBun[0].price}
            thumbnail={selectedBun[0].image}
          />
        ) : null}
        <div className={`${constructorStyles.boxInside} pr-2`}>
          {draggedIngredients.length ? (
            draggedIngredients.map((item, index: number) => (
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
        {selectedBun.length ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedBun[0].name} (низ)`}
            price={selectedBun[0].price}
            thumbnail={selectedBun[0].image}
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
};
