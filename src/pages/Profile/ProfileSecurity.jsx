const ProfileSecurity = ({
  security,
  handleSecurityToggle,
  handleSessionTimeoutChange,
  handleSecuritySubmit,
}) => (
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
);

export default ProfileSecurity;