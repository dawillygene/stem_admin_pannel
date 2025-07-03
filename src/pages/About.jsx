import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaChalkboardTeacher, 
  FaUsersCog, 
  FaHandsHelping, 
  FaFlask,
  FaSpinner,
  FaExclamationTriangle 
} from 'react-icons/fa';
import { getAboutContent } from '../utils/aboutApi';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaSpinner className="animate-spin text-4xl text-[#0066CC] mx-auto mb-4" />
          <p className="text-gray-600">Loading about content...</p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          className="text-center max-w-md mx-auto p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Content</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchAboutData}
            className="px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  const { background, benefits, justification, objectives } = aboutData || {};

  // Icon mapping for objectives
  const objectiveIcons = {
    'Teacher Training': FaChalkboardTeacher,
    'Decision-Maker Involvement': FaUsersCog,
    'Community Engagement': FaHandsHelping,
    'Laboratory Enhancement': FaFlask
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Background */}
      {background && (
        <motion.section
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                {background.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {background.mainContent}
              </p>
              {background.ctaText && background.ctaLink && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <a
                    href={background.ctaLink}
                    className="inline-block px-8 py-3 bg-[#0066CC] text-white font-semibold rounded-lg hover:bg-[#0056b3] transition-colors"
                  >
                    {background.ctaText}
                  </a>
                </motion.div>
              )}
            </div>

            {/* Background sections */}
            {background.sections && background.sections.length > 0 && (
              <div className="grid gap-8 mt-16">
                {background.sections
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((section, index) => (
                    <motion.div
                      key={section.id}
                      className="bg-gray-50 rounded-lg p-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {section.content}
                      </p>
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* STEM Benefits Section */}
      {benefits && benefits.length > 0 && (
        <motion.section
          className="py-16 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                STEM Education Benefits
              </h2>
              <p className="text-lg text-gray-600">
                Discover the transformative power of STEM education
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits
                .filter(benefit => benefit.isActive)
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((benefit, index) => (
                  <motion.div
                    key={benefit.id}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <div className="flex items-start space-x-4">
                      <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Project Justification Section */}
      {justification && (
        <motion.section
          className="py-16 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                {justification.title}
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <motion.p
                  className="text-gray-600 leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {justification.content}
                </motion.p>
                
                {justification.conclusion && (
                  <motion.p
                    className="text-gray-600 leading-relaxed mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {justification.conclusion}
                  </motion.p>
                )}
              </div>

              {/* References */}
              {justification.references && justification.references.length > 0 && (
                <motion.div
                  className="mt-12 p-6 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">References</h3>
                  <div className="space-y-3">
                    {justification.references
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map((ref) => (
                        <div key={ref.id} className="text-gray-600">
                          <p>
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
                      ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* Project Objectives Section */}
      {objectives && (
        <motion.section
          className="py-16 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {objectives.title}
              </h2>
              {objectives.introduction && (
                <motion.p
                  className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {objectives.introduction}
                </motion.p>
              )}
            </div>

            {/* Specific Objectives */}
            {objectives.specificObjectives && objectives.specificObjectives.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {objectives.specificObjectives
                  .filter(obj => obj.isActive)
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((objective, index) => {
                    const IconComponent = objectiveIcons[objective.title] || FaCheckCircle;
                    
                    return (
                      <motion.div
                        key={objective.id}
                        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                      >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0066CC]/10 rounded-full mb-4">
                          <IconComponent className="text-2xl text-[#0066CC]" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          {objective.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {objective.description}
                        </p>
                      </motion.div>
                    );
                  })}
              </div>
            )}

            {/* Conclusion */}
            {objectives.conclusion && (
              <motion.div
                className="text-center max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <p className="text-lg text-gray-600 leading-relaxed italic">
                  {objectives.conclusion}
                </p>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* Footer CTA */}
      <motion.section
        className="py-16 bg-[#0066CC]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Be part of transforming science education in Tanzania. Together, we can build a brighter future through STEM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 bg-white text-[#0066CC] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Involved
            </a>
            <a
              href="/gallery"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0066CC] transition-colors"
            >
              View Our Work
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
