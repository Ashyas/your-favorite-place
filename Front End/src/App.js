import React from "react";
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
import { useAuth } from "./shared/hooks/auth-hook";
import "./App.css";


const App = () => {

  const {token, login, logout, userId} = useAuth();

  let routes;

  if (token) {
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
    <AuthContext.Provider 
      value={{
        isLoggedIn: !!token, 
        token: token,
        userId: userId, 
        login: login, 
        logout: logout
      }}
    >
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
