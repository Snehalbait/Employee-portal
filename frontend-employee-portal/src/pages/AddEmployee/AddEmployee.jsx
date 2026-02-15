import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();

    // Simple frontend validation
    if (!/^\d{10}$/.test(mobile)) {
      setError("Mobile number must be 10 digits");
      return;
    }

    // Payload to send to backend
    const employeeData = {
      FullName: fullName,
      Email: email,
      MobileNumber: mobile,
      PasswordHash: password // send raw password; backend should hash it
    };

    console.log("Employee Data:", employeeData);

    // TODO: Call API here (axios/fetch)
    alert("Employee added successfully!");

    // Reset form or navigate
    navigate("/home");
  };

  return (
    <div className="add-employee-wrapper">
      <h2>Add New Employee</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={!fullName || !email || !mobile || !password}>
          Save Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
