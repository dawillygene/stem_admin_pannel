import { motion } from "framer-motion";

const SidebarMobileBackdrop = ({ isMobile, isOpen, setIsOpen }) =>
  isMobile && isOpen ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    />
  ) : null;

export default SidebarMobileBackdrop;