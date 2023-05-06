import React, { useState, useEffect } from 'react'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import mainStyles from '../../components/app-main/app-main.module.css'
import getIngredients from '../../utils/burger-api'

function AppMain() {
  const [state, setState] = useState({
    isLoading: true,
    hasError: false,
    data: null,
  })
  const [active, setActive] = useState(false);

  useEffect(() => {
   const response = getIngredients();
   response.then(data => data ? setState({ ...state, data, hasError: false, isLoading: false }) : setState({ ...state, hasError: true, isLoading: false })
   )
  }, [])

  const handleOpenModal = () => {
    setActive(true);
  }

  const handleCloseModal = () => {
    setActive(false);
  }

  return (
    <main className={mainStyles.main}>
       {state.isLoading && 'Загрузка...'}
        {state.hasError && 'Произошла ошибка'}
        {!state.isLoading &&
          !state.hasError &&
          state.data.data.length &&
          <>
            <BurgerIngredients data={state.data.data} />
            <BurgerConstructor active={active} onClose={handleCloseModal} onOpen={handleOpenModal} data={state.data.data}/>
          </>
        }
    </main>
  )
}

export default AppMain
