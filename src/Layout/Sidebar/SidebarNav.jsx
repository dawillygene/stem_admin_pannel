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
} from "react-icons/fa";

const iconMap = {
  FaHome: <FaHome />,
  FaChartBar: <FaChartBar />,
  FaUsers: <FaUsers />,
  FaComment: <FaComment />,
  FaFileUpload: <FaFileUpload />,
  FaImage: <FaImage />,
  FaUser: <FaUser />,
};

const SidebarNav = ({ navItems, location, isMobile, setIsOpen }) => (
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
        </motion.li>
      ))}
    </ul>
  </nav>
);

export default SidebarNav;