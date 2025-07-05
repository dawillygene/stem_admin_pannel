import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomepageService from '../utils/homepageService';
import ConfirmationModal from './ConfirmationModal';

/**
 * Ethics Section Management Component
 * Allows admin to manage ethics and policies section content
 * Author: ELIA WILLIAM MARIKI (@dawillygene)
 */
const EthicsManagement = ({ data, onUpdate, isLoading }) => {
  const [ethicsData, setEthicsData] = useState({
    title: '',
    subtitle: '',
    description: '',
    background_color: 'bg-gray-50',
    policies: [],
    compliance: {
      certifications: [],
      audits: [],
      last_review: ''
    },
    contact: {
      email: '',
      phone: '',
      address: ''
    },
    is_published: true
  });

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [errors, setErrors] = useState({});

  const policyTypes = [
    { value: 'privacy', label: 'Privacy Policy' },
    { value: 'data_protection', label: 'Data Protection' },
    { value: 'research_ethics', label: 'Research Ethics' },
    { value: 'child_protection', label: 'Child Protection' },
    { value: 'code_of_conduct', label: 'Code of Conduct' },
    { value: 'accessibility', label: 'Accessibility' },
    { value: 'terms_of_service', label: 'Terms of Service' }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'bg-gray-500' },
    { value: 'medium', label: 'Medium', color: 'bg-[#FFAD03]' },
    { value: 'high', label: 'High', color: 'bg-[#FD9148]' },
    { value: 'critical', label: 'Critical', color: 'bg-red-500' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-info-circle' },
    { id: 'policies', label: 'Policies', icon: 'fas fa-gavel' },
    { id: 'compliance', label: 'Compliance', icon: 'fas fa-certificate' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];

  // Update local state when data changes
  // Update local state when data changes
  useEffect(() => {
    if (data) {
      setEthicsData({
        title: '',
        subtitle: '',
        description: '',
        background_color: 'bg-gray-50',
        policies: [],
        compliance: {
          certifications: [],
          audits: [],
          last_review: ''
        },
        contact: {
          email: '',
          phone: '',
          address: ''
        },
        is_published: true,
        ...data,
        compliance: {
          certifications: [],
          audits: [],
          last_review: '',
          ...(data.compliance || {})
        },
        contact: {
          email: '',
          phone: '',
          address: '',
          ...(data.contact || {})
        }
      });
    }
  }, [data]);

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!ethicsData.title.trim()) newErrors.title = 'Title is required';
    if (!ethicsData.subtitle.trim()) newErrors.subtitle = 'Subtitle is required';
    if (!ethicsData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate policy data
  const validatePolicy = (policy) => {
    const newErrors = {};
    
    if (!policy.title.trim()) newErrors.title = 'Policy title is required';
    if (!policy.description.trim()) newErrors.description = 'Policy description is required';
    if (!policy.type) newErrors.type = 'Policy type is required';
    if (!policy.priority) newErrors.priority = 'Priority level is required';
    
    return newErrors;
  };

  // Handle form submission
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      const updatedData = await HomepageService.updateEthicsSection(ethicsData);
      onUpdate(updatedData);
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error saving ethics data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEthicsData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle nested object changes
  const handleNestedChange = (parent, field, value) => {
    setEthicsData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  // Add new policy
  const addPolicy = () => {
    const newPolicy = {
      id: Date.now(),
      title: '',
      description: '',
      type: '',
      priority: 'medium',
      content: '',
      version: '1.0',
      effective_date: new Date().toISOString().split('T')[0],
      review_date: '',
      document_url: '',
      is_active: true,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setSelectedPolicy(newPolicy);
    setShowPolicyModal(true);
  };

  // Edit policy
  const editPolicy = (policy) => {
    setSelectedPolicy({ ...policy });
    setShowPolicyModal(true);
  };

  // Save policy
  const savePolicy = () => {
    const policyErrors = validatePolicy(selectedPolicy);
    if (Object.keys(policyErrors).length > 0) {
      setErrors(policyErrors);
      return;
    }

    if (selectedPolicy.id && ethicsData.policies.find(p => p.id === selectedPolicy.id)) {
      // Update existing policy
      setEthicsData(prev => ({
        ...prev,
        policies: prev.policies.map(p => 
          p.id === selectedPolicy.id ? { ...selectedPolicy, updated_at: new Date().toISOString() } : p
        )
      }));
    } else {
      // Add new policy
      setEthicsData(prev => ({
        ...prev,
        policies: [...prev.policies, { ...selectedPolicy, id: Date.now() }]
      }));
    }

    setShowPolicyModal(false);
    setSelectedPolicy(null);
    setErrors({});
  };

  // Delete policy
  const deletePolicy = (policyId) => {
    setEthicsData(prev => ({
      ...prev,
      policies: prev.policies.filter(p => p.id !== policyId)
    }));
  };

  // Add certification
  const addCertification = () => {
    const newCertification = {
      id: Date.now(),
      title: '',
      issuer: '',
      date: '',
      expiry: '',
      document_url: ''
    };
    
    setEthicsData(prev => ({
      ...prev,
      compliance: {
        ...prev.compliance,
        certifications: [...prev.compliance.certifications, newCertification]
      }
    }));
  };

  // Update certification
  const updateCertification = (certId, field, value) => {
    setEthicsData(prev => ({
      ...prev,
      compliance: {
        ...prev.compliance,
        certifications: prev.compliance.certifications.map(cert => 
          cert.id === certId ? { ...cert, [field]: value } : cert
        )
      }
    }));
  };

  // Delete certification
  const deleteCertification = (certId) => {
    setEthicsData(prev => ({
      ...prev,
      compliance: {
        ...prev.compliance,
        certifications: prev.compliance.certifications.filter(cert => cert.id !== certId)
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0066CC]"></div>
        <span className="ml-3 text-gray-600">Loading ethics section...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ethics & Policies Management</h2>
          <p className="text-gray-600">Configure the ethics and policies section of your homepage</p>
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
                    value={ethicsData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ethics and Policies"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Subtitle *
                  </label>
                  <input
                    type="text"
                    value={ethicsData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                      errors.subtitle ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Our commitment to ethical standards"
                  />
                  {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={ethicsData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows="4"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe the ethics and policies approach..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publishing Status
                </label>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={ethicsData.is_published}
                      onChange={(e) => handleInputChange('is_published', e.target.checked)}
                      className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Published</span>
                  </label>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ethicsData.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {ethicsData.is_published ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Policies & Guidelines ({ethicsData.policies.length})</h4>
                <button
                  onClick={addPolicy}
                  className="px-4 py-2 bg-[#FFAD03] text-white rounded-lg hover:bg-[#e6980a] transition-colors"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add Policy
                </button>
              </div>

              {ethicsData.policies.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-gavel text-4xl mb-4"></i>
                  <p>No policies defined yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {ethicsData.policies.map((policy) => (
                    <motion.div
                      key={policy.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h5 className="font-semibold text-gray-900">{policy.title}</h5>
                            <span className="text-sm text-gray-500">v{policy.version}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              priorityLevels.find(p => p.value === policy.priority)?.color || 'bg-gray-500'
                            } text-white`}>
                              {policy.priority}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              policy.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {policy.is_published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-2">{policy.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="capitalize">{policy.type.replace('_', ' ')}</span>
                            <span>Effective: {policy.effective_date}</span>
                            {policy.review_date && <span>Review: {policy.review_date}</span>}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => editPolicy(policy)}
                            className="p-2 text-[#0066CC] hover:text-[#0056b3]"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => deletePolicy(policy.id)}
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
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold">Certifications ({ethicsData.compliance.certifications.length})</h4>
                  <button
                    onClick={addCertification}
                    className="px-4 py-2 bg-[#FFAD03] text-white rounded-lg hover:bg-[#e6980a] transition-colors"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Add Certification
                  </button>
                </div>

                {ethicsData.compliance.certifications.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <i className="fas fa-certificate text-4xl mb-4"></i>
                    <p>No certifications added yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ethicsData.compliance.certifications.map((cert) => (
                      <div key={cert.id} className="border rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Certification Title
                            </label>
                            <input
                              type="text"
                              value={cert.title}
                              onChange={(e) => updateCertification(cert.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                              placeholder="ISO 27001"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Issuer
                            </label>
                            <input
                              type="text"
                              value={cert.issuer}
                              onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                              placeholder="International Organization for Standardization"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Issue Date
                            </label>
                            <input
                              type="date"
                              value={cert.date}
                              onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="date"
                              value={cert.expiry}
                              onChange={(e) => updateCertification(cert.id, 'expiry', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Document URL
                            </label>
                            <input
                              type="url"
                              value={cert.document_url}
                              onChange={(e) => updateCertification(cert.id, 'document_url', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                              placeholder="https://example.com/certificate.pdf"
                            />
                          </div>

                          <div className="flex items-end">
                            <button
                              onClick={() => deleteCertification(cert.id)}
                              className="px-3 py-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Compliance Review
                </label>
                <input
                  type="date"
                  value={ethicsData.compliance.last_review}
                  onChange={(e) => handleNestedChange('compliance', 'last_review', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Ethics Contact Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={ethicsData.contact.email}
                    onChange={(e) => handleNestedChange('contact', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    placeholder="ethics@organization.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={ethicsData.contact.phone}
                    onChange={(e) => handleNestedChange('contact', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  value={ethicsData.contact.address}
                  onChange={(e) => handleNestedChange('contact', 'address', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  placeholder="Ethics Officer Address..."
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Policy Modal */}
      <AnimatePresence>
        {showPolicyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedPolicy?.id && ethicsData.policies.find(p => p.id === selectedPolicy.id) 
                    ? 'Edit Policy' : 'Add New Policy'}
                </h3>
                <button
                  onClick={() => setShowPolicyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Policy Title *
                    </label>
                    <input
                      type="text"
                      value={selectedPolicy?.title || ''}
                      onChange={(e) => setSelectedPolicy(prev => ({ ...prev, title: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Policy title"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Policy Type *
                    </label>
                    <select
                      value={selectedPolicy?.type || ''}
                      onChange={(e) => setSelectedPolicy(prev => ({ ...prev, type: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                        errors.type ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select policy type</option>
                      {policyTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={selectedPolicy?.description || ''}
                    onChange={(e) => setSelectedPolicy(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Policy description"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority *
                    </label>
                    <select
                      value={selectedPolicy?.priority || ''}
                      onChange={(e) => setSelectedPolicy(prev => ({ ...prev, priority: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent ${
                        errors.priority ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select priority</option>
                      {priorityLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                    {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Version
                    </label>
                    <input
                      type="text"
                      value={selectedPolicy?.version || ''}
                      onChange={(e) => setSelectedPolicy(prev => ({ ...prev, version: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                      placeholder="1.0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Effective Date
                    </label>
                    <input
                      type="date"
                      value={selectedPolicy?.effective_date || ''}
                      onChange={(e) => setSelectedPolicy(prev => ({ ...prev, effective_date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Date
                    </label>
                    <input
                      type="date"
                      value={selectedPolicy?.review_date || ''}
                      onChange={(e) => setSelectedPolicy(prev => ({ ...prev, review_date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document URL
                    </label>
                    <input
                      type="url"
                      value={selectedPolicy?.document_url || ''}
                      onChange={(e) => setSelectedPolicy(prev => ({ ...prev, document_url: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                      placeholder="https://example.com/policy.pdf"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Content
                  </label>
                  <textarea
                    value={selectedPolicy?.content || ''}
                    onChange={(e) => setSelectedPolicy(prev => ({ ...prev, content: e.target.value }))}
                    rows="6"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    placeholder="Full policy content..."
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPolicy?.is_active || false}
                      onChange={(e) => setSelectedPolicy(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Active</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPolicy?.is_published || false}
                      onChange={(e) => setSelectedPolicy(prev => ({ ...prev, is_published: e.target.checked }))}
                      className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Published</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowPolicyModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={savePolicy}
                  className="px-4 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                >
                  Save Policy
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
          title="Save Ethics Section Changes"
          message="Are you sure you want to save these changes? This will update the ethics and policies section on your homepage."
          confirmText="Save Changes"
          cancelText="Cancel"
          type="info"
          isLoading={isSaving}
        />
      )}
    </div>
  );
};

export default EthicsManagement;
