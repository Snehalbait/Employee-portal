import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserDetails, setToken, setAccessibleRoutes } from '../../redux/slices/authSlice';
import { loginUser, getAccessibleRoutes } from '../../services/authService';
import './Login.css';

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const loginResult = await loginUser({ employeeId, password });

      if (loginResult.success && loginResult.data?.employee?.Status === 'SUCCESS') {
        // Save user details and token
        dispatch(setUserDetails(loginResult.data.employee));
        dispatch(setToken(loginResult.data.token));

        // Fetch accessible routes from backend
        try {
          const routesResult = await getAccessibleRoutes();
          if (routesResult.success && routesResult.data) {
            dispatch(setAccessibleRoutes(routesResult.data));
          }
        } catch (routesErr) {
          console.error('Failed to fetch routes:', routesErr);
          // Continue even if routes fetch fails
        }

        navigate('/home');
      } else {
        setError(loginResult.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Invalid User ID or Password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Employee Portal</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="User ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
