import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUpload, FaImage, FaFilePdf, FaTimes, FaCheck, FaEdit, FaTags, FaCalendarAlt, FaListUl } from "react-icons/fa";

const BlogUpload = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [picture, setPicture] = useState(null);
  const [publication, setPublication] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [publishDate, setPublishDate] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPicturePreview(null);
      setPicture(null);
      alert("Please select a valid image file.");
    }
  };

  const handleRemovePicture = () => {
    setPicture(null);
    setPicturePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemovePublication = () => {
    setPublication(null);
    if (pdfInputRef.current) {
      pdfInputRef.current.value = "";
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log({ 
        blogTitle, 
        blogContent, 
        picture, 
        publication, 
        category,
        tags,
        publishDate,
        isDraft
      });
      
      setSuccessMessage(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setBlogTitle("");
        setBlogContent("");
        setPicture(null);
        setPublication(null);
        setPicturePreview(null);
        setCategory("");
        setTags([]);
        setPublishDate("");
        setIsDraft(false);
        setSuccessMessage(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Mathematics Education",
    "Science Teaching",
    "STEM Research",
    "Educational Technology",
    "Teacher Training",
    "Laboratory Resources",
    "Policy & Governance",
    "Community Engagement"
  ];

  return (
    <motion.div 
      className="flex flex-col items-center justify-center px-4 py-10 min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0066CC] to-[#FD9148] px-8 py-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">
              Blog & Publication Upload
            </h1>
            <p className="mt-1 opacity-90">Share content about STEM education initiatives</p>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {successMessage && (
              <motion.div 
                className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <FaCheck className="text-green-500 mr-3" />
                <span>Blog post uploaded successfully! Redirecting to dashboard...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Blog Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                placeholder="Enter a descriptive title for your blog post"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaListUl className="absolute left-3 top-3 text-gray-400" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC] appearance-none bg-white"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Publish Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Publish Date
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Leave blank to publish immediately</p>
              </div>
            </div>

            {/* Blog Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog Content <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaEdit className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 h-60 resize-none focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                  placeholder="Write your blog content here... Include details about STEM education initiatives, research findings, or best practices."
                  required
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <FaTags className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                    placeholder="Add tags (press Enter to add)"
                  />
                </div>
                <motion.button
                  type="button"
                  onClick={handleAddTag}
                  className="ml-2 px-4 py-3 bg-[#FFAD03] text-white rounded-lg hover:bg-[#FFAD03]/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!currentTag.trim()}
                >
                  Add
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    className="inline-flex items-center bg-[#0066CC]/10 text-[#0066CC] px-3 py-1 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    layout
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-[#0066CC] hover:text-[#0066CC]/80 focus:outline-none"
                    >
                      <FaTimes size={12} />
                    </button>
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Featured Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-[#0066CC] transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePictureChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {!picturePreview ? (
                    <div className="text-center">
                      <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Drag and drop an image, or <span className="text-[#0066CC] font-medium">browse</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF up to 5MB</p>
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <img
                        src={picturePreview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={handleRemovePicture}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100 transition-colors"
                      >
                        <FaTimes className="text-red-500" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* PDF Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Publication (PDF)
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-[#0066CC] transition-colors">
                  <input
                    ref={pdfInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPublication(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {!publication ? (
                    <div className="text-center">
                      <FaFilePdf className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Upload a PDF document
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Research papers, reports, or presentations</p>
                    </div>
                  ) : (
                    <div className="relative w-full bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <FaFilePdf className="text-red-500 mr-3 text-xl" />
                        <div className="overflow-hidden">
                          <p className="font-medium text-gray-800 truncate">{publication.name}</p>
                          <p className="text-xs text-gray-500">{(publication.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePublication}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100 transition-colors"
                      >
                        <FaTimes className="text-red-500" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Save as draft option */}
            <div className="flex items-center">
              <input
                id="draft"
                type="checkbox"
                checked={isDraft}
                onChange={(e) => setIsDraft(e.target.checked)}
                className="h-4 w-4 text-[#0066CC] focus:ring-[#0066CC] border-gray-300 rounded"
              />
              <label htmlFor="draft" className="ml-2 block text-sm text-gray-700">
                Save as draft
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <motion.button
                type="submit"
                className="flex-1 bg-[#0066CC] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#0066CC]/90 transition duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaUpload className="mr-2" />
                    {isDraft ? "Save Draft" : "Publish Blog"}
                  </>
                )}
              </motion.button>
              
              <motion.button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
        
        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Need help? Check out our <a href="#" className="text-[#0066CC] hover:underline">content guidelines</a> or <a href="#" className="text-[#0066CC] hover:underline">contact support</a>.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogUpload;
