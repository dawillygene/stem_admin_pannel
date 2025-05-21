import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";

const SidebarLogout = ({ handleLogout }) => (
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
      <p className="text-xs text-blue-200">© 2025 University of Dodoma</p>
    </div>
  </div>
);

export default SidebarLogout;