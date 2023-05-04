import React,  { useState }  from 'react'
import PropTypes from 'prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import itemStyles from '../../components/item/item.module.css'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'

function Item(props) {
  const [active, setActive] = useState(false);

  const handleOpenModal = () => {
    setActive(true);
  }

  const handleCloseModal = () => {
    setActive(false);
  }

  return (
    <>
      <div className={`${itemStyles.box} mb-8`} onClick={handleOpenModal}>
        <img className="pr-4 pl-4" src={props.image} alt={props.type} />
        <div className={`${itemStyles.price} mt-1 mb-1`}>
            <p className="text text_type_digits-default">{props.price}</p>
            <CurrencyIcon type="primary" />
        </div>
        <p className={`${itemStyles.description} text text_type_main-default mb-6`}>{props.name}</p>
      </div>
      {active && 
        <Modal header="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails image={props.image_large} name={props.name} calories={props.calories} proteins={props.proteins} fat={props.fat} carbohydrates={props.carbohydrates} type={props.type} />
        </Modal>
      }
    </>
  )
}

Item.propTypes = {
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default Item
