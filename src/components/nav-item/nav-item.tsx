import React, { FC, ReactNode } from "react";
import navStyles from "../nav-item/nav-item.module.css";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  icon: ReactNode;
  name: string;
  link: string;
}

export const NavItem: FC<NavItemProps> = ({ icon, name, link }) => {
  return (
    <NavLink
      style={({ isActive }) => {
        return {
          color: isActive ? "#F2F2F3" : "#8585AD",
        };
      }}
      to={link}
      className={`${navStyles.navItem} pt-4 pb-4 pl-5 pr-5 mt-4 mb-4`}
    >
      {icon}
      <p>{name}</p>
    </NavLink>
  );
}
