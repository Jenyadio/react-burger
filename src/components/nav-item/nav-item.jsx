import React from 'react'
import PropTypes from 'prop-types'
import navStyles from '../nav-item/nav-item.module.css';

function NavItem({ icon, name, active}) {
  return (
    <div className={`pt-4 pb-4 pl-5 pr-5 mt-4 mb-4 ${navStyles.navItem}`}>
        {icon}
        <a href="#!" className={`${navStyles.navItemLink} ${active ? navStyles.active : null}`}>{name}</a>
    </div>
  )
}

NavItem.propTypes = {
    icon: PropTypes.object,
    name: PropTypes.string,
    inactive: PropTypes.bool,
}

export default NavItem
