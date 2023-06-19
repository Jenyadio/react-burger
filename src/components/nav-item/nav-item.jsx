import React from "react";
import PropTypes from "prop-types";
import navStyles from "../nav-item/nav-item.module.css";
import { NavLink } from "react-router-dom";

function NavItem({ icon, name, link }) {
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

NavItem.propTypes = {
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default NavItem;
