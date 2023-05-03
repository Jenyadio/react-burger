import React from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import constructorStyles from '../../components/burger-constructor/burger-constructor.module.css'

function BurgerConstructor({ data }) {
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
        {data.filter(item => item.type === "main" || item.type === "sauce").map((item, index) => (
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
      <div className={constructorStyles.order}>
        <div className={`${constructorStyles.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired,
}

export default BurgerConstructor
