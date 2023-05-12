import React from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "../../components/burger-constructor/burger-constructor.module.css";
import OrderTotal from "../order-total/order-total";
import dataStructure from "../../utils/data-proptype-structure";

function BurgerConstructor({ data, active, onClose, onOpen }) {
  return (
    <section>
      <div className={`${constructorStyles.box} mt-25 mb-10`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={data[0].image}
        />
        <div className={`${constructorStyles.boxInside} pr-2`}>
          {data
            .filter((item) => item.type === "main" || item.type === "sauce")
            .map((item, index) => (
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
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={data[0].image}
        />
      </div>
      <OrderTotal active={active} onClose={onClose} onOpen={onOpen} />
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(dataStructure).isRequired).isRequired,
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default BurgerConstructor;
