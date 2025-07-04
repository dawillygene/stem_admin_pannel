import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Activities from '../components/Activities';
import Outcomes from '../components/Outcomes';
import Monitoring from '../components/Monitoring';
import Ethics from '../components/Ethics';
import { 
  getHomepageContent, 
  getDefaultHomepageContent, 
  handleApiError 
} from '../utils/homeService';

/**
 * Dynamic Home Page Component
 * Displays the complete homepage with all sections fetched from API
 * Includes hero, activities, outcomes, monitoring, and ethics sections
 */
const Home = () => {
  const [homepageData, setHomepageData] = useState(getDefaultHomepageContent());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Fetch homepage content from API
  const fetchHomepageContent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getHomepageContent({
        published: true
      });
      
      if (response.success) {
        setHomepageData(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch homepage content');
      }
    } catch (err) {
      console.error('Error fetching homepage content:', err);
      const errorInfo = handleApiError(err, 'Failed to load homepage content');
      setError(errorInfo);
      
      // Keep using default content if API fails
      setHomepageData(getDefaultHomepageContent());
    } finally {
      setIsLoading(false);
    }
  };

  // Retry mechanism
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchHomepageContent();
  };

  // Handle search functionality
  const handleSearch = (query) => {
    console.log('Search query:', query);
    // TODO: Implement search functionality
    // This could navigate to a search results page or filter content
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchHomepageContent();
  }, []);

  // Animation variants for the entire page
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <motion.section variants={sectionVariants}>
        <Hero
          heroData={homepageData.hero}
          isLoading={isLoading}
          error={error}
          onSearch={handleSearch}
        />
      </motion.section>

      {/* Activities Section */}
      <motion.section variants={sectionVariants}>
        <Activities
          activitiesData={homepageData.activities}
          isLoading={isLoading}
          error={error}
        />
      </motion.section>

      {/* Outcomes Section */}
      <motion.section variants={sectionVariants}>
        <Outcomes
          outcomesData={homepageData.outcomes}
          isLoading={isLoading}
          error={error}
        />
      </motion.section>

      {/* Monitoring Section */}
      <motion.section variants={sectionVariants}>
        <Monitoring
          monitoringData={homepageData.monitoring}
          isLoading={isLoading}
          error={error}
        />
      </motion.section>

      {/* Ethics Section */}
      <motion.section variants={sectionVariants}>
        <Ethics
          ethicsData={homepageData.ethics}
          isLoading={isLoading}
          error={error}
        />
      </motion.section>

      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white p-4 shadow-lg"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle mr-3"></i>
              <span>
                {error.message} 
                {error.status !== 0 && ` (Status: ${error.status})`}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRetry}
                className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded text-sm transition-colors"
              >
                Retry ({retryCount})
              </button>
              <button
                onClick={() => setError(null)}
                className="text-red-200 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
        >
          <div className="bg-white rounded-lg p-8 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-800">
              Loading homepage content...
            </span>
          </div>
        </motion.div>
      )}

      {/* Debug Info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-sm">
          <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
          <div>Error: {error ? 'Yes' : 'No'}</div>
          <div>Retry Count: {retryCount}</div>
          <div>Sections Loaded: {Object.keys(homepageData).length}</div>
        </div>
      )}
    </motion.div>
  );
};

export default Home;