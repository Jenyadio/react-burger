import React, { FC } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../feed-order-details/feed-order-details.module.css";
import { Card } from "../../types/ingredient";

type FeedOrderDetailsProps = {
  name: string | undefined;
  ingredients: Card[] | undefined;
  number: number | undefined;
  createdAt: string;
  status: string | undefined;
  totalPrice: number | undefined;
};

export const FeedOrderDetails: FC<FeedOrderDetailsProps> = ({
  name,
  ingredients,
  number,
  createdAt,
  status,
  totalPrice,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <p
        className={`${styles.order_number} text text_type_digits-default mb-10`}
      >{`#${number}`}</p>
      <div className="">
        <p className="text text_type_main-medium mb-3">{name}</p>
        <p
          className="text text_type_main-default mb-15"
          style={{ color: "#00CCCC" }}
        >
          {status === "done" ? "Выполнен" : "Готовится"}
        </p>
      </div>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={styles.cards_list}>
        {ingredients?.map((item, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.image_container}>
              <img src={item.image_mobile} alt={item.name} />
            </div>
            <p className="text text_type_main-default mr-4">{item.name}</p>
            <div className={styles.price}>
              <p className="text text_type_digits-default mr-2">
                {item.type === "bun" ? `2 x ${item.price}` : item.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <p className="text text_type_main-default" style={{ color: "#8585AD" }}>
          <FormattedDate date={new Date(createdAt)} />
        </p>
        <div className={styles.total}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
