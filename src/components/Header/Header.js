import React from 'react';
import './Header.scss';
import logo from '../../assets/Logo/InStock-Logo.svg';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
        <img className="header__logo" src={logo} alt="instock logo" />
        <nav className="header__nav">
          <NavLink to="/warehouse" className="header__nav-link" activeClassName="header__nav-link--current">
            Warehouses
          </NavLink>
          <NavLink to="/inventory" className="header__nav-link" activeClassName="header__nav-link--current">
            Inventory
          </NavLink>
        </nav>
      </div>
  )
}

export default Header