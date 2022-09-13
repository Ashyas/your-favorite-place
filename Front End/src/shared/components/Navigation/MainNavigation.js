import React,{ useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contex/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import Backdrop from "../UiElements/BackDrop";
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const auth = useContext(AuthContext);

  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchUsers = async () => {
        if(auth.isLoggedIn) {
          try {
            const responseData = await sendRequest(`http://localhost:5000/api/users/${auth.userId}`);
            setUser(responseData.user.name);
          } catch (error) {}
        }
      }
      fetchUsers();

    }, [sendRequest, auth.isLoggedIn]);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  }


  const closeDrawer = () => {
    setDrawerIsOpen(false);
  }

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer> 

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Favo Place</Link>
        </h1>
        {auth.isLoggedIn && (
        <h4 className="main-navigation__title">{user}</h4>
        )}
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
