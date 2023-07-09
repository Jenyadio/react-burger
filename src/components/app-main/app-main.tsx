import React, { useState } from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import mainStyles from "../../components/app-main/app-main.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { burgerIngredients } from "../../selectors/selectors";
import { useAppSelector } from "../../hooks/dispatch-selector-hooks";

function AppMain() {
  const { items, itemsRequest, itemsFailed } = useAppSelector(burgerIngredients);

  const [active, setActive] = useState(false);

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
