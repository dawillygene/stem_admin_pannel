import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomepageService from '../utils/homepageService';
import ConfirmationModal from './ConfirmationModal';

/**
 * Activities Section Management Component
 * Allows admin to manage activities section content
 * Author: ELIA WILLIAM MARIKI (@dawillygene)
 */
const ActivitiesManagement = ({ data, onUpdate, isLoading }) => {
  const [activitiesData, setActivitiesData] = useState({
    title: '',
    subtitle: '',
    background_color: 'white',
    activities: []
  });

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const iconOptions = [
    { value: 'fas fa-search', label: 'Search' },
    { value: 'fas fa-tasks', label: 'Tasks' },
    { value: 'fas fa-chart-line', label: 'Chart' },
    { value: 'fas fa-users', label: 'Users' },
    { value: 'fas fa-graduation-cap', label: 'Education' },
    { value: 'fas fa-flask', label: 'Science' },
    { value: 'fas fa-microscope', label: 'Research' },
    { value: 'fas fa-book', label: 'Book' },
    { value: 'fas fa-lightbulb', label: 'Ideas' },
    { value: 'fas fa-cogs', label: 'Settings' }
  ];

  const colorOptions = [
    { value: 'primary', label: 'Primary Blue', preview: 'bg-[#0066CC]' },
    { value: 'secondary', label: 'Orange', preview: 'bg-[#FD9148]' },
    { value: 'accent', label: 'Yellow', preview: 'bg-[#FFAD03]' },
    { value: 'success', label: 'Green', preview: 'bg-green-500' },
    { value: 'danger', label: 'Red', preview: 'bg-red-500' },
    { value: 'info', label: 'Cyan', preview: 'bg-cyan-500' }
  ];

  // Update local state when data changes
  useEffect(() => {
    if (data) {
      setActivitiesData(data);
    }
  }, [data]);

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!activitiesData.title.trim()) newErrors.title = 'Title is required';
    if (!activitiesData.subtitle.trim()) newErrors.subtitle = 'Subtitle is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate activity data
  const validateActivity = (activity) => {
    const newErrors = {};
    
    if (!activity.title.trim()) newErrors.title = 'Activity title is required';
    if (!activity.description.trim()) newErrors.description = 'Activity description is required';
    if (!activity.icon_class) newErrors.icon_class = 'Activity icon is required';
    if (!activity.color) newErrors.color = 'Activity color is required';
    
    return newErrors;
  };

  // Handle form submission
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      const updatedData = await HomepageService.updateActivitiesSection(activitiesData);
      onUpdate(updatedData);
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error saving activities data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setActivitiesData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle activity changes
  const handleActivityChange = (index, field, value) => {
    setActivitiesData(prev => ({
      ...prev,
      activities: prev.activities.map((activity, i) => 
        i === index ? { ...activity, [field]: value } : activity
      )
    }));
  };

  // Add new activity
  const addActivity = () => {
    const newActivity = {
      id: Date.now(),
      title: '',
      description: '',
      icon_class: 'fas fa-tasks',
      color: 'primary',
      order: activitiesData.activities.length + 1,
      is_featured: false,
      is_published: true,
      link: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setSelectedActivity(newActivity);
    setShowActivityModal(true);
  };

  // Edit activity
  const editActivity = (activity) => {
    setSelectedActivity({ ...activity });
    setShowActivityModal(true);
  };

  // Save activity
  const saveActivity = () => {
    const activityErrors = validateActivity(selectedActivity);
    if (Object.keys(activityErrors).length > 0) {
      setErrors(activityErrors);
      return;
    }

    if (selectedActivity.id && activitiesData.activities.find(a => a.id === selectedActivity.id)) {
      // Update existing activity
      setActivitiesData(prev => ({
        ...prev,
        activities: prev.activities.map(a => 
          a.id === selectedActivity.id ? { ...selectedActivity, updated_at: new Date().toISOString() } : a
        )
      }));
    } else {
      // Add new activity
      setActivitiesData(prev => ({
        ...prev,
        activities: [...prev.activities, { ...selectedActivity, id: Date.now() }]
      }));
    }

    setShowActivityModal(false);
    setSelectedActivity(null);
    setErrors({});
  };

  // Delete activity
  const deleteActivity = (activityId) => {
    setActivitiesData(prev => ({
      ...prev,
      activities: prev.activities.filter(a => a.id !== activityId)
    }));
  };

  // Move activity up/down
  const moveActivity = (index, direction) => {
    const newActivities = [...activitiesData.activities];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newActivities.length) {
      [newActivities[index], newActivities[targetIndex]] = [newActivities[targetIndex], newActivities[index]];
      
      // Update order values
      newActivities.forEach((activity, i) => {
        activity.order = i + 1;
      });
      
      setActivitiesData(prev => ({ ...prev, activities: newActivities }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0066CC]"></div>
        <span className="ml-3 text-gray-600">Loading activities section...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Activities Section Management</h2>
          <p className="text-gray-600">Configure the main activities section of your homepage</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={addActivity}
            className="px-4 py-2 bg-[#FFAD03] text-white rounded-lg hover:bg-[#e6980a] transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Activity
          </button>
          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={isSaving}
            className="px-4 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors disabled:opacity-50"
          >
            <i className="fas fa-save mr-2"></i>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Section Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Section Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title *
            </label>
            <input
              type="text"
              value={activitiesData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Main Activities of the Project"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Subtitle *
            </label>
            <input
              type="text"
              value={activitiesData.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                errors.subtitle ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Our comprehensive approach to improving science education"
            />
            {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Activities ({activitiesData.activities.length})</h3>
            <div className="text-sm text-gray-500">
              Published: {activitiesData.activities.filter(a => a.is_published).length} | 
              Featured: {activitiesData.activities.filter(a => a.is_featured).length}
            </div>
          </div>
        </div>

        <div className="p-6">
          {activitiesData.activities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <i className="fas fa-tasks text-4xl mb-4"></i>
              <p className="text-lg">No activities added yet</p>
              <p className="text-sm">Click "Add Activity" to create your first activity</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activitiesData.activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-3 rounded-lg ${colorOptions.find(c => c.value === activity.color)?.preview || 'bg-gray-500'}`}>
                        <i className={`${activity.icon_class} text-white text-lg`}></i>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                          <span className="text-sm text-gray-500">#{activity.order}</span>
                          {activity.is_featured && (
                            <span className="px-2 py-1 bg-[#FFAD03] text-white text-xs rounded-full">Featured</span>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            activity.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {activity.is_published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                        
                        {activity.link && (
                          <div className="flex items-center text-sm text-[#0066CC]">
                            <i className="fas fa-link mr-1"></i>
                            <span>{activity.link}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => moveActivity(index, 'up')}
                        disabled={index === 0}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <i className="fas fa-arrow-up"></i>
                      </button>
                      <button
                        onClick={() => moveActivity(index, 'down')}
                        disabled={index === activitiesData.activities.length - 1}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <i className="fas fa-arrow-down"></i>
                      </button>
                      <button
                        onClick={() => editActivity(activity)}
                        className="p-2 text-[#0066CC] hover:text-[#0056b3]"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => deleteActivity(activity.id)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Activity Modal */}
      <AnimatePresence>
        {showActivityModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedActivity?.id && activitiesData.activities.find(a => a.id === selectedActivity.id) 
                    ? 'Edit Activity' : 'Add New Activity'}
                </h3>
                <button
                  onClick={() => setShowActivityModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Title *
                    </label>
                    <input
                      type="text"
                      value={selectedActivity?.title || ''}
                      onChange={(e) => setSelectedActivity(prev => ({ ...prev, title: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Activity title"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link (Optional)
                    </label>
                    <input
                      type="text"
                      value={selectedActivity?.link || ''}
                      onChange={(e) => setSelectedActivity(prev => ({ ...prev, link: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                      placeholder="/activities/example"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={selectedActivity?.description || ''}
                    onChange={(e) => setSelectedActivity(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Activity description"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon *
                    </label>
                    <select
                      value={selectedActivity?.icon_class || ''}
                      onChange={(e) => setSelectedActivity(prev => ({ ...prev, icon_class: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                        errors.icon_class ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select an icon</option>
                      {iconOptions.map(icon => (
                        <option key={icon.value} value={icon.value}>{icon.label}</option>
                      ))}
                    </select>
                    {errors.icon_class && <p className="text-red-500 text-sm mt-1">{errors.icon_class}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color *
                    </label>
                    <select
                      value={selectedActivity?.color || ''}
                      onChange={(e) => setSelectedActivity(prev => ({ ...prev, color: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                        errors.color ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a color</option>
                      {colorOptions.map(color => (
                        <option key={color.value} value={color.value}>{color.label}</option>
                      ))}
                    </select>
                    {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedActivity?.is_featured || false}
                      onChange={(e) => setSelectedActivity(prev => ({ ...prev, is_featured: e.target.checked }))}
                      className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Featured Activity</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedActivity?.is_published || false}
                      onChange={(e) => setSelectedActivity(prev => ({ ...prev, is_published: e.target.checked }))}
                      className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Published</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowActivityModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveActivity}
                  className="px-4 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                >
                  Save Activity
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleSave}
          title="Save Activities Section Changes"
          message="Are you sure you want to save these changes? This will update the activities section on your homepage."
          confirmText="Save Changes"
          cancelText="Cancel"
          isLoading={isSaving}
        />
      )}
    </div>
  );
};

export default ActivitiesManagement;
