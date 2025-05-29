import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaComment, FaTrash, FaCheck, FaSearch, FaFilter, FaSort, 
  FaBookOpen, FaClock, FaBlog, FaList, FaArrowLeft 
} from "react-icons/fa";
import API from "../utils/axios";
import { useToast } from "../components/Toast";
import ConfirmationModal from "../components/ConfirmationModal";

const BlogComments = () => {
  const { showToast } = useToast();
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, commentId: null });
  
  // Fetch all blog posts first
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await API.get("/blog/posts");
        console.log("Blog posts response:", response.data);
        setBlogPosts(response.data);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        
        if (err.response) {
          setError(`Server error: ${err.response.status} - ${err.response.data?.message || "Unknown error"}`);
        } else if (err.request) {
          setError("Network error. Please check your connection and try again.");
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Fetch comments when a post is selected
  useEffect(() => {
    if (selectedPost) {
      const fetchComments = async () => {
        setLoadingComments(true);
        setCommentError(null);
        
        try {
          const url = `/admin/comments/post/${selectedPost.id}`;
          console.log(`Fetching comments from: ${url}`);
          
          const response = await API.get(url);
          console.log("Comments response:", response.data);
          
          // Transform API response to match expected format
          const formattedComments = response.data.map(comment => ({
            id: comment.id,
            text: comment.content,
            author: comment.guestAuthorName || "Anonymous User",
            date: new Date(comment.createdAt).toISOString().split("T")[0],
            status: comment.approved ? "approved" : "pending",
            approvedAt: comment.approvedAt,
            approvedBy: comment.approvedBy
          }));
          
          setComments(formattedComments);
          setFilteredComments(formattedComments);
        } catch (err) {
          console.error("Error fetching comments:", err);
          
          if (err.response) {
            switch (err.response.status) {
              case 401:
                setCommentError("Authentication required. Please log in to view comments.");
                break;
              case 403:
                setCommentError("You don't have permission to access these comments. Admin privileges are required.");
                break;
              case 404:
                setCommentError("Blog post not found.");
                break;
              default:
                setCommentError(`Server error: ${err.response.data?.message || "Unknown error"}`);
            }
          } else if (err.request) {
            setCommentError("Network error. Please check your connection and try again.");
          } else {
            setCommentError(`Error: ${err.message}`);
          }
          
          setComments([]);
          setFilteredComments([]);
        } finally {
          setLoadingComments(false);
        }
      };
      
      fetchComments();
    }
  }, [selectedPost]);

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

  // API actions
  const handleApproveComment = async (id) => {
    if (typeof id !== 'number') return;
    
    try {
      console.log(`Approving comment #${id}`);
      
      // Call the API endpoint for comment approval
      const response = await API.put(`/admin/comments/approve/${id}`);
      
      console.log("Approval response:", response.data);
      
      // Show success message
      if (response.data?.message) {
        showToast(response.data.message, 'success');
      } else {
        showToast('Comment approved successfully!', 'success');
      }
      
      // Update local state
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === id ? { 
            ...comment, 
            status: "approved",
            approvedAt: new Date().toISOString(),
          } : comment
        )
      );
    } catch (err) {
      console.error("Error approving comment:", err);
      
      if (err.response) {
        switch (err.response.status) {
          case 401:
            showToast("Authentication required. Please log in to approve comments.", 'error');
            break;
          case 403:
            showToast("You don't have permission to approve comments. Admin privileges required.", 'error');
            break;
          case 404:
            showToast(err.response.data?.message || "Comment not found.", 'error');
            break;
          case 500:
            showToast(err.response.data?.message || "Server error while approving comment.", 'error');
            break;
          default:
            showToast(`Error: ${err.response.data?.message || "Unknown error"}`, 'error');
        }
      } else if (err.request) {
        showToast("Network error. Please check your connection and try again.", 'error');
      } else {
        showToast(`Error: ${err.message}`, 'error');
      }
    }
  };

  const handleDeleteComment = async (id) => {
    if (typeof id !== 'number') return;
    
    try {
      console.log(`Deleting comment #${id}`);
      
      // Call the API endpoint for comment deletion
      const response = await API.delete(`/admin/comments/delete/${id}`);
      
      console.log("Deletion response:", response.data);
      
      // Show success message
      if (response.data?.message) {
        showToast(response.data.message, 'success');
      } else {
        showToast('Comment deleted successfully!', 'success');
      }
      
      // Update local state
      setComments((prev) => prev.filter((comment) => comment.id !== id));
      setFilteredComments((prev) => prev.filter((comment) => comment.id !== id));
    } catch (err) {
      console.error("Error deleting comment:", err);
      
      if (err.response) {
        switch (err.response.status) {
          case 401:
            showToast("Authentication required. Please log in to delete comments.", 'error');
            break;
          case 403:
            showToast("You don't have permission to delete comments. Admin privileges required.", 'error');
            break;
          case 404:
            showToast(err.response.data?.message || "Comment not found.", 'error');
            break;
          case 500:
            showToast(err.response.data?.message || "Server error while deleting comment.", 'error');
            break;
          default:
            showToast(`Error: ${err.response.data?.message || "Unknown error"}`, 'error');
        }
      } else if (err.request) {
        showToast("Network error. Please check your connection and try again.", 'error');
      } else {
        showToast(`Error: ${err.message}`, 'error');
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBackToBlogs = () => {
    setSelectedPost(null);
    setComments([]);
    setFilteredComments([]);
    setSearchTerm("");
    setStatusFilter("all");
  };

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.05
      } 
    }
  };

  const cardVariant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <div className="w-16 h-16 border-4 border-t-[#0066CC] border-[#0066CC]/20 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  // Error state
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

  // Blog posts list view
  if (!selectedPost) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#0066CC]">Blog Comments Management</h1>
                <p className="text-gray-600 mt-1">Select a blog post to view and manage its comments</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="flex items-center relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FaBlog />
              <span>Total Posts: <span className="font-medium">{blogPosts.length}</span></span>
            </div>
          </div>
          
          {/* Blog Posts Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {blogPosts.map(post => (
              <motion.div
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedPost(post)}
                variants={cardVariant}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.alt || "Blog post"} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-[#0066CC]/80 text-white text-xs rounded-full">
                        {post.category?.name || "Uncategorized"}
                      </span>
                      <span className="px-2 py-1 bg-[#FFAD03]/80 text-white text-xs rounded-full flex items-center">
                        <FaComment className="mr-1" size={10} /> 
                        {post.reactions?.comments || 0}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 mb-4 text-sm">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <img 
                        src={post.author?.profilePictureUrl || "https://via.placeholder.com/40"} 
                        alt={post.author?.name || "Author"} 
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span>{post.author?.name || "Unknown Author"}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-1" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {blogPosts.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <FaBlog className="mx-auto text-gray-300 text-5xl mb-3" />
              <h3 className="text-xl font-medium text-gray-700 mb-1">No Blog Posts Found</h3>
              <p className="text-gray-500">There are currently no blog posts in the system.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Comments view for selected post
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <button
              onClick={handleBackToBlogs}
              className="flex items-center text-[#0066CC] hover:text-[#0066CC]/70 mr-4"
            >
              <FaArrowLeft className="mr-2" />
              <span>Back to Posts</span>
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0066CC] line-clamp-2">
                {selectedPost.title}
              </h1>
              <p className="text-gray-600 mt-1 flex items-center">
                <FaBookOpen className="mr-2" /> 
                By {selectedPost.author?.name || "Unknown Author"} • 
                <span className="ml-1">{new Date(selectedPost.createdAt).toLocaleDateString()}</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="px-3 py-1 bg-[#FFAD03] text-white rounded-full flex items-center text-sm">
                <FaComment className="mr-1" />
                <span>{comments.length} Comments</span>
              </div>
              <div className="px-3 py-1 bg-[#0066CC] text-white rounded-full flex items-center text-sm">
                <FaCheck className="mr-1" />
                <span>{comments.filter(c => c.status === "approved").length} Approved</span>
              </div>
              <div className="px-3 py-1 bg-gray-500 text-white rounded-full flex items-center text-sm">
                <FaClock className="mr-1" />
                <span>{comments.filter(c => c.status === "pending").length} Pending</span>
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
                placeholder="Search comments or authors..."
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

        {/* Comments Content */}
        <AnimatePresence>
          {loadingComments ? (
            <motion.div 
              key="loading"
              className="bg-white shadow-md rounded-xl p-8 text-center"
              {...fadeIn}
            >
              <div className="w-12 h-12 border-4 border-t-[#0066CC] border-[#0066CC]/20 border-solid rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading comments...</p>
            </motion.div>
          ) : commentError ? (
            <motion.div 
              key="error"
              className="bg-white shadow-md rounded-xl p-8 text-center"
              {...fadeIn}
            >
              <div className="text-red-500 text-4xl mb-3">⚠️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Comments</h3>
              <p className="text-gray-600 mb-4">{commentError}</p>
              <button 
                onClick={() => {
                  setCommentError(null);
                  if (selectedPost) {
                    // Re-fetch comments
                    setSelectedPost({...selectedPost});
                  }
                }}
                className="bg-[#0066CC] text-white px-4 py-2 rounded-lg hover:bg-[#0066CC]/90"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="comments-table"
              className="bg-white shadow-lg rounded-xl overflow-hidden"
              {...fadeIn}
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
          )}
        </AnimatePresence>
        
        {/* Confirmation Modal for Deletion */}
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

export default BlogComments;