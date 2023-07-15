import React from "react";
import styles from "../profile-orders/profile-orders.module.css";
import { useAppSelector } from "../../hooks/dispatch-selector-hooks";
import { FeedOrderCard } from "../feed-order-card/feed-order-card";

export const ProfileOrders = () => {
  const { orders } = useAppSelector((store) => store.websocket);

  return (
    <section className={styles.orders_container}>
      <div className={styles.orders}>
        {orders
          ?.sort((a, b) => b.number - a.number)
          .map((item) => (
            <FeedOrderCard key={item._id} order={item} />
          ))}
      </div>
    </section>
  );
};
