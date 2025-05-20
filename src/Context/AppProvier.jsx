import { time } from "framer-motion";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API, { attachJwtInterceptor } from "../utils/axios";

const AuthContext = createContext();
export const AppProvider = ({ children }) => {
  const [jwt, setJwt] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshJwt = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
        headers: {
          "Accept": "application/json"
        }
      });
      if (response.ok) {
        const data = await response.json();
        setJwt(data.accessToken);
        console.log(data.accessToken);
        return data.accessToken;
      } else {
        setJwt(null);
        // Do NOT navigate here!
        return null;
      }
    } catch (err) {
      setJwt(null);
      // Do NOT navigate here!
      return null;
    }
  }, []);

  useEffect(() => {
    const doRefresh = async () => {
      await refreshJwt();
      setLoading(false);
    };
    doRefresh();
  }, []);

  useEffect(() => {
    // Only redirect if loading is false and jwt is still null
    if (!loading && !jwt) {
      navigate("/login");
    }
  }, [jwt, loading, navigate]);

  useEffect(() => {
    attachJwtInterceptor(() => jwt);
    console.log("JWT interceptor attached");
  }, [jwt]);

  return (
    <AuthContext.Provider value={{ jwt, setJwt, refreshJwt, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);