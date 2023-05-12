import React, { useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "../../components/burger-constructor/burger-constructor.module.css";
import OrderTotal from "../order-total/order-total";
import { DataContext } from "../../services/data-context";

function BurgerConstructor({ active, onClose, onOpen }) {
  const { state } = useContext(DataContext);
  const data = state.data.data;

  const ingredients = useMemo(
    () => data.filter((item) => item.type === "main" || item.type === "sauce"),
    [data]
  );

  const [selectedBun, setSelectedBun] = useState(data[0]);
  const [ingredientsData, setIngredientsData] = useState(ingredients);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ingredientsId, setIngredientsId] = useState([]);

  // не очень поняла, как нужно прописать ограничения внутри конструктора бургера, поэтому написала такую логику
  const handleConstructorData = (e) => {
    const id = e.currentTarget.dataset.id;
    const selectedItem = data.filter((item) => item.id === id);
    if (selectedItem.type === "bun") {
      setSelectedBun(selectedItem);
    } else {
      setIngredientsData(ingredientsData.push(selectedItem));
    }
  };

  useMemo(() => {
    const ingredientsPrice = ingredientsData.reduce(
      (acc, item) => acc + item.price,
      0
    );
    const total = selectedBun.price * 2 + ingredientsPrice;
    setTotalPrice(total);
  }, [ingredientsData, selectedBun]);

  useMemo(() => {
    const id = ingredientsData.map((item) => item._id);
    setIngredientsId(id);
  }, [ingredientsData]);

  return (
    <section>
      <div className={`${constructorStyles.box} mt-25 mb-10`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={data[0].name}
          price={data[0].price}
          thumbnail={data[0].image}
        />
        <div className={`${constructorStyles.boxInside} pr-2`}>
          {ingredientsData.map((item, index) => (
            <div key={index}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={data[0].name}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>
      <OrderTotal
        total={totalPrice}
        ingredientsId={ingredientsId}
        active={active}
        onClose={onClose}
        onOpen={onOpen}
      />
    </section>
  );
}

BurgerConstructor.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default BurgerConstructor;
