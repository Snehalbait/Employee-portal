import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleAddEmployee = () => {
      window.location.href = "/add-employee"; // browser redirect
  }; 
  
  return (
    <div className="home-wrapper">
      <div className="home-left">
        <h1>Welcome, {user?.userid}!</h1>
        <p>Here you can manage your employees, view details, and more.</p>
        <div className="home-content">
          <p>Some content goes here...</p>
        </div>
      </div>

      <div className="home-right">
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>
    </div>
  );
};

export default Home;
