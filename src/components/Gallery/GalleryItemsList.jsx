import { useState } from 'react';

const GalleryItemsList = ({ items, onEdit, onDelete, onViewIncrement }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Get unique categories for filter dropdown
  const categories = ['', ...new Set(items.map(item => {
    // Handle both old and new data structures
    if (typeof item.category === 'string') {
      return item.category;
    } else if (item.category && item.category.id) {
      return item.category.id;
    }
    return '';
  }).filter(Boolean))];

  // Filter and search functionality
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let itemCategory;
    if (typeof item.category === 'string') {
      itemCategory = item.category;
    } else if (item.category && item.category.id) {
      itemCategory = item.category.id;
    } else {
      itemCategory = '';
    }
    
    const matchesCategory = filterCategory === '' || itemCategory === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

  const getTagsArray = (tags) => {
    if (!tags || !Array.isArray(tags)) return [];
    
    // Handle both old format (array of strings) and new format (array of objects with name property)
    return tags.map(tag => {
      if (typeof tag === 'string') {
        return tag;
      } else if (tag && tag.name) {
        return tag.name;
      }
      return '';
    }).filter(Boolean);
  };

  const handleImageClick = (item) => {
    if (onViewIncrement) {
      onViewIncrement(item.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by title or description..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.filter(cat => cat !== '').map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No gallery items found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="h-20 w-20 object-cover rounded-md cursor-pointer hover:opacity-75 transition-opacity"
                      onClick={() => handleImageClick(item)}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-2">{item.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {getCategoryDisplay(item.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {getTagsArray(item.tags).slice(0, 3).map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800"
                        >
                          {tag}
                        </span>
                      ))}
                      {getTagsArray(item.tags).length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          +{getTagsArray(item.tags).length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.viewCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(item.createdAt)}
                    {item.createdBy && (
                      <div className="text-xs text-gray-500">
                        by {item.createdBy.name || item.createdBy.username}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {item.featured && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Published
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3 disabled:opacity-50"
                      title="Edit gallery item"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      title="Delete gallery item"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {filteredItems.length > 0 && (
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <div>
            Showing {filteredItems.length} of {items.length} items
          </div>
          <div>
            {items.filter(item => item.featured).length} featured items
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryItemsList;