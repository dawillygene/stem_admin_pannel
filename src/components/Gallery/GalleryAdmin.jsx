import { useState, useEffect } from 'react';
import GalleryUploadForm from './GalleryUploadForm';
import GalleryEditForm from './GalleryEditForm';
import GalleryItemsList from './GalleryItemsList';
import ConfirmationModal from '../ConfirmationModal';
import { galleryApi } from '../../utils/galleryApi';
import { useToast } from '../Toast';

const GalleryAdmin = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [view, setView] = useState('list'); // 'list', 'add', 'edit'
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, itemId: null });
  const { showToast } = useToast();

  // Load gallery items from API
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    setIsLoading(true);
    try {
      const items = await galleryApi.getAllGalleryItems();
      setGalleryItems(items);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      
      let errorMessage = "Failed to load gallery items.";
      
      if (error.response) {
        errorMessage = error.response.data?.message || "Server error occurred.";
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = error.message || "An unexpected error occurred.";
      }
      
      showToast(errorMessage, "error");
      
      // Fallback to localStorage if API fails
      const storedItems = localStorage.getItem('galleryItems');
      if (storedItems) {
        setGalleryItems(JSON.parse(storedItems));
        showToast("Loaded items from local storage.", "info");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async (newItem) => {
    // The onSubmit from GalleryUploadForm already handles API call
    // Just refresh the list and navigate back
    await fetchGalleryItems();
    setView('list');
  };

  const handleUpdateItem = async (updatedItem) => {
    // The onSubmit from GalleryEditForm already handles API call
    // Just refresh the list and navigate back
    await fetchGalleryItems();
    setView('list');
    setSelectedItem(null);
  };

  const handleDeleteItem = (id) => {
    setConfirmModal({ isOpen: true, itemId: id });
  };

  const confirmDelete = async () => {
    const { itemId } = confirmModal;
    setIsLoading(true);
    
    try {
      await galleryApi.deleteGalleryItem(itemId);
      
      // Remove item from local state
      const filteredItems = galleryItems.filter(item => item.id !== itemId);
      setGalleryItems(filteredItems);
      
      showToast("Gallery item deleted successfully!", "success");
      
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      
      let errorMessage = "Failed to delete gallery item.";
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = "Authentication required. Please log in.";
            break;
          case 403:
            errorMessage = "You don't have permission to delete this gallery item.";
            break;
          case 404:
            errorMessage = "Gallery item not found.";
            break;
          default:
            errorMessage = error.response.data?.message || "Server error occurred.";
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = error.message || "An unexpected error occurred.";
      }
      
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
      setConfirmModal({ isOpen: false, itemId: null });
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setView('edit');
  };

  const handleViewIncrement = async (itemId) => {
    try {
      await galleryApi.incrementViewCount(itemId);
      // Optionally update local state to show new view count
      setGalleryItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId 
            ? { ...item, viewCount: (item.viewCount || 0) + 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error incrementing view count:", error);
      // Don't show error toast for view count failures as it's not critical
    }
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
                onClick={() => {
                  setView('list');
                  setSelectedItem(null);
                }}
                disabled={isLoading}
              >
                Back to List
              </button>
            )}
            {view === 'list' && (
              <button 
                className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                onClick={() => setView('add')}
                disabled={isLoading}
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
            onViewIncrement={handleViewIncrement}
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

        {/* Confirmation Modal for Gallery Item Deletion */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ isOpen: false, itemId: null })}
          onConfirm={confirmDelete}
          title="Delete Gallery Item"
          message="Are you sure you want to delete this gallery item? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
};

export default GalleryAdmin;