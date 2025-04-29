import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Navbar from "./components/sidebar";
import Home from "./pages/Home";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminList from "./pages/AdminList";
import BlogUpload from "./pages/BlogUpload";
import Profile from "./pages/Profile";
import Login from "./pages/Auth/Login";
import NormalAdminDashboard from "./pages/NormalAdminDashboard";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-[#0066CC] mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">An error occurred while rendering the application.</p>
            <p className="text-sm text-gray-500">Please check the console for details or contact support.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const ProtectedRoute = ({ children, requiredRole }) => {
  const context = React.useContext(AuthContext);
  if (!context) {
    console.error("AuthContext is undefined in ProtectedRoute");
    return <Navigate to="/login" replace />;
  }
  const { user } = context;
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Route: Login */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes: Layout with Sidebar and Content */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="flex min-h-screen bg-gray-50">
                    {/* Sidebar (Navbar) */}
                    <div className=" bg-[#0066CC] text-white flex-shrink-0">
                      <Navbar />
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-hidden">
                      <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route
                          path="/super-admin"
                          element={
                            <ProtectedRoute requiredRole="superadmin">
                              <SuperAdminDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admins"
                          element={
                            <ProtectedRoute requiredRole="superadmin">
                              <AdminList />
                            </ProtectedRoute>
                          }
                        />
                        <Route path="/blogs" element={<BlogUpload />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route
                          path="/normal-admin"
                          element={
                            <ProtectedRoute requiredRole="admin">
                              <NormalAdminDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route path="*" element={<Navigate to="/home" replace />} />
                      </Routes>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;