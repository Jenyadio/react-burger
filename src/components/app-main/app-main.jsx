import React, { useState, useEffect } from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import mainStyles from "../../components/app-main/app-main.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../../services/actions/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { burgerIngredients } from "../../selectors/selectors";

function AppMain() {
  const { items, itemsRequest, itemsFailed } = useSelector(burgerIngredients);
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
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor
            active={active}
            onClose={handleCloseModal}
            onOpen={handleOpenModal}
          />
        </DndProvider>
      )}
    </main>
  );
}

export default AppMain;
