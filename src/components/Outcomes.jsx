import React from 'react';
import { motion } from 'framer-motion';

/**
 * Outcomes Section Component
 * Displays the proposed project outcomes with progress metrics
 * Supports dynamic content from the API
 */
const Outcomes = ({ 
  outcomesData, 
  isLoading = false, 
  error = null 
}) => {
  // Default outcomes data for loading state
  const defaultOutcomes = {
    title: 'Proposed Project Outcomes',
    description: 'After the project implementation, it is expected to yield the following outcomes:',
    background_color: 'gray-100',
    content_background: 'white',
    outcomes: []
  };

  const outcomes = outcomesData || defaultOutcomes;

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

  const progressVariants = {
    initial: { width: 0 },
    animate: (percentage) => ({
      width: `${percentage}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    })
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-4"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="py-16 px-6 bg-red-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Error Loading Outcomes</h3>
            <p>{error.message || 'Unable to load outcomes content'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-16 px-6 bg-${outcomes.background_color}`}>
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
            {isLoading ? 'Loading...' : outcomes.title}
          </motion.h2>
          
          {outcomes.description && (
            <motion.p
              variants={itemVariants}
              className={`text-xl text-gray-600 max-w-3xl mx-auto ${
                isLoading ? 'animate-pulse bg-gray-300 rounded-lg' : ''
              }`}
            >
              {isLoading ? 'Loading description...' : outcomes.description}
            </motion.p>
          )}
        </motion.div>

        {/* Outcomes Grid */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {outcomes.outcomes.map((outcome, index) => (
              <motion.div
                key={outcome.id || index}
                variants={itemVariants}
                whileHover="hover"
                className={`bg-${outcomes.content_background} rounded-lg shadow-lg overflow-hidden`}
              >
                <motion.div
                  variants={cardVariants}
                  className="p-6 h-full"
                >
                  {/* Outcome Header */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                      <i className={`${outcome.icon_class} text-white text-xl`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {outcome.title}
                      </h3>
                      {outcome.metrics && (
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium text-blue-600">
                            {outcome.metrics.current}
                          </span>
                          <span className="mx-1">/</span>
                          <span className="font-medium text-gray-800">
                            {outcome.metrics.target}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Outcome Description */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {outcome.description}
                  </p>

                  {/* Progress Bar */}
                  {outcome.metrics && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Progress
                        </span>
                        <span className="text-sm font-semibold text-blue-600">
                          {outcome.metrics.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          variants={progressVariants}
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true }}
                          custom={outcome.metrics.percentage}
                          className="bg-blue-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Outcome Status */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        outcome.is_published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {outcome.is_published ? 'Active' : 'Pending'}
                      </span>
                    </div>
                    {outcome.metrics && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {outcome.metrics.current}
                        </div>
                        <div className="text-xs text-gray-500">
                          Current
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order indicator */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">
                      {outcome.order}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && outcomes.outcomes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl">
              <i className="fas fa-target text-4xl mb-4"></i>
              <p>No outcomes available at the moment.</p>
            </div>
          </div>
        )}

        {/* Summary Statistics */}
        {!isLoading && outcomes.outcomes.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Overall Progress Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {outcomes.outcomes.filter(o => o.is_published).length}
                </div>
                <div className="text-gray-600">Active Outcomes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {outcomes.outcomes.reduce((acc, o) => acc + (o.metrics?.percentage || 0), 0) / outcomes.outcomes.length}%
                </div>
                <div className="text-gray-600">Average Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {outcomes.outcomes.length}
                </div>
                <div className="text-gray-600">Total Outcomes</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Outcomes;
