import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavItem from "../nav-item/nav-item";
import headerStyles from "../app-header/app-header.module.css";

function AppHeader() {
  const burger = <BurgerIcon type="primary" />;
  const list = <ListIcon type="secondary" />;
  const profile = <ProfileIcon type="secondary" />;

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.wrapper}>
        <nav className={headerStyles.nav}>
          <NavItem
            name="Конструктор"
            icon={burger}
            active={true}
          />
          <NavItem
            name="Лента заказов"
            icon={list}
            active={false}
          />
          <Logo />
          <NavItem
            name="Личный кабинет"
            icon={profile}
            active={false}
          />
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
