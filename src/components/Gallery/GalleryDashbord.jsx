// src/components/admin/Dashboard.jsx
import { useState, useEffect } from 'react';
import GalleryAdmin from './GalleryAdmin';
import GalleryPreview from './GalleryPreview';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('manage');
  const [galleryItems, setGalleryItems] = useState([]);
  
  // Load gallery items from localStorage
  useEffect(() => {
    const storedItems = localStorage.getItem('galleryItems');
    if (storedItems) {
      setGalleryItems(JSON.parse(storedItems));
    }
  }, []);
  
  // Update gallery items whenever localStorage changes
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
              onClick={() => setActiveTab('manage')}
            >
              Manage Gallery
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === 'preview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
              onClick={() => setActiveTab('preview')}
            >
              Preview Gallery
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === 'analytics'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === 'settings'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'manage' && <GalleryAdmin />}
        {activeTab === 'preview' && <GalleryPreview items={galleryItems} />}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Gallery Analytics</h2>
            <p className="text-gray-600">
              Analytics features would be implemented here in a real application.
            </p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Gallery Settings</h2>
            <p className="text-gray-600">
              Settings features would be implemented here in a real application.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
