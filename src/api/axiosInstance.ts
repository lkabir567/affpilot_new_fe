import { ENV } from "@/lib/dot.env";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: ENV.SERVER_URL, // Change this to your API base URL
  timeout: 10000, // Set timeout to 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token from localStorage (if needed)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Handle logout or redirect
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
