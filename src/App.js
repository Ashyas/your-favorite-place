import React, { useState, useCallback} from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Users from "./users/pages/Users";
import "./App.css";
import NewLocation from "./locations/pages/NewLocation";
import UserLocations from "./locations/pages/UserLocations";
import EditLocation from "./locations/pages/EditLocation";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./users/pages/Auth/Auth";
import { AuthContext } from "./shared/contex/auth-context";

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>

        <Route path="/"  element={<Users />}></Route>
        <Route path="/places/new" element={<NewLocation />} />
        <Route path="/:userId/places" element={<UserLocations />} />
        <Route path="/places/:placeId" element={<EditLocation />} />
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    );
  }else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} /> 
        <Route path="/auth" element={<Auth />} />
        <Route path="/:userId/places" element={<UserLocations />} />
        <Route path="*" element={<Navigate to="/auth" />}></Route>
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
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
