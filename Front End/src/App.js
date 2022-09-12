import React, { useState, useCallback} from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserLocations from "./locations/pages/UserLocations";
import { AuthContext } from "./shared/contex/auth-context";
import EditLocation from "./locations/pages/EditLocation";
import NewLocation from "./locations/pages/NewLocation";
import Auth from "./users/pages/Auth/Auth";
import Users from "./users/pages/Users";
import Home from "./shared/Home/Home";
import "./App.css";


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState()

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/"  element={<Home />}></Route>
        <Route path="/users"  element={<Users />}></Route>
        <Route path="/places/new" element={<NewLocation />} />
        <Route path="/:userId/places" element={<UserLocations />} />
        <Route path="/places/:placeId" element={<EditLocation />} />
        <Route path="*" element={<Navigate to="/users" />}></Route>
      </Routes>
    );
  }else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/users"  element={<Users />}></Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/:userId/places" element={<UserLocations />} />
        <Route path="*" element={<Navigate to="/auth" />}></Route>
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout}}>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
