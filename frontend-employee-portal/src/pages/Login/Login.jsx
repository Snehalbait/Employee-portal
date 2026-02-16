import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails, setGetToken  } from "../../redux/slices/authSlice";
import { loginUser } from "../../services/authService"; // <-- import API call
import "./Login.css";

const Login = () => {
  const [employeeId, setemployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
const user = useSelector(state => state.auth.userDetails);
console.log(user,"useruser");

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const data = { employeeId, password };
    const result = await loginUser(data);

    console.log("Login API result:", result); 
    
    if (result.success && result.data && result.data.employee.Status === "SUCCESS") {
      // localStorage.setItem("token", result.data.token);
      dispatch(setUserDetails(result.data.employee)); 
      dispatch(setGetToken(result.data.token));  
      console.log("Navigating to home...");
      window.location.href = "/home"; // browser redirect
    } else {
      alert(result.message || "Invalid User ID or Password");
    }
  } catch (err) {
    alert(err.message || "Invalid User ID or Password");
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
            onChange={(e) => setemployeeId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
