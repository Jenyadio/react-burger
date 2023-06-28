import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyles from "../../components/order-total/order-total.module.css";
import {Modal} from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getOrderNumber } from "../../services/actions/order-details";
import { FC, useMemo } from "react";
import {
  orderDetails,
  constructorIngredients,
} from "../../selectors/selectors";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { Card } from "../item/item";

type OrderTotalProps = {
  ingredientsId: string[];
  onOpen: () => void;
  onClose: () => void;
  active: boolean;
}

export const OrderTotal: FC<OrderTotalProps> = ({ ingredientsId, onOpen, onClose, active }) => {
  const dispatch = useDispatch();
  const { orderNumber, dataRequest, dataFailed } = useSelector(orderDetails);
  const { totalConstructorIngredients, selectedBun, draggedIngredients } =
    useSelector(constructorIngredients);
  const navigate = useNavigate();

  const total = useMemo(() => {
    const ingredientsPrice = draggedIngredients.reduce(
      (acc: number, item: Card) => acc + item.price,
      0
    );
    const total = selectedBun.price * 2 + ingredientsPrice;
    return total;
  }, [draggedIngredients, selectedBun]);

  const isBunAdded = totalConstructorIngredients.find(
    (item: Card) => item.type === "bun"
  );

  const sendOrder = () => {
    if (getCookie("accessToken")) {
      dispatch<any>(getOrderNumber(ingredientsId));
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className={orderStyles.order} onClick={isBunAdded ? onOpen : onClose}>
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
}
