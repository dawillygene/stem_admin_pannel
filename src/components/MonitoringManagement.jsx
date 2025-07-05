import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HomepageService from '../utils/homepageService';
import ConfirmationModal from './ConfirmationModal';

/**
 * Monitoring Section Management Component
 * Allows admin to manage monitoring and evaluation section content
 * Author: ELIA WILLIAM MARIKI (@dawillygene)
 */
const MonitoringManagement = ({ data, onUpdate, isLoading }) => {
  const [monitoringData, setMonitoringData] = useState({
    title: '',
    subtitle: '',
    description: '',
    background_color: 'bg-[#0066CC]',
    text_color: 'text-white',
    framework: {
      title: '',
      description: '',
      phases: []
    },
    indicators: [],
    reports: {
      frequency: 'quarterly',
      next_report: '',
      last_report: ''
    },
    is_published: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [errors, setErrors] = useState({});

  const reportFrequencies = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'semi-annual', label: 'Semi-Annual' },
    { value: 'annual', label: 'Annual' }
  ];

  const backgroundColors = [
    { value: 'bg-[#0066CC]', label: 'Primary Blue', preview: 'bg-blue-600' },
    { value: 'bg-[#FD9148]', label: 'Orange', preview: 'bg-orange-400' },
    { value: 'bg-gray-800', label: 'Dark Gray', preview: 'bg-gray-800' },
    { value: 'bg-green-600', label: 'Green', preview: 'bg-green-600' },
    { value: 'bg-purple-600', label: 'Purple', preview: 'bg-purple-600' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-chart-line' },
    { id: 'framework', label: 'Framework', icon: 'fas fa-project-diagram' },
    { id: 'indicators', label: 'Indicators', icon: 'fas fa-tachometer-alt' },
    { id: 'reports', label: 'Reports', icon: 'fas fa-file-alt' }
  ];

  // Update local state when data changes
  useEffect(() => {
    if (data) {
      setMonitoringData(data);
    }
  }, [data]);

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!monitoringData.title.trim()) newErrors.title = 'Title is required';
    if (!monitoringData.subtitle.trim()) newErrors.subtitle = 'Subtitle is required';
    if (!monitoringData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      const updatedData = await HomepageService.updateMonitoringSection(monitoringData);
      onUpdate(updatedData);
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error saving monitoring data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setMonitoringData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle nested object changes
  const handleNestedChange = (parent, field, value) => {
    setMonitoringData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  // Add new phase
  const addPhase = () => {
    const newPhase = {
      id: Date.now(),
      title: '',
      description: '',
      duration: '',
      order: monitoringData.framework.phases.length + 1,
      is_completed: false
    };
    
    setMonitoringData(prev => ({
      ...prev,
      framework: {
        ...prev.framework,
        phases: [...prev.framework.phases, newPhase]
      }
    }));
  };

  // Update phase
  const updatePhase = (phaseId, field, value) => {
    setMonitoringData(prev => ({
      ...prev,
      framework: {
        ...prev.framework,
        phases: prev.framework.phases.map(phase => 
          phase.id === phaseId ? { ...phase, [field]: value } : phase
        )
      }
    }));
  };

  // Delete phase
  const deletePhase = (phaseId) => {
    setMonitoringData(prev => ({
      ...prev,
      framework: {
        ...prev.framework,
        phases: prev.framework.phases.filter(phase => phase.id !== phaseId)
      }
    }));
  };

  // Add new indicator
  const addIndicator = () => {
    const newIndicator = {
      id: Date.now(),
      title: '',
      description: '',
      target: '',
      current: '',
      unit: '',
      type: 'quantitative',
      priority: 'medium',
      is_active: true
    };
    
    setMonitoringData(prev => ({
      ...prev,
      indicators: [...prev.indicators, newIndicator]
    }));
  };

  // Update indicator
  const updateIndicator = (indicatorId, field, value) => {
    setMonitoringData(prev => ({
      ...prev,
      indicators: prev.indicators.map(indicator => 
        indicator.id === indicatorId ? { ...indicator, [field]: value } : indicator
      )
    }));
  };

  // Delete indicator
  const deleteIndicator = (indicatorId) => {
    setMonitoringData(prev => ({
      ...prev,
      indicators: prev.indicators.filter(indicator => indicator.id !== indicatorId)
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0066CC]"></div>
        <span className="ml-3 text-gray-600">Loading monitoring section...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Monitoring & Evaluation Management</h2>
          <p className="text-gray-600">Configure the monitoring and evaluation section of your homepage</p>
        </div>
        <button
          onClick={() => setShowConfirmModal(true)}
          disabled={isSaving}
          className="px-4 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors disabled:opacity-50"
        >
          <i className="fas fa-save mr-2"></i>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-[#0066CC] text-[#0066CC]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className={`${tab.icon} text-lg`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Title *
                  </label>
                  <input
                    type="text"
                    value={monitoringData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Monitoring and Evaluation"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Subtitle *
                  </label>
                  <input
                    type="text"
                    value={monitoringData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                      errors.subtitle ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tracking progress and measuring impact"
                  />
                  {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={monitoringData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows="4"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe the monitoring and evaluation approach..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="space-y-2">
                    {backgroundColors.map((color) => (
                      <label key={color.value} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                        <input
                          type="radio"
                          name="background"
                          value={color.value}
                          checked={monitoringData.background_color === color.value}
                          onChange={(e) => handleInputChange('background_color', e.target.value)}
                          className="w-4 h-4 text-[#0066CC] border-gray-300 focus:ring-[#0066CC]"
                        />
                        <div className={`w-8 h-8 rounded-full ${color.preview}`}></div>
                        <span className="text-sm text-gray-700">{color.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publishing Status
                  </label>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={monitoringData.is_published}
                        onChange={(e) => handleInputChange('is_published', e.target.checked)}
                        className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Published</span>
                    </label>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      monitoringData.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {monitoringData.is_published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'framework' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Framework Title
                  </label>
                  <input
                    type="text"
                    value={monitoringData.framework.title}
                    onChange={(e) => handleNestedChange('framework', 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    placeholder="M&E Framework"
                  />
                </div>

                <div>
                  <button
                    onClick={addPhase}
                    className="mt-6 px-4 py-2 bg-[#FFAD03] text-white rounded-lg hover:bg-[#e6980a] transition-colors"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Add Phase
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Framework Description
                </label>
                <textarea
                  value={monitoringData.framework.description}
                  onChange={(e) => handleNestedChange('framework', 'description', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  placeholder="Describe the monitoring framework..."
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Framework Phases ({monitoringData.framework.phases.length})</h4>
                {monitoringData.framework.phases.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <i className="fas fa-project-diagram text-4xl mb-4"></i>
                    <p>No phases defined yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {monitoringData.framework.phases.map((phase) => (
                      <div key={phase.id} className="border rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phase Title
                            </label>
                            <input
                              type="text"
                              value={phase.title}
                              onChange={(e) => updatePhase(phase.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                              placeholder="Phase title"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Duration
                            </label>
                            <input
                              type="text"
                              value={phase.duration}
                              onChange={(e) => updatePhase(phase.id, 'duration', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                              placeholder="3 months"
                            />
                          </div>

                          <div className="flex items-end">
                            <button
                              onClick={() => deletePhase(phase.id)}
                              className="px-3 py-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                            <label className="flex items-center ml-3">
                              <input
                                type="checkbox"
                                checked={phase.is_completed}
                                onChange={(e) => updatePhase(phase.id, 'is_completed', e.target.checked)}
                                className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                              />
                              <span className="ml-2 text-sm">Completed</span>
                            </label>
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={phase.description}
                            onChange={(e) => updatePhase(phase.id, 'description', e.target.value)}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                            placeholder="Phase description..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'indicators' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Key Performance Indicators ({monitoringData.indicators.length})</h4>
                <button
                  onClick={addIndicator}
                  className="px-4 py-2 bg-[#FFAD03] text-white rounded-lg hover:bg-[#e6980a] transition-colors"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add Indicator
                </button>
              </div>

              {monitoringData.indicators.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-tachometer-alt text-4xl mb-4"></i>
                  <p>No indicators defined yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {monitoringData.indicators.map((indicator) => (
                    <div key={indicator.id} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Indicator Title
                          </label>
                          <input
                            type="text"
                            value={indicator.title}
                            onChange={(e) => updateIndicator(indicator.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                            placeholder="Indicator title"
                          />
                        </div>

                        <div className="flex items-end">
                          <button
                            onClick={() => deleteIndicator(indicator.id)}
                            className="px-3 py-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <label className="flex items-center ml-3">
                            <input
                              type="checkbox"
                              checked={indicator.is_active}
                              onChange={(e) => updateIndicator(indicator.id, 'is_active', e.target.checked)}
                              className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                            />
                            <span className="ml-2 text-sm">Active</span>
                          </label>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={indicator.description}
                          onChange={(e) => updateIndicator(indicator.id, 'description', e.target.value)}
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                          placeholder="Indicator description..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target
                          </label>
                          <input
                            type="text"
                            value={indicator.target}
                            onChange={(e) => updateIndicator(indicator.id, 'target', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                            placeholder="100"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current
                          </label>
                          <input
                            type="text"
                            value={indicator.current}
                            onChange={(e) => updateIndicator(indicator.id, 'current', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                            placeholder="75"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Unit
                          </label>
                          <input
                            type="text"
                            value={indicator.unit}
                            onChange={(e) => updateIndicator(indicator.id, 'unit', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                            placeholder="schools"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Priority
                          </label>
                          <select
                            value={indicator.priority}
                            onChange={(e) => updateIndicator(indicator.id, 'priority', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Frequency
                  </label>
                  <select
                    value={monitoringData.reports.frequency}
                    onChange={(e) => handleNestedChange('reports', 'frequency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  >
                    {reportFrequencies.map(freq => (
                      <option key={freq.value} value={freq.value}>{freq.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Next Report Date
                  </label>
                  <input
                    type="date"
                    value={monitoringData.reports.next_report}
                    onChange={(e) => handleNestedChange('reports', 'next_report', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Report Date
                  </label>
                  <input
                    type="date"
                    value={monitoringData.reports.last_report}
                    onChange={(e) => handleNestedChange('reports', 'last_report', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Report Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Indicators</p>
                    <p className="text-2xl font-bold text-[#0066CC]">{monitoringData.indicators.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Indicators</p>
                    <p className="text-2xl font-bold text-green-600">{monitoringData.indicators.filter(i => i.is_active).length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Framework Phases</p>
                    <p className="text-2xl font-bold text-[#FFAD03]">{monitoringData.framework.phases.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completed Phases</p>
                    <p className="text-2xl font-bold text-green-600">{monitoringData.framework.phases.filter(p => p.is_completed).length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleSave}
          title="Save Monitoring Section Changes"
          message="Are you sure you want to save these changes? This will update the monitoring and evaluation section on your homepage."
          confirmText="Save Changes"
          cancelText="Cancel"
          isLoading={isSaving}
        />
      )}
    </div>
  );
};

export default MonitoringManagement;
