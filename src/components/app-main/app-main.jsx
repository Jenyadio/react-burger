import React, { useState, useEffect, useMemo } from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import mainStyles from "../../components/app-main/app-main.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../../services/actions/burger-ingredients";

function AppMain() {
  const { items, itemsRequest, itemsFailed } = useSelector(
    (store) => store.burgerIngredients
  );
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const handleOpenModal = () => {
    setActive(true);
  };

  const handleCloseModal = () => {
    setActive(false);
  };

  return (
    <main className={mainStyles.main}>
      {itemsRequest && "Загрузка..."}
      {itemsFailed && "Произошла ошибка"}
      {!itemsRequest && !itemsFailed && items.length && (
        <>
          <BurgerIngredients />
          <BurgerConstructor
            active={active}
            onClose={handleCloseModal}
            onOpen={handleOpenModal}
          />
        </>
      )}
    </main>
  );
}

export default AppMain;
