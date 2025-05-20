import { FaUser, FaCamera, FaKey, FaBell, FaShieldAlt, FaSignOutAlt, FaIdBadge } from "react-icons/fa";

const ProfileSidebar = ({
  user,
  previewImage,
  formData,
  fileInputRef,
  handleProfilePictureChange,
  setActiveTab,
  activeTab,
  handleLogout,
}) => (
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
          onClick={handleLogout}
          className="w-full px-6 py-3 flex items-center text-left text-red-600 hover:bg-red-50"
        >
          <FaSignOutAlt className="mr-3" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  </div>
);

export default ProfileSidebar;