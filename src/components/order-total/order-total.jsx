import React from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyles from "../../components/order-total/order-total.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function OrderTotal({ onOpen, onClose, active }) {
  return (
    <>
      <div
        className={orderStyles.order}
        onClick={onOpen}
      >
        <div className={`${orderStyles.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      {active && (
        <Modal onClose={onClose}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

OrderTotal.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default OrderTotal;
