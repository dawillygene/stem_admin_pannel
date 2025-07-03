import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave, FaProjectDiagram, FaSpinner } from 'react-icons/fa';
import { updateJustification, validateAboutContent } from '../utils/aboutApi';
import { useToast } from './Toast';

const JustificationEditModal = ({ justification, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    conclusion: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // Initialize form data
  useEffect(() => {
    if (justification) {
      setFormData({
        title: justification.title || '',
        content: justification.content || '',
        conclusion: justification.conclusion || ''
      });
    }
  }, [justification]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const validation = validateAboutContent('justification', formData);
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
      await updateJustification(formData);
      showToast('Justification updated successfully!', 'success');
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error updating justification:', err);
      showToast('Failed to update justification. Please try again.', 'error');
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
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0066CC] to-[#004c99] p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaProjectDiagram className="mr-3" />
                <h2 className="text-2xl font-bold">Edit Project Justification</h2>
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

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Main Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={8}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                    errors.content ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter the project justification content..."
                  disabled={loading}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                )}
              </div>

              {/* Conclusion */}
              <div>
                <label htmlFor="conclusion" className="block text-sm font-medium text-gray-700 mb-2">
                  Conclusion
                </label>
                <textarea
                  id="conclusion"
                  name="conclusion"
                  value={formData.conclusion}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  placeholder="Enter concluding remarks (optional)..."
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
                    Update Justification
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

export default JustificationEditModal;
