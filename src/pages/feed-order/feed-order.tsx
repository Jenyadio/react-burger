import React, { FC, useMemo } from "react";
import styles from "./feed-order.module.css";
import { FeedOrderDetails } from "../../components/feed-order-details/feed-order-details";
import { Card } from "../../types/ingredient";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/dispatch-selector-hooks";
import { burgerItems } from "../../selectors/selectors";

export const FeedOrderPage = () => {
  const { id } = useParams();
  const items = useAppSelector(burgerItems);
  const { orders } = useAppSelector((store) => store.websocket);

  const orderIngredient = useMemo(() => {
    return items?.filter((item) => item._id === id);
  }, [items, id]);

  console.log(orders);
  console.log(id);

  return <section className={styles.main}></section>;
};
