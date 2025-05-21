import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "./AuthLayout";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useAuth } from "../Context/AppProvier";

const AuthPage = () => {
  const navigate = useNavigate();
  const { setJwt, jwt } = useAuth();
  const [showLoading, setShowLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (jwt) {
      const lastRoute = sessionStorage.getItem("lastRoute") || "/home";
      navigate(lastRoute, { replace: true });
    }
  }, [jwt, navigate]);

  useEffect(() => {
    let timer;
    if (isLoading) {
      setShowLoading(true);
      timer = setTimeout(() => {
        setShowLoading(false);
      }, 1000);
    } else {
      timer = setTimeout(() => setShowLoading(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password
        })
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }

      if (response.ok) {
        setJwt(data.accessToken);
        navigate("/home");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          name: name,
          email: registerEmail,
          password: registerPassword,
          confirmPassword,
          department,
          username: username
        })
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }

      if (response.ok) {
        setSuccessMessage(data.message || "You are successfully registered! Awaiting approval.");
        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 3000);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error during registration:", err.message);
      }
      setError("An error occurred. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || showLoading || jwt === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <motion.div
          className="w-16 h-16 border-4 border-blue-300 border-t-[#0066CC] rounded-full animate-spin"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  if (jwt) return null;

  return (
    <AuthLayout>
      <div className="md:w-1/2 p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-[#0066CC] text-center mb-6">
            {isRegistering ? "Create an Account" : "Admin Portal Login"}
          </h3>
          {successMessage && (
            <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4 text-center">
              {successMessage}
            </div>
          )}
          {isRegistering ? (
            <RegisterForm
              name={name}
              setName={setName}
              username={username}
              setUsername={setUsername}
              registerEmail={registerEmail}
              setRegisterEmail={setRegisterEmail}
              department={department}
              setDepartment={setDepartment}
              registerPassword={registerPassword}
              setRegisterPassword={setRegisterPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              isLoading={isLoading}
              error={error}
              onSwitchToLogin={() => setIsRegistering(false)}
              onSubmit={handleRegisterSubmit}
            />
          ) : (
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              isLoading={isLoading}
              error={error}
              onSwitchToRegister={() => setIsRegistering(true)}
              onSubmit={handleLoginSubmit}
            />
          )}
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>© 2025 University of Dodoma. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default AuthPage;