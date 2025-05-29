import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaEye, FaTrash, FaSearch, FaFilter, FaCalendarAlt, FaUser, FaTags } from "react-icons/fa";
import { Link } from "react-router-dom";
import API from "../utils/axios";
import { useToast } from "../components/Toast";
import ConfirmationModal from "../components/ConfirmationModal";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, postId: null });
  const { showToast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterAndSortPosts();
  }, [posts, searchTerm, selectedCategory, sortBy, sortOrder]);

  const fetchPosts = async () => {
    try {
      const response = await API.get("/blog/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      showToast("Failed to fetch posts", "error");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortPosts = () => {
    let filtered = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.author.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || post.category?.name === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort posts
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "author":
          aValue = a.author.name.toLowerCase();
          bValue = b.author.name.toLowerCase();
          break;
        case "likes":
          aValue = a.reactions.likes;
          bValue = b.reactions.likes;
          break;
        default: // createdAt or updatedAt
          aValue = new Date(a[sortBy]);
          bValue = new Date(b[sortBy]);
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredPosts(filtered);
  };

  const handleDelete = async (postId) => {
    setConfirmModal({ isOpen: true, postId });
  };

  const confirmDelete = async () => {
    const { postId } = confirmModal;
    try {
      await API.delete(`/blog/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
      showToast("Post deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting post:", error);
      showToast("Failed to delete post", "error");
    } finally {
      setConfirmModal({ isOpen: false, postId: null });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getUniqueCategories = () => {
    const categories = posts.map(post => post.category?.name).filter(Boolean);
    return [...new Set(categories)];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066CC]"></div>
      </div>
    );
  }

  return (
    <motion.div 
      className="px-4 py-6 min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-6"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-[#0066CC] to-[#FD9148] px-6 py-4 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">Blog Posts</h1>
            <p className="mt-1 opacity-90">Manage and edit your blog content</p>
          </div>

          {/* Filters and Search */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FaFilter className="absolute left-3 top-3 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] appearance-none bg-white"
                >
                  <option value="">All Categories</option>
                  {getUniqueCategories().map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
              >
                <option value="createdAt">Created Date</option>
                <option value="updatedAt">Updated Date</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="likes">Likes</option>
              </select>

              {/* Sort Order */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Post Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                  }}
                />
              </div>

              {/* Post Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {post.content}
                </p>

                {/* Meta Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <FaUser className="mr-1" />
                    <span>{post.author.name}</span>
                  </div>
                  
                  {post.category && (
                    <div className="flex items-center text-xs text-gray-500">
                      <FaTags className="mr-1" />
                      <span>{post.category.name}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <FaCalendarAlt className="mr-1" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>

                {/* Reactions */}
                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                  <span>{post.reactions.likes} likes</span>
                  <span>{post.reactions.comments} comments</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/blogs/edit/${post.id}`}
                    className="flex-1 bg-[#0066CC] text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <FaEdit className="mr-1" />
                    Edit
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center"
                  >
                    <FaTrash className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaEye className="mx-auto text-gray-400 text-6xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </motion.div>
        )}

        {/* Confirmation Modal */}
        {confirmModal.isOpen && (
          <ConfirmationModal
            isOpen={confirmModal.isOpen}
            onClose={() => setConfirmModal({ isOpen: false, postId: null })}
            onConfirm={confirmDelete}
            title="Delete Post"
            message="Are you sure you want to delete this post? This action cannot be undone."
          />
        )}
      </div>
    </motion.div>
  );
};

export default BlogList;