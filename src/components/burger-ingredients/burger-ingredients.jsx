import React from 'react'
import PropTypes from 'prop-types'
import BurgerTabs from '../burger-tabs/burger-tabs'

function BurgerIngredients(props) {
  return (
    <section>
        <header>
            <h1>Соберите бургер</h1>
            <BurgerTabs />
        </header>
    </section>
  )
}

BurgerIngredients.propTypes = {}

export default BurgerIngredients
