import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Backdrop from '../../UIElements/Backdrop';
import AsynchronousMainHeader from './AsynchronousMainHeader';
import AsynchronousNavLinks from './AsynchronousNavLinks';
import './AsynchronousMainNavigation.css';
import SideDrawer from './SideDrawer';
import logo from './logo/AsynchronousLogo.png';

const AsynchronousMainNavigation = (props) => {
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
        <nav className="asynchronous-main-navigation__drawer-nav">
          <AsynchronousNavLinks />
        </nav>
      </SideDrawer>

      <AsynchronousMainHeader>
        <button
          onClick={drawerOpenHandler}
          className="asynchronous-main-navigation__menu-btn"
        >
          <span />
          <span />
          <span />
        </button>
        <Link
          className="asynchronous-main-navigation__logo-container-link"
          to="/"
        >
          <div className="asynchronous-main-navigation__logo-container">
            <img
              className="asynchronous-logo"
              src={logo}
              alt="ASYNCHRONOUS LEARNING PLATFORM LOGO"
            />

            <p className="asynchronous-main-navigation__title">
              <Link to="/">
                <span>ASYNCHRONOUS</span>
                <span>LEARNING</span>
                <span>PLATFORM</span>
              </Link>
            </p>
          </div>
        </Link>
        <nav className="asynchronous-main-navigation__header-nav">
          <AsynchronousNavLinks />
        </nav>
      </AsynchronousMainHeader>
    </React.Fragment>
  );
};

export default AsynchronousMainNavigation;
