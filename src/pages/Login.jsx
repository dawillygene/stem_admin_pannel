import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserShield, FaLock, FaUniversity } from "react-icons/fa";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user = {
        name: role === "superadmin" ? "Super Admin" : "Admin",
        email,
        role,
      };
      
      login(user);
      navigate("/home");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0066CC]/10 to-white flex items-center justify-center px-4">
      <motion.div 
        className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left: Illustration or Info */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#0066CC] to-[#FD9148] text-white p-8 flex flex-col justify-center items-center">
          <FaUniversity className="text-5xl mb-4" />
          <h2 className="text-3xl font-bold mb-2 text-center">UDOM STEM Education</h2>
          <p className="text-center mb-4">Enhancing Mathematics and Science Education in Secondary Schools in Tanzania</p>
          <div className="w-32 h-1 bg-[#FFAD03] rounded-full my-4"></div>
          <p className="text-center text-sm opacity-80 mt-4">
            A Partnership Program with the Ministry of Education Science and Technology (MoEST) sponsored by UNICEF
          </p>
        </div>

        {/* Right: Form */}
        <div className="md:w-1/2 p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-[#0066CC] text-center mb-6">
              Admin Portal Login
            </h3>
            
            {error && (
              <motion.div 
                className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <FaUserShield />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0066CC] focus:border-[#0066CC] bg-gray-50"
                    placeholder="admin@udom.ac.tz"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0066CC] focus:border-[#0066CC] bg-gray-50"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="admin"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={() => setRole("admin")}
                    className="h-4 w-4 text-[#0066CC] focus:ring-[#0066CC]"
                  />
                  <label htmlFor="admin" className="ml-2 block text-sm text-gray-700">
                    Admin
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="superadmin"
                    name="role"
                    value="superadmin"
                    checked={role === "superadmin"}
                    onChange={() => setRole("superadmin")}
                    className="h-4 w-4 text-[#0066CC] focus:ring-[#0066CC]"
                  />
                  <label htmlFor="superadmin" className="ml-2 block text-sm text-gray-700">
                    Super Admin
                  </label>
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-[#0066CC] hover:bg-[#0066CC]/90 text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? "Signing in..." : "Sign In"}
              </motion.button>
              
              <div className="text-center mt-4">
                <a href="#" className="text-sm text-[#0066CC] hover:text-[#0066CC]/80">
                  Forgot your password?
                </a>
              </div>
            </form>
            
            <div className="mt-8 text-center text-xs text-gray-500">
              <p>© 2025 University of Dodoma. All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
