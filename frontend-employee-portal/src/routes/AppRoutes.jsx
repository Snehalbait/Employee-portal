import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import AddEmployee from "../pages/AddEmployee/AddEmployee";

// PrivateRoute: checks only login
const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/" />;
};

// HrRoute: checks login + HR role from API response
const HrRoute = ({ children }) => {
  const { isLoggedIn, userDetails } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (userDetails?.Role !== "HR") {
    // Logged in but not HR – send back to home
    return <Navigate to="/home" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Private Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* HR-only route, based on Role flag from login API */}
        <Route
          path="/add-employee"
          element={
            <HrRoute>
              <AddEmployee />
            </HrRoute>
          }
        />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
