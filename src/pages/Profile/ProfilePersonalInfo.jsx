import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaIdBadge, FaBriefcase, FaGraduationCap, FaEdit } from "react-icons/fa";

const ProfilePersonalInfo = ({
  formData,
  handleInputChange,
  isEditing,
  setIsEditing,
  handlePersonalInfoSubmit,
  user,
}) => (
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
        {/* Role */}
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
);

export default ProfilePersonalInfo;