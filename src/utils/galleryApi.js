import API from './axios';

// Gallery API utility functions
export const galleryApi = {
  // Upload image to Cloudinary (reusing the same pattern from BlogUpload)
  uploadImageToCloudinary: async (file) => {
    try {
      // Check environment variables
      if (!import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || !import.meta.env.VITE_CLOUDINARY_CLOUD_NAME) {
        throw new Error("Cloudinary configuration missing. Check environment variables.");
      }

      // Convert image to WebP format with compression
      const optimizedFile = await convertToWebP(file);

      const formData = new FormData();
      formData.append("file", optimizedFile);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "STEM/gallery_images");
      formData.append("quality", "auto:good");
      formData.append("fetch_format", "auto");
      formData.append("flags", "progressive");

      const uploadUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await response.json();
      return data.secure_url;

    } catch (error) {
      throw error;
    }
  },

  // Create gallery item
  createGalleryItem: async (galleryData) => {
    try {
      const response = await API.post('/gallery', galleryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all gallery items
  getAllGalleryItems: async () => {
    try {
      const response = await API.get('/gallery');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get gallery item by ID
  getGalleryItemById: async (id) => {
    try {
      const response = await API.get(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get gallery items by category
  getGalleryItemsByCategory: async (categoryId) => {
    try {
      const response = await API.get(`/gallery/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get gallery items by user
  getGalleryItemsByUser: async (userId) => {
    try {
      const response = await API.get(`/gallery/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get gallery items by tag
  getGalleryItemsByTag: async (tag) => {
    try {
      const response = await API.get(`/gallery/tag/${encodeURIComponent(tag)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get featured gallery items
  getFeaturedGalleryItems: async () => {
    try {
      const response = await API.get('/gallery/featured');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update gallery item
  updateGalleryItem: async (id, galleryData) => {
    try {
      const response = await API.put(`/gallery/${id}`, galleryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete gallery item
  deleteGalleryItem: async (id) => {
    try {
      const response = await API.delete(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Increment view count
  incrementViewCount: async (id) => {
    try {
      const response = await API.post(`/gallery/${id}/view`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Convert image to WebP format for smaller file size
const convertToWebP = (file) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate optimal dimensions (max 1920px width, maintain aspect ratio)
      const maxWidth = 1920;
      const maxHeight = 1080;
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          const webpFile = new File([blob], `${file.name.split('.')[0]}.webp`, {
            type: 'image/webp',
            lastModified: Date.now()
          });
          resolve(webpFile);
        },
        'image/webp',
        0.85 // 85% quality for good balance between size and quality
      );
    };
    
    img.src = URL.createObjectURL(file);
  });
};

export default galleryApi;