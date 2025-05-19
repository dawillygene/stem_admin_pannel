import { motion } from "framer-motion";

const ErrorMessage = ({ message }) => {
  return (
    <motion.div 
      className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 text-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {message}
    </motion.div>
  );
};

export default ErrorMessage;