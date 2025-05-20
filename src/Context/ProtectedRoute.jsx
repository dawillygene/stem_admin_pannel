import { useAuth } from "./AppProvier";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { jwt, loading } = useAuth();

  if (loading) return null; // or a spinner

  if (!jwt) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Then wrap your layout:
<Route element={<ProtectedRoute><LayoutWithSidebar /></ProtectedRoute>}>
  {/* protected routes */}
</Route>