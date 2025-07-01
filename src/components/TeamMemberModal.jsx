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
  FaCalendarAlt,
  FaEdit,
  FaExternalLinkAlt
} from "react-icons/fa";

const TeamMemberModal = ({ 
  isOpen, 
  onClose, 
  member,
  onEdit 
}) => {
  if (!isOpen || !member) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
              Team Member Details
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(member)}
                className="text-white hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-white/10"
                title="Edit member"
              >
                <FaEdit size={18} />
              </button>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-white/10"
                title="Close"
              >
                <FaTimes size={18} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(90vh-80px)] overflow-y-auto">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-[#0066CC] rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto md:mx-0">
                  {member.profile_image ? (
                    <img 
                      src={member.profile_image} 
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={member.profile_image ? "hidden" : "flex"} style={{display: member.profile_image ? 'none' : 'flex'}}>
                    {member.name?.charAt(0)}
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h1>
                <p className="text-xl text-[#0066CC] font-semibold mb-2">{member.role}</p>
                <div className="flex items-center justify-center md:justify-start text-gray-600 mb-4">
                  <FaGraduationCap className="mr-2 text-[#FFAD03]" />
                  <span>{member.qualification}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-gray-500 text-sm">
                  <FaCalendarAlt className="mr-2" />
                  <span>Joined: {formatDate(member.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaEnvelope className="mr-2 text-[#0066CC]" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {member.contact?.email && (
                  <div className="flex items-center">
                    <FaEnvelope className="mr-3 text-[#FFAD03] flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a 
                        href={`mailto:${member.contact.email}`}
                        className="text-[#0066CC] hover:underline"
                      >
                        {member.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {member.contact?.phone && (
                  <div className="flex items-center">
                    <FaPhone className="mr-3 text-[#FD9148] flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a 
                        href={`tel:${member.contact.phone}`}
                        className="text-gray-900 hover:text-[#0066CC]"
                      >
                        {member.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {member.contact?.address && (
                  <div className="flex items-start md:col-span-2">
                    <FaMapMarkerAlt className="mr-3 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-gray-900">{member.contact.address}</p>
                    </div>
                  </div>
                )}

                {member.linkedin && (
                  <div className="flex items-center md:col-span-2">
                    <FaLinkedin className="mr-3 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">LinkedIn</p>
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        View LinkedIn Profile
                        <FaExternalLinkAlt className="ml-1 text-xs" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Biography */}
            {member.bio && (
              <div className="bg-white border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaFileAlt className="mr-2 text-[#0066CC]" />
                  Biography
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {member.bio}
                </p>
              </div>
            )}

            {/* Research Interests */}
            {member.research_interests && member.research_interests.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Research Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.research_interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-[#0066CC] text-white text-sm px-3 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Publications */}
            {member.publications && member.publications.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Publications
                </h3>
                <div className="space-y-4">
                  {member.publications.map((publication, index) => (
                    <div 
                      key={index}
                      className="bg-white p-4 rounded-lg border border-green-200"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {publication.title}
                      </h4>
                      <div className="text-sm text-gray-600">
                        {publication.journal && (
                          <span className="font-medium">{publication.journal}</span>
                        )}
                        {publication.journal && publication.year && <span>, </span>}
                        {publication.year && (
                          <span>{publication.year}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <span className="font-medium">Created:</span> {formatDate(member.created_at)}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span> {formatDate(member.updated_at)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TeamMemberModal;
