import { useAuth } from "./AppProvier";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { jwt, loading } = useAuth();

  if (loading) return null;

  if (!jwt) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;