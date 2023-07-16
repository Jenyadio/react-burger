import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyles from "../../components/order-total/order-total.module.css";
import { Modal } from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getOrderNumber } from "../../services/actions/order-details";
import { FC, useMemo } from "react";
import {
  orderDetails,
  constructorIngredients,
} from "../../selectors/selectors";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { Card } from "../../types/ingredient";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/dispatch-selector-hooks";

type OrderTotalProps = {
  ingredientsId: string[];
  onOpen: () => void;
  onClose: () => void;
  active: boolean;
};

export const OrderTotal: FC<OrderTotalProps> = ({
  ingredientsId,
  onOpen,
  onClose,
  active,
}) => {
  const dispatch = useAppDispatch();
  const { orderNumber, dataRequest, dataFailed } = useAppSelector(orderDetails);
  const { totalConstructorIngredients, selectedBun, draggedIngredients } =
    useAppSelector(constructorIngredients);
  const navigate = useNavigate();

  const total = useMemo(() => {
    let total;
    const ingredientsPrice = draggedIngredients.reduce(
      (acc, item) => acc + item.price,
      0
    );
    if (selectedBun.length) {
      total = selectedBun[0].price * 2 + ingredientsPrice;
    } else {
      total = ingredientsPrice;
    }
    return total;
  }, [draggedIngredients, selectedBun]);

  const isBunAdded = totalConstructorIngredients.find(
    (item) => item.type === "bun"
  );

  const sendOrder = () => {
    if (getCookie("accessToken")) {
      dispatch(getOrderNumber(ingredientsId));
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div
        className={orderStyles.order}
        onClick={isBunAdded ? onOpen : onClose}
      >
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
        >
          Оформить заказ
        </Button>
      </div>
      {getCookie("accessToken") && isBunAdded && active && (
        <Modal onClose={onClose}>
          {dataRequest && "Загрузка..."}
          {dataFailed && "Произошла ошибка"}
          {!dataRequest && !dataFailed && orderNumber && <OrderDetails />}
        </Modal>
      )}
    </>
  );
};
