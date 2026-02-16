import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import "./Home.css";

const Home = () => {
  const user = useSelector((state) => state.auth.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isHR = user?.Role === "HR";

  const handleAddEmployee = () => {
    navigate("/add-employee");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="home-wrapper">
      <div className="home-left">
        <div className="home-header">
          <div>
            <h1>Welcome, {user?.FullName || user?.EmployeeId} 👋</h1>
            <p>Here you can manage employees and view your profile details.</p>
          </div>
          <div className="home-header-actions">
            {isHR && (
              <button className="primary-button" onClick={handleAddEmployee}>
                + Add Employee
              </button>
            )}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="user-details-card">
          <h2>Your Details</h2>
          <div className="user-details-grid">
            <div className="user-details-row">
              <span className="label">Employee ID</span>
              <span className="value">{user?.EmployeeId || "-"}</span>
            </div>
            <div className="user-details-row">
              <span className="label">Full Name</span>
              <span className="value">{user?.FullName || "-"}</span>
            </div>
            <div className="user-details-row">
              <span className="label">Email</span>
              <span className="value">{user?.Email || "-"}</span>
            </div>
            <div className="user-details-row">
              <span className="label">Mobile</span>
              <span className="value">{user?.MobileNumber || "-"}</span>
            </div>
            <div className="user-details-row">
              <span className="label">Role</span>
              <span className="value role-pill">{user?.Role || "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
