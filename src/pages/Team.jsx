import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUsers, 
  FaSearch, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaFilter,
  FaDownload,
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaMapMarkerAlt,
  FaSpinner
} from "react-icons/fa";
import { getTeamMembers, deleteTeamMember } from "../utils/teamApi";
import { useToast } from "../components/Toast";
import ConfirmationModal from "../components/ConfirmationModal";
import TeamMemberForm from "../components/TeamMemberForm";
import TeamMemberModal from "../components/TeamMemberModal";

const Team = () => {
  // State management
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const { showToast } = useToast();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Fetch team members
  const fetchTeamMembers = async (search = "") => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {};
      if (search.trim()) {
        params.search = search.trim();
      }
      
      const response = await getTeamMembers(params);
      
      // Handle the API response format: { success: true, data: { teamMembers: [...] } }
      let members = [];
      
      if (response && response.success && response.data && Array.isArray(response.data.teamMembers)) {
        members = response.data.teamMembers;
      } else if (Array.isArray(response)) {
        // Fallback for direct array response
        members = response;
      } else if (response && Array.isArray(response.data)) {
        // Fallback for data array
        members = response.data;
      }
      
      setTeamMembers(members);
    } catch (err) {
      console.error("Error fetching team members:", err);
      setError("Failed to load team members. Please try again.");
      
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setError("Authentication required. Please log in again.");
            break;
          case 403:
            setError("You don't have permission to view team members.");
            break;
          case 404:
            setError("Team members not found.");
            break;
          default:
            setError(`Server error: ${err.response.data?.message || "Unknown error"}`);
        }
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Search with debouncing
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchTeamMembers(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  // Filter and pagination
  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member =>
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.qualification?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [teamMembers, searchTerm]);

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMembers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  // Handle success after create/edit
  const handleFormSuccess = (memberData) => {
    // Refresh the team members list
    fetchTeamMembers(searchTerm);
  };

  // Handle edit
  const handleEditClick = (member) => {
    setEditingMember(member);
    setShowEditModal(true);
  };

  // Handle view details
  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setShowDetailModal(true);
  };

  // Handle delete
  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;
    
    try {
      await deleteTeamMember(memberToDelete.id);
      setTeamMembers(teamMembers.filter(member => member.id !== memberToDelete.id));
      showToast(`${memberToDelete.name} has been removed from the team.`, "success");
    } catch (err) {
      console.error("Error deleting team member:", err);
      showToast(`Failed to delete ${memberToDelete.name}. Please try again.`, "error");
    } finally {
      setShowDeleteModal(false);
      setMemberToDelete(null);
    }
  };

  // Handle export
  const handleExport = () => {
    try {
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Name,Role,Qualification,Email,Phone,LinkedIn\\n" 
        + filteredMembers.map(member => 
            `"${member.name}","${member.role}","${member.qualification}","${member.contact?.email || ''}","${member.contact?.phone || ''}","${member.linkedin || ''}"`
          ).join("\\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `team_members_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToast("Team members exported successfully!", "success");
    } catch (err) {
      console.error("Export error:", err);
      showToast("Failed to export team members.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#0066CC] text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-2 flex items-center justify-center">
              <FaUsers className="mr-3" />
              Team Management
            </h1>
            <p className="text-xl opacity-90">Manage STEM project team members</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls Section */}
        <motion.div 
          className="bg-white rounded-xl shadow-md p-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, role, or qualification..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="flex items-center px-4 py-2 bg-[#FFAD03] text-white rounded-lg hover:bg-[#e89b02] transition-colors"
                disabled={filteredMembers.length === 0}
              >
                <FaDownload className="mr-2" />
                Export
              </button>
              
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center px-4 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
              >
                <FaPlus className="mr-2" />
                Add Member
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0066CC]">{teamMembers.length}</div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FFAD03]">
                {teamMembers.filter(m => m.role.toLowerCase().includes('principal')).length}
              </div>
              <div className="text-sm text-gray-600">Principal Investigators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FD9148]">
                {teamMembers.filter(m => m.role.toLowerCase().includes('co')).length}
              </div>
              <div className="text-sm text-gray-600">Co-Investigators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {teamMembers.filter(m => m.contact?.email).length}
              </div>
              <div className="text-sm text-gray-600">With Contact Info</div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <FaSpinner className="animate-spin text-4xl text-[#0066CC] mx-auto mb-4" />
              <p className="text-gray-600">Loading team members...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <div className="text-red-600 mb-4">
                <FaUsers className="text-4xl mx-auto mb-2" />
                <p className="text-lg font-semibold">Unable to Load Team Members</p>
              </div>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={() => fetchTeamMembers(searchTerm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              {filteredMembers.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Team Members Found</h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm ? 
                      `No team members match "${searchTerm}". Try adjusting your search.` :
                      "No team members have been added yet. Add the first team member to get started."
                    }
                  </p>
                  {!searchTerm && (
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="px-6 py-3 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                    >
                      <FaPlus className="mr-2" />
                      Add First Team Member
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* Team Members Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <AnimatePresence>
                      {paginatedMembers.map((member, index) => (
                        <motion.div
                          key={member.id}
                          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          {/* Member Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-[#0066CC] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {member.name.charAt(0)}
                              </div>
                              <div className="ml-3">
                                <h3 className="font-semibold text-gray-900 text-lg">
                                  {member.name}
                                </h3>
                                <p className="text-[#0066CC] font-medium">{member.role}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleViewDetails(member)}
                                className="p-2 text-gray-500 hover:text-[#0066CC] transition-colors"
                                title="View details"
                              >
                                <FaEye />
                              </button>
                              <button
                                onClick={() => handleEditClick(member)}
                                className="p-2 text-gray-500 hover:text-[#FFAD03] transition-colors"
                                title="Edit member"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(member)}
                                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                title="Delete member"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>

                          {/* Member Details */}
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <FaUserGraduate className="mr-2 text-[#0066CC]" />
                              <span className="truncate">{member.qualification}</span>
                            </div>
                            
                            {member.contact?.email && (
                              <div className="flex items-center text-sm text-gray-600">
                                <FaEnvelope className="mr-2 text-[#FFAD03]" />
                                <span className="truncate">{member.contact.email}</span>
                              </div>
                            )}
                            
                            {member.contact?.phone && (
                              <div className="flex items-center text-sm text-gray-600">
                                <FaPhone className="mr-2 text-[#FD9148]" />
                                <span>{member.contact.phone}</span>
                              </div>
                            )}
                            
                            {member.contact?.address && (
                              <div className="flex items-center text-sm text-gray-600">
                                <FaMapMarkerAlt className="mr-2 text-green-500" />
                                <span className="truncate">{member.contact.address}</span>
                              </div>
                            )}
                            
                            {member.linkedin && (
                              <div className="flex items-center text-sm">
                                <FaLinkedin className="mr-2 text-blue-600" />
                                <a 
                                  href={member.linkedin} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline truncate"
                                >
                                  LinkedIn Profile
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Bio Preview */}
                          {member.bio && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-sm text-gray-600 line-clamp-3">
                                {member.bio}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredMembers.length)} of {filteredMembers.length} members
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          
                          {[...Array(totalPages)].map((_, index) => {
                            const page = index + 1;
                            const isActive = page === currentPage;
                            return (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-2 text-sm rounded-lg ${
                                  isActive
                                    ? 'bg-[#0066CC] text-white'
                                    : 'border border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          })}
                          
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Create Team Member Modal */}
      <TeamMemberForm
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleFormSuccess}
        mode="create"
      />

      {/* Edit Team Member Modal */}
      <TeamMemberForm
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingMember(null);
        }}
        onSuccess={handleFormSuccess}
        editingMember={editingMember}
        mode="edit"
      />

      {/* Team Member Details Modal */}
      <TeamMemberModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedMember(null);
        }}
        member={selectedMember}
        onEdit={(member) => {
          setShowDetailModal(false);
          setEditingMember(member);
          setShowEditModal(true);
        }}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Team Member"
        message={`Are you sure you want to remove ${memberToDelete?.name} from the team? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default Team;
