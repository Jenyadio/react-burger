import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavItem } from "../nav-item/nav-item";
import headerStyles from "../app-header/app-header.module.css";
import { Link, useLocation } from "react-router-dom";

function AppHeader() {
  const location = useLocation();
  const type = (path: string) =>
    location.pathname === path ? "primary" : "secondary";
  const burger = <BurgerIcon type={type("/")} />;
  const list = <ListIcon type={type("/feed")} />;
  const profile = <ProfileIcon type={type("/profile/profile")} />;

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.wrapper}>
        <nav className={headerStyles.nav}>
          <NavItem name="Конструктор" icon={burger} link="/" />
          <NavItem name="Лента заказов" icon={list} link="/feed" />
          <Link to="/">
            <Logo />
          </Link>
          <NavItem
            name="Личный кабинет"
            icon={profile}
            link="/profile/profile"
          />
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
