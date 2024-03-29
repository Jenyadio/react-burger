import React from "react";
import img from "../../images/check-icon.svg";
import orderStyles from "../../components/order-details/order-details.module.css";
import { orderNumber } from "../../selectors/selectors";
import { useAppSelector } from "../../hooks/dispatch-selector-hooks";

function OrderDetails() {
  const number = useAppSelector(orderNumber);

  return (
    <div className={orderStyles.box}>
      <p
        className="text text_type_digits-large pt-10 mb-8"
        data-test="order-number"
      >
        {number}
      </p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className="mb-15" src={img} alt="check icon" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive pb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
