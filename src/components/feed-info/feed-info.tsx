import React, { useMemo } from "react";
import { useAppSelector } from "../../hooks/dispatch-selector-hooks";
import styles from "../feed-info/feed-info.module.css";

export const FeedInfo = () => {
  const { orders, total, totalToday } = useAppSelector(
    (store) => store.websocket
  );

  const maxOrdersShown = 20;

  const { done, preparing } = useMemo(() => {
    const done: number[] = [];
    const preparing: number[] = [];

    orders?.forEach((item) =>
      item.status === "done"
        ? done.push(item.number)
        : preparing.push(item.number)
    );

    return { done, preparing };
  }, [orders]);

  return (
    <section className={styles.info_container}>
      <div className={styles.info_orders}>
        <div className={styles.done_prep}>
          <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
          <div className={styles.column}>
            {done.slice(0, maxOrdersShown).map((item, index) => (
              <p
                className="text text_type_digits-default mb-2"
                style={{ color: "#00CCCC" }}
                key={index}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.done_prep}>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <div className={styles.column}>
            {preparing.slice(0, maxOrdersShown).map((item, index) => (
              <p className="text text_type_digits-default mb-2" key={index}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-15">
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className={`${styles.text} text text_type_digits-large`}>{total}</p>
      </div>
      <div className="mb-15">
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className={`${styles.text} text text_type_digits-large`}>
          {totalToday}
        </p>
      </div>
    </section>
  );
};
