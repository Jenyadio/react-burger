import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyles from "../../components/order-total/order-total.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { sendRequest } from "../../utils/burger-api";

function OrderTotal({ ingredientsId, total, onOpen, onClose, active }) {
  const [orderNumber, setOrderNumber] = useState({
    isLoading: true,
    hasError: false,
    data: null,
  });

  const sendOrder = () => {
    const result = sendRequest("POST", ingredientsId);
    result
      .then((data) => {
        data.success
          ? setOrderNumber({
              ...orderNumber,
              data: data.order.number,
              isLoading: false,
              hasError: false,
            })
          : setOrderNumber({
              ...orderNumber,
              isLoading: false,
              hasError: true,
            });
      })
      .catch((e) => {
        setOrderNumber({ ...orderNumber, isLoading: false, hasError: true });
      });
  };

  return (
    <>
      <div className={orderStyles.order} onClick={onOpen}>
        <div className={`${orderStyles.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={sendOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {active && (
        <Modal onClose={onClose}>
          {orderNumber.isLoading && "Загрузка..."}
          {orderNumber.hasError && "Произошла ошибка"}
          {!orderNumber.isLoading &&
            !orderNumber.hasError &&
            orderNumber.data && <OrderDetails order={orderNumber.data} />}
        </Modal>
      )}
    </>
  );
}

OrderTotal.propTypes = {
  ingredientsId: PropTypes.arrayOf(PropTypes.string).isRequired,
  total: PropTypes.number.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default OrderTotal;
