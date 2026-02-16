// import API from "./api"; // the axios instance you shared before
import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/employees", // your backend base URL
  // timeout: 5000, // optional: set request timeout
});
export const loginUser = async (data) => {
  try {
    const response = await API.post("/login", data); 
    console.log(response,"response");
    debugger
    return response.data; 
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};
