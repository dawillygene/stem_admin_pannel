import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminList from "./pages/AdminList/AdminList";
import BlogUpload from "./pages/BlogUpload";
import Profile from "./pages/Profile/Profile";
import Auth from "./Auth/AuthPage";
import NormalAdminDashboard from "./pages/NormalAdminDashboard";
import GalleryAdmin from "./components/Gallery/GalleryAdmin";
import MainLayout from "./Layout/MainLayout";
import ProtectedRoute from "./Context/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Routes>
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
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;