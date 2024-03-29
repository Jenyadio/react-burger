import React, { FC, useMemo } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import itemStyles from "../../components/item/item.module.css";
import { useDrag } from "react-dnd";
import { totalIngredients } from "../../selectors/selectors";
import { useLocation, Link } from "react-router-dom";
import { Card } from "../../types/ingredient";
import { useAppSelector } from "../../hooks/dispatch-selector-hooks";

type ItemProps = {
  item: Card;
};

export const Item: FC<ItemProps> = ({ item }) => {
  const totalConstructorIngredients = useAppSelector(totalIngredients);
  const location = useLocation();
  const id = item._id;

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
  }, [totalConstructorIngredients, item]);

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <Link
      to={{
        pathname: `/ingredient/${id}`,
      }}
      state={{ background: location, item }}
      className={itemStyles.link}
    >
      <div
        className={`${itemStyles.box} mb-8`}
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
    </Link>
  );
};
