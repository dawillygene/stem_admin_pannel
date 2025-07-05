import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HomepageService from '../utils/homepageService';
import ConfirmationModal from './ConfirmationModal';

/**
 * Hero Section Management Component
 * Allows admin to manage hero section content
 * Author: ELIA WILLIAM MARIKI (@dawillygene)
 */
const HeroManagement = ({ data, onUpdate, isLoading }) => {
  const [heroData, setHeroData] = useState({
    title: '',
    subtitle: '',
    description: '',
    background_image: '',
    background_gradient: 'from-[#0066CC] to-[#FD9148]',
    cta_text: 'Learn More',
    cta_link: '/about',
    search_placeholder: 'Search for programs...',
    search_enabled: true,
    is_published: true,
    animations: {
      floating_elements: true,
      gradient_overlay: true
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState({});

  // Update local state when data changes
  useEffect(() => {
    if (data) {
      setHeroData({
        title: data.title || '',
        subtitle: data.subtitle || '',
        description: data.description || '',
        background_image: data.background_image || '',
        background_gradient: data.background_gradient || 'from-[#0066CC] to-[#FD9148]',
        cta_text: data.cta_text || 'Learn More',
        cta_link: data.cta_link || '/about',
        search_placeholder: data.search_placeholder || 'Search for programs...',
        search_enabled: data.search_enabled !== undefined ? data.search_enabled : true,
        is_published: data.is_published !== undefined ? data.is_published : true,
        animations: {
          floating_elements: false,
          gradient_overlay: false,
          ...(data.animations || {})
        }
      });
    }
  }, [data]);

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!heroData.title || !heroData.title.trim()) newErrors.title = 'Title is required';
    if (!heroData.subtitle || !heroData.subtitle.trim()) newErrors.subtitle = 'Subtitle is required';
    if (!heroData.description || !heroData.description.trim()) newErrors.description = 'Description is required';
    if (!heroData.cta_text || !heroData.cta_text.trim()) newErrors.cta_text = 'CTA text is required';
    if (!heroData.cta_link || !heroData.cta_link.trim()) newErrors.cta_link = 'CTA link is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      const updatedData = await HomepageService.updateHeroSection(heroData);
      onUpdate(updatedData);
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error saving hero data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setHeroData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle nested object changes
  const handleAnimationChange = (field, value) => {
    setHeroData(prev => ({
      ...prev,
      animations: { 
        floating_elements: false,
        gradient_overlay: false,
        ...prev.animations, 
        [field]: value 
      }
    }));
  };

  const gradientOptions = [
    { value: 'from-[#0066CC] to-[#FD9148]', label: 'Blue to Orange', preview: 'bg-gradient-to-r from-blue-600 to-orange-400' },
    { value: 'from-[#0066CC] to-[#FFAD03]', label: 'Blue to Yellow', preview: 'bg-gradient-to-r from-blue-600 to-yellow-400' },
    { value: 'from-[#FD9148] to-[#FFAD03]', label: 'Orange to Yellow', preview: 'bg-gradient-to-r from-orange-400 to-yellow-400' },
    { value: 'from-gray-900 to-gray-600', label: 'Dark Gray', preview: 'bg-gradient-to-r from-gray-900 to-gray-600' }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0066CC]"></div>
        <span className="ml-3 text-gray-600">Loading hero section...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hero Section Management</h2>
          <p className="text-gray-600">Configure the main hero section of your homepage</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="px-4 py-2 bg-[#FFAD03] text-white rounded-lg hover:bg-[#e6980a] transition-colors"
          >
            <i className="fas fa-eye mr-2"></i>
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
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

      {previewMode ? (
        /* Preview Mode */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-lg p-8 border-2 border-dashed border-gray-300"
        >
          <div className={`bg-gradient-to-r ${heroData.background_gradient} text-white p-12 rounded-lg`}>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">{heroData.title}</h1>
              <h2 className="text-xl mb-6 opacity-90">{heroData.subtitle}</h2>
              <p className="text-lg mb-8 opacity-80">{heroData.description}</p>
              <div className="flex justify-center space-x-4">
                <button className="px-6 py-3 bg-white text-[#0066CC] rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  {heroData.cta_text}
                </button>
                {heroData.search_enabled && (
                  <input
                    type="text"
                    placeholder={heroData.search_placeholder}
                    className="px-4 py-3 rounded-lg text-gray-800 w-64"
                    readOnly
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Edit Mode */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Content Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={heroData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter hero title"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle *
                  </label>
                  <input
                    type="text"
                    value={heroData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                      errors.subtitle ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter hero subtitle"
                  />
                  {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={heroData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="4"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter hero description"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CTA Text *
                    </label>
                    <input
                      type="text"
                      value={heroData.cta_text}
                      onChange={(e) => handleInputChange('cta_text', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                        errors.cta_text ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Button text"
                    />
                    {errors.cta_text && <p className="text-red-500 text-sm mt-1">{errors.cta_text}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CTA Link *
                    </label>
                    <input
                      type="text"
                      value={heroData.cta_link}
                      onChange={(e) => handleInputChange('cta_link', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                        errors.cta_link ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="/about"
                    />
                    {errors.cta_link && <p className="text-red-500 text-sm mt-1">{errors.cta_link}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Search Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Search Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={heroData.search_enabled}
                      onChange={(e) => handleInputChange('search_enabled', e.target.checked)}
                      className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Enable Search Bar</span>
                  </label>
                </div>

                {heroData.search_enabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Placeholder
                    </label>
                    <input
                      type="text"
                      value={heroData.search_placeholder}
                      onChange={(e) => handleInputChange('search_placeholder', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                      placeholder="Enter search placeholder"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Visual Settings */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Visual Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Gradient
                  </label>
                  <div className="space-y-2">
                    {gradientOptions.map((option) => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                        <input
                          type="radio"
                          name="gradient"
                          value={option.value}
                          checked={heroData.background_gradient === option.value}
                          onChange={(e) => handleInputChange('background_gradient', e.target.value)}
                          className="w-4 h-4 text-[#0066CC] border-gray-300 focus:ring-[#0066CC]"
                        />
                        <div className={`w-8 h-8 rounded-full ${option.preview}`}></div>
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Image URL
                  </label>
                  <input
                    type="url"
                    value={heroData.background_image}
                    onChange={(e) => handleInputChange('background_image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-sm text-gray-500 mt-1">Optional: Override gradient with image</p>
                </div>
              </div>
            </div>

            {/* Animation Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Animation Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={heroData.animations?.floating_elements || false}
                      onChange={(e) => handleAnimationChange('floating_elements', e.target.checked)}
                      className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Floating Elements</span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={heroData.animations?.gradient_overlay || false}
                      onChange={(e) => handleAnimationChange('gradient_overlay', e.target.checked)}
                      className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Gradient Overlay</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Publishing Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Publishing Settings</h3>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={heroData.is_published}
                    onChange={(e) => handleInputChange('is_published', e.target.checked)}
                    className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Published</span>
                </label>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  heroData.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {heroData.is_published ? 'Live' : 'Draft'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleSave}
          title="Save Hero Section Changes"
          message="Are you sure you want to save these changes? This will update the hero section on your homepage."
          confirmText="Save Changes"
          cancelText="Cancel"
          type="info"
          isLoading={isSaving}
        />
      )}
    </div>
  );
};

export default HeroManagement;
