import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaChartBar,
  FaUsers,
  FaComment,
  FaFileUpload,
  FaImage,
  FaUser,
  FaList,
  FaPlus,
  FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";

const iconMap = {
  FaHome: <FaHome />,
  FaChartBar: <FaChartBar />,
  FaUsers: <FaUsers />,
  FaComment: <FaComment />,
  FaFileUpload: <FaFileUpload />,
  FaImage: <FaImage />,
  FaUser: <FaUser />,
  FaList: <FaList />,
  FaPlus: <FaPlus />,
};

const SidebarNav = ({ navItems, location, isMobile, setIsOpen }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (path) => {
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  return (
    <nav className="flex-1 overflow-y-auto pt-4">
      <ul className="px-2 space-y-1">
        {navItems.map((item, index) => (
          <motion.li
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {item.children ? (
              <div>
                <button
                  onClick={() => toggleExpand(item.path)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname.startsWith(item.path)
                      ? "bg-white text-[#0066CC] shadow-md"
                      : "text-white hover:bg-blue-700"
                  }`}
                >
                  <span className="text-lg mr-3">{iconMap[item.icon]}</span>
                  <span>{item.label}</span>
                  <span className="ml-auto">
                    <FaChevronDown 
                      className={`transition-transform duration-200 ${
                        expandedItems[item.path] ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                  {location.pathname.startsWith(item.path) && (
                    <motion.span
                      className="ml-2 h-2 w-2 rounded-full bg-[#FFAD03]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
                {expandedItems[item.path] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 mt-1 space-y-1"
                  >
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-white text-[#0066CC] shadow-md"
                              : "text-white hover:bg-blue-700"
                          }`
                        }
                        onClick={() => isMobile && setIsOpen(false)}
                        aria-current={location.pathname === child.path ? "page" : undefined}
                      >
                        <span className="text-lg mr-3">{iconMap[child.icon]}</span>
                        <span>{child.label}</span>
                        {location.pathname === child.path && (
                          <motion.span
                            className="ml-auto h-2 w-2 rounded-full bg-[#FFAD03]"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </div>
            ) : (
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
                <span className="text-lg mr-3">{iconMap[item.icon]}</span>
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
            )}
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;