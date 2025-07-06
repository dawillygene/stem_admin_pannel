import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FaInfoCircle, 
  FaEdit, 
  FaEye, 
  FaDownload, 
  FaSearch, 
  FaPlus, 
  FaSpinner,
  FaExclamationTriangle,
  FaCheckCircle,
  FaStar,
  FaProjectDiagram,
  FaHandshake,
  FaUsers,
  FaFileAlt,
  FaChartBar,
  FaChartLine,
  FaListAlt,
  FaHistory,
  FaTrash
} from 'react-icons/fa';
import { getAboutContent, exportContent, getAnalytics, deleteBenefit, deleteSpecificObjective, createBackgroundSection, updateBackgroundSection, deleteBackgroundSection, reorderBackgroundSections } from '../utils/aboutApi';
import { useAuth } from '../Context/AppProvier';
import { useToast } from '../components/Toast';
import AboutContentModal from '../components/AboutContentModal';
import BenefitFormModal from '../components/BenefitFormModal';
import ObjectiveFormModal from '../components/ObjectiveFormModal';
import BackgroundEditModal from '../components/BackgroundEditModal';
import JustificationEditModal from '../components/JustificationEditModal';
import ObjectivesEditModal from '../components/ObjectivesEditModal';
import BackgroundSectionModal from '../components/BackgroundSectionModal';

