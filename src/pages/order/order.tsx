import React, { FC, useMemo, useEffect } from "react";
import styles from "./order.module.css";
import { FeedOrderDetails } from "../../components/feed-order-details/feed-order-details";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/dispatch-selector-hooks";
import { useAppDispatch } from "../../hooks/dispatch-selector-hooks";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/websocket";
import { wsUrl } from "../../services/actions/websocket";
import { burgerItems } from "../../selectors/selectors";
import { Card } from "../../types/ingredient";
import { getOrderByNumber } from "../../services/actions/order-details";

export const OrderPage = () => {
  const { id } = useParams();
  const userOrder = useAppSelector((store) => store.orderDetails.userOrder);
  const items = useAppSelector(burgerItems);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrderByNumber(Number(id)));
  }, [dispatch, id]);

  const orderIngredients = useMemo(() => {
    return userOrder?.ingredients.map(
      (item) => items.filter((ingredient) => ingredient._id === item)[0]
    );
  }, [items, userOrder]);

  type Counter = {
    [key: string]: number;
  };

  const countIngredients = orderIngredients?.reduce(
    (acc: Counter, item: Card) => {
      acc[item._id] = (acc[item._id] || 0) + 1;
      return acc;
    },
    {}
  );

  const totalPrice = useMemo(() => {
    return orderIngredients?.reduce((acc, item) => acc + item.price, 0);
  }, [orderIngredients]);

  return (
    <section className={styles.main}>
      <FeedOrderDetails
        name={userOrder?.name}
        ingredients={orderIngredients}
        number={userOrder?.number}
        createdAt={String(userOrder?.createdAt)}
        status={userOrder?.status}
        totalPrice={totalPrice}
        countIngredients={countIngredients}
      />
    </section>
  );
};
