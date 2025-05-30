import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComment, FaTrash, FaCheck, FaSearch, FaFilter, FaSort, FaTimes, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import API from "../utils/axios";
import { useToast } from "./Toast";
import ConfirmationModal from "./ConfirmationModal";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [newComment, setNewComment] = useState({ text: "", author: "", post: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, commentId: null });
  const { blogId } = useParams(); // Get blogId from URL if your routing supports it
  const { showToast } = useToast();

  // Fetch comments for the current blog post
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      console.log("Fetching comments from API");
      
      try {
        // Use the pending comments endpoint as primary source for this admin page
        const url = blogId 
          ? `/admin/comments/post/${blogId}`
          : `/admin/comments/pending`;  // Updated to use the pending endpoint
      
        console.log(`Calling API endpoint: ${url}`);
        
        // Make the API request
        const response = await API.get(url);
        console.log("API response:", response.data);
        
        // Transform API response to match your component's expected format
        const formattedComments = response.data.map(comment => ({
          id: comment.id,
          text: comment.content,
          author: comment.guestAuthorName || "Anonymous User",
          date: new Date(comment.createdAt).toISOString().split("T")[0],
          status: comment.approved ? "approved" : "pending",
          post: "Current Post",
          approvedAt: comment.approvedAt,
          approvedBy: comment.approvedBy
        }));
        
        setComments(formattedComments);
        setFilteredComments(formattedComments);
        setError(null);
      } catch (err) {
        console.error("Error fetching comments:", err);
        
        // Handle different error scenarios
        if (err.response) {
          switch (err.response.status) {
            case 401:
              setError("Authentication required. Please log in to view comments.");
              break;
            case 403:
              setError("You don't have permission to access these comments. Admin privileges are required.");
              break;
            case 404:
              setError("Blog post not found.");
              break;
            default:
              setError(`Server error: ${err.response.data?.message || "Unknown error"}`);
          }
        } else if (err.request) {
          setError("Network error. Please check your connection and try again.");
        } else {
          setError(`Error: ${err.message}`);
        }
        
        setComments([]);
        setFilteredComments([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch comments on mount or when blogId changes
    fetchComments();
  }, [blogId]);

  // Filter and sort comments
  useEffect(() => {
    let result = [...comments];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        comment => 
          comment.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(comment => comment.status === statusFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredComments(result);
  }, [comments, searchTerm, statusFilter, sortOrder]);

  // Input validation helpers
  const containsScript = (str) => /<[^>]*>|\${|\(\)|\[\]|javascript:|on\w+\s*=|alert\(|document\.|window\.|eval\(|setTimeout\(|setInterval\(/gi.test(str);
  
  const sanitizeInput = (input) => {
    return typeof input === 'string' ? 
      input.replace(/<[^>]*>|\${|\(\)|\[\]|javascript:|on\w+\s*=|alert\(|document\.|window\.|eval\(|setTimeout\(|setInterval\(/gi, '') : 
      input;
  };
  
  const validateInput = (name, value) => {
    if (containsScript(value)) {
      showToast("Invalid input detected. Please avoid using special characters or HTML tags.", "error");
      return false;
    }

    const maxLengths = {
      text: 500,
      author: 50,
      post: 100
    };

    if (value.length > maxLengths[name]) {
      showToast(`${name.charAt(0).toUpperCase() + name.slice(1)} must be less than ${maxLengths[name]} characters.`, "error");
      return false;
    }

    return true;
  };

  // Input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validate input to prevent script injection
    if (containsScript(value)) {
      showToast("Invalid input detected. Please avoid using special characters or HTML tags.", "error");
      return;
    }
    
    // Apply character limits based on field
    const maxLengths = {
      text: 1000,    // Max 1000 chars for comment text
      author: 50,    // Max 50 chars for author names
      post: 100      // Max 100 chars for post titles
    };
    
    if (value.length > maxLengths[name]) {
      showToast(`${name.charAt(0).toUpperCase() + name.slice(1)} must be less than ${maxLengths[name]} characters.`, "error");
      return;
    }
    
    setNewComment((prev) => ({ ...prev, [name]: sanitizeInput(value) }));
  };

  // API actions with mock data support
  const handleAddComment = async () => {
    if (!validateInput('text', newComment.text) || 
        !validateInput('author', newComment.author) || 
        !validateInput('post', newComment.post)) {
      return;
    }

    try {
      const sanitizedComment = {
        text: sanitizeInput(newComment.text),
        author: sanitizeInput(newComment.author),
        post: sanitizeInput(newComment.post),
        date: new Date().toISOString().split("T")[0],
        status: "pending",
        id: comments.length + 1
      };

      const response = await API.post("/admin/comments/add", sanitizedComment);

      if (response.data?.message) {
        showToast(response.data.message, "success");
      }

      setComments((prev) => [sanitizedComment, ...prev]);
      setNewComment({ text: "", author: "", post: "" });
      setIsAddingComment(false);
    } catch (err) {
      console.error("Error adding comment:", err);
      showToast("Failed to add comment. Please try again.", "error");
    }
  };

  const handleApproveComment = async (id) => {
    try {
      const response = await API.put(`/admin/comments/approve/${id}`);
      
      if (response.data?.message) {
        showToast(response.data.message, "success");
      }
      
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === id ? { ...comment, status: "approved" } : comment
        )
      );
    } catch (err) {
      console.error("Error approving comment:", err);
      
      if (err.response) {
        switch (err.response.status) {
          case 401:
            showToast("Authentication required. Please log in to approve comments.", "error");
            break;
          case 403:
            showToast("You don't have permission to approve comments. Admin privileges required.", "error");
            break;
          case 404:
            showToast(err.response.data?.message || "Comment not found.", "error");
            break;
          case 500:
            showToast(err.response.data?.message || "Server error while approving comment.", "error");
            break;
          default:
            showToast(`Error: ${err.response.data?.message || "Unknown error"}`, "error");
        }
      } else if (err.request) {
        showToast("Network error. Please check your connection and try again.", "error");
      } else {
        showToast(`Error: ${err.message}`, "error");
      }
    }
  };

  const handleDeleteComment = async (id) => {
    if (typeof id !== 'number') return;
    
    try {
      console.log(`Deleting comment #${id}`);
      
      // Call the correct API endpoint for comment deletion
      const response = await API.delete(`/admin/comments/delete/${id}`);
      
      console.log("Deletion response:", response.data);
      
      // Show success message
      if (response.data?.message) {
        showToast(response.data.message, "success");
      }
      
      // Update local state by removing the deleted comment
      setComments((prev) => prev.filter((comment) => comment.id !== id));
      setFilteredComments((prev) => prev.filter((comment) => comment.id !== id));
      
    } catch (err) {
      console.error("Error deleting comment:", err);
      
      // Enhanced error handling based on API documentation
      if (err.response) {
        switch (err.response.status) {
          case 401:
            showToast("Authentication required. Please log in to delete comments.", "error");
            break;
          case 403:
            showToast("You don't have permission to delete comments. Admin privileges required.", "error");
            break;
          case 404:
            showToast(err.response.data?.message || "Comment not found.", "error");
            break;
          case 500:
            showToast(err.response.data?.message || "Server error while deleting comment.", "error");
            break;
          default:
            showToast(`Error: ${err.response.data?.message || "Unknown error"}`, "error");
        }
      } else if (err.request) {
        showToast("Network error. Please check your connection and try again.", "error");
      } else {
        showToast(`Error: ${err.message}`, "error");
      }
    }
  };

  // Search handler
  const handleSearchChange = (e) => {
    // Sanitize search input
    const value = sanitizeInput(e.target.value);
    setSearchTerm(value);
  };

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // Loading and error states
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <div className="w-16 h-16 border-4 border-t-[#0066CC] border-[#0066CC]/20 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading comments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#0066CC] text-white px-4 py-2 rounded-lg hover:bg-[#0066CC]/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0066CC]">Comments Management</h1>
              <p className="text-gray-600 mt-1">Review and manage user comments across the platform</p>
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-[#0066CC]/10 to-[#0066CC]/5 rounded-lg p-4 border border-[#0066CC]/20">
              <div className="flex items-center">
                <div className="p-3 bg-[#0066CC] rounded-lg text-white mr-4">
                  <FaComment />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Comments</p>
                  <p className="text-2xl font-bold text-gray-800">{comments.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#FFAD03]/10 to-[#FFAD03]/5 rounded-lg p-4 border border-[#FFAD03]/20">
              <div className="flex items-center">
                <div className="p-3 bg-[#FFAD03] rounded-lg text-white mr-4">
                  <FaCalendarAlt />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-gray-800">{comments.filter(c => c.status === "pending").length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#FD9148]/10 to-[#FD9148]/5 rounded-lg p-4 border border-[#FD9148]/20">
              <div className="flex items-center">
                <div className="p-3 bg-[#FD9148] rounded-lg text-white mr-4">
                  <FaUser />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Unique Authors</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {new Set(comments.map(c => c.author)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <motion.div 
          className="bg-white shadow-md rounded-xl p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search comments, authors, or posts..."
                value={searchTerm}
                onChange={handleSearchChange}
                maxLength={100}
                className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative flex items-center">
                <FaFilter className="absolute left-3 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 px-4 py-2 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                </select>
              </div>
              
              <div className="relative flex items-center">
                <FaSort className="absolute left-3 text-gray-400" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="pl-10 px-4 py-2 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <span>Showing <span className="font-medium">{filteredComments.length}</span> of <span className="font-medium">{comments.length}</span> comments</span>
          </div>
        </motion.div>

        {/* Comments Table */}
        <motion.div 
          className="bg-white shadow-lg rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#0066CC] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium">Comment</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredComments.map((comment) => (
                  <motion.tr 
                    key={comment.id} 
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm line-clamp-2">
                        {comment.text}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-[#0066CC]">
                        {comment.author}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{comment.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          comment.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {comment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex space-x-2 justify-end">
                        {comment.status === "pending" && (
                          <motion.button
                            onClick={() => handleApproveComment(comment.id)}
                            className="bg-green-100 text-green-700 hover:bg-green-200 p-2 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaCheck />
                          </motion.button>
                        )}
                        <motion.button
                          onClick={() => setConfirmModal({ isOpen: true, commentId: comment.id })}
                          className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            
            {filteredComments.length === 0 && (
              <div className="text-center py-16">
                <FaComment className="mx-auto text-gray-300 text-5xl mb-3" />
                <p className="text-gray-500">No comments found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                  className="mt-4 bg-[#0066CC] text-white px-4 py-2 rounded-lg hover:bg-[#0066CC]/90"
                >
                  Show All Comments
                </button>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Confirmation Modal for Comment Deletion */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ isOpen: false, commentId: null })}
          onConfirm={() => {
            if (confirmModal.commentId) {
              handleDeleteComment(confirmModal.commentId);
            }
            setConfirmModal({ isOpen: false, commentId: null });
          }}
          title="Delete Comment"
          message="Are you sure you want to delete this comment? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
};

export default Comments;