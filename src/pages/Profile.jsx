import { useState, useRef, useEffect } from "react";

import { 
  FaUser, FaEnvelope, FaIdBadge, FaPhone, FaMapMarkerAlt, 
  FaCalendarAlt, FaBriefcase, FaGraduationCap, FaCamera, 
  FaCheckCircle, FaEdit, FaKey, FaCog, FaSignOutAlt, 
  FaShieldAlt, FaBell 
} from "react-icons/fa";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  
  const user = null;
  const logout = null;
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    bio: user?.bio || "",
    birthdate: user?.birthdate || "",
    occupation: user?.occupation || "",
    education: user?.education || "",
    profilePicture: user?.profilePicture || null
  });
  
  // Preview image
  const [previewImage, setPreviewImage] = useState(user?.profilePicture || null);
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // Notifications settings
  const [notifications, setNotifications] = useState({
    email: user?.notifications?.email || true,
    app: user?.notifications?.app || true,
    updates: user?.notifications?.updates || false
  });
  
  // Security settings
  const [security, setSecurity] = useState({
    twoFactor: user?.security?.twoFactor || false,
    sessionTimeout: user?.security?.sessionTimeout || "30"
  });
  
  // Success message state
  const [successMessage, setSuccessMessage] = useState("");
  
  // Show success message temporarily
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle profile picture change
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
  
  // Handle password change inputs
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle notification toggle
  const handleNotificationToggle = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  // Handle security toggle
  const handleSecurityToggle = (setting) => {
    setSecurity(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  // Handle session timeout change
  const handleSessionTimeoutChange = (e) => {
    setSecurity(prev => ({
      ...prev,
      sessionTimeout: e.target.value
    }));
  };
  
  // Handle personal info form submission
  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    updateUser({ ...user, ...formData });
    setSuccessMessage("Profile updated successfully!");
    setIsEditing(false);
  };
  
  // Handle password form submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    
    setSuccessMessage("Password updated successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };
  
  // Handle notifications settings submission
  const handleNotificationsSubmit = (e) => {
    e.preventDefault();
    updateUser({
      ...user,
      notifications
    });
    setSuccessMessage("Notification settings updated!");
  };
  
  // Handle security settings submission
  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    updateUser({
      ...user,
      security
    });
    setSuccessMessage("Security settings updated!");
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
        {/* Sidebar with user info */}
        <div className="lg:w-1/4 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="relative mx-auto w-32 h-32 mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mx-auto">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt={formData.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-[#0066CC]/10 text-[#0066CC]">
                    <FaUser size={48} />
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-[#FFAD03] text-white p-2 rounded-full hover:bg-[#FD9148] transition duration-200"
              >
                <FaCamera size={16} />
              </button>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleProfilePictureChange}
                className="hidden" 
                accept="image/*" 
              />
            </div>
            
            <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-500">{user?.role}</p>
            
            <div className="mt-4 flex justify-center">
              <span className="px-3 py-1 bg-[#0066CC]/10 text-[#0066CC] text-sm font-medium rounded-full">
                {user?.department || "Department"}
              </span>
            </div>
            
            {user?.lastLogin && (
              <p className="mt-4 text-xs text-gray-500">
                Last login: {new Date(user.lastLogin).toLocaleString()}
              </p>
            )}
          </div>
          
          {/* Navigation Links */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <button 
              onClick={() => setActiveTab('personal')} 
              className={`w-full px-6 py-3 flex items-center text-left ${
                activeTab === 'personal' 
                  ? 'bg-[#0066CC] text-white' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaUser className="mr-3" />
              <span>Personal Information</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('password')} 
              className={`w-full px-6 py-3 flex items-center text-left ${
                activeTab === 'password' 
                  ? 'bg-[#0066CC] text-white' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaKey className="mr-3" />
              <span>Change Password</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('notifications')} 
              className={`w-full px-6 py-3 flex items-center text-left ${
                activeTab === 'notifications' 
                  ? 'bg-[#0066CC] text-white' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaBell className="mr-3" />
              <span>Notifications</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('security')} 
              className={`w-full px-6 py-3 flex items-center text-left ${
                activeTab === 'security' 
                  ? 'bg-[#0066CC] text-white' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaShieldAlt className="mr-3" />
              <span>Security</span>
            </button>
            
            <div className="border-t border-gray-200">
              <button 
                onClick={logout}
                className="w-full px-6 py-3 flex items-center text-left text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt className="mr-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="lg:w-3/4">
          {/* Success message */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-700 flex items-center">
              <FaCheckCircle className="mr-2" />
              {successMessage}
            </div>
          )}
          
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0066CC] text-white rounded-md hover:bg-[#0056b3] transition duration-200"
                  >
                    <FaEdit size={16} /> Edit
                  </button>
                ) : null}
              </div>
              
              <form onSubmit={handlePersonalInfoSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FaUser className="inline mr-2 text-[#0066CC]" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full border ${
                        isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                      } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066CC]`}
                      required
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FaEnvelope className="inline mr-2 text-[#0066CC]" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full border ${
                        isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                      } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066CC]`}
                      required
                    />
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FaPhone className="inline mr-2 text-[#0066CC]" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full border ${
                        isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                      } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066CC]`}
                    />
                  </div>
                  
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FaMapMarkerAlt className="inline mr-2 text-[#0066CC]" />
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full border ${
                        isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                      } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066CC]`}
                    />
                  </div>
                  
                  {/* Birthdate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FaCalendarAlt className="inline mr-2 text-[#0066CC]" />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full border ${
                        isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                      } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066CC]`}
                    />
                  </div>
                  
                  {/* Role - Always disabled */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FaIdBadge className="inline mr-2 text-[#0066CC]" />
                      Role
                    </label>
                    <input
                      type="text"
                      value={user?.role || ""}
                      disabled
                      className="w-full border border-gray-200 bg-gray-50 text-gray-700 rounded-lg px-4 py-2 cursor-not-allowed"
                    />
                  </div>
                  
                  {/* Occupation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FaBriefcase className="inline mr-2 text-[#0066CC]" />
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full border ${
                        isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                      } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066CC]`}
                    />
                  </div>
                  
                  {/* Education */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FaGraduationCap className="inline mr-2 text-[#0066CC]" />
                      Education
                    </label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full border ${
                        isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                      } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066CC]`}
                    />
                  </div>
                </div>
                
                {/* Bio */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="4"
                    className={`w-full border ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066CC]`}
                    placeholder={isEditing ? "Tell us about yourself..." : ""}
                  ></textarea>
                </div>
                
                {/* Action Buttons */}
                {isEditing && (
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#0066CC] text-white font-medium rounded-lg hover:bg-[#0056b3] transition duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}
          
          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>
              <form onSubmit={handlePasswordSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                      required
                      minLength="8"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters long and include a mix of letters, numbers and symbols.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0066CC] text-white font-medium rounded-lg hover:bg-[#0056b3] transition duration-200"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Settings</h2>
              <form onSubmit={handleNotificationsSubmit}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.email} 
                        onChange={() => handleNotificationToggle('email')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0066CC]/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066CC]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">App Notifications</h3>
                      <p className="text-sm text-gray-500">Receive notifications within the app</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.app} 
                        onChange={() => handleNotificationToggle('app')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0066CC]/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066CC]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Product Updates</h3>
                      <p className="text-sm text-gray-500">Receive updates about system improvements</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.updates} 
                        onChange={() => handleNotificationToggle('updates')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0066CC]/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066CC]"></div>
                    </label>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0066CC] text-white font-medium rounded-lg hover:bg-[#0056b3] transition duration-200"
                  >
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Security Settings</h2>
              <form onSubmit={handleSecuritySubmit}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={security.twoFactor} 
                        onChange={() => handleSecurityToggle('twoFactor')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0066CC]/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066CC]"></div>
                    </label>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Session Timeout</h3>
                    <p className="text-sm text-gray-500 mb-3">Automatically sign out after a period of inactivity</p>
                    <select
                      value={security.sessionTimeout}
                      onChange={handleSessionTimeoutChange}
                      className="w-full md:w-1/3 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="never">Never timeout</option>
                    </select>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-2">Login History</h3>
                    <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                      {[
                        { date: "2025-04-29T10:30:00", location: "Dodoma, Tanzania", device: "Chrome on Windows" },
                        { date: "2025-04-27T15:45:00", location: "Dodoma, Tanzania", device: "Safari on iPhone" },
                        { date: "2025-04-25T08:15:00", location: "Dar es Salaam, Tanzania", device: "Chrome on Android" },
                      ].map((login, index) => (
                        <div key={index} className="py-2 border-b border-gray-200 last:border-0">
                          <div className="flex justify-between">
                            <div>
                              <div className="font-medium">{new Date(login.date).toLocaleString()}</div>
                              <div className="text-sm text-gray-500">{login.device}</div>
                            </div>
                            <div className="text-sm text-gray-600">{login.location}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0066CC] text-white font-medium rounded-lg hover:bg-[#0056b3] transition duration-200"
                  >
                    Save Security Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;