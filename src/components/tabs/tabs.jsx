import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import tabsStyles from "../../components/tabs/tabs.module.css";

function Tabs() {
  const [current, setCurrent] = React.useState("bun");

  const onTabClick = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ display: "flex" }}>
      <Tab value="bun" active={current === "bun"} onClick={onTabClick}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={onTabClick}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={onTabClick}>
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;
