import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { attachJwtInterceptor } from "../utils/axios";

const AuthContext = createContext();
export const AppProvider = ({ children }) => {
  const [jwt, setJwt] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Accept": "application/json"
        }
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setJwt(null);
      navigate("/login");
    }
  }, [navigate]);

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
        return data.accessToken;
      } else {
        setJwt(null);
        return null;
      }
    } catch (error) {
      setJwt(null);
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
    if (!loading && !jwt) {
      navigate("/login");
    }
  }, [jwt, loading, navigate]);

  useEffect(() => {
    attachJwtInterceptor(() => jwt);
  }, [jwt]);

  return (
    <AuthContext.Provider value={{ jwt, setJwt, refreshJwt, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);