import axios from "axios";

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
        console.log("JWT attached to request:", jwt);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default API;