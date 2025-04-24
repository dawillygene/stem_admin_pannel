import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComment, FaTrash, FaCheck, FaTimes, FaSearch, FaFilter, FaSort } from "react-icons/fa";

const Comments = () => {
  const [comments, setComments] = useState([
    { 
      id: 1, 
      text: "This article on mathematics teaching methods is very insightful. I've implemented some of these techniques in my classroom.", 
      author: "elly", 
      date: "2025-04-15", 
      status: "pending",
      post: "Innovative Methods for Teaching Mathematics"
    },
    { 
      id: 2, 
      text: "Great resource for science teachers! The laboratory setup guide is exactly what our school needed.", 
      author: "dawwilly", 
      date: "2025-04-16", 
      status: "approved",
      post: "Setting Up Effective Science Laboratories"
    },
    { 
      id: 3, 
      text: "I would like to see more content about integrating technology in STEM education. Could you cover this topic?", 
      author: "abdulswamad", 
      date: "2025-04-17", 
      status: "pending",
      post: "The Future of STEM Education in Tanzania"
    },
    { 
      id: 4, 
      text: "The statistics in this article seem outdated. I believe there's new research available on this topic.", 
      author: "maria", 
      date: "2025-04-18", 
      status: "pending",
      post: "STEM Education Statistics in East Africa"
    },
    { 
      id: 5, 
      text: "Thank you for highlighting the gender gap in science education. This is an important issue that needs addressing.", 
      author: "john", 
      date: "2025-04-19", 
      status: "approved",
      post: "Addressing Gender Gaps in STEM"
    },
  ]);

  const [filteredComments, setFilteredComments] = useState([]);
  const [newComment, setNewComment] = useState({ text: "", author: "", post: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    let result = [...comments];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        comment => 
          comment.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.post.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.text || !newComment.author || !newComment.post) {
      alert("Please fill in all fields.");
      return;
    }

    const comment = {
      id: comments.length + 1,
      text: newComment.text,
      author: newComment.author,
      post: newComment.post,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    setComments((prev) => [...prev, comment]);
    setNewComment({ text: "", author: "", post: "" });
    setIsAddingComment(false);
  };

  const handleApproveComment = (id) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, status: "approved" } : comment
      )
    );
  };

  const handleDeleteComment = (id) => {
    if (!window.confirm(`Are you sure you want to delete this comment?`)) return;
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-4 md:p-8 max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-center mb-8"
        variants={itemVariants}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#0066CC] mb-4 md:mb-0">Manage Comments</h1>
        <button
          onClick={() => setIsAddingComment(!isAddingComment)}
          className="bg-[#FFAD03] hover:bg-[#FFAD03]/90 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          {isAddingComment ? <FaTimes className="mr-2" /> : <FaComment className="mr-2" />}
          {isAddingComment ? "Cancel" : "Add Comment"}
        </button>
      </motion.div>

      {/* Adding New Comments Form */}
      <AnimatePresence>
        {isAddingComment && (
          <motion.div 
            className="bg-white shadow-lg rounded-xl p-6 mb-8 border-l-4 border-[#0066CC]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-[#0066CC] flex items-center">
              <FaComment className="mr-2" /> Add New Comment
            </h2>
            <form onSubmit={handleAddComment} className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment Text</label>
                <textarea
                  name="text"
                  rows="3"
                  value={newComment.text}
                  onChange={handleInputChange}
                  placeholder="Write your comment..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    name="author"
                    type="text"
                    value={newComment.author}
                    onChange={handleInputChange}
                    placeholder="Author's name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Related Post</label>
                  <input
                    name="post"
                    type="text"
                    value={newComment.post}
                    onChange={handleInputChange}
                    placeholder="Post title"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  className="bg-[#0066CC] hover:bg-[#0066CC]/90 text-white px-6 py-2 rounded-lg flex items-center transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaCheck className="mr-2" /> Submit Comment
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters and Search */}
      <motion.div 
        className="bg-white shadow-md rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4"
        variants={itemVariants}
      >
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search comments, authors, or posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
          />
        </div>
        
        <div className="flex gap-3">
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
      </motion.div>

      {/* Comments Table */}
      <motion.div 
        className="bg-white shadow-lg rounded-xl overflow-hidden"
        variants={itemVariants}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#0066CC] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">Comment</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Author</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Post</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {filteredComments.map((comment) => (
                  <motion.tr 
                    key={comment.id} 
                    className="hover:bg-gray-50 transition-colors"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, height: 0 }}
                    layout
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm line-clamp-2">{comment.text}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-[#0066CC]">{comment.author}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{comment.post}</div>
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
                          onClick={() => handleDeleteComment(comment.id)}
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
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredComments.length === 0 && (
            <div className="text-center py-8">
              <FaComment className="mx-auto text-gray-300 text-5xl mb-3" />
              <p className="text-gray-500">No comments found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="mt-2 text-[#0066CC] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
        
        {/* Comments Statistics */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#0066CC] mr-2"></div>
              <span>Total: {comments.length}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span>Pending: {comments.filter(c => c.status === "pending").length}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Approved: {comments.filter(c => c.status === "approved").length}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Comments;
