import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Item from '../item/item'
import ingredientsStyles from '../../components/ingredients/ingredients.module.css'
import Modal from '../modal/modal'

function Ingredients({ data, name, type, id}) {
  const [active, setActive] = useState(false);

  const handleOpenModal = () => {
    setActive(true);
  }

  const handleCloseModal = () => {
    setActive(false);
  }

  const list = data.filter(item => item.type === type);

  const modal = (
    <Modal header="Детали ингредиента" onClose={handleCloseModal}>
      Hello
    </Modal>
  )

  return (
    <article>
        <h2 className={`${ingredientsStyles.header} mt-10 text text_type_main-medium`} id={id}>{name}</h2>
        <div className={`${ingredientsStyles.box} mt-6 ml-4 mr-4`}>
            {list.map((item, index) => (
                <div key={index}>
                  <Item image={item.image} type={item.type} name={item.name} price={item.price} onClick={handleOpenModal}/>
                  {active && modal}
                </div>
            ))}
        </div>
    </article>
  )
}

Ingredients.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Ingredients
