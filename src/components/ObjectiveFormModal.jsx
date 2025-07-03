import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave, FaHandshake, FaSpinner } from 'react-icons/fa';
import { createSpecificObjective, updateSpecificObjective, validateAboutContent } from '../utils/aboutApi';
import { useToast } from './Toast';

const ObjectiveFormModal = ({ objective, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    displayOrder: '',
    isActive: true
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const isEditing = Boolean(objective);

  // Initialize form data
  useEffect(() => {
    if (objective) {
      setFormData({
        title: objective.title || '',
        description: objective.description || '',
        displayOrder: objective.displayOrder?.toString() || '',
        isActive: objective.isActive !== undefined ? objective.isActive : true
      });
    }
  }, [objective]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const validation = validateAboutContent('objective', formData);
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
      const submitData = {
        ...formData,
        displayOrder: formData.displayOrder ? parseInt(formData.displayOrder) : undefined
      };

      if (isEditing) {
        await updateSpecificObjective(objective.id, submitData);
        showToast('Objective updated successfully!', 'success');
      } else {
        await createSpecificObjective(submitData);
        showToast('Objective created successfully!', 'success');
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error saving objective:', err);
      
      let errorMessage = 'Failed to save objective. Please try again.';
      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage = 'Invalid data provided. Please check your inputs.';
            if (err.response.data?.errors) {
              setErrors(err.response.data.errors);
            }
            break;
          case 401:
            errorMessage = 'Authentication required. Please log in again.';
            break;
          case 403:
            errorMessage = 'You don\'t have permission to perform this action.';
            break;
          default:
            errorMessage = err.response.data?.message || errorMessage;
        }
      }
      
      showToast(errorMessage, 'error');
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
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0066CC] to-[#004c99] p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaHandshake className="mr-3" />
                <h2 className="text-2xl font-bold">
                  {isEditing ? 'Edit Specific Objective' : 'Add New Specific Objective'}
                </h2>
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
                  Objective Title *
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
                  placeholder="Enter objective title"
                  disabled={loading}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Examples: "Teacher Training", "Community Engagement", "Laboratory Enhancement"
                </p>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe what this objective aims to achieve..."
                  disabled={loading}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Provide a detailed description of the objective and its intended outcomes.
                </p>
              </div>

              {/* Display Order and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    id="displayOrder"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    placeholder="Order (optional)"
                    min="1"
                    disabled={loading}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Leave empty to add at the end
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#0066CC] focus:ring-[#0066CC] border-gray-300 rounded"
                      disabled={loading}
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Active (visible on website)
                    </label>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Writing Tips</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Be specific about what will be achieved</li>
                  <li>• Use action-oriented language (e.g., "Training", "Developing", "Implementing")</li>
                  <li>• Include measurable outcomes where possible</li>
                  <li>• Consider the target audience and stakeholders</li>
                </ul>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#0066CC] rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                      {formData.displayOrder || '?'}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800">
                        {formData.title || 'Objective Title'}
                      </h5>
                      <p className="text-gray-600 text-sm mt-1">
                        {formData.description || 'Objective description will appear here...'}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          formData.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {formData.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
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
                    {isEditing ? 'Update Objective' : 'Create Objective'}
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

export default ObjectiveFormModal;
