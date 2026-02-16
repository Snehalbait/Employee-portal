import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addEmployee } from "../../services/authService";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.userDetails);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{10}$/.test(mobile)) {
      setError("Mobile number must be 10 digits");
      return;
    }

    // Basic password validation: min 8 chars, at least 1 letter and 1 number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters and include letters and numbers");
      return;
    }

    const employeeData = {
      FullName: fullName,
      Email: email,
      MobileNumber: mobile,
      PasswordHash: password,
      Role: "EMPLOYEE",
      CreatedBy: currentUser?.EmployeeId,
    };

    try {
      setLoading(true);
      const result = await addEmployee(employeeData);

      if (result.success && result.data?.Status === "SUCCESS") {
        const newId = result.data.EmployeeId || result.data.employeeId || result.data.id;
        if (newId) {
          alert(`Employee added successfully! New Employee ID: ${newId}`);
        } else {
          alert("Employee added successfully!");
        }
        navigate("/home");
      } else {
        setError(result.message || "Failed to add employee");
      }
    } catch (err) {
      setError(err.message || "Failed to add employee");
    } finally {
      setLoading(false);
    }
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
        <button
          type="submit"
          disabled={loading || !fullName || !email || !mobile || !password}
        >
          {loading ? "Saving..." : "Save Employee"}
        </button>
      </form>
      <button
        type="button"
        className="back-icon"
        onClick={() => navigate("/home")}
        aria-label="Back to Home"
      >
        ←
      </button>
    </div>
  );
};

export default AddEmployee;
