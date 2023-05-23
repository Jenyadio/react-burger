import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect } from "react";

function Tabs() {
  const [current, setCurrent] = useState("bun");

  const onTabClick = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const sections = useRef([]);
  const ingredients = useRef();

  useEffect(() => {
    ingredients.current = document.getElementById("ingredients");
    sections.current = document.querySelectorAll("[data-section]");
    ingredients.current.addEventListener("scroll", handleScroll);

    return () => {
      ingredients.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = ingredients.current.scrollTop;
    let newActiveSection = null;

    sections.current.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        newActiveSection = section.id;
      }
    });

    setCurrent(newActiveSection);
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
