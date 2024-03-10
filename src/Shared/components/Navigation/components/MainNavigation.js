import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Backdrop from '../../UIElements/Backdrop';
import MainHeader from './MainHeader';
import './MainNavigation.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const MainNavigation = (props) => {
  const [isDrawerOn, setIsDrawerOn] = useState(false);

  const drawerOpenHandler = () => {
    setIsDrawerOn(true);
  };
  const drawerCloseHandler = () => {
    setIsDrawerOn(false);
  };

  return (
    <React.Fragment>
      {isDrawerOn && <Backdrop onClick={drawerCloseHandler} />}

      <SideDrawer show={isDrawerOn} onClick={drawerCloseHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          onClick={drawerOpenHandler}
          className="main-navigation__menu-btn"
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
