import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminList from "./pages/AdminList";
import BlogUpload from "./pages/BlogUpload";
import Profile from "./pages/Profile";
import Auth from "./Auth/AuthPage";
import NormalAdminDashboard from "./pages/NormalAdminDashboard";
import GalleryAdmin from "./components/Gallery/GalleryAdmin";
import MainLayout from "./Layout/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route - no sidebar */}
        <Route path="/login" element={<Auth />} />

        <Route
          path="/*"
          element={

            <MainLayout>
              <Routes> {/* Nested Routes */}
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/super-admin" element={<SuperAdminDashboard />} />
                <Route path="/admins" element={<AdminList />} />
                <Route path="/gallery" element={<GalleryAdmin />} />
                <Route path="/blogs" element={<BlogUpload />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/normal-admin" element={<NormalAdminDashboard />} />
              </Routes>
            </MainLayout>

          }
        />

      </Routes>
    </Router>
  );
}

export default App;