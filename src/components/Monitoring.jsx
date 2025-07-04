import React from 'react';
import { motion } from 'framer-motion';

/**
 * Monitoring Section Component
 * Displays monitoring and evaluation information
 * Supports dynamic content from the API
 */
const Monitoring = ({ 
  monitoringData, 
  isLoading = false, 
  error = null 
}) => {
  // Default monitoring data for loading state
  const defaultMonitoring = {
    title: 'Monitoring and Evaluation',
    description: 'Our comprehensive monitoring and evaluation framework ensures project success and accountability.',
    background_color: 'white',
    monitoring_aspects: []
  };

  const monitoring = monitoringData || defaultMonitoring;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-6 bg-gray-300 rounded mb-3"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="py-16 px-6 bg-red-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Error Loading Monitoring</h3>
            <p>{error.message || 'Unable to load monitoring content'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-16 px-6 bg-${monitoring.background_color}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-4xl md:text-5xl font-bold text-gray-800 mb-6 ${
              isLoading ? 'animate-pulse bg-gray-300 rounded-lg' : ''
            }`}
          >
            {isLoading ? 'Loading...' : monitoring.title}
          </motion.h2>
          
          {monitoring.description && (
            <motion.p
              variants={itemVariants}
              className={`text-xl text-gray-600 max-w-3xl mx-auto ${
                isLoading ? 'animate-pulse bg-gray-300 rounded-lg' : ''
              }`}
            >
              {isLoading ? 'Loading description...' : monitoring.description}
            </motion.p>
          )}
        </motion.div>

        {/* Monitoring Aspects Grid */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {monitoring.monitoring_aspects.map((aspect, index) => (
              <motion.div
                key={aspect.id || index}
                variants={itemVariants}
                whileHover="hover"
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                <motion.div
                  variants={cardVariants}
                  className="p-6 h-full flex flex-col"
                >
                  {/* Aspect Icon */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <i className={`${aspect.icon_class} text-white text-xl`}></i>
                    </div>
                  </div>

                  {/* Aspect Title */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                    {aspect.title}
                  </h3>

                  {/* Aspect Description */}
                  <p className="text-gray-600 text-center leading-relaxed flex-grow">
                    {aspect.description}
                  </p>

                  {/* Status Indicator */}
                  <div className="mt-4 flex items-center justify-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      aspect.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {aspect.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Additional Info */}
                  {aspect.additional_info && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {aspect.additional_info}
                      </p>
                    </div>
                  )}

                  {/* Metrics */}
                  {aspect.metrics && (
                    <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-blue-600">
                          {aspect.metrics.current || 0}
                        </div>
                        <div className="text-xs text-gray-600">
                          Current
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">
                          {aspect.metrics.target || 0}
                        </div>
                        <div className="text-xs text-gray-600">
                          Target
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && monitoring.monitoring_aspects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl">
              <i className="fas fa-chart-line text-4xl mb-4"></i>
              <p>No monitoring aspects available at the moment.</p>
            </div>
          </div>
        )}

        {/* Key Performance Indicators */}
        {!isLoading && monitoring.monitoring_aspects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Key Performance Indicators
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {monitoring.monitoring_aspects.filter(a => a.is_active).length}
                </div>
                <div className="text-gray-600">Active Aspects</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {monitoring.monitoring_aspects.reduce((acc, a) => acc + (a.metrics?.current || 0), 0)}
                </div>
                <div className="text-gray-600">Total Progress</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {monitoring.monitoring_aspects.reduce((acc, a) => acc + (a.metrics?.target || 0), 0)}
                </div>
                <div className="text-gray-600">Total Targets</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round(
                    (monitoring.monitoring_aspects.reduce((acc, a) => acc + (a.metrics?.current || 0), 0) /
                     monitoring.monitoring_aspects.reduce((acc, a) => acc + (a.metrics?.target || 1), 0)) * 100
                  )}%
                </div>
                <div className="text-gray-600">Completion Rate</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        {!isLoading && monitoring.monitoring_aspects.length > 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Stay Updated on Our Progress
              </h3>
              <p className="text-gray-600 mb-6">
                Our monitoring system provides real-time insights into project performance and outcomes.
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200">
                View Detailed Reports
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Monitoring;
