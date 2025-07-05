import axios from "axios";

// Use relative path for API calls so Vite proxy can handle it
// Vite will proxy /api requests to the target specified in vite.config.js
const API = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export const attachJwtInterceptor = (getJwt) => {
  API.interceptors.request.use(
    (config) => {
      const jwt = getJwt();
      if (jwt) {
        config.headers["Authorization"] = `Bearer ${jwt}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default API;