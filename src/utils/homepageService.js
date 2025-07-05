import API from './axios.js';

/**
 * Homepage Management API Service
 * Handles all homepage content management operations using real API endpoints
 */

// Default data structure for when API is not available
const DEFAULT_HOMEPAGE_DATA = {
  hero: {
    id: 1,
    title: "Loading...",
    subtitle: "Please wait while we load your content",
    description: "Content is being loaded from the server.",
    background_image: "",
    background_gradient: "from-[#0066CC] to-[#FD9148]",
    cta_text: "Learn More",
    cta_link: "/about",
    search_placeholder: "Search for programs...",
    search_enabled: true,
    is_published: true,
    animations: {
      floating_elements: true,
      gradient_overlay: true
    }
  },
  activities: {
    id: 2,
    title: "Loading Activities...",
    subtitle: "Please wait while we load your activities",
    background_color: "white",
    activities: []
  },
  outcomes: {
    id: 3,
    title: "Loading Outcomes...",
    description: "Please wait while we load your outcomes",
    background_color: "gray-100",
    content_background: "white",
    outcomes: []
  },
  monitoring: {
    id: 4,
    title: "Loading Monitoring...",
    description: "Please wait while we load monitoring data",
    background_color: "white",
    monitoring_aspects: []
  },
  ethics: {
    id: 5,
    title: "Loading Ethics...",
    description: "Please wait while we load ethics data",
    background_color: "gray-50",
    ethics_principles: []
  }
};

