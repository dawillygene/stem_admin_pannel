import { useAuth } from "../../Context/AppProvier";
import { useToast } from "../../components/Toast";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../utils/axios";
import ConfirmationModal from "../../components/ConfirmationModal";
import SidebarHeader from "./SidebarHeader";
import SidebarUser from "./SidebarUser";
import SidebarNav from "./SidebarNav";
import SidebarLogout from "./SidebarLogout";
import SidebarMobileHeader from "./SidebarMobileHeader";
import SidebarMobileBackdrop from "./SidebarMobileBackdrop";

const Sidebar = () => {
  const { jwt, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [user, setUser] = useState({ name: "" });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (jwt) {
        try {
          const res = await API.get("/auth/users/me");
          setUser(res.data);
        } catch {
          setUser({ name: "" });
        }
      }
    };
    fetchUser();
  }, [jwt]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    try {
      await API.post("/auth/logout");
      window.location.href = "/login";
    } catch (err) {
      showToast("Logout failed. Please try again.", "error");
      console.error("Logout error:", err);
    }
  };

  const navItems = [
    { path: "/home", icon: "FaHome", label: "Home" },
    { path: "/super-admin", icon: "FaChartBar", label: "Dashboard" },
    { path: "/admins", icon: "FaUsers", label: "Admins" },
    { path: "/comments", icon: "FaComment", label: "Comments statistics" },
    { path: "/blog-comments", icon: "FaComment", label: "Blog Comments" },
    {
      path: "/blogs",
      icon: "FaFileUpload",
      label: "Blogs & Publications",
      children: [
        { path: "/blogs/view", icon: "FaList", label: "View Posts" },
        { path: "/blogs/create", icon: "FaPlus", label: "Create Post" }
      ]
    },
    { path: "/gallery", icon: "FaImage", label: "Gallery" },
    { path: "/profile", icon: "FaUser", label: "Profile" },
  ];

  return (
      <>
        <SidebarMobileHeader isMobile={isMobile} isOpen={isOpen} setIsOpen={setIsOpen} />
        <AnimatePresence>
          <motion.div
              className={`fixed top-0 left-0 h-screen w-64 bg-[#0066CC] text-white z-50 shadow-xl
          ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        `}
              animate={{
                x: isMobile && !isOpen ? -256 : 0,
              }}
              transition={{ duration: 0.3 }}
          >
            <SidebarHeader />
            <SidebarUser user={user} />
            <SidebarNav navItems={navItems} location={location} isMobile={isMobile} setIsOpen={setIsOpen} />
            <SidebarLogout handleLogout={handleLogout} />
          </motion.div>
        </AnimatePresence>
        <SidebarMobileBackdrop isMobile={isMobile} isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="hidden md:block md:ml-64" />
        <ConfirmationModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={confirmLogout}
          title="Confirm Logout"
          message="Are you sure you want to log out? You will need to sign in again to access the dashboard."
          confirmText="Logout"
          cancelText="Cancel"
          type="warning"
        />
      </>
  );
};

export default Sidebar;