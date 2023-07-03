import React, { FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";

type TabsProps = {
  inViewBun: boolean;
  inViewSauce: boolean;
  inViewMain: boolean;
}

export const Tabs: FC<TabsProps> = ({inViewBun, inViewSauce, inViewMain}) => {
  const [current, setCurrent] = useState("bun");

  const onTabClick = (tab: string) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }; 

  useEffect(() => {
    if (inViewBun) {
      setCurrent("bun");
    } else if (inViewSauce) {
      setCurrent("sauce");
    } else if (inViewMain) {
      setCurrent("main");
    }
  }, [inViewBun, inViewSauce, inViewMain]);

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