import { useState } from 'react';

const GalleryPreview = ({ items }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter categories
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'campus', label: 'Campus Life' },
    { id: 'stem', label: 'STEM Education' },
    { id: 'labs', label: 'Laboratories' },
    { id: 'teacher', label: 'Teacher Training' },
    { id: 'community', label: 'Community Engagement' }
  ];

  // Filter handler
  const filteredItems = activeFilter === 'all' 
    ? items 
    : items.filter(item => item.category.includes(activeFilter));

  return (
    <div>
      {/* Gallery Preview Header */}
      <div className="bg-white py-6 mb-6 rounded-lg shadow-md">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-4">Gallery Preview</h2>
          <p className="text-gray-600">
            This is how your gallery will appear to visitors on the website.
          </p>
        </div>
      </div>

      {/* Gallery Preview Content */}
      <div className="bg-gray-50 py-8 rounded-lg shadow-md">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full border font-medium transition-all ${
                  activeFilter === category.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-primary border-primary hover:bg-primary hover:text-white'
                }`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No gallery items found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map(item => (
                <div key={item.id} className="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => {
                        const getTagColor = (tag) => {
                          switch(tag) {
                            case 'Campus Life': return '#0066CC';
                            case 'STEM Education': return '#FD9148';
                            case 'Laboratories': return '#FFAD03';
                            case 'Teacher Training': return '#0066CC';
                            case 'Community Engagement': return '#FD9148';
                            default: return '#0066CC';
                          }
                        };
                        
                        return (
                          <span
                            key={index}
                            className="text-xs text-white px-2 py-1 rounded-full"
                            style={{ backgroundColor: getTagColor(tag) }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPreview;