import { useState } from 'react';
import { galleryApi } from '../../utils/galleryApi';
import { useToast } from '../Toast';

const GalleryUploadForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'campus',
    tags: [],
    image: '',
    featured: false
  });
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const { showToast } = useToast();

  // Available categories matching the API structure
  const categories = [
    { id: 'campus', label: 'Campus Life' },
    { id: 'science', label: 'Science' },
    { id: 'technology', label: 'Technology' },
    { id: 'labs', label: 'Laboratories' },
    { id: 'teacher', label: 'Teacher Training' },
    { id: 'community', label: 'Community Engagement' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.some(tag => tag.name === tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, { name: tagInput.trim() }]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag.name !== tagToRemove)
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      try {
        setIsUploading(true);
        showToast("Optimizing and uploading image...", "info");

        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({
            ...formData,
            image: reader.result
          });
        };
        reader.readAsDataURL(file);

        // Upload to Cloudinary
        const imageUrl = await galleryApi.uploadImageToCloudinary(file);
        
        if (imageUrl) {
          setUploadedImageUrl(imageUrl);
          showToast(`Image uploaded successfully!`, "success");
          
          // Clear error for image field
          if (errors.image) {
            setErrors({
              ...errors,
              image: null
            });
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        showToast(error.message || "Failed to upload image. Please try again.", "error");
        setFormData({
          ...formData,
          image: ''
        });
      } finally {
        setIsUploading(false);
      }
    } else {
      showToast("Please select a valid image file.", "error");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!uploadedImageUrl && !formData.image) newErrors.image = 'Image is required';
    if (formData.tags.length === 0) newErrors.tags = 'At least one tag is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API
      const apiData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        image: uploadedImageUrl || formData.image,
        featured: formData.featured
      };

      console.log("Submitting gallery data:", apiData);

      // Call API
      const response = await galleryApi.createGalleryItem(apiData);
      
      showToast("Gallery item created successfully!", "success");
      
      // Call parent onSubmit with the response data
      if (onSubmit) {
        onSubmit(response);
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'campus',
        tags: [],
        image: '',
        featured: false
      });
      setUploadedImageUrl('');
      setTagInput('');

    } catch (error) {
      console.error("Error creating gallery item:", error);
      
      let errorMessage = "Failed to create gallery item.";
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data?.message || "Invalid input data. Please check your form.";
            break;
          case 401:
            errorMessage = "Authentication required. Please log in.";
            break;
          case 404:
            errorMessage = "Category not found. Please select a valid category.";
            break;
          default:
            errorMessage = error.response.data?.message || "Server error occurred.";
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = error.message || "An unexpected error occurred.";
      }
      
      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Gallery Item</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter title"
                disabled={isSubmitting}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter description"
                disabled={isSubmitting}
              ></textarea>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isSubmitting}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex items-center"
                  >
                    {tag.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag.name)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                      disabled={isSubmitting}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-primary text-white font-medium rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  disabled={isSubmitting || !tagInput.trim()}
                >
                  Add
                </button>
              </div>
              {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  disabled={isSubmitting}
                />
                <span className="ml-2 text-sm text-gray-700">Featured item</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {formData.image ? (
                <div className="relative">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mx-auto h-64 object-cover rounded-md"
                  />
                  {/* Upload Success Indicator */}
                  {uploadedImageUrl && !isUploading && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, image: '' });
                      setUploadedImageUrl('');
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    disabled={isUploading || isSubmitting}
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <div>
                  {isUploading ? (
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {isUploading ? "Uploading and optimizing..." : "Click to upload or drag and drop"}
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${formData.image ? 'hidden' : ''
                  }`}
                disabled={isUploading || isSubmitting}
              />
            </div>
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
            <p className="text-xs text-gray-500 mt-2">
              For best results, use an image at least 800px wide and in JPG or PNG format. Images will be automatically optimized.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              "Upload Gallery Item"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GalleryUploadForm;