import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave, FaStar, FaSpinner } from 'react-icons/fa';
import { createBenefit, updateBenefit, validateAboutContent } from '../utils/aboutApi';
import { useToast } from './Toast';

const BenefitFormModal = ({ benefit, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'fas fa-check-circle',
    displayOrder: '',
    isActive: true
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const isEditing = Boolean(benefit);

  // Initialize form data
  useEffect(() => {
    if (benefit) {
      setFormData({
        title: benefit.title || '',
        description: benefit.description || '',
        icon: benefit.icon || 'fas fa-check-circle',
        displayOrder: benefit.displayOrder?.toString() || '',
        isActive: benefit.isActive !== undefined ? benefit.isActive : true
      });
    }
  }, [benefit]);

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
    const validation = validateAboutContent('benefit', formData);
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
        await updateBenefit(benefit.id, submitData);
        showToast('Benefit updated successfully!', 'success');
      } else {
        await createBenefit(submitData);
        showToast('Benefit created successfully!', 'success');
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error saving benefit:', err);
      
      let errorMessage = 'Failed to save benefit. Please try again.';
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

  // Icon options
  const iconOptions = [
    { value: 'fas fa-check-circle', label: 'Check Circle', preview: '✓' },
    { value: 'fas fa-star', label: 'Star', preview: '★' },
    { value: 'fas fa-lightbulb', label: 'Light Bulb', preview: '💡' },
    { value: 'fas fa-rocket', label: 'Rocket', preview: '🚀' },
    { value: 'fas fa-graduation-cap', label: 'Graduation', preview: '🎓' },
    { value: 'fas fa-brain', label: 'Brain', preview: '🧠' },
    { value: 'fas fa-cogs', label: 'Gears', preview: '⚙️' },
    { value: 'fas fa-flask', label: 'Flask', preview: '🧪' },
    { value: 'fas fa-laptop-code', label: 'Coding', preview: '💻' },
    { value: 'fas fa-microscope', label: 'Microscope', preview: '🔬' }
  ];

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
                <FaStar className="mr-3" />
                <h2 className="text-2xl font-bold">
                  {isEditing ? 'Edit STEM Benefit' : 'Add New STEM Benefit'}
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
                  Benefit Title *
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
                  placeholder="Enter benefit title"
                  disabled={loading}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
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
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe the STEM benefit..."
                  disabled={loading}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.description.length}/500 characters
                </p>
              </div>

              {/* Icon Selection */}
              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <select
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  disabled={loading}
                >
                  {iconOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.preview} {option.label}
                    </option>
                  ))}
                </select>
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

              {/* Preview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-[#0066CC] mr-3 text-lg">
                      {iconOptions.find(opt => opt.value === formData.icon)?.preview || '✓'}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800">
                        {formData.title || 'Benefit Title'}
                      </h5>
                      <p className="text-gray-600 text-sm mt-1">
                        {formData.description || 'Benefit description will appear here...'}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          formData.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {formData.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {formData.displayOrder && (
                          <span className="ml-2 text-xs text-gray-500">
                            Order: {formData.displayOrder}
                          </span>
                        )}
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
                    {isEditing ? 'Update Benefit' : 'Create Benefit'}
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

export default BenefitFormModal;
