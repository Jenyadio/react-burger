import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import tabsStyles from "../../components/tabs/tabs.module.css";

function Tabs() {
  const [current, setCurrent] = React.useState("Булки");
  return (
    <div style={{ display: "flex" }}>
      <Tab
        value="Булки"
        active={current === "Булки"}
        onClick={setCurrent}
      >
        <a
          className={tabsStyles.link}
          href="#bun"
        >
          Булки
        </a>
      </Tab>
      <Tab
        value="Соусы"
        active={current === "Соусы"}
        onClick={setCurrent}
      >
        <a
          className={tabsStyles.link}
          href="#sauce"
        >
          Соусы
        </a>
      </Tab>
      <Tab
        value="Начинки"
        active={current === "Начинки"}
        onClick={setCurrent}
      >
        <a
          className={tabsStyles.link}
          href="#main"
        >
          Начинки
        </a>
      </Tab>
    </div>
  );
}

export default Tabs;
