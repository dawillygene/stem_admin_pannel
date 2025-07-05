import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomepageService from '../utils/homepageService';
import ConfirmationModal from './ConfirmationModal';

/**
 * Outcomes Section Management Component
 * Allows admin to manage outcomes section content
 * Author: ELIA WILLIAM MARIKI (@dawillygene)
 */
const OutcomesManagement = ({ data, onUpdate, isLoading }) => {
  const [outcomesData, setOutcomesData] = useState({
    title: '',
    subtitle: '',
    background_color: 'bg-gray-50',
    outcomes: []
  });

  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const iconOptions = [
    { value: 'fas fa-graduation-cap', label: 'Graduation Cap' },
    { value: 'fas fa-certificate', label: 'Certificate' },
    { value: 'fas fa-trophy', label: 'Trophy' },
    { value: 'fas fa-medal', label: 'Medal' },
    { value: 'fas fa-star', label: 'Star' },
    { value: 'fas fa-chart-line', label: 'Growth Chart' },
    { value: 'fas fa-users', label: 'Users' },
    { value: 'fas fa-lightbulb', label: 'Innovation' },
    { value: 'fas fa-target', label: 'Target' },
    { value: 'fas fa-check-circle', label: 'Check Circle' }
  ];

  const colorOptions = [
    { value: 'primary', label: 'Primary Blue', preview: 'bg-[#0066CC]' },
    { value: 'secondary', label: 'Orange', preview: 'bg-[#FD9148]' },
    { value: 'accent', label: 'Yellow', preview: 'bg-[#FFAD03]' },
    { value: 'success', label: 'Green', preview: 'bg-green-500' },
    { value: 'purple', label: 'Purple', preview: 'bg-purple-500' },
    { value: 'teal', label: 'Teal', preview: 'bg-teal-500' }
  ];

  const outcomeTypes = [
    { value: 'metric', label: 'Metric (Number)' },
    { value: 'achievement', label: 'Achievement' },
    { value: 'impact', label: 'Impact Statement' }
  ];

  // Update local state when data changes
  // Update local state when data changes
  useEffect(() => {
    if (data) {
      setOutcomesData({
        title: '',
        subtitle: '',
        background_color: 'bg-gray-50',
        outcomes: [],
        ...data
      });
    }
  }, [data]);

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!outcomesData.title || !outcomesData.title.trim()) newErrors.title = 'Title is required';
    if (!outcomesData.subtitle || !outcomesData.subtitle.trim()) newErrors.subtitle = 'Subtitle is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate outcome data
  const validateOutcome = (outcome) => {
    const newErrors = {};
    
    if (!outcome.title || !outcome.title.trim()) newErrors.title = 'Outcome title is required';
    if (!outcome.description || !outcome.description.trim()) newErrors.description = 'Outcome description is required';
    if (!outcome.icon_class) newErrors.icon_class = 'Outcome icon is required';
    if (!outcome.color) newErrors.color = 'Outcome color is required';
    if (!outcome.type) newErrors.type = 'Outcome type is required';
    
    if (outcome.type === 'metric' && !outcome.value) {
      newErrors.value = 'Metric value is required';
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      const updatedData = await HomepageService.updateOutcomesSection(outcomesData);
      onUpdate(updatedData);
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error saving outcomes data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setOutcomesData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Add new outcome
  const addOutcome = () => {
    const newOutcome = {
      id: Date.now(),
      title: '',
      description: '',
      value: '',
      unit: '',
      icon_class: 'fas fa-star',
      color: 'primary',
      type: 'metric',
      order: outcomesData.outcomes.length + 1,
      is_featured: false,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setSelectedOutcome(newOutcome);
    setShowOutcomeModal(true);
  };

  // Edit outcome
  const editOutcome = (outcome) => {
    setSelectedOutcome({ ...outcome });
    setShowOutcomeModal(true);
  };

  // Save outcome
  const saveOutcome = () => {
    const outcomeErrors = validateOutcome(selectedOutcome);
    if (Object.keys(outcomeErrors).length > 0) {
      setErrors(outcomeErrors);
      return;
    }

    if (selectedOutcome.id && outcomesData.outcomes.find(o => o.id === selectedOutcome.id)) {
      // Update existing outcome
      setOutcomesData(prev => ({
        ...prev,
        outcomes: prev.outcomes.map(o => 
          o.id === selectedOutcome.id ? { ...selectedOutcome, updated_at: new Date().toISOString() } : o
        )
      }));
    } else {
      // Add new outcome
      setOutcomesData(prev => ({
        ...prev,
        outcomes: [...prev.outcomes, { ...selectedOutcome, id: Date.now() }]
      }));
    }

    setShowOutcomeModal(false);
    setSelectedOutcome(null);
    setErrors({});
  };

  // Delete outcome
  const deleteOutcome = (outcomeId) => {
    setOutcomesData(prev => ({
      ...prev,
      outcomes: prev.outcomes.filter(o => o.id !== outcomeId)
    }));
  };

  // Move outcome up/down
  const moveOutcome = (index, direction) => {
    const newOutcomes = [...outcomesData.outcomes];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newOutcomes.length) {
      [newOutcomes[index], newOutcomes[targetIndex]] = [newOutcomes[targetIndex], newOutcomes[index]];
      
      // Update order values
      newOutcomes.forEach((outcome, i) => {
        outcome.order = i + 1;
      });
      
      setOutcomesData(prev => ({ ...prev, outcomes: newOutcomes }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0066CC]"></div>
        <span className="ml-3 text-gray-600">Loading outcomes section...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Outcomes Section Management</h2>
          <p className="text-gray-600">Configure the outcomes and results section of your homepage</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={addOutcome}
            className="px-4 py-2 bg-[#FFAD03] text-white rounded-lg hover:bg-[#e6980a] transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Outcome
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
              value={outcomesData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Project Outcomes & Results"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Subtitle *
            </label>
            <input
              type="text"
              value={outcomesData.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                errors.subtitle ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Measurable impact and achievements"
            />
            {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Outcomes List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Outcomes ({outcomesData.outcomes.length})</h3>
            <div className="text-sm text-gray-500">
              Published: {outcomesData.outcomes.filter(o => o.is_published).length} | 
              Featured: {outcomesData.outcomes.filter(o => o.is_featured).length}
            </div>
          </div>
        </div>

        <div className="p-6">
          {outcomesData.outcomes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <i className="fas fa-target text-4xl mb-4"></i>
              <p className="text-lg">No outcomes added yet</p>
              <p className="text-sm">Click "Add Outcome" to create your first outcome</p>
            </div>
          ) : (
            <div className="space-y-4">
              {outcomesData.outcomes.map((outcome, index) => (
                <motion.div
                  key={outcome.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-3 rounded-lg ${colorOptions.find(c => c.value === outcome.color)?.preview || 'bg-gray-500'}`}>
                        <i className={`${outcome.icon_class} text-white text-lg`}></i>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{outcome.title}</h4>
                          <span className="text-sm text-gray-500">#{outcome.order}</span>
                          {outcome.type === 'metric' && outcome.value && (
                            <span className="px-2 py-1 bg-[#0066CC] text-white text-xs rounded-full">
                              {outcome.value} {outcome.unit}
                            </span>
                          )}
                          {outcome.is_featured && (
                            <span className="px-2 py-1 bg-[#FFAD03] text-white text-xs rounded-full">Featured</span>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            outcome.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {outcome.is_published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-2">{outcome.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="capitalize">{outcome.type}</span>
                          <span>Updated: {new Date(outcome.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => moveOutcome(index, 'up')}
                        disabled={index === 0}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <i className="fas fa-arrow-up"></i>
                      </button>
                      <button
                        onClick={() => moveOutcome(index, 'down')}
                        disabled={index === outcomesData.outcomes.length - 1}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <i className="fas fa-arrow-down"></i>
                      </button>
                      <button
                        onClick={() => editOutcome(outcome)}
                        className="p-2 text-[#0066CC] hover:text-[#0056b3]"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => deleteOutcome(outcome.id)}
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

      {/* Outcome Modal */}
      <AnimatePresence>
        {showOutcomeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedOutcome?.id && outcomesData.outcomes.find(o => o.id === selectedOutcome.id) 
                    ? 'Edit Outcome' : 'Add New Outcome'}
                </h3>
                <button
                  onClick={() => setShowOutcomeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outcome Type *
                  </label>
                  <select
                    value={selectedOutcome?.type || ''}
                    onChange={(e) => setSelectedOutcome(prev => ({ ...prev, type: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                      errors.type ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select outcome type</option>
                    {outcomeTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outcome Title *
                  </label>
                  <input
                    type="text"
                    value={selectedOutcome?.title || ''}
                    onChange={(e) => setSelectedOutcome(prev => ({ ...prev, title: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Outcome title"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={selectedOutcome?.description || ''}
                    onChange={(e) => setSelectedOutcome(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Outcome description"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                {selectedOutcome?.type === 'metric' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Metric Value *
                      </label>
                      <input
                        type="text"
                        value={selectedOutcome?.value || ''}
                        onChange={(e) => setSelectedOutcome(prev => ({ ...prev, value: e.target.value }))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                          errors.value ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="1000"
                      />
                      {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit (Optional)
                      </label>
                      <input
                        type="text"
                        value={selectedOutcome?.unit || ''}
                        onChange={(e) => setSelectedOutcome(prev => ({ ...prev, unit: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                        placeholder="Students, Schools, etc."
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon *
                    </label>
                    <select
                      value={selectedOutcome?.icon_class || ''}
                      onChange={(e) => setSelectedOutcome(prev => ({ ...prev, icon_class: e.target.value }))}
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
                      value={selectedOutcome?.color || ''}
                      onChange={(e) => setSelectedOutcome(prev => ({ ...prev, color: e.target.value }))}
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
                      checked={selectedOutcome?.is_featured || false}
                      onChange={(e) => setSelectedOutcome(prev => ({ ...prev, is_featured: e.target.checked }))}
                      className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Featured Outcome</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedOutcome?.is_published || false}
                      onChange={(e) => setSelectedOutcome(prev => ({ ...prev, is_published: e.target.checked }))}
                      className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Published</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowOutcomeModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveOutcome}
                  className="px-4 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                >
                  Save Outcome
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
          title="Save Outcomes Section Changes"
          message="Are you sure you want to save these changes? This will update the outcomes section on your homepage."
          confirmText="Save Changes"
          cancelText="Cancel"
          type="info"
          isLoading={isSaving}
        />
      )}
    </div>
  );
};

export default OutcomesManagement;
