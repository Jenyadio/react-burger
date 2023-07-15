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

export const OrderPage = () => {
  const { id } = useParams();
  const { orders } = useAppSelector((store) => store.websocket);
  const items = useAppSelector(burgerItems);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: `${wsUrl}/all` });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const order = useMemo(() => {
    return orders?.filter((item) => item._id === id)[0];
  }, [orders, id]);

  const ingredients = useMemo(() => {
    return order?.ingredients.map(
      (item) => items.filter((ingredient) => ingredient._id === item)[0]
    );
  }, [order, items]);

  const totalPrice = useMemo(() => {
    return ingredients?.reduce((acc, item) => acc + item.price, 0);
  }, [ingredients]);

  return (
    <section className={styles.main}>
      <FeedOrderDetails
        name={order?.name}
        ingredients={ingredients}
        number={order?.number}
        createdAt={String(order?.createdAt)}
        status={order?.status}
        totalPrice={totalPrice}
      />
    </section>
  );
};
