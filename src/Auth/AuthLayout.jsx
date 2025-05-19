import { motion } from "framer-motion";
import BrandingPanel from "./BrandingPanel";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0066CC]/10 to-white flex items-center justify-center px-4">
      <motion.div 
        className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BrandingPanel />
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;