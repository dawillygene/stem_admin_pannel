import React from 'react';
import { motion } from 'framer-motion';

/**
 * Activities Section Component
 * Displays the main activities of the project with icons and descriptions
 * Supports dynamic content from the API
 */
const Activities = ({ 
  activitiesData, 
  isLoading = false, 
  error = null 
}) => {
  // Default activities data for loading state
  const defaultActivities = {
    title: 'Main Activities of the Project',
    subtitle: '',
    background_color: 'white',
    activities: []
  };

  const activities = activitiesData || defaultActivities;

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
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Color mapping for activity cards
  const colorClasses = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-orange-500 text-white',
    tertiary: 'bg-green-500 text-white',
    success: 'bg-green-600 text-white',
    info: 'bg-blue-400 text-white',
    warning: 'bg-yellow-500 text-white',
    danger: 'bg-red-500 text-white'
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
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
            <h3 className="text-xl font-semibold mb-2">Error Loading Activities</h3>
            <p>{error.message || 'Unable to load activities content'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-16 px-6 bg-${activities.background_color}`}>
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
            {isLoading ? 'Loading...' : activities.title}
          </motion.h2>
          
          {activities.subtitle && (
            <motion.p
              variants={itemVariants}
              className={`text-xl text-gray-600 max-w-3xl mx-auto ${
                isLoading ? 'animate-pulse bg-gray-300 rounded-lg' : ''
              }`}
            >
              {isLoading ? 'Loading subtitle...' : activities.subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Activities Grid */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {activities.activities.map((activity, index) => (
              <motion.div
                key={activity.id || index}
                variants={itemVariants}
                whileHover="hover"
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              >
                <motion.div
                  variants={cardVariants}
                  className="p-6 h-full flex flex-col"
                >
                  {/* Activity Icon */}
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      colorClasses[activity.color] || colorClasses.primary
                    }`}>
                      <i className={`${activity.icon_class} text-2xl`}></i>
                    </div>
                  </div>

                  {/* Activity Title */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                    {activity.title}
                  </h3>

                  {/* Activity Description */}
                  <p className="text-gray-600 text-center leading-relaxed flex-grow">
                    {activity.description}
                  </p>

                  {/* Additional Info */}
                  {activity.additional_info && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {activity.additional_info}
                      </p>
                    </div>
                  )}

                  {/* Link Button */}
                  {activity.link && (
                    <div className="mt-4 text-center">
                      <a
                        href={activity.link}
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                          colorClasses[activity.color] || colorClasses.primary
                        } hover:opacity-90`}
                      >
                        Learn More
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {activity.is_featured && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && activities.activities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl">
              <i className="fas fa-tasks text-4xl mb-4"></i>
              <p>No activities available at the moment.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Activities;
