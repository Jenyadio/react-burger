import React from 'react'
import PropTypes from 'prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import itemStyles from '../../components/item/item.module.css'

function Item({image, type, name, price, onClick}) {
  return (
    <div className={`${itemStyles.box} mb-8`} onClick={onClick}>
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
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default Item