const HomepageService = {
  // Get all homepage content
  async getHomepageContent() {
    try {
      const response = await API.get('/homepage-content');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      console.warn('Falling back to default data structure');
      return DEFAULT_HOMEPAGE_DATA;
    }
  },

  // Get hero section content
  async getHeroContent() {
    try {
      const response = await API.get('/homepage-content/hero');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching hero content:', error);
      throw error;
    }
  },

  // Update hero section
  async updateHero(heroData) {
    try {
      const response = await API.put('/homepage-content/hero', heroData);
      return response.data;
    } catch (error) {
      console.error('Error updating hero:', error);
      throw error;
    }
  },

  // Get activities section
  async getActivitiesContent() {
    try {
      const response = await API.get('/homepage-content/activities');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching activities content:', error);
      throw error;
    }
  },

  // Add new activity
  async addActivity(activityData) {
    try {
      const response = await API.post('/homepage-content/activities', activityData);
      return response.data;
    } catch (error) {
      console.error('Error adding activity:', error);
      throw error;
    }
  },

  // Update activity
  async updateActivity(activityId, activityData) {
    try {
      const response = await API.put(`/homepage-content/activities/${activityId}`, activityData);
      return response.data;
    } catch (error) {
      console.error('Error updating activity:', error);
      throw error;
    }
  },

  // Delete activity
  async deleteActivity(activityId) {
    try {
      const response = await API.delete(`/homepage-content/activities/${activityId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw error;
    }
  },

  // Get outcomes section
  async getOutcomesContent() {
    try {
      const response = await API.get('/homepage-content/outcomes');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching outcomes content:', error);
      throw error;
    }
  },

  // Add new outcome
  async addOutcome(outcomeData) {
    try {
      const response = await API.post('/homepage-content/outcomes', outcomeData);
      return response.data;
    } catch (error) {
      console.error('Error adding outcome:', error);
      throw error;
    }
  },

  // Update outcome
  async updateOutcome(outcomeId, outcomeData) {
    try {
      const response = await API.put(`/homepage-content/outcomes/${outcomeId}`, outcomeData);
      return response.data;
    } catch (error) {
      console.error('Error updating outcome:', error);
      throw error;
    }
  },

  // Delete outcome
  async deleteOutcome(outcomeId) {
    try {
      const response = await API.delete(`/homepage-content/outcomes/${outcomeId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting outcome:', error);
      throw error;
    }
  },

  // Get monitoring section
  async getMonitoringContent() {
    try {
      const response = await API.get('/homepage-content/monitoring');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching monitoring content:', error);
      throw error;
    }
  },

  // Update monitoring section
  async updateMonitoring(monitoringData) {
    try {
      const response = await API.put('/homepage-content/monitoring', monitoringData);
      return response.data;
    } catch (error) {
      console.error('Error updating monitoring:', error);
      throw error;
    }
  },

  // Get ethics section
  async getEthicsContent() {
    try {
      const response = await API.get('/homepage-content/ethics');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching ethics content:', error);
      throw error;
    }
  },

  // Update ethics section
  async updateEthics(ethicsData) {
    try {
      const response = await API.put('/homepage-content/ethics', ethicsData);
      return response.data;
    } catch (error) {
      console.error('Error updating ethics:', error);
      throw error;
    }
  },

  // Section-specific update methods (for compatibility with existing components)
  async updateHeroSection(heroData) {
    return this.updateHero(heroData);
  },

  async updateActivitiesSection(activitiesData) {
    try {
      // Based on your API spec, use PUT to update section metadata
      const response = await API.put('/homepage-content/ACTIVITIES', {
        title: activitiesData.title,
        subtitle: activitiesData.subtitle,
        backgroundColor: activitiesData.background_color
      });
      return response.data;
    } catch (error) {
      console.error('Error updating activities section:', error);
      throw error;
    }
  },

  async updateOutcomesSection(outcomesData) {
    try {
      // Based on your API spec, use PUT to update section metadata
      const response = await API.put('/homepage-content/OUTCOMES', {
        title: outcomesData.title,
        subtitle: outcomesData.subtitle,
        backgroundColor: outcomesData.background_color
      });
      return response.data;
    } catch (error) {
      console.error('Error updating outcomes section:', error);
      throw error;
    }
  },

  async updateMonitoringSection(monitoringData) {
    try {
      // Based on your API spec, use PUT to update section metadata
      const response = await API.put('/homepage-content/MONITORING', {
        title: monitoringData.title,
        subtitle: monitoringData.subtitle,
        description: monitoringData.description,
        backgroundColor: monitoringData.background_color
      });
      return response.data;
    } catch (error) {
      console.error('Error updating monitoring section:', error);
      throw error;
    }
  },

  async updateEthicsSection(ethicsData) {
    try {
      // Based on your API spec, use PUT to update section metadata
      const response = await API.put('/homepage-content/ETHICS', {
        title: ethicsData.title,
        subtitle: ethicsData.subtitle,
        description: ethicsData.description,
        backgroundColor: ethicsData.background_color
      });
      return response.data;
    } catch (error) {
      console.error('Error updating ethics section:', error);
      throw error;
    }
  },

  // Reorder content
  async reorderActivities(itemsOrder) {
    try {
      const response = await API.put('/homepage-content/activities/reorder', {
        items: itemsOrder
      });
      return response.data;
    } catch (error) {
      console.error('Error reordering activities:', error);
      throw error;
    }
  },

  async reorderOutcomes(itemsOrder) {
    try {
      const response = await API.put('/homepage-content/outcomes/reorder', {
        items: itemsOrder
      });
      return response.data;
    } catch (error) {
      console.error('Error reordering outcomes:', error);
      throw error;
    }
  },

  // Search homepage content
  async searchContent(query, options = {}) {
    try {
      const params = new URLSearchParams({
        q: query,
        ...options
      });
      const response = await API.get(`/homepage-content/search?${params}`);
      return response.data.data;
    } catch (error) {
      console.error('Error searching content:', error);
      throw error;
    }
  },

  // Get homepage analytics (admin only)
  async getAnalytics() {
    try {
      const response = await API.get('/homepage-content/analytics');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  },

  // Batch update for performance
  async batchUpdate(updates) {
    try {
      const response = await API.post('/homepage-content/batch-update', updates);
      return response.data;
    } catch (error) {
      console.error('Error in batch update:', error);
      throw error;
    }
  },

  // Publish/unpublish content
  async togglePublishStatus(section, id, isPublished) {
    try {
      const response = await API.patch(`/homepage-content/${section}/${id}/publish`, {
        is_published: isPublished
      });
      return response.data;
    } catch (error) {
      console.error('Error toggling publish status:', error);
      throw error;
    }
  }
};

export default HomepageService;