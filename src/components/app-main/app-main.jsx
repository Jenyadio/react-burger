import React, { useState, useEffect } from 'react'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import mainStyles from '../../components/app-main/app-main.module.css'

function AppMain() {
  const [state, setState] = useState({
    isLoading: true,
    hasError: false,
    data: null,
  })

  const url = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    const getIngredients = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(url)
      .then(res => res.json())
      .then(data => setState({ ...state, data, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
    };
    
    getIngredients();
  }, [])

  console.log(state.data)

  return (
    <main className={mainStyles.main}>
       {state.isLoading && 'Загрузка...'}
        {state.hasError && 'Произошла ошибка'}
        {!state.isLoading &&
          !state.hasError &&
          state.data.data.length &&
          <>
            <BurgerIngredients data={state.data.data} />
            <BurgerConstructor data={state.data.data}/>
          </>
        }
    </main>
  )
}

export default AppMain
