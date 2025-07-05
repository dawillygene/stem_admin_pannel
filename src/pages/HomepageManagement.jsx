import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HomepageService from '../utils/homepageService';
import HeroManagement from '../components/HeroManagement';
import ActivitiesManagement from '../components/ActivitiesManagement';
import OutcomesManagement from '../components/OutcomesManagement';
import MonitoringManagement from '../components/MonitoringManagement';
import EthicsManagement from '../components/EthicsManagement';
import Toast from '../components/Toast';

/**
 * Homepage Management Dashboard
 * Admin interface to manage all homepage content sections
 */
const HomepageManagement = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [homepageData, setHomepageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Tabs configuration
  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: 'fas fa-home', color: 'bg-[#0066CC]' },
    { id: 'activities', label: 'Activities', icon: 'fas fa-tasks', color: 'bg-[#FFAD03]' },
    { id: 'outcomes', label: 'Outcomes', icon: 'fas fa-target', color: 'bg-[#FD9148]' },
    { id: 'monitoring', label: 'Monitoring', icon: 'fas fa-chart-line', color: 'bg-[#0066CC]' },
    { id: 'ethics', label: 'Ethics', icon: 'fas fa-balance-scale', color: 'bg-[#FFAD03]' }
  ];

  // Fetch homepage data
  const fetchHomepageData = async () => {
    try {
      setIsLoading(true);
      const data = await HomepageService.getHomepageContent();
      setHomepageData(data);
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      showToast('Failed to load homepage data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle data update
  const handleDataUpdate = (section, updatedData) => {
    setHomepageData(prev => ({
      ...prev,
      [section]: updatedData
    }));
    showToast(`${section} section updated successfully!`, 'success');
  };

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hero':
        return (
          <HeroManagement
            data={homepageData?.hero}
            onUpdate={(data) => handleDataUpdate('hero', data)}
            isLoading={isLoading}
          />
        );
      case 'activities':
        return (
          <ActivitiesManagement
            data={homepageData?.activities}
            onUpdate={(data) => handleDataUpdate('activities', data)}
            isLoading={isLoading}
          />
        );
      case 'outcomes':
        return (
          <OutcomesManagement
            data={homepageData?.outcomes}
            onUpdate={(data) => handleDataUpdate('outcomes', data)}
            isLoading={isLoading}
          />
        );
      case 'monitoring':
        return (
          <MonitoringManagement
            data={homepageData?.monitoring}
            onUpdate={(data) => handleDataUpdate('monitoring', data)}
            isLoading={isLoading}
          />
        );
      case 'ethics':
        return (
          <EthicsManagement
            data={homepageData?.ethics}
            onUpdate={(data) => handleDataUpdate('ethics', data)}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0066CC] to-[#004c99] text-white py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Homepage Management</h1>
          <p className="text-blue-100">Manage all content sections of the website homepage</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#0066CC] text-[#0066CC]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="ml-2 h-2 w-2 rounded-full bg-[#FFAD03]"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066CC]"></div>
            <span className="ml-3 text-lg text-gray-600">Loading homepage data...</span>
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        )}
      </div>

      {/* Quick Actions Panel */}
      <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 border">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button
            onClick={fetchHomepageData}
            className="w-full flex items-center justify-center px-3 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors text-sm"
          >
            <i className="fas fa-sync-alt mr-2"></i>
            Refresh Data
          </button>
          <button
            onClick={() => window.open('/', '_blank')}
            className="w-full flex items-center justify-center px-3 py-2 bg-[#FFAD03] text-white rounded-lg hover:bg-[#e6980a] transition-colors text-sm"
          >
            <i className="fas fa-external-link-alt mr-2"></i>
            Preview Site
          </button>
        </div>
      </div>

      {/* Statistics Panel */}
      <div className="fixed top-20 right-6 bg-white rounded-lg shadow-lg p-4 border max-w-xs">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Content Statistics</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Hero Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              homepageData?.hero?.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {homepageData?.hero?.is_published ? 'Published' : 'Draft'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Activities:</span>
            <span className="font-medium">{homepageData?.activities?.activities?.length || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Outcomes:</span>
            <span className="font-medium">{homepageData?.outcomes?.outcomes?.length || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Updated:</span>
            <span className="text-xs text-gray-500">
              {homepageData?.meta?.last_updated ? 
                new Date(homepageData.meta.last_updated).toLocaleDateString() : 
                'N/A'
              }
            </span>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default HomepageManagement;
