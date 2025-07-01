import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTimes, 
  FaUser, 
  FaGraduationCap, 
  FaIdBadge,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaFileAlt,
  FaPlus,
  FaTrash,
  FaSpinner
} from "react-icons/fa";
import { createTeamMember, updateTeamMember, validateTeamMemberData, prepareTeamMemberForSubmission } from "../utils/teamApi";
import { useToast } from "../components/Toast";

const TeamMemberForm = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  editingMember = null, 
  mode = "create" // "create" or "edit"
}) => {
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    profile_image: "",
    bio: "",
    linkedin: "",
    research_interests: [],
    publications: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [newPublication, setNewPublication] = useState({ title: "", year: "", journal: "" });

  const { showToast } = useToast();

  // Initialize form with editing member data
  useEffect(() => {
    if (editingMember && mode === "edit") {
      setFormData({
        name: editingMember.name || "",
        qualification: editingMember.qualification || "",
        role: editingMember.role || "",
        email: editingMember.contact?.email || "",
        phone: editingMember.contact?.phone || "",
        address: editingMember.contact?.address || "",
        profile_image: editingMember.profile_image || "",
        bio: editingMember.bio || "",
        linkedin: editingMember.linkedin || "",
        research_interests: editingMember.research_interests || [],
        publications: editingMember.publications || []
      });
    } else {
      // Reset form for create mode
      setFormData({
        name: "",
        qualification: "",
        role: "",
        email: "",
        phone: "",
        address: "",
        profile_image: "",
        bio: "",
        linkedin: "",
        research_interests: [],
        publications: []
      });
    }
    setErrors({});
  }, [editingMember, mode, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const addResearchInterest = () => {
    if (newInterest.trim() && !formData.research_interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        research_interests: [...prev.research_interests, newInterest.trim()]
      }));
      setNewInterest("");
    }
  };

  const removeResearchInterest = (index) => {
    setFormData(prev => ({
      ...prev,
      research_interests: prev.research_interests.filter((_, i) => i !== index)
    }));
  };

  const addPublication = () => {
    if (newPublication.title.trim() && newPublication.year.trim()) {
      setFormData(prev => ({
        ...prev,
        publications: [...prev.publications, { ...newPublication }]
      }));
      setNewPublication({ title: "", year: "", journal: "" });
    }
  };

  const removePublication = (index) => {
    setFormData(prev => ({
      ...prev,
      publications: prev.publications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data for validation
    const dataToValidate = {
      name: formData.name,
      qualification: formData.qualification,
      role: formData.role,
      contact: {
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      },
      profile_image: formData.profile_image,
      linkedin: formData.linkedin
    };

    // Validate form data
    const validation = validateTeamMemberData(dataToValidate);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast("Please fix the errors in the form.", "error");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const submissionData = prepareTeamMemberForSubmission(formData);
      
      let response;
      if (mode === "edit" && editingMember) {
        response = await updateTeamMember(editingMember.id, submissionData);
        showToast(`${formData.name} has been updated successfully!`, "success");
      } else {
        response = await createTeamMember(submissionData);
        showToast(`${formData.name} has been added to the team!`, "success");
      }

      onSuccess(response.data);
      onClose();
    } catch (err) {
      console.error("Error submitting team member:", err);
      
      if (err.response) {
        switch (err.response.status) {
          case 400:
            const validationErrors = err.response.data.error?.details || {};
            setErrors(validationErrors);
            showToast("Please check the form for errors.", "error");
            break;
          case 401:
            showToast("Authentication required. Please log in again.", "error");
            break;
          case 403:
            showToast("You don't have permission to perform this action.", "error");
            break;
          case 409:
            showToast("A team member with this information already exists.", "error");
            break;
          default:
            showToast(`Failed to ${mode} team member. Please try again.`, "error");
        }
      } else {
        showToast("Network error. Please check your connection and try again.", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#0066CC] text-white px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
              <FaUser className="mr-2" />
              {mode === "edit" ? "Edit Team Member" : "Add New Team Member"}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 max-h-[calc(90vh-80px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="inline mr-1 text-[#0066CC]" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter full name"
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaIdBadge className="inline mr-1 text-[#0066CC]" />
                    Role *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] ${
                      errors.role ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Principal Investigator, Co-PI, Research Associate"
                    required
                  />
                  {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaGraduationCap className="inline mr-1 text-[#0066CC]" />
                    Qualification *
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] ${
                      errors.qualification ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., PhD in Computer Science, MSc in Educational Management"
                    required
                  />
                  {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="inline mr-1 text-[#FFAD03]" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaPhone className="inline mr-1 text-[#FD9148]" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaMapMarkerAlt className="inline mr-1 text-green-500" />
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                      placeholder="Enter address"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaLinkedin className="inline mr-1 text-blue-600" />
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] ${
                        errors.linkedin ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="https://linkedin.com/in/username"
                    />
                    {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaFileAlt className="inline mr-1 text-[#0066CC]" />
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                      placeholder="Brief biography and expertise..."
                    />
                  </div>

                  {/* Research Interests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Research Interests
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                        placeholder="Add research interest"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResearchInterest())}
                      />
                      <button
                        type="button"
                        onClick={addResearchInterest}
                        className="px-4 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.research_interests.map((interest, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center"
                        >
                          {interest}
                          <button
                            type="button"
                            onClick={() => removeResearchInterest(index)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <FaTimes size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Publications */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Publications
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                      <input
                        type="text"
                        value={newPublication.title}
                        onChange={(e) => setNewPublication(prev => ({ ...prev, title: e.target.value }))}
                        className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                        placeholder="Publication title"
                      />
                      <input
                        type="text"
                        value={newPublication.year}
                        onChange={(e) => setNewPublication(prev => ({ ...prev, year: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                        placeholder="Year"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newPublication.journal}
                          onChange={(e) => setNewPublication(prev => ({ ...prev, journal: e.target.value }))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                          placeholder="Journal"
                        />
                        <button
                          type="button"
                          onClick={addPublication}
                          className="px-3 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {formData.publications.map((pub, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium">{pub.title}</p>
                            <p className="text-sm text-gray-600">
                              {pub.journal && `${pub.journal}, `}{pub.year}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removePublication(index)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="border-t pt-6 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting && <FaSpinner className="animate-spin mr-2" />}
                  {mode === "edit" ? "Update Member" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TeamMemberForm;
