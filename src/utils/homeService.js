import API from './axios.js';

/**
 * Homepage Content API Service
 * Handles all Homepage content related API calls
 * Integrates with backend Homepage API endpoints
 */

// Get all homepage content
export const getHomepageContent = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Add optional query parameters
    if (params.section) queryParams.append('section', params.section);
    if (params.published !== undefined) queryParams.append('published', params.published);
    if (params.featured !== undefined) queryParams.append('featured', params.featured);
    
    const queryString = queryParams.toString();
    const url = `/homepage-content${queryString ? `?${queryString}` : ''}`;
    
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    throw error;
  }
};

// Get hero section content
export const getHeroContent = async () => {
  try {
    const response = await API.get('/homepage-content?section=hero');
    return response.data;
  } catch (error) {
    console.error('Error fetching hero content:', error);
    throw error;
  }
};

// Get activities section content
export const getActivitiesContent = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('section', 'activities');
    
    if (params.featured !== undefined) queryParams.append('featured', params.featured);
    if (params.published !== undefined) queryParams.append('published', params.published);
    
    const queryString = queryParams.toString();
    const url = `/homepage-content?${queryString}`;
    
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching activities content:', error);
    throw error;
  }
};

// Get outcomes section content
export const getOutcomesContent = async () => {
  try {
    const response = await API.get('/homepage-content?section=outcomes');
    return response.data;
  } catch (error) {
    console.error('Error fetching outcomes content:', error);
    throw error;
  }
};

// Get monitoring section content
export const getMonitoringContent = async () => {
  try {
    const response = await API.get('/homepage-content?section=monitoring');
    return response.data;
  } catch (error) {
    console.error('Error fetching monitoring content:', error);
    throw error;
  }
};

// Get ethics section content
export const getEthicsContent = async () => {
  try {
    const response = await API.get('/homepage-content?section=ethics');
    return response.data;
  } catch (error) {
    console.error('Error fetching ethics content:', error);
    throw error;
  }
};

// Get specific homepage section by ID
export const getHomepageSection = async (sectionId) => {
  try {
    if (!sectionId) {
      throw new Error('Section ID is required');
    }
    
    const response = await API.get(`/homepage-content/${sectionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching homepage section ${sectionId}:`, error);
    throw error;
  }
};

// Get featured content only
export const getFeaturedContent = async () => {
  try {
    const response = await API.get('/homepage-content?featured=true');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured content:', error);
    throw error;
  }
};

// Get published content only
export const getPublishedContent = async () => {
  try {
    const response = await API.get('/homepage-content?published=true');
    return response.data;
  } catch (error) {
    console.error('Error fetching published content:', error);
    throw error;
  }
};

// Utility function to check if content is loading
export const isContentLoading = (content) => {
  return content === null || content === undefined;
};

// Utility function to get default content structure
export const getDefaultHomepageContent = () => {
  return {
    hero: {
      id: null,
      title: 'Loading...',
      subtitle: '',
      background_image: '',
      background_gradient: 'from-[#0066CC] to-[#FD9148]',
      cta_text: 'Learn More',
      cta_link: '/about',
      search_placeholder: 'Search for programs...',
      search_enabled: true,
      animations: {
        floating_elements: true,
        gradient_overlay: true
      },
      is_published: true
    },
    activities: {
      id: null,
      title: 'Loading Activities...',
      subtitle: null,
      background_color: 'white',
      activities: []
    },
    outcomes: {
      id: null,
      title: 'Loading Outcomes...',
      description: '',
      background_color: 'gray-100',
      content_background: 'white',
      outcomes: []
    },
    monitoring: {
      id: null,
      title: 'Loading Monitoring...',
      description: '',
      background_color: 'white',
      monitoring_aspects: []
    },
    ethics: {
      id: null,
      title: 'Loading Ethics...',
      description: '',
      background_color: 'gray-50',
      ethics_principles: []
    }
  };
};

// Error handling utilities
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      status,
      message: data.message || data.error || defaultMessage,
      details: data.details || null
    };
  } else if (error.request) {
    // Request was made but no response
    return {
      status: 0,
      message: 'Network error - please check your connection',
      details: null
    };
  } else {
    // Something else happened
    return {
      status: -1,
      message: error.message || defaultMessage,
      details: null
    };
  }
};

export default {
  getHomepageContent,
  getHeroContent,
  getActivitiesContent,
  getOutcomesContent,
  getMonitoringContent,
  getEthicsContent,
  getHomepageSection,
  getFeaturedContent,
  getPublishedContent,
  isContentLoading,
  getDefaultHomepageContent,
  handleApiError
};
