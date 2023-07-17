import React, { useEffect } from "react";
import styles from "../feed/feed.module.css";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/websocket";
import { useAppDispatch } from "../../hooks/dispatch-selector-hooks";
import { FeedOrders } from "../../components/feed-orders/feed-orders";
import { FeedInfo } from "../../components/feed-info/feed-info";
import { wsUrl } from "../../services/actions/websocket";

export const FeedPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: `${wsUrl}/all` });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <h1>Лента заказов</h1>
      <div className={styles.body}>
        <FeedOrders />
        <FeedInfo />
      </div>
    </main>
  );
};
