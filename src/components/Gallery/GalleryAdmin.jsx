import { useState, useEffect } from 'react';
import GalleryUploadForm from './GalleryUploadForm';
import GalleryEditForm from './GalleryEditForm';
import GalleryItemsList from './GalleryItemsList';

const GalleryAdmin = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [view, setView] = useState('list'); // 'list', 'add', 'edit'
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock function to load data - in a real app, this would be an API call
  useEffect(() => {
    // Simulating data fetch from API/localStorage
    const storedItems = localStorage.getItem('galleryItems');
    if (storedItems) {
      setGalleryItems(JSON.parse(storedItems));
    }
  }, []);

  // Save to localStorage whenever gallery items change
  useEffect(() => {
    if (galleryItems.length > 0) {
      localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
    }
  }, [galleryItems]);

  const handleAddItem = (newItem) => {
    setIsLoading(true);
    // Generate a new ID based on timestamp
    const id = Date.now();
    const itemWithId = { ...newItem, id };
    
    // Simulate API delay
    setTimeout(() => {
      setGalleryItems([...galleryItems, itemWithId]);
      setView('list');
      setIsLoading(false);
    }, 500);
  };

  const handleUpdateItem = (updatedItem) => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const updatedItems = galleryItems.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      );
      setGalleryItems(updatedItems);
      setView('list');
      setIsLoading(false);
    }, 500);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const filteredItems = galleryItems.filter(item => item.id !== id);
        setGalleryItems(filteredItems);
        setIsLoading(false);
      }, 500);
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setView('edit');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Gallery Admin</h1>
          <div className="space-x-2">
            {view !== 'list' && (
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                onClick={() => setView('list')}
              >
                Back to List
              </button>
            )}
            {view === 'list' && (
              <button 
                className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition-colors"
                onClick={() => setView('add')}
              >
                Add New Item
              </button>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="text-center mt-4">Processing...</p>
            </div>
          </div>
        )}

        {view === 'list' && (
          <GalleryItemsList 
            items={galleryItems} 
            onEdit={handleEditClick} 
            onDelete={handleDeleteItem} 
          />
        )}

        {view === 'add' && (
          <GalleryUploadForm onSubmit={handleAddItem} />
        )}

        {view === 'edit' && selectedItem && (
          <GalleryEditForm 
            item={selectedItem} 
            onSubmit={handleUpdateItem} 
          />
        )}
      </div>
    </div>
  );
};

export default GalleryAdmin;