import React from 'react'
import PropTypes from 'prop-types'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import NavItem from '../nav-item/nav-item'
import headerStyles from '../app-header/app-header.module.css';

function AppHeader() {
  const burger = <BurgerIcon type="primary" />
  const list = <ListIcon type="secondary" />
  const profile = <ProfileIcon type="secondary" />

  return (
    <header className={headerStyles.header}>
        <div className={headerStyles.wrapper}>
            <nav className={headerStyles.nav}>
                <NavItem name="Конструктор" icon={burger} inactive={false}/>
                <NavItem name="Лента заказов" icon={list} inactive={true}/>
                <Logo />
                <NavItem name="Личный кабинет" icon={profile} inactive={true}/>
            </nav>
        </div>
    </header>
  )
}

export default AppHeader;
