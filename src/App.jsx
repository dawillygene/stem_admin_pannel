import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminList from "./pages/AdminList/AdminList";
import BlogUpload from "./pages/BlogUpload";
import BlogList from "./pages/BlogList";
import BlogEdit from "./pages/BlogEdit";
import BlogComments from "./pages/BlogComments";
import Profile from "./pages/Profile/Profile";
import Team from "./pages/Team";
import Auth from "./Auth/AuthPage";
import NormalAdminDashboard from "./pages/NormalAdminDashboard";
import GalleryAdmin from "./components/Gallery/GalleryAdmin";
import MainLayout from "./Layout/MainLayout";
import ProtectedRoute from "./Context/ProtectedRoute";
import Comments from "./components/CommentCard";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/login") {
      localStorage.setItem("lastRoute", location.pathname);
    }
  }, [location]);

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
                    <Route path="/team" element={<Team />} />
                    <Route path="/comments" element={<Comments />} />
                    <Route path="/blog-comments" element={<BlogComments />} />
                    <Route path="/gallery" element={<GalleryAdmin />} />
                    <Route path="/blogs" element={<BlogUpload />} />
                    <Route path="/blogs/create" element={<BlogUpload />} />
                    <Route path="/blogs/view" element={<BlogList />} />
                    <Route path="/blogs/edit/:id" element={<BlogEdit />} />
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