const ProfilePassword = ({
  passwordData,
  handlePasswordChange,
  handlePasswordSubmit,
}) => (
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
);

export default ProfilePassword;