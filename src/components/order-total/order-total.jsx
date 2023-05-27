import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyles from "../../components/order-total/order-total.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getOrderNumber } from "../../services/actions/order-details";
import { totalPriceSelector } from "../../utils/selectors";
function OrderTotal({ ingredientsId, onOpen, onClose, active }) {
  const { orderNumber, dataRequest, dataFailed } = useSelector(
    (store) => store.orderDetails
  );

  const totalConstructorIngredients = useSelector(
    (store) => store.constructorIngredients.totalConstructorIngredients
  );

  const isBunAdded = totalConstructorIngredients.find(
    (item) => item.type === "bun"
  );

  const dispatch = useDispatch();
  const total = useSelector(totalPriceSelector);

  const sendOrder = () => {
    dispatch(getOrderNumber("POST", ingredientsId));
  };

  return (
    <>
      <div className={orderStyles.order} onClick={isBunAdded ? onOpen : null}>
        <div className={`${orderStyles.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">
            {total ? total : 0}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={sendOrder}
          disabled={!isBunAdded}
          on
        >
          Оформить заказ
        </Button>
      </div>
      {isBunAdded && active && (
        <Modal onClose={onClose}>
          {dataRequest && "Загрузка..."}
          {dataFailed && "Произошла ошибка"}
          {!dataRequest && !dataFailed && orderNumber && <OrderDetails />}
        </Modal>
      )}
    </>
  );
}

OrderTotal.propTypes = {
  ingredientsId: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default OrderTotal;
