import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/employees",
});

export const loginUser = async (data) => {
  try {
    const response = await API.post("/login", data);
    console.log(response, "response");
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

export const addEmployee = async (employeeData) => {
  try {
    const response = await API.post("/employees", employeeData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Add employee failed" };
  }
};
