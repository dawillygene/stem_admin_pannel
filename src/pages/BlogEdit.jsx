import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUpload, FaImage, FaFilePdf, FaTimes, FaCheck, FaEdit, FaTags, FaCalendarAlt, FaListUl, FaSave, FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../utils/axios";
import { useToast } from "../components/Toast";

const BlogEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [picture, setPicture] = useState(null);
    const [publication, setPublication] = useState(null);
    const [picturePreview, setPicturePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [category, setCategory] = useState("");
    const [documentUrl, setDocumentUrl] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);

    const fileInputRef = useRef(null);
    const pdfInputRef = useRef(null);

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            const response = await API.get(`/blog/posts/${id}`);
            const postData = response.data;

            setBlogTitle(postData.title);
            setBlogContent(postData.content);
            setImageUrl(postData.image);
            setImageAlt(postData.alt);
            setPicturePreview(postData.image);
            setCategory(postData.category?.id || "");
            setDocumentUrl(postData.documentUrl || "");
            setPost(postData);
        } catch (error) {
            console.error("Error fetching post:", error);
            showToast("Failed to fetch post details", "error");
            navigate("/blogs/view");
        } finally {
            setLoading(false);
        }
    };

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
            showToast("Please select a valid image file.", "error");
        }
    };

    const handleRemovePicture = () => {
        setPicture(null);
        setPicturePreview(imageUrl); // Reset to original image
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                title: blogTitle,
                content: blogContent,
                image: picture ? "https://example.com/new-image.jpg" : imageUrl, // In real implementation, upload new image first
                alt: imageAlt || blogTitle,
                documentUrl: documentUrl || null,
                category: category ? { id: category } : null,
            };

            console.log("Updating post with payload:", payload);

            const response = await API.put(`/blog/posts/${id}`, payload);

            console.log("Update response:", response);

            setSuccessMessage(true);

            setTimeout(() => {
                setSuccessMessage(false);
                navigate("/blogs/view");
            }, 2000);
        } catch (error) {
            console.error("Error updating post:", error);
            if (error.response?.status === 403) {
                showToast("You are not authorized to update this post.", "error");
            } else if (error.response?.status === 404) {
                showToast("Post not found.", "error");
            } else {
                showToast("An error occurred while updating. Please try again.", "error");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const categories = [
        { id: "stem", name: "STEM Education" },
        { id: "mathematics", name: "Mathematics" },
        { id: "technology", name: "Technology" },
        { id: "engineering", name: "Engineering" },
        { id: "laboratories", name: "Laboratories" },
        { id: "teacher", name: "Teacher Training" },
        { id: "community", name: "Community Engagement" }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066CC]"></div>
            </div>
        );
    }

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
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold">Edit Blog Post</h1>
                                <p className="mt-1 opacity-90">Update your STEM education content</p>
                            </div>
                            <Link
                                to="/blogs/view"
                                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center"
                            >
                                <FaArrowLeft className="mr-2" />
                                Back to Posts
                            </Link>
                        </div>
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
                                <span>Blog post updated successfully! Redirecting...</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Post Info */}
                        {post && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-700 mb-2">Post Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                    <div>
                                        <span className="font-medium">Author:</span> {post.author.name}
                                    </div>
                                    <div>
                                        <span className="font-medium">Created:</span> {new Date(post.createdAt).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <span className="font-medium">Last Updated:</span> {new Date(post.updatedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        )}

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
                                    Category
                                </label>
                                <div className="relative">
                                    <FaListUl className="absolute left-3 top-3 text-gray-400" />
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC] appearance-none bg-white"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Image Alt Text */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image Description (Alt Text)
                                </label>
                                <input
                                    type="text"
                                    value={imageAlt}
                                    onChange={(e) => setImageAlt(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                    placeholder="Describe the image for accessibility"
                                />
                            </div>
                        </div>

                        {/* Current Image */}
                        {picturePreview && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Image</label>
                                <div className="relative inline-block">
                                    <img
                                        src={picturePreview}
                                        alt="Current blog image"
                                        className="w-48 h-32 object-cover rounded-lg border"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemovePicture}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <FaTimes className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Upload New Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload New Image (Optional)
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0066CC] transition-colors">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handlePictureChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <FaImage className="mx-auto text-gray-400 text-3xl mb-2" />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-[#0066CC] hover:text-blue-700 font-medium"
                                >
                                    Choose new image to replace current one
                                </button>
                                <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 10MB</p>
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
                                    placeholder="Write your blog content here..."
                                    required
                                />
                            </div>
                        </div>

                        {/* Document URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Document URL (Optional)
                            </label>
                            <input
                                type="url"
                                value={documentUrl}
                                onChange={(e) => setDocumentUrl(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                placeholder="https://example.com/document.pdf"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4">
                            <Link
                                to="/blogs/view"
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-[#0066CC] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="mr-2" />
                                        Update Post
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default BlogEdit;
