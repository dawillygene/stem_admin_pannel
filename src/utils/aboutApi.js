import API from './axios.js';

/**
 * About Content API Service
 * Handles all About page content related API calls
 * Integrates with backend About API endpoints
 */

// Get all about content
export const getAboutContent = async () => {
  try {
    const response = await API.get('/about-content');
    return response.data;
  } catch (error) {
    console.error('Error fetching about content:', error);
    throw error;
  }
};

// Get specific section content
export const getAboutSection = async (section) => {
  try {
    if (!section) {
      throw new Error('Section parameter is required');
    }
    
    const response = await API.get(`/about-content/${section}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${section} section:`, error);
    throw error;
  }
};

// Update background section
export const updateBackground = async (data) => {
  try {
    // Validate required fields
    if (!data.title || !data.mainContent) {
      throw new Error('Title and main content are required');
    }
    
    const response = await API.put('/about-content/background', data);
    return response.data;
  } catch (error) {
    console.error('Error updating background:', error);
    throw error;
  }
};

// Create new background section
export const createBackgroundSection = async (data) => {
  try {
    // Validate required fields
    if (!data.title || !data.content) {
      throw new Error('Title and content are required');
    }
    
    const sectionData = {
      title: data.title.trim(),
      content: data.content.trim(),
      displayOrder: data.displayOrder || 999,
      isActive: data.isActive !== undefined ? data.isActive : true
    };
    
    const response = await API.post('/about-content/background/sections', sectionData);
    return response.data;
  } catch (error) {
    console.error('Error creating background section:', error);
    throw error;
  }
};

// Update background section
export const updateBackgroundSection = async (id, data) => {
  try {
    if (!id) {
      throw new Error('Background section ID is required');
    }
    
    if (!data.title || !data.content) {
      throw new Error('Title and content are required');
    }
    
    const sectionData = {
      title: data.title.trim(),
      content: data.content.trim(),
      displayOrder: data.displayOrder,
      isActive: data.isActive
    };
    
    const response = await API.put(`/about-content/background/sections/${id}`, sectionData);
    return response.data;
  } catch (error) {
    console.error('Error updating background section:', error);
    throw error;
  }
};

