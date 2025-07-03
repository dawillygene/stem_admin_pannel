import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaInfoCircle, FaStar, FaProjectDiagram, FaHandshake } from 'react-icons/fa';

const AboutContentModal = ({ content, onClose }) => {
  if (!content) return null;

  const { section, item } = content;

  const renderContent = () => {
    switch (section) {
      case 'background':
        return <BackgroundContent data={item} />;
      case 'benefits':
        // Check if item is a single benefit or array of benefits
        if (item && !Array.isArray(item) && item.title) {
          return <SingleBenefitContent data={item} />;
        }
        return <BenefitsContent data={item} />;
      case 'justification':
        return <JustificationContent data={item} />;
      case 'objectives':
        // Check if item is a single objective or full objectives structure
        if (item && !item.specificObjectives && item.title && item.description) {
          return <SingleObjectiveContent data={item} />;
        }
        return <ObjectivesContent data={item} />;
      default:
        return <div>Content not available</div>;
    }
  };

  const getSectionIcon = () => {
    switch (section) {
      case 'background':
        return <FaInfoCircle className="text-[#0066CC]" />;
      case 'benefits':
        return <FaStar className="text-[#0066CC]" />;
      case 'justification':
        return <FaProjectDiagram className="text-[#0066CC]" />;
      case 'objectives':
        return <FaHandshake className="text-[#0066CC]" />;
      default:
        return <FaInfoCircle className="text-[#0066CC]" />;
    }
  };

  const getSectionTitle = () => {
    switch (section) {
      case 'background':
        return 'Background Information';
      case 'benefits':
        // Check if viewing individual benefit or all benefits
        if (item && !Array.isArray(item) && item.title) {
          return `Benefit: ${item.title}`;
        }
        return 'STEM Benefits';
      case 'justification':
        return 'Project Justification';
      case 'objectives':
        // Check if viewing individual objective or all objectives
        if (item && !item.specificObjectives && item.title && item.description) {
          return `Objective: ${item.title}`;
        }
        return 'Project Objectives';
      default:
        return 'Content';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0066CC] to-[#004c99] p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {getSectionIcon()}
                <h2 className="text-2xl font-bold ml-3">{getSectionTitle()}</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-2"
              >
                <FaTimes size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {renderContent()}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Background Content Component
const BackgroundContent = ({ data }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{data?.title}</h3>
      <p className="text-gray-600 leading-relaxed">{data?.mainContent}</p>
    </div>

    {data?.ctaText && (
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Call to Action</h4>
        <p className="text-gray-600">{data.ctaText}</p>
        {data.ctaLink && (
          <a 
            href={data.ctaLink}
            className="text-[#0066CC] hover:underline mt-2 inline-block"
          >
            {data.ctaLink}
          </a>
        )}
      </div>
    )}

    {data?.sections && data.sections.length > 0 && (
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Sections</h4>
        <div className="space-y-4">
          {data.sections.map((section, index) => (
            <div key={section.id || index} className="border-l-4 border-[#0066CC] pl-4">
              <h5 className="font-semibold text-gray-800 mb-2">{section.title}</h5>
              <p className="text-gray-600">{section.content}</p>
              <div className="text-sm text-gray-500 mt-2">
                Display Order: {section.displayOrder || index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Benefits Content Component
const BenefitsContent = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return <div className="text-gray-500">No benefits data available</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        All STEM Benefits ({data.length})
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((benefit, index) => (
          <div key={benefit.id || index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-[#0066CC] rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                {benefit.displayOrder || index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <span className={`px-2 py-1 rounded-full ${
                    benefit.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {benefit.isActive ? 'Active' : 'Inactive'}
                  </span>
                  {benefit.icon && (
                    <span className="ml-2">Icon: {benefit.icon}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Single Benefit Content Component (for individual benefit viewing)
// Author: Elia William Mariki (@dawillygene) - July 3, 2025
const SingleBenefitContent = ({ data }) => {
  if (!data) {
    return <div className="text-gray-500">No benefit data available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-lg font-bold mr-4">
            {data.displayOrder || 1}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">{data.title}</h3>
            <p className="text-gray-600 text-lg leading-relaxed">{data.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Status</h4>
          <span className={`px-3 py-1 rounded-full text-sm ${
            data.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {data.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Display Order</h4>
          <p className="text-gray-600">Position {data.displayOrder || 'Not set'}</p>
        </div>
        
        {data.icon && (
          <div className="bg-gray-50 rounded-lg p-4 col-span-2">
            <h4 className="font-semibold text-gray-800 mb-2">Icon</h4>
            <p className="text-gray-600">{data.icon}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Justification Content Component
const JustificationContent = ({ data }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{data?.title}</h3>
      <p className="text-gray-600 leading-relaxed">{data?.content}</p>
    </div>

    {data?.conclusion && (
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Conclusion</h4>
        <p className="text-gray-600">{data.conclusion}</p>
      </div>
    )}

    {data?.references && data.references.length > 0 && (
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">References</h4>
        <div className="space-y-3">
          {data.references.map((ref, index) => (
            <div key={ref.id || index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-800">{ref.title}</h5>
                  <p className="text-gray-600 text-sm mt-1">
                    {ref.author} ({ref.publicationDate})
                  </p>
                  {ref.url && (
                    <a 
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0066CC] hover:underline text-sm mt-2 inline-block"
                    >
                      View Source
                    </a>
                  )}
                </div>
                <div className="text-xs text-gray-500 ml-4">
                  Order: {ref.displayOrder || index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Objectives Content Component
const ObjectivesContent = ({ data }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{data?.title}</h3>
      <p className="text-gray-600 leading-relaxed">{data?.introduction}</p>
    </div>

    {data?.specificObjectives && data.specificObjectives.length > 0 && (
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Specific Objectives ({data.specificObjectives.length})
        </h4>
        <div className="space-y-4">
          {data.specificObjectives.map((objective, index) => (
            <div key={objective.id || index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#0066CC] rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                  {objective.displayOrder || index + 1}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-800 mb-2">{objective.title}</h5>
                  <p className="text-gray-600 text-sm">{objective.description}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <span className={`px-2 py-1 rounded-full ${
                      objective.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {objective.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {data?.conclusion && (
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Conclusion</h4>
        <p className="text-gray-600">{data.conclusion}</p>
      </div>
    )}
  </div>
);

// Single Objective Content Component (for individual objective viewing)
// Author: Elia William Mariki (@dawillygene) - July 3, 2025
const SingleObjectiveContent = ({ data }) => {
  if (!data) {
    return <div className="text-gray-500">No objective data available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold mr-4">
            {data.displayOrder || 1}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">{data.title}</h3>
            <p className="text-gray-600 text-lg leading-relaxed">{data.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Status</h4>
          <span className={`px-3 py-1 rounded-full text-sm ${
            data.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {data.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Display Order</h4>
          <p className="text-gray-600">Position {data.displayOrder || 'Not set'}</p>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h4 className="font-semibold text-gray-800 mb-2">📝 Note</h4>
        <p className="text-gray-600 text-sm">
          This is a specific objective that contributes to the overall project goals. 
          Each objective is designed to be measurable and achievable within the project timeline.
        </p>
      </div>
    </div>
  );
};

export default AboutContentModal;
