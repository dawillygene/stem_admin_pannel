// src/components/admin/Dashboard.jsx
import { useState, useEffect } from 'react';
import GalleryAdmin from './GalleryAdmin';
import GalleryPreview from './GalleryPreview';
import { galleryApi } from '../../utils/galleryApi';
import { useToast } from '../Toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('manage');
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  
  // Load gallery items from API
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    setIsLoading(true);
    try {
      const items = await galleryApi.getAllGalleryItems();
      setGalleryItems(items);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      
      // Fallback to localStorage if API fails
      const storedItems = localStorage.getItem('galleryItems');
      if (storedItems) {
        setGalleryItems(JSON.parse(storedItems));
        showToast("Loaded items from local storage.", "info");
      } else {
        showToast("Failed to load gallery items.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update gallery items whenever localStorage changes (for backward compatibility)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedItems = localStorage.getItem('galleryItems');
      if (storedItems) {
        setGalleryItems(JSON.parse(storedItems));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Refresh data when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'preview') {
      fetchGalleryItems(); // Refresh data for preview
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="STEM IN DODOMA" 
                className="h-10 w-10 rounded-full mr-3"
              />
              <h1 className="text-2xl font-bold text-primary">STEM IN DODOMA Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-primary">
                <span className="mr-1">👤</span> Admin
              </button>
              <button className="text-gray-600 hover:text-primary">
                <span className="mr-1">🔒</span> Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Admin Navigation */}
      <div className="bg-white shadow-md mt-1">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto">
            <button
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === 'manage'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
              onClick={() => handleTabChange('manage')}
            >
              Manage Gallery
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === 'preview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
              onClick={() => handleTabChange('preview')}
            >
              Preview Gallery
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === 'analytics'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
              onClick={() => handleTabChange('analytics')}
            >
              Analytics
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === 'settings'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
              onClick={() => handleTabChange('settings')}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>
      
      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      )}
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'manage' && <GalleryAdmin />}
        {activeTab === 'preview' && <GalleryPreview items={galleryItems} />}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Gallery Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800">Total Items</h3>
                <p className="text-2xl font-bold text-blue-900">{galleryItems.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800">Featured Items</h3>
                <p className="text-2xl font-bold text-green-900">
                  {galleryItems.filter(item => item.featured).length}
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-800">Total Views</h3>
                <p className="text-2xl font-bold text-orange-900">
                  {galleryItems.reduce((total, item) => total + (item.viewCount || 0), 0)}
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              More detailed analytics features would be implemented here in a real application.
            </p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Gallery Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Display Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-700">Show view counts to public</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-700">Enable image lightbox</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-700">Auto-optimize images</span>
                  </label>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mt-4">
              Settings features would be implemented here in a real application.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
