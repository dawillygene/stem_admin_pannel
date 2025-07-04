import React from 'react';
import { motion } from 'framer-motion';

/**
 * Ethics Section Component
 * Displays ethical principles and guidelines
 * Supports dynamic content from the API
 */
const Ethics = ({ 
  ethicsData, 
  isLoading = false, 
  error = null 
}) => {
  // Default ethics data for loading state
  const defaultEthics = {
    title: 'Ethical Considerations',
    description: 'Our commitment to ethical practices and responsible education development.',
    background_color: 'gray-50',
    ethics_principles: []
  };

  const ethics = ethicsData || defaultEthics;

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...Array(4)].map((_, index) => (
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
            <h3 className="text-xl font-semibold mb-2">Error Loading Ethics</h3>
            <p>{error.message || 'Unable to load ethics content'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-16 px-6 bg-${ethics.background_color}`}>
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
            {isLoading ? 'Loading...' : ethics.title}
          </motion.h2>
          
          {ethics.description && (
            <motion.p
              variants={itemVariants}
              className={`text-xl text-gray-600 max-w-3xl mx-auto ${
                isLoading ? 'animate-pulse bg-gray-300 rounded-lg' : ''
              }`}
            >
              {isLoading ? 'Loading description...' : ethics.description}
            </motion.p>
          )}
        </motion.div>

        {/* Ethics Principles Grid */}
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
            {ethics.ethics_principles.map((principle, index) => (
              <motion.div
                key={principle.id || index}
                variants={itemVariants}
                whileHover="hover"
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                <motion.div
                  variants={cardVariants}
                  className="p-6 h-full flex flex-col"
                >
                  {/* Principle Icon */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mr-4">
                      <i className={`${principle.icon_class} text-white text-xl`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {principle.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        principle.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {principle.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {/* Principle Description */}
                  <p className="text-gray-600 leading-relaxed flex-grow">
                    {principle.description}
                  </p>

                  {/* Additional Information */}
                  {principle.additional_info && (
                    <div className="mt-4 p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                      <p className="text-sm text-indigo-700">
                        {principle.additional_info}
                      </p>
                    </div>
                  )}

                  {/* Guidelines */}
                  {principle.guidelines && principle.guidelines.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Guidelines:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {principle.guidelines.map((guideline, gIndex) => (
                          <li key={gIndex} className="flex items-start">
                            <span className="text-indigo-500 mr-2">•</span>
                            {guideline}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Compliance Level */}
                  {principle.compliance_level && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Compliance Level
                        </span>
                        <span className="text-sm font-semibold text-indigo-600">
                          {principle.compliance_level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${principle.compliance_level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="bg-indigo-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Priority Level */}
                  {principle.priority && (
                    <div className="mt-4 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        principle.priority === 'High' 
                          ? 'bg-red-100 text-red-800'
                          : principle.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {principle.priority} Priority
                      </span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && ethics.ethics_principles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl">
              <i className="fas fa-balance-scale text-4xl mb-4"></i>
              <p>No ethical principles available at the moment.</p>
            </div>
          </div>
        )}

        {/* Ethics Summary */}
        {!isLoading && ethics.ethics_principles.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 bg-white rounded-lg shadow-md p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Ethics Overview
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">
                  {ethics.ethics_principles.filter(p => p.is_active).length}
                </div>
                <div className="text-gray-600">Active Principles</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round(
                    ethics.ethics_principles.reduce((acc, p) => acc + (p.compliance_level || 0), 0) /
                    ethics.ethics_principles.length
                  )}%
                </div>
                <div className="text-gray-600">Avg. Compliance</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {ethics.ethics_principles.filter(p => p.priority === 'High').length}
                </div>
                <div className="text-gray-600">High Priority</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Commitment Statement */}
        {!isLoading && ethics.ethics_principles.length > 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Our Ethical Commitment
              </h3>
              <p className="text-lg opacity-90 mb-6">
                We are committed to maintaining the highest ethical standards in all our educational initiatives, 
                ensuring responsible development and inclusive practices that benefit all stakeholders.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
                  <i className="fas fa-shield-alt mr-2"></i>
                  Integrity
                </div>
                <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
                  <i className="fas fa-users mr-2"></i>
                  Inclusivity
                </div>
                <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
                  <i className="fas fa-leaf mr-2"></i>
                  Sustainability
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Ethics;
