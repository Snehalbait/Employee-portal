import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/slices/authSlice";
import "./Login.css";

const Login = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (userid === "admin" && password === "1234") {
      dispatch(loginSuccess({ userid }));
      navigate("/home");
    } else {
      setError("Invalid User ID or Password");
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
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={!userid || !password}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
