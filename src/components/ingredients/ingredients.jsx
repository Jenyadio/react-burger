import React from 'react'
import PropTypes from 'prop-types'
import data from '../../utils/data.json'
import Item from '../item/item'
import ingredientsStyles from '../../components/ingredients/ingredients.module.css'

function Ingredients(props) {
  return (
    <article>
        <h2 className={`${ingredientsStyles.header} mt-10 text text_type_main-medium`} id={props.id}>{props.name}</h2>
        <div className={`${ingredientsStyles.box} mt-6 ml-4 mr-4`}>
            {data.filter(item => item.type === props.type).map((item, index) => (
                <Item image={item.image} key={index} type={item.type} name={item.name}/>
            ))}
        </div>
    </article>
  )
}

Ingredients.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
}

export default Ingredients
