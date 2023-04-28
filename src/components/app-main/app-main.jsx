import React from 'react'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import mainStyles from '../../components/app-main/app-main.module.css'

function AppMain() {
  return (
    <main className={mainStyles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
    </main>
  )
}

export default AppMain
