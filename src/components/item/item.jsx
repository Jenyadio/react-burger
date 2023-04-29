import React from 'react'
import PropTypes from 'prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import itemStyles from '../../components/item/item.module.css'

function Item({image, type, name, price}) {
  return (
    <div className={`${itemStyles.box} mb-8`}>
        <img className="pr-4 pl-4" src={image} alt={type} />
        <div className={`${itemStyles.price} mt-1 mb-1`}>
            <p className="text text_type_digits-default">{price}</p>
            <CurrencyIcon type="primary" />
        </div>
        <p className={`${itemStyles.description} text text_type_main-default mb-6`}>{name}</p>
    </div>
  )
}

Item.propTypes = {
  image: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
}

export default Item
