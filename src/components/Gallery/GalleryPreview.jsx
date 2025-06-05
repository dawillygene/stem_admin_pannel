import { useState } from 'react';
import { galleryApi } from '../../utils/galleryApi';

const GalleryPreview = ({ items }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter categories - updated to match API structure
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'campus', label: 'Campus Life' },
    { id: 'science', label: 'Science' },
    { id: 'technology', label: 'Technology' },
    { id: 'labs', label: 'Laboratories' },
    { id: 'teacher', label: 'Teacher Training' },
    { id: 'community', label: 'Community Engagement' }
  ];

  // Filter handler - updated to handle new data structure
  const filteredItems = activeFilter === 'all' 
    ? items 
    : items.filter(item => {
        // Handle both old and new category structures
        const categoryId = typeof item.category === 'string' 
          ? item.category 
          : item.category?.id;
        return categoryId === activeFilter;
      });

  // Handle image click to increment view count
  const handleImageClick = async (item) => {
    try {
      await galleryApi.incrementViewCount(item.id);
      // Note: In a real app, you might want to update the local state
      // or show a toast notification
    } catch (error) {
      console.error("Error incrementing view count:", error);
      // Don't show error to user as this is not critical
    }
  };

  // Get category display name
  const getCategoryDisplay = (category) => {
    if (typeof category === 'string') {
      return category.charAt(0).toUpperCase() + category.slice(1);
    } else if (category && category.name) {
      return category.name;
    } else if (category && category.id) {
      return category.id.charAt(0).toUpperCase() + category.id.slice(1);
    }
    return 'Unknown';
  };

  // Get tags array from different formats
  const getTagsArray = (tags) => {
    if (!tags || !Array.isArray(tags)) return [];
    
    return tags.map(tag => {
      if (typeof tag === 'string') {
        return tag;
      } else if (tag && tag.name) {
        return tag.name;
      }
      return '';
    }).filter(Boolean);
  };

  // Get tag color based on tag name
  const getTagColor = (tag) => {
    const tagLower = tag.toLowerCase();
    switch(true) {
      case tagLower.includes('campus'):
      case tagLower.includes('life'):
        return '#0066CC';
      case tagLower.includes('stem'):
      case tagLower.includes('education'):
      case tagLower.includes('science'):
        return '#FD9148';
      case tagLower.includes('lab'):
      case tagLower.includes('technology'):
        return '#FFAD03';
      case tagLower.includes('teacher'):
      case tagLower.includes('training'):
        return '#0066CC';
      case tagLower.includes('community'):
      case tagLower.includes('engagement'):
        return '#FD9148';
      default:
        return '#0066CC';
    }
  };

  return (
    <div>
      {/* Gallery Preview Header */}
      <div className="bg-white py-6 mb-6 rounded-lg shadow-md">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-4">Gallery Preview</h2>
          <p className="text-gray-600">
            This is how your gallery will appear to visitors on the website.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Total Items: {items.length} | Featured: {items.filter(item => item.featured).length}
          </div>
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
                {category.id !== 'all' && (
                  <span className="ml-1 text-xs opacity-75">
                    ({items.filter(item => {
                      const categoryId = typeof item.category === 'string' 
                        ? item.category 
                        : item.category?.id;
                      return categoryId === category.id;
                    }).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-gray-400 text-4xl mb-4">📷</div>
              <p className="text-gray-500 text-lg">No gallery items found in this category.</p>
              <p className="text-gray-400 text-sm mt-2">
                {activeFilter === 'all' 
                  ? 'Add some gallery items to see them here.' 
                  : 'Try selecting a different category or add items to this category.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map(item => (
                <div key={item.id} className="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                      onClick={() => handleImageClick(item)}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                      }}
                    />
                    {/* Featured Badge */}
                    {item.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                    {/* View Count */}
                    {item.viewCount > 0 && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                          👁 {item.viewCount}
                        </span>
                      </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
                        {getCategoryDisplay(item.category)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {item.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {getTagsArray(item.tags).slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs text-white px-2 py-1 rounded-full"
                          style={{ backgroundColor: getTagColor(tag) }}
                        >
                          {tag}
                        </span>
                      ))}
                      {getTagsArray(item.tags).length > 4 && (
                        <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                          +{getTagsArray(item.tags).length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                      <div>
                        {item.createdAt && (
                          <span>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div>
                        {item.createdBy && (
                          <span>
                            by {item.createdBy.name || item.createdBy.username}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Footer */}
          {filteredItems.length > 0 && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-4 text-sm text-gray-600 bg-white px-6 py-3 rounded-full shadow-md">
                <span>
                  Showing {filteredItems.length} of {items.length} items
                </span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>
                  {filteredItems.filter(item => item.featured).length} featured
                </span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>
                  {filteredItems.reduce((total, item) => total + (item.viewCount || 0), 0)} total views
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPreview;