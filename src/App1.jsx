import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Navbar from "./Layout/Sidebar";
import Home from "./pages/Home";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminList from "./pages/AdminList";
import BlogUpload from "./pages/BlogUpload";
import Profile from "./pages/Profile";
import Auth from "./Auth/AuthPage";
import NormalAdminDashboard from "./pages/NormalAdminDashboard";
import GalleryAdmin from "./components/Gallery/GalleryAdmin";

function App() {
  return (

    <Router>
      <Routes>

        <Route path="/login" element={<Auth />} />

    
        <Route
          path="/*"
          element={

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

                      <SuperAdminDashboard />

                    }
                  />
                  <Route
                    path="/admins"
                    element={

                      <AdminList />

                    }
                  />
                  <Route path="/gallery" element={<GalleryAdmin />} />
                  <Route path="/blogs" element={<BlogUpload />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route
                    path="/normal-admin"
                    element={

                      <NormalAdminDashboard />

                    }
                  />
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </div>
            </div>

          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>

  );
}

export default App;