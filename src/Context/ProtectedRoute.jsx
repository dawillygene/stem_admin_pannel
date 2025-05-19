import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // You'll need to implement this hook
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Then wrap your layout:
<Route element={<ProtectedRoute><LayoutWithSidebar /></ProtectedRoute>}>
  {/* protected routes */}
</Route>