const AboutManagement = () => {
  // State management
  const [aboutData, setAboutData] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // Modal states
  const [showContentModal, setShowContentModal] = useState(false);
  const [showBenefitModal, setShowBenefitModal] = useState(false);
  const [showObjectiveModal, setShowObjectiveModal] = useState(false);
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);
  const [showJustificationModal, setShowJustificationModal] = useState(false);
  const [showObjectivesModal, setShowObjectivesModal] = useState(false);
  const [showBackgroundSectionModal, setShowBackgroundSectionModal] = useState(false);
  
  // Selected items for modals
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [selectedBackgroundSection, setSelectedBackgroundSection] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const { jwt } = useAuth();
  const { showToast } = useToast();

  // Fetch about data
  const fetchAboutData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAboutContent();
      
      if (response && response.success && response.data) {
        setAboutData(response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching about data:', err);
      setError('Failed to load about content. Please try again.');
      
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setError('Authentication required. Please log in to access About Management.');
            showToast('Please log in to continue', 'error');
            // Redirect to login after a delay
            setTimeout(() => {
              window.location.href = '/auth/login';
            }, 2000);
            break;
          case 403:
            setError('You don\'t have permission to view about content.');
            showToast('Access denied', 'error');
            break;
          case 404:
            setError('About content not found.');
            break;
          case 500:
            setError('Server error. The backend API encountered an issue. Please try again later.');
            showToast('Server error occurred', 'error');
            break;
          default:
            setError(`Server error: ${err.response.data?.message || 'Unknown error'}`);
        }
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.');
        showToast('Network connection error', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      setLoadingAnalytics(true);
      const response = await getAnalytics();
      
      if (response && response.success && response.data) {
        setAnalytics(response.data);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      // Analytics fetch failure shouldn't block the main UI
    } finally {
      setLoadingAnalytics(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchAboutData();
    if (jwt) {
      fetchAnalytics();
    }
  }, [jwt]);

  // Handle data refresh after edits
  const handleDataRefresh = () => {
    fetchAboutData();
    if (jwt) {
      fetchAnalytics();
    }
  };

  // Handle export
  const handleExport = async () => {
    try {
      await exportContent();
      showToast('About content exported successfully!', 'success');
    } catch (err) {
      console.error('Error exporting content:', err);
      showToast('Failed to export content. Please try again.', 'error');
    }
  };

  // Modal handlers
  // Fix: Pass actual data objects to modal for proper content display
  // Author: Elia William Mariki (@dawillygene) - July 3, 2025
  const handleViewContent = (section, item = null) => {
    setSelectedContent({ section, item });
    setShowContentModal(true);
  };

  const handleEditBackground = () => {
    setShowBackgroundModal(true);
  };

  const handleEditJustification = () => {
    setShowJustificationModal(true);
  };

  const handleEditObjectives = () => {
    setShowObjectivesModal(true);
  };

  const handleEditBenefit = (benefit = null) => {
    setSelectedBenefit(benefit);
    setEditingItem(benefit);
    setShowBenefitModal(true);
  };

  const handleCreateBenefit = () => {
    setSelectedBenefit(null);
    setEditingItem(null);
    setShowBenefitModal(true);
  };

  // Delete benefit handler with confirmation
  // Author: Elia William Mariki (@dawillygene) - July 3, 2025
  const handleDeleteBenefit = async (benefit) => {
    if (window.confirm(`Are you sure you want to delete "${benefit.title}"? This action cannot be undone.`)) {
      try {
        await deleteBenefit(benefit.id);
        showToast('Benefit deleted successfully', 'success');
        await handleDataRefresh(); // Refresh data to reflect changes
      } catch (error) {
        console.error('Error deleting benefit:', error);
        showToast('Failed to delete benefit. Please try again.', 'error');
      }
    }
  };

  const handleEditObjective = (objective = null) => {
    setSelectedObjective(objective);
    setEditingItem(objective);
    setShowObjectiveModal(true);
  };

  const handleCreateObjective = () => {
    setSelectedObjective(null);
    setEditingItem(null);
    setShowObjectiveModal(true);
  };

  // Delete specific objective handler with confirmation
  // Author: Elia William Mariki (@dawillygene) - July 3, 2025
  const handleDeleteObjective = async (objective) => {
    if (window.confirm(`Are you sure you want to delete "${objective.title}"? This action cannot be undone.`)) {
      try {
        await deleteSpecificObjective(objective.id);
        showToast('Objective deleted successfully', 'success');
        await handleDataRefresh(); // Refresh data to reflect changes
      } catch (error) {
        console.error('Error deleting objective:', error);
        showToast('Failed to delete objective. Please try again.', 'error');
      }
    }
  };

  // Background section CRUD handlers
  // Author: Elia William Mariki (@dawillygene) - July 5, 2025
  const handleCreateBackgroundSection = () => {
    setSelectedBackgroundSection(null);
    setShowBackgroundSectionModal(true);
  };

  const handleEditBackgroundSection = (section) => {
    setSelectedBackgroundSection(section);
    setShowBackgroundSectionModal(true);
  };

  const handleSaveBackgroundSection = async (sectionData) => {
    try {
      if (selectedBackgroundSection) {
        // Update existing section
        await updateBackgroundSection(selectedBackgroundSection.id, sectionData);
        showToast('Background section updated successfully', 'success');
      } else {
        // Create new section
        await createBackgroundSection(sectionData);
        showToast('Background section created successfully', 'success');
      }
      await handleDataRefresh(); // Refresh data to reflect changes
    } catch (error) {
      console.error('Error saving background section:', error);
      showToast('Failed to save background section. Please try again.', 'error');
      throw error; // Re-throw to prevent modal from closing
    }
  };

  const handleDeleteBackgroundSection = async (section) => {
    if (window.confirm(`Are you sure you want to delete "${section.title}"? This action cannot be undone.`)) {
      try {
        await deleteBackgroundSection(section.id);
        showToast('Background section deleted successfully', 'success');
        await handleDataRefresh(); // Refresh data to reflect changes
      } catch (error) {
        console.error('Error deleting background section:', error);
        showToast('Failed to delete background section. Please try again.', 'error');
      }
    }
  };

  const handleReorderBackgroundSections = async (sectionsOrder) => {
    try {
      await reorderBackgroundSections(sectionsOrder);
      showToast('Background sections reordered successfully', 'success');
      await handleDataRefresh(); // Refresh data to reflect changes
    } catch (error) {
      console.error('Error reordering background sections:', error);
      showToast('Failed to reorder background sections. Please try again.', 'error');
    }
  };

  // Filter content based on search matching the backend data structure
  const filteredContent = useMemo(() => {
    if (!aboutData || !searchTerm.trim()) return aboutData;
    
    const search = searchTerm.toLowerCase();
    const filtered = { ...aboutData };
    
    // Filter benefits - using the exact backend structure
    if (filtered.benefits) {
      filtered.benefits = filtered.benefits.filter(benefit => 
        benefit.title?.toLowerCase().includes(search) ||
        benefit.description?.toLowerCase().includes(search)
      );
    }
    
    // Filter specific objectives
    if (filtered.objectives?.specificObjectives) {
      filtered.objectives.specificObjectives = filtered.objectives.specificObjectives.filter(objective =>
        objective.title?.toLowerCase().includes(search) ||
        objective.description?.toLowerCase().includes(search)
      );
    }
    
    // Filter background sections
    if (filtered.background?.sections) {
      filtered.background.sections = filtered.background.sections.filter(section =>
        section.title?.toLowerCase().includes(search) ||
        section.content?.toLowerCase().includes(search)
      );
    }
    
    // Filter justification references
    if (filtered.justification?.references) {
      filtered.justification.references = filtered.justification.references.filter(ref =>
        ref.title?.toLowerCase().includes(search) ||
        ref.author?.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  }, [aboutData, searchTerm]);

  // Statistics cards data
  const statsData = useMemo(() => {
    if (!aboutData) return [];

    return [
      {
        title: 'Total Benefits',
        value: aboutData.benefits?.length || 0,
        icon: FaCheckCircle,
        color: 'bg-green-500',
        description: 'STEM education benefits'
      },
      {
        title: 'Specific Objectives',
        value: aboutData.objectives?.specificObjectives?.length || 0,
        icon: FaProjectDiagram,
        color: 'bg-blue-500',
        description: 'Project objectives'
      },
      {
        title: 'Background Sections',
        value: aboutData.background?.sections?.length || 0,
        icon: FaFileAlt,
        color: 'bg-purple-500',
        description: 'Content sections'
      },
      {
        title: 'References',
        value: aboutData.justification?.references?.length || 0,
        icon: FaStar,
        color: 'bg-orange-500',
        description: 'Research references'
      }
    ];
  }, [aboutData]);

  // Tab navigation
  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartLine },
    { id: 'background', label: 'Background', icon: FaInfoCircle },
    { id: 'benefits', label: 'Benefits', icon: FaCheckCircle },
    { id: 'justification', label: 'Justification', icon: FaFileAlt },
    { id: 'objectives', label: 'Objectives', icon: FaProjectDiagram },
    { id: 'analytics', label: 'Analytics', icon: FaChartBar }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="gradient-bg py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold mb-2 flex items-center justify-center">
                <FaSpinner className="animate-spin mr-3" />
                Loading About Management
              </h1>
              <p className="text-xl opacity-90">Fetching content data...</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="gradient-bg py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold mb-2 flex items-center justify-center">
                <FaExclamationTriangle className="mr-3" />
                About Management
              </h1>
              <p className="text-xl opacity-90">Content management system</p>
            </motion.div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div 
            className="bg-white rounded-xl shadow-md p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Content</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              {error && error.includes('Authentication') ? (
                <button
                  onClick={() => window.location.href = '/auth/login'}
                  className="px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors flex items-center"
                >
                  <FaUsers className="mr-2" />
                  Go to Login
                </button>
              ) : (
                <button
                  onClick={fetchAboutData}
                  className="px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const { background, benefits, justification, objectives } = filteredContent || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-bg py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-2 flex items-center justify-center">
              <FaInfoCircle className="mr-3" />
              About Management
            </h1>
            <p className="text-xl opacity-90">Manage STEM project content and information</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <motion.div 
          className="bg-white rounded-xl shadow-md p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <FaDownload className="mr-2" />
                Export
              </button>
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isPreviewMode 
                    ? 'bg-orange-500 text-white hover:bg-orange-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FaEye className="mr-2" />
                {isPreviewMode ? 'Exit Preview' : 'Preview'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="text-white text-xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="bg-white rounded-xl shadow-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#0066CC] text-[#0066CC]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Background Card */}
                <motion.div 
                  className="bg-gray-50 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <FaInfoCircle className="mr-2 text-[#0066CC]" />
                      Background Information
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewContent('background', background)}
                        className="p-2 text-gray-500 hover:text-[#0066CC] transition-colors"
                        title="View details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={handleEditBackground}
                        className="p-2 text-gray-500 hover:text-[#FFAD03] transition-colors"
                        title="Edit background"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {background?.mainContent ? 
                      `${background.mainContent.substring(0, 120)}...` : 
                      'No background content available'
                    }
                  </p>
                  <div className="text-sm text-gray-500">
                    Sections: {background?.sections?.length || 0}
                  </div>
                </motion.div>

                {/* Benefits Summary */}
                <motion.div 
                  className="bg-gray-50 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <FaCheckCircle className="mr-2 text-green-500" />
                      STEM Benefits
                    </h3>                      <button
                        onClick={() => handleViewContent('benefits', benefits)}
                        className="p-2 text-gray-500 hover:text-[#0066CC] transition-colors"
                        title="View all benefits"
                      >
                        <FaEye />
                      </button>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Key benefits of STEM education implementation
                  </p>
                  <div className="text-sm text-gray-500">
                    Total Benefits: {benefits?.length || 0}
                  </div>
                </motion.div>

                {/* Justification Summary */}
                <motion.div 
                  className="bg-gray-50 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <FaFileAlt className="mr-2 text-purple-500" />
                      Project Justification
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewContent('justification', justification)}
                        className="p-2 text-gray-500 hover:text-[#0066CC] transition-colors"
                        title="View details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={handleEditJustification}
                        className="p-2 text-gray-500 hover:text-[#FFAD03] transition-colors"
                        title="Edit justification"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {justification?.content ? 
                      `${justification.content.substring(0, 120)}...` : 
                      'No justification content available'
                    }
                  </p>
                  <div className="text-sm text-gray-500">
                    References: {justification?.references?.length || 0}
                  </div>
                </motion.div>

                {/* Objectives Summary */}
                <motion.div 
                  className="bg-gray-50 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <FaProjectDiagram className="mr-2 text-blue-500" />
                      Project Objectives
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewContent('objectives', objectives)}
                        className="p-2 text-gray-500 hover:text-[#0066CC] transition-colors"
                        title="View details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={handleEditObjectives}
                        className="p-2 text-gray-500 hover:text-[#FFAD03] transition-colors"
                        title="Edit objectives"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {objectives?.introduction ? 
                      `${objectives.introduction.substring(0, 120)}...` : 
                      'No objectives content available'
                    }
                  </p>
                  <div className="text-sm text-gray-500">
                    Specific Objectives: {objectives?.specificObjectives?.length || 0}
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'background' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-800">Background Information</h3>
                  <button
                    onClick={handleEditBackground}
                    className="flex items-center px-4 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                  >
                    <FaEdit className="mr-2" />
                    Edit Background
                  </button>
                </div>

                {background ? (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">{background.title}</h4>
                      <p className="text-gray-600 mb-4">{background.mainContent}</p>
                      
                      {background.ctaText && background.ctaLink && (
                        <div className="mb-4">
                          <strong>Call to Action:</strong> 
                          <a href={background.ctaLink} className="text-[#0066CC] hover:underline ml-2">
                            {background.ctaText}
                          </a>
                        </div>
                      )}
                    </div>

                    {background.sections && background.sections.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-semibold text-gray-800">Sections</h4>
                          <button
                            onClick={handleCreateBackgroundSection}
                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <FaPlus className="mr-2" />
                            Add Section
                          </button>
                        </div>
                        {background.sections
                          .sort((a, b) => a.displayOrder - b.displayOrder)
                          .map((section) => (
                            <motion.div
                              key={section.id}
                              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="flex justify-between items-start mb-3">
                                <h5 className="text-md font-semibold text-gray-800 flex-1">{section.title}</h5>
                                <div className="flex gap-2 ml-4">
                                  <button
                                    onClick={() => handleViewContent('background', section)}
                                    className="p-2 text-gray-500 hover:text-[#0066CC] transition-colors"
                                    title="View details"
                                  >
                                    <FaEye />
                                  </button>
                                  <button
                                    onClick={() => handleEditBackgroundSection(section)}
                                    className="p-2 text-gray-500 hover:text-[#FFAD03] transition-colors"
                                    title="Edit section"
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBackgroundSection(section)}
                                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                    title="Delete section"
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </div>
                              <p className="text-gray-600 mb-2">{section.content}</p>
                              <div className="text-sm text-gray-500">
                                Order: {section.displayOrder}
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    )}
                    
                    {(!background.sections || background.sections.length === 0) && (
                      <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                        <FaFileAlt className="text-4xl text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No background sections available</p>
                        <button
                          onClick={handleCreateBackgroundSection}
                          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Add First Section
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaInfoCircle className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No background information available</p>
                    <button
                      onClick={handleEditBackground}
                      className="mt-4 px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                    >
                      Add Background Content
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-800">STEM Education Benefits</h3>
                  <button
                    onClick={handleCreateBenefit}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    Add Benefit
                  </button>
                </div>

                {benefits && benefits.length > 0 ? (
                  <div className="grid gap-4">
                    {benefits
                      .filter(benefit => benefit.isActive)
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map((benefit) => (
                        <motion.div
                          key={benefit.id}
                          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-start space-x-3">
                                <FaCheckCircle className="text-green-500 text-lg mt-1 flex-shrink-0" />
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h4>
                                  <p className="text-gray-600">{benefit.description}</p>
                                  <div className="text-sm text-gray-500 mt-2">
                                    Order: {benefit.displayOrder}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => handleViewContent('benefits', benefit)}
                                className="p-2 text-gray-500 hover:text-[#0066CC] transition-colors"
                                title="View details"
                              >
                                <FaEye />
                              </button>
                              <button
                                onClick={() => handleEditBenefit(benefit)}
                                className="p-2 text-gray-500 hover:text-[#FFAD03] transition-colors"
                                title="Edit benefit"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteBenefit(benefit)}
                                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                title="Delete benefit"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaCheckCircle className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No benefits available</p>
                    <button
                      onClick={handleCreateBenefit}
                      className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Add First Benefit
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'justification' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-800">Project Justification</h3>
                  <button
                    onClick={handleEditJustification}
                    className="flex items-center px-4 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                  >
                    <FaEdit className="mr-2" />
                    Edit Justification
                  </button>
                </div>

                {justification ? (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">{justification.title}</h4>
                      <div className="prose max-w-none">
                        <p className="text-gray-600 mb-4">{justification.content}</p>
                        {justification.conclusion && (
                          <p className="text-gray-600 mb-4">{justification.conclusion}</p>
                        )}
                      </div>
                    </div>

                    {justification.references && justification.references.length > 0 && (
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">References</h4>
                        <div className="space-y-3">
                          {justification.references
                            .sort((a, b) => a.displayOrder - b.displayOrder)
                            .map((ref) => (
                              <div key={ref.id} className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="text-gray-600">
                                    {ref.author} ({ref.publicationDate}). <em>{ref.title}</em>.
                                    {ref.url && (
                                      <a
                                        href={ref.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#0066CC] hover:underline ml-2"
                                      >
                                        View Source
                                      </a>
                                    )}
                                  </p>
                                </div>
                                <button
                                  onClick={() => handleViewContent('justification', ref)}
                                  className="p-2 text-gray-500 hover:text-[#0066CC] transition-colors ml-4"
                                  title="View details"
                                >
                                  <FaEye />
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaFileAlt className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No justification content available</p>
                    <button
                      onClick={handleEditJustification}
                      className="mt-4 px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                    >
                      Add Justification Content
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'objectives' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-800">Project Objectives</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCreateObjective}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <FaPlus className="mr-2" />
                      Add Objective
                    </button>
                    <button
                      onClick={handleEditObjectives}
                      className="flex items-center px-4 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                    >
                      <FaEdit className="mr-2" />
                      Edit Overview
                    </button>
                  </div>
                </div>

                {objectives ? (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">{objectives.title}</h4>
                      {objectives.introduction && (
                        <p className="text-gray-600 mb-4">{objectives.introduction}</p>
                      )}
                      {objectives.conclusion && (
                        <p className="text-gray-600 italic">{objectives.conclusion}</p>
                      )}
                    </div>

                    {objectives.specificObjectives && objectives.specificObjectives.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800">Specific Objectives</h4>
                        <div className="grid gap-4">
                          {objectives.specificObjectives
                            .filter(obj => obj.isActive)
                            .sort((a, b) => a.displayOrder - b.displayOrder)
                            .map((objective) => (
                              <motion.div
                                key={objective.id}
                                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h5 className="text-lg font-semibold text-gray-800 mb-2">{objective.title}</h5>
                                    <p className="text-gray-600 mb-2">{objective.description}</p>
                                    <div className="text-sm text-gray-500">
                                      Order: {objective.displayOrder}
                                    </div>
                                  </div>
                                  <div className="flex gap-2 ml-4">
                                    <button
                                      onClick={() => handleViewContent('objectives', objective)}
                                      className="p-2 text-gray-500 hover:text-[#0066CC] transition-colors"
                                      title="View details"
                                    >
                                      <FaEye />
                                    </button>
                                    <button
                                      onClick={() => handleEditObjective(objective)}
                                      className="p-2 text-gray-500 hover:text-[#FFAD03] transition-colors"
                                      title="Edit objective"
                                    >
                                      <FaEdit />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteObjective(objective)}
                                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                      title="Delete objective"
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaProjectDiagram className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No objectives content available</p>
                    <button
                      onClick={handleEditObjectives}
                      className="mt-4 px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                    >
                      Add Objectives Content
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-800">Content Analytics</h3>
                  <button
                    onClick={fetchAnalytics}
                    disabled={loadingAnalytics}
                    className="flex items-center px-4 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors disabled:opacity-50"
                  >
                    {loadingAnalytics ? <FaSpinner className="animate-spin mr-2" /> : <FaChartBar className="mr-2" />}
                    Refresh Analytics
                  </button>
                </div>

                {analytics ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Page Views</h4>
                      <p className="text-3xl font-bold text-[#0066CC]">{analytics.page_views?.toLocaleString() || 0}</p>
                      <p className="text-sm text-gray-500">Total views</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Avg. Time on Page</h4>
                      <p className="text-3xl font-bold text-green-500">{analytics.average_time_on_page || 0}s</p>
                      <p className="text-sm text-gray-500">User engagement</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Most Viewed</h4>
                      <p className="text-xl font-bold text-purple-500 capitalize">{analytics.most_viewed_section || 'N/A'}</p>
                      <p className="text-sm text-gray-500">Popular section</p>
                    </div>

                    {analytics.section_engagement && (
                      <div className="md:col-span-2 lg:col-span-3 bg-white rounded-lg p-6 shadow-sm">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Section Engagement</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(analytics.section_engagement).map(([section, engagement]) => (
                            <div key={section} className="text-center">
                              <p className="text-2xl font-bold text-[#0066CC]">{engagement}%</p>
                              <p className="text-sm text-gray-500 capitalize">{section}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {analytics.last_updated && (
                      <div className="md:col-span-2 lg:col-span-3 bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                          <strong>Last Updated:</strong> {new Date(analytics.last_updated).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaChartBar className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {loadingAnalytics ? 'Loading analytics...' : 'No analytics data available'}
                    </p>
                    {!loadingAnalytics && (
                      <button
                        onClick={fetchAnalytics}
                        className="mt-4 px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
                      >
                        Load Analytics
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {showContentModal && (
        <AboutContentModal
          content={selectedContent}
          onClose={() => setShowContentModal(false)}
        />
      )}

      {showBenefitModal && (
        <BenefitFormModal
          benefit={editingItem}
          onClose={() => setShowBenefitModal(false)}
          onSuccess={handleDataRefresh}
        />
      )}

      {showObjectiveModal && (
        <ObjectiveFormModal
          objective={editingItem}
          onClose={() => setShowObjectiveModal(false)}
          onSuccess={handleDataRefresh}
        />
      )}

      {showBackgroundModal && (
        <BackgroundEditModal
          background={aboutData?.background}
          onClose={() => setShowBackgroundModal(false)}
          onSuccess={handleDataRefresh}
        />
      )}

      {showJustificationModal && (
        <JustificationEditModal
          justification={aboutData?.justification}
          onClose={() => setShowJustificationModal(false)}
          onSuccess={handleDataRefresh}
        />
      )}

      {showObjectivesModal && (
        <ObjectivesEditModal
          objectives={aboutData?.objectives}
          onClose={() => setShowObjectivesModal(false)}
          onSuccess={handleDataRefresh}
        />
      )}

      {showBackgroundSectionModal && (
        <BackgroundSectionModal
          isOpen={showBackgroundSectionModal}
          onClose={() => setShowBackgroundSectionModal(false)}
          section={selectedBackgroundSection}
          onSave={handleSaveBackgroundSection}
        />
      )}
    </div>
  );
};

export default AboutManagement;