// Delete background section
export const deleteBackgroundSection = async (id) => {
  try {
    if (!id) {
      throw new Error('Background section ID is required');
    }
    
    const response = await API.delete(`/about-content/background/sections/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting background section:', error);
    throw error;
  }
};

// Reorder background sections
export const reorderBackgroundSections = async (sectionsOrder) => {
  try {
    if (!sectionsOrder || !Array.isArray(sectionsOrder)) {
      throw new Error('Sections order array is required');
    }
    
    const response = await API.put('/about-content/background/sections/reorder', {
      sectionsOrder: sectionsOrder
    });
    return response.data;
  } catch (error) {
    console.error('Error reordering background sections:', error);
    throw error;
  }
};

// Create new benefit
export const createBenefit = async (data) => {
  try {
    // Validate required fields
    if (!data.title || !data.description) {
      throw new Error('Title and description are required');
    }
    
    const benefitData = {
      title: data.title.trim(),
      description: data.description.trim(),
      icon: data.icon || 'fas fa-check-circle',
      displayOrder: data.displayOrder || 999,
      isActive: data.isActive !== undefined ? data.isActive : true
    };
    
    const response = await API.post('/about-content/benefits', benefitData);
    return response.data;
  } catch (error) {
    console.error('Error creating benefit:', error);
    throw error;
  }
};

// Update benefit
export const updateBenefit = async (id, data) => {
  try {
    if (!id) {
      throw new Error('Benefit ID is required');
    }
    
    if (!data.title || !data.description) {
      throw new Error('Title and description are required');
    }
    
    const benefitData = {
      title: data.title.trim(),
      description: data.description.trim(),
      icon: data.icon || 'fas fa-check-circle',
      displayOrder: data.displayOrder,
      isActive: data.isActive
    };
    
    const response = await API.put(`/about-content/benefits/${id}`, benefitData);
    return response.data;
  } catch (error) {
    console.error('Error updating benefit:', error);
    throw error;
  }
};

// Delete benefit
export const deleteBenefit = async (id) => {
  try {
    if (!id) {
      throw new Error('Benefit ID is required');
    }
    
    const response = await API.delete(`/about-content/benefits/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting benefit:', error);
    throw error;
  }
};

// Update justification section
export const updateJustification = async (data) => {
  try {
    // Validate required fields
    if (!data.title || !data.content) {
      throw new Error('Title and content are required');
    }
    
    const justificationData = {
      title: data.title.trim(),
      content: data.content.trim(),
      conclusion: data.conclusion?.trim() || '',
      references: data.references || []
    };
    
    const response = await API.put('/about-content/justification', justificationData);
    return response.data;
  } catch (error) {
    console.error('Error updating justification:', error);
    throw error;
  }
};

// Update objectives section
export const updateObjectives = async (data) => {
  try {
    // Validate required fields
    if (!data.title || !data.introduction) {
      throw new Error('Title and introduction are required');
    }
    
    const objectivesData = {
      title: data.title.trim(),
      introduction: data.introduction.trim(),
      conclusion: data.conclusion?.trim() || '',
      specificObjectives: data.specificObjectives || []
    };
    
    const response = await API.put('/about-content/objectives', objectivesData);
    return response.data;
  } catch (error) {
    console.error('Error updating objectives:', error);
    throw error;
  }
};

// Create new specific objective
export const createSpecificObjective = async (data) => {
  try {
    // Validate required fields
    if (!data.title || !data.description) {
      throw new Error('Title and description are required');
    }
    
    const objectiveData = {
      title: data.title.trim(),
      description: data.description.trim(),
      displayOrder: data.displayOrder || 999,
      isActive: data.isActive !== undefined ? data.isActive : true
    };
    
    const response = await API.post('/about-content/objectives', objectiveData);
    return response.data;
  } catch (error) {
    console.error('Error creating specific objective:', error);
    throw error;
  }
};

// Update specific objective
export const updateSpecificObjective = async (id, data) => {
  try {
    if (!id) {
      throw new Error('Objective ID is required');
    }
    
    if (!data.title || !data.description) {
      throw new Error('Title and description are required');
    }
    
    const objectiveData = {
      title: data.title.trim(),
      description: data.description.trim(),
      displayOrder: data.displayOrder,
      isActive: data.isActive
    };
    
    const response = await API.put(`/about-content/objectives/${id}`, objectiveData);
    return response.data;
  } catch (error) {
    console.error('Error updating specific objective:', error);
    throw error;
  }
};

// Delete specific objective
export const deleteSpecificObjective = async (id) => {
  try {
    if (!id) {
      throw new Error('Objective ID is required');
    }
    
    const response = await API.delete(`/about-content/objectives/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting specific objective:', error);
    throw error;
  }
};

// Create new reference
export const createReference = async (data) => {
  try {
    // Validate required fields
    if (!data.title || !data.author || !data.publicationDate) {
      throw new Error('Title, author, and publication date are required');
    }
    
    const referenceData = {
      title: data.title.trim(),
      author: data.author.trim(),
      publicationDate: data.publicationDate,
      url: data.url?.trim() || '',
      displayOrder: data.displayOrder || 999
    };
    
    const response = await API.post('/about-content/references', referenceData);
    return response.data;
  } catch (error) {
    console.error('Error creating reference:', error);
    throw error;
  }
};

// Update reference
export const updateReference = async (id, data) => {
  try {
    if (!id) {
      throw new Error('Reference ID is required');
    }
    
    if (!data.title || !data.author || !data.publicationDate) {
      throw new Error('Title, author, and publication date are required');
    }
    
    const referenceData = {
      title: data.title.trim(),
      author: data.author.trim(),
      publicationDate: data.publicationDate,
      url: data.url?.trim() || '',
      displayOrder: data.displayOrder
    };
    
    const response = await API.put(`/about-content/references/${id}`, referenceData);
    return response.data;
  } catch (error) {
    console.error('Error updating reference:', error);
    throw error;
  }
};

// Delete reference
export const deleteReference = async (id) => {
  try {
    if (!id) {
      throw new Error('Reference ID is required');
    }
    
    const response = await API.delete(`/about-content/references/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting reference:', error);
    throw error;
  }
};

// Get about content analytics (Admin only)
export const getAboutAnalytics = async () => {
  try {
    const response = await API.get('/about-content/analytics');
    return response.data;
  } catch (error) {
    console.error('Error fetching about analytics:', error);
    throw error;
  }
};

// Export about content
export const exportAboutContent = async (format = 'json') => {
  try {
    const response = await API.get(`/about-content/export?format=${format}`);
    return response.data;
  } catch (error) {
    console.error('Error exporting about content:', error);
    throw error;
  }
};

// Backup about content
export const backupAboutContent = async () => {
  try {
    const response = await API.post('/about-content/backup');
    return response.data;
  } catch (error) {
    console.error('Error backing up about content:', error);
    throw error;
  }
};

// Restore about content from backup
export const restoreAboutContent = async (backupId) => {
  try {
    if (!backupId) {
      throw new Error('Backup ID is required');
    }
    
    const response = await API.post(`/about-content/restore/${backupId}`);
    return response.data;
  } catch (error) {
    console.error('Error restoring about content:', error);
    throw error;
  }
};

// Search about content
export const searchAboutContent = async (query, section = null) => {
  try {
    const params = new URLSearchParams();
    params.append('q', query);
    if (section) {
      params.append('section', section);
    }
    
    const response = await API.get(`/about-content/search?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error searching about content:', error);
    throw error;
  }
};

// Validate content before saving
export const validateAboutContent = (section, data) => {
  const errors = {};
  
  switch (section) {
    case 'background':
      if (!data.title?.trim()) errors.title = 'Title is required';
      if (!data.mainContent?.trim()) errors.mainContent = 'Main content is required';
      if (data.title && data.title.length > 255) errors.title = 'Title must be less than 255 characters';
      break;
      
    case 'benefit':
      if (!data.title?.trim()) errors.title = 'Title is required';
      if (!data.description?.trim()) errors.description = 'Description is required';
      if (data.title && data.title.length > 100) errors.title = 'Title must be less than 100 characters';
      if (data.description && data.description.length > 500) errors.description = 'Description must be less than 500 characters';
      break;
      
    case 'justification':
      if (!data.title?.trim()) errors.title = 'Title is required';
      if (!data.content?.trim()) errors.content = 'Content is required';
      break;
      
    case 'objectives':
      if (!data.title?.trim()) errors.title = 'Title is required';
      if (!data.introduction?.trim()) errors.introduction = 'Introduction is required';
      break;
      
    case 'objective':
      if (!data.title?.trim()) errors.title = 'Title is required';
      if (!data.description?.trim()) errors.description = 'Description is required';
      if (data.title && data.title.length > 255) errors.title = 'Title must be less than 255 characters';
      break;
      
    case 'reference':
      if (!data.title?.trim()) errors.title = 'Title is required';
      if (!data.author?.trim()) errors.author = 'Author is required';
      if (!data.publicationDate) errors.publicationDate = 'Publication date is required';
      if (data.url && !isValidUrl(data.url)) errors.url = 'Invalid URL format';
      break;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Helper function to validate URL
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Helper function to sanitize HTML content
export const sanitizeHtml = (html) => {
  // Basic HTML sanitization - in production, use a library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

// Export aliases for AboutManagement.jsx compatibility
export const exportContent = exportAboutContent;
export const getAnalytics = getAboutAnalytics;

export default {
  getAboutContent,
  getAboutSection,
  updateBackground,
  createBackgroundSection,
  updateBackgroundSection,
  deleteBackgroundSection,
  reorderBackgroundSections,
  createBenefit,
  updateBenefit,
  deleteBenefit,
  updateJustification,
  updateObjectives,
  createSpecificObjective,
  updateSpecificObjective,
  deleteSpecificObjective,
  createReference,
  updateReference,
  deleteReference,
  getAboutAnalytics,
  exportAboutContent,
  backupAboutContent,
  restoreAboutContent,
  searchAboutContent,
  validateAboutContent,
  sanitizeHtml
};
