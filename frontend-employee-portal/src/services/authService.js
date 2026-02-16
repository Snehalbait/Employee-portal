import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/employees/"
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (data) => { 
    console.log(data,"data");
    
  return API.post("/login", data);
};

export default API;
