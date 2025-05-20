import { useState, useRef, useEffect } from "react";
import API from '../../utils/axios';
import ProfileSidebar from "./ProfileSidebar";
import ProfilePersonalInfo from "./ProfilePersonalInfo";
import ProfilePassword from "./ProfilePassword";
import ProfileNotifications from "./ProfileNotifications";
import ProfileSecurity from "./ProfileSecurity";
import { FaCheckCircle } from "react-icons/fa";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  // User state
  const [user, setUser] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    birthdate: "",
    occupation: "",
    education: "",
    profilePicture: null,
  });

  // Preview image
  const [previewImage, setPreviewImage] = useState(null);

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Notifications settings
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    updates: false,
  });

  // Security settings
  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: "30",
  });

  // Success message state
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/auth/users/me');
        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          bio: res.data.bio || "",
          birthdate: res.data.birthdate || "",
          occupation: res.data.occupation || "",
          education: res.data.education || "",
          profilePicture: res.data.profilePictureUrl || null,
        });
        setPreviewImage(res.data.profilePictureUrl || null);
        setNotifications({
          email: res.data.notifications?.email ?? true,
          app: res.data.notifications?.app ?? true,
          updates: res.data.notifications?.updates ?? false,
        });
        setSecurity({
          twoFactor: res.data.security?.twoFactor ?? false,
          sessionTimeout: res.data.security?.sessionTimeout ?? "30",
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  // Show success message temporarily
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle logout
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await API.post("/auth/logout");
        window.location.href = "/login";
      } catch (err) {
        alert("Logout failed. Please try again.");
        console.error("Logout error:", err);
      }
    }
  };

  // PUT method to update user
  const updateUser = async (updatedData) => {
    try {
      const res = await API.put('/auth/users/me', {
        ...updatedData,
        notifications,
        security,
        profilePictureUrl: formData.profilePicture,
      });
      setUser(res.data);
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update user:", err);
      setSuccessMessage("Failed to update profile.");
    }
  };

  // Handlers for each section
  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    updateUser({ ...user, ...formData });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    try {
      await API.post('/auth/users/me/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      });
      setSuccessMessage("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (err) {
      setSuccessMessage("Failed to update password.");
      console.error("Failed to update password:", err);
    }
  };

  const handleNotificationsSubmit = (e) => {
    e.preventDefault();
    updateUser({
      ...user,
      notifications
    });
    setSuccessMessage("Notification settings updated!");
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    updateUser({
      ...user,
      security
    });
    setSuccessMessage("Security settings updated!");
  };

  // Handlers for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({
          ...prev,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSecurityToggle = (setting) => {
    setSecurity(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSessionTimeoutChange = (e) => {
    setSecurity(prev => ({
      ...prev,
      sessionTimeout: e.target.value
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-[#f8f8f8] text-blue-600 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="mt-2 text-blue-600">Manage your personal information and account settings</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 w-full flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <ProfileSidebar
          user={user}
          previewImage={previewImage}
          formData={formData}
          fileInputRef={fileInputRef}
          handleProfilePictureChange={handleProfilePictureChange}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          handleLogout={handleLogout}
        />

        {/* Main content area */}
        <div className="lg:w-3/4">
          {successMessage && (
            <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-700 flex items-center">
              <FaCheckCircle className="mr-2" />
              {successMessage}
            </div>
          )}

          {activeTab === 'personal' && (
            <ProfilePersonalInfo
              formData={formData}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handlePersonalInfoSubmit={handlePersonalInfoSubmit}
              user={user}
            />
          )}

          {activeTab === 'password' && (
            <ProfilePassword
              passwordData={passwordData}
              handlePasswordChange={handlePasswordChange}
              handlePasswordSubmit={handlePasswordSubmit}
            />
          )}

          {activeTab === 'notifications' && (
            <ProfileNotifications
              notifications={notifications}
              handleNotificationToggle={handleNotificationToggle}
              handleNotificationsSubmit={handleNotificationsSubmit}
            />
          )}

          {activeTab === 'security' && (
            <ProfileSecurity
              security={security}
              handleSecurityToggle={handleSecurityToggle}
              handleSessionTimeoutChange={handleSessionTimeoutChange}
              handleSecuritySubmit={handleSecuritySubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;