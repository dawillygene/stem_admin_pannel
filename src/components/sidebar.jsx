import { useContext, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaComment,
  FaFileUpload,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartBar,
  FaImage,
  FaBook,
  FaClipboardList,
  FaUniversity,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/login");
    }
  };

  const navItems = [
    { path: "/home", icon: <FaHome />, label: "Home" },
    ...(user?.role === "superadmin"
      ? [{ path: "/super-admin", icon: <FaChartBar />, label: "Dashboard" }]
      : [{ path: "/normal-admin", icon: <FaChartBar />, label: "Dashboard" }]),
    ...(user?.role === "superadmin"
      ? [{ path: "/admins", icon: <FaUsers />, label: "Admins" }]
      : []),
    {
      path: user?.role === "superadmin" ? "/super-admin" : "/normal-admin",
      icon: <FaComment />,
      label: "Comments",
    },
    { path: "/blogs", icon: <FaFileUpload />, label: "Blogs & Publications" },
    { path: "/gallery", icon: <FaImage />, label: "Gallery" },
    { path: "/programs", icon: <FaBook />, label: "Programs" },
    { path: "/reports", icon: <FaClipboardList />, label: "Reports" },
    { path: "/profile", icon: <FaUser />, label: "Profile" },
    { path: "/settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Header */}
      {isMobile && (
        <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#0066CC] text-white shadow-md">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <FaUniversity className="text-xl mr-2" />
              <h2 className="text-lg font-bold">UDOM STEM</h2>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        <motion.div
          className={`fixed top-0 left-0 h-screen w-64 bg-[#0066CC] text-white z-50 shadow-xl
          ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        `}
          animate={{
            x: isMobile && !isOpen ? -256 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 py-5 border-b border-blue-700 flex items-center">
            <FaUniversity className="text-2xl mr-3 text-[#FFAD03]" />
            <div>
              <h2 className="text-xl font-bold">UDOM STEM</h2>
              <p className="text-xs text-blue-200">Admin Portal</p>
            </div>
          </div>

          <div className="px-4 py-4 border-b border-blue-700">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#FFAD03] flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || "A"}
              </div>
              <div className="ml-3">
                <p className="font-medium">{user?.name || "Admin"}</p>
                <p className="text-xs text-blue-200">{user?.role || "admin"}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto pt-4">
            <ul className="px-2 space-y-1">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? "bg-white text-[#0066CC] shadow-md" 
                          : "text-white hover:bg-blue-700"
                      }`
                    }
                    onClick={() => isMobile && setIsOpen(false)}
                    aria-current={location.pathname === item.path ? "page" : undefined}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                    {location.pathname === item.path && (
                      <motion.span 
                        className="ml-auto h-2 w-2 rounded-full bg-[#FFAD03]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="p-4 mt-auto border-t border-blue-700">
            <motion.button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#FD9148] to-[#FFAD03] text-white font-medium hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </motion.button>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-blue-200">
                © 2025 University of Dodoma
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile Backdrop */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Pushing content for desktop layout */}
      <div className="hidden md:block md:ml-64" />
    </>
  );
};

export default Navbar;
