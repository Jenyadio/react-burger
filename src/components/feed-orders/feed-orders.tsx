import React from 'react'
import styles from "../feed-orders/feed-orders.module.css";
import { FeedOrderCard } from '../feed-order-card/feed-order-card';
import { useAppSelector } from '../../hooks/dispatch-selector-hooks';

export const FeedOrders = () => {

    const {orders} = useAppSelector(store => store.websocket)

  return (
    <section className={styles.orders_container}>
                <div className={styles.orders}>
                    {orders?.map((item) => (
                        <FeedOrderCard key={item._id} order={item} />
                    ))}
                </div>
    </section>
  )
}
