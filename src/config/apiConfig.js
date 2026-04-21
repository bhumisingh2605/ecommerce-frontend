import axios from "axios";

// ✅ Use environment variable
export const API_BASE_URL = process.env.REACT_APP_API_URL;

// ✅ Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL, // ✅ FIXED
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token dynamically (BEST PRACTICE)
api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`; // ✅ FIXED
    }
    return config;
  },
  (error) => Promise.reject(error)
);