import React from 'react'
import PropTypes from 'prop-types'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import navStyles from '../nav-item/nav-item.module.css';

function NavItem({ icon, name, inactive}) {
  return (
    <div className={`pt-4 pb-4 pl-5 pr-5 mt-4 mb-4 ${navStyles.navItem}`}>
        {icon}
        <p className={ inactive ? "text text_type_main-default text_color_inactive" : "text text_type_main-default"}>{name}</p>
    </div>
  )
}

NavItem.propTypes = {
    icon: PropTypes.elementType,
    name: PropTypes.string,
    inactive: PropTypes.bool,
}

export default NavItem
