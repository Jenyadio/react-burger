import React from 'react'
import Tabs from '../tabs/tabs'
import PropTypes from 'prop-types'
import Ingredients from '../ingredients/ingredients'
import burgerIngredientsStyles from '../../components/burger-ingredients/burger-ingredients.module.css'

function BurgerIngredients({ data }) {
  return (
    <section >
        <header>
            <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
            <Tabs />
        </header>
        <main className={burgerIngredientsStyles.box}>
            <Ingredients data={data} name="Булки" type="bun" id="bun"/>
            <Ingredients data={data} name="Соусы" type="sauce" id="sauce"/>
            <Ingredients data={data} name="Начинки" type="main" id="main"/>
        </main>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired,
}

export default BurgerIngredients
