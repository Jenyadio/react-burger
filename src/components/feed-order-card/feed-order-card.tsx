import React, { FC, useMemo } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../feed-order-card/feed-order-card.module.css";
import { WsOrders } from "../../types/websocket";
import { useAppSelector } from "../../hooks/dispatch-selector-hooks";
import { burgerItems } from "../../selectors/selectors";
import { Link, useLocation } from "react-router-dom";
import { Card } from "../../types/ingredient";

type FeedOrderCardProps = {
  order: WsOrders;
};

type Counter = {
  [key: string]: number;
};

export const FeedOrderCard: FC<FeedOrderCardProps> = ({ order }) => {
  const { name, ingredients, number, createdAt, status } = order;
  const items = useAppSelector(burgerItems);
  const location = useLocation();
  const maxIngredientsShown = 5;

  const feedOrderIngredients = useMemo(() => {
    return ingredients
      .map((item) => items.filter((ingredient) => ingredient._id === item)[0])
      .filter((item) => item !== undefined);
  }, [ingredients, items]);

  const countIngredients = feedOrderIngredients?.reduce(
    (acc: Counter, item: Card) => {
      acc[item._id] = (acc[item._id] || 0) + 1;
      return acc;
    },
    {}
  );

  const totalPrice = useMemo(() => {
    return feedOrderIngredients.reduce(
      (acc, item) => acc + item.price * (item.type === "bun" ? 2 : 1),
      0
    );
  }, [feedOrderIngredients]);

  return (
    <Link
      to={{
        pathname: `${location.pathname}/${number}`,
      }}
      state={{
        background: location,
        name,
        number,
        feedOrderIngredients,
        countIngredients,
        createdAt,
        status,
        totalPrice,
      }}
      className={styles.card_link}
    >
      <div className={styles.orders_card}>
        <div className={styles.card_header}>
          <p className="text text_type_digits-default">{`#${number}`}</p>
          <p
            className="text text_type_main-default"
            style={{ color: "#8585AD" }}
          >
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <p className="text text_type_main-medium pb-6">{name}</p>
        <div className={styles.card_main}>
          <div className={styles.card_ingredients}>
            {feedOrderIngredients
              .slice(0, maxIngredientsShown)
              .map((item, index) => (
                <div
                  className={styles.card_ingredient}
                  key={index}
                  style={{ zIndex: `${maxIngredientsShown - index}` }}
                >
                  <img
                    src={item.image_mobile}
                    alt={item.name}
                    className={styles.card_img}
                  />
                </div>
              ))}
            {feedOrderIngredients.length > maxIngredientsShown ? (
              <div className={styles.card_ingredient} style={{ zIndex: "0" }}>
                <img
                  src={feedOrderIngredients[maxIngredientsShown].image_mobile}
                  alt={feedOrderIngredients[maxIngredientsShown].name}
                  className={styles.card_img_last}
                />
                <span
                  className={`${styles.count} text text_type_digits-default`}
                >{`+${
                  feedOrderIngredients.length - maxIngredientsShown
                }`}</span>
              </div>
            ) : null}
          </div>
          <div className={styles.card_price}>
            <p className="text text_type_main-medium mr-3 ml-6">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};
