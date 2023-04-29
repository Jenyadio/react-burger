import React from 'react'
import PropTypes from 'prop-types'
import Tabs from '../tabs/tabs'
import Ingredients from '../ingredients/ingredients'
import burgerIngredientsStyles from '../../components/burger-ingredients/burger-ingredients.module.css'

function BurgerIngredients() {
  return (
    <section >
        <header>
            <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
            <Tabs />
        </header>
        <main className={burgerIngredientsStyles.box}>
            <Ingredients name="Булки" type="bun" id="bun"/>
            <Ingredients name="Соусы" type="sauce" id="sauce"/>
            <Ingredients name="Начинки" type="main" id="main"/>
        </main>
    </section>
  )
}

export default BurgerIngredients
