import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave, FaInfoCircle, FaSpinner } from 'react-icons/fa';
import { updateBackground, validateAboutContent } from '../utils/aboutApi';
import { useToast } from './Toast';

const BackgroundEditModal = ({ background, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    mainContent: '',
    ctaText: '',
    ctaLink: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // Initialize form data
  useEffect(() => {
    if (background) {
      setFormData({
        title: background.title || '',
        mainContent: background.mainContent || '',
        ctaText: background.ctaText || '',
        ctaLink: background.ctaLink || ''
      });
    }
  }, [background]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const validation = validateAboutContent('background', formData);
    setErrors(validation.errors);
    return validation.isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fix the validation errors', 'error');
      return;
    }

    setLoading(true);
    
    try {
      await updateBackground(formData);
      showToast('Background updated successfully!', 'success');
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error updating background:', err);
      showToast('Failed to update background. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0066CC] to-[#004c99] p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaInfoCircle className="mr-3" />
                <h2 className="text-2xl font-bold">Edit Background Information</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-2"
                disabled={loading}
              >
                <FaTimes size={24} />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter section title"
                  disabled={loading}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Main Content */}
              <div>
                <label htmlFor="mainContent" className="block text-sm font-medium text-gray-700 mb-2">
                  Main Content *
                </label>
                <textarea
                  id="mainContent"
                  name="mainContent"
                  value={formData.mainContent}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                    errors.mainContent ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter the main background content..."
                  disabled={loading}
                />
                {errors.mainContent && (
                  <p className="mt-1 text-sm text-red-600">{errors.mainContent}</p>
                )}
              </div>

              {/* CTA Text */}
              <div>
                <label htmlFor="ctaText" className="block text-sm font-medium text-gray-700 mb-2">
                  Call to Action Text
                </label>
                <input
                  type="text"
                  id="ctaText"
                  name="ctaText"
                  value={formData.ctaText}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  placeholder="e.g., Learn More About Our Mission"
                  disabled={loading}
                />
              </div>

              {/* CTA Link */}
              <div>
                <label htmlFor="ctaLink" className="block text-sm font-medium text-gray-700 mb-2">
                  Call to Action Link
                </label>
                <input
                  type="text"
                  id="ctaLink"
                  name="ctaLink"
                  value={formData.ctaLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  placeholder="e.g., /contact or https://example.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Update Background
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BackgroundEditModal;
