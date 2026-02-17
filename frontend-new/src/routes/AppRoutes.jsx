import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessibleRoutes } from '../redux/slices/authSlice';
import { getAccessibleRoutes } from '../services/authService';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import AddEmployee from '../pages/AddEmployee/AddEmployee';

// PrivateRoute: checks login status
const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/" />;
};

// RouteGuard: checks if user has access to specific route based on backend API
const RouteGuard = ({ children, requiredPath }) => {
  const { isLoggedIn, accessibleRoutes } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch routes if logged in but routes not loaded
    if (isLoggedIn && accessibleRoutes.length === 0) {
      const fetchRoutes = async () => {
        try {
          const result = await getAccessibleRoutes();
          if (result.success && result.data) {
            dispatch(setAccessibleRoutes(result.data));
          }
        } catch (err) {
          console.error('Failed to fetch routes:', err);
        }
      };
      fetchRoutes();
    }
  }, [isLoggedIn, accessibleRoutes.length, dispatch]);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  // Check if user has access to this route (from backend)
  const hasAccess = accessibleRoutes.some((route) => route.Path === requiredPath);

  if (!hasAccess) {
    // User doesn't have access - redirect to home
    return <Navigate to="/home" />;
  }

  console.log(children,"children");
  console.log(requiredPath,"requiredPath");
  
  debugger
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

        {/* Protected route - only accessible if backend API says user has permission */}
        <Route
          path="/add-employee"
          element={
            <RouteGuard requiredPath="/add-employee">
              <AddEmployee />
            </RouteGuard>
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
