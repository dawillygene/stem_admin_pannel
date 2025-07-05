import API from './axios.js';

/**
 * Homepage Management API Service
 * Handles all homepage content management operations
 */

// Mock data for development
const mockHomepageData = {
  success: true,
  data: {
    hero: {
      id: 1,
      title: "Enhancing Mathematics and Science Education in Secondary Schools in Tanzania",
      subtitle: "A Partnership Program with the Ministry of Education Science and Technology (MoEST) sponsored by The United Nations Children's Fund (UNICEF)",
      description: "This comprehensive program aims to transform science education through innovative teaching methods, laboratory improvements, and community engagement.",
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
      },
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z"
    },
    activities: {
      id: 2,
      title: "Main Activities of the Project",
      subtitle: "Our comprehensive approach to improving science education",
      background_color: "white",
      activities: [
        {
          id: 1,
          title: "Situational Analysis",
          description: "Conducting a situational analysis regarding the status of the science teachers in secondary schools.",
          icon_class: "fas fa-search",
          color: "primary",
          order: 1,
          is_featured: true,
          is_published: true,
          link: "/activities/situational-analysis",
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          title: "Stakeholder Meetings",
          description: "Conducting educational stakeholders meetings to create awareness on science education in secondary education.",
          icon_class: "fas fa-users",
          color: "secondary",
          order: 2,
          is_featured: true,
          is_published: true,
          link: "/activities/stakeholder-meetings",
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-15T10:30:00Z"
        },
        {
          id: 3,
          title: "Teacher Training",
          description: "Conducting training for science teachers in both secondary schools and university to strengthen their teaching capacity.",
          icon_class: "fas fa-chalkboard-teacher",
          color: "tertiary",
          order: 3,
          is_featured: true,
          is_published: true,
          link: "/activities/teacher-training",
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-15T10:30:00Z"
        }
      ],
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z"
    },
    outcomes: {
      id: 3,
      title: "Proposed Project Outcomes",
      description: "After the project implementation, it is expected to yield the following outcomes:",
      background_color: "gray-100",
      content_background: "white",
      outcomes: [
        {
          id: 1,
          title: "Increased Science Teachers",
          description: "Increased number of science teachers in secondary schools and in the country as a whole.",
          icon_class: "fas fa-user-graduate",
          order: 1,
          is_published: true,
          metrics: {
            target: "500+",
            current: "250",
            percentage: 50
          },
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          title: "Improved Community Awareness",
          description: "Improved awareness of community members and parents on how they can encourage and help their children to pursue science-related subjects.",
          icon_class: "fas fa-lightbulb",
          order: 2,
          is_published: true,
          metrics: {
            target: "10,000+",
            current: "3,500",
            percentage: 35
          },
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-15T10:30:00Z"
        }
      ],
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z"
    },
    monitoring: {
      id: 4,
      title: "Project Monitoring and Evaluation",
      description: "The project team will ensure that all activities are carried out as planned through regular follow-ups.",
      background_color: "white",
      monitoring_aspects: [
        {
          id: 1,
          title: "Regular Follow-ups",
          description: "Ensuring all activities are carried out as planned through systematic monitoring.",
          icon_class: "fas fa-calendar-check",
          is_active: true,
          metrics: {
            current: 12,
            target: 24
          },
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-15T10:30:00Z"
        }
      ],
      is_published: true,
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z"
    },
    ethics: {
      id: 5,
      title: "Ethical Considerations",
      description: "All ethical concerns will be observed such as seeking the ethical research clearance letter.",
      background_color: "gray-50",
      ethics_principles: [
        {
          id: 1,
          title: "Research Ethics Clearance",
          description: "Obtaining proper ethical clearance from relevant authorities before conducting research activities.",
          icon_class: "fas fa-certificate",
          is_active: true,
          compliance_level: 100,
          priority: "High",
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-15T10:30:00Z"
        }
      ],
      is_published: true,
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z"
    }
  },
  meta: {
    last_updated: "2024-01-15T10:30:00Z",
    version: "1.0",
    sections_count: 5
  }
};

// Check if we should use mock data
const useMockData = import.meta.env.VITE_ENABLE_MOCK_API === 'true' || import.meta.env.NODE_ENV === 'development';

// API service methods
const HomepageService = {
  // Get all homepage content
  async getHomepageContent() {
    try {
      if (useMockData) {
        console.log('Using mock data for homepage content');
        return mockHomepageData.data;
      }

      const response = await API.get('/homepage-content');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      console.log('Falling back to mock data');
      return mockHomepageData.data;
    }
  },

  // Update hero section
  async updateHero(heroData) {
    try {
      if (useMockData) {
        console.log('Mock: Updating hero section', heroData);
        return { success: true, data: heroData };
      }

      const response = await API.put('/homepage-content/hero', heroData);
      return response.data;
    } catch (error) {
      console.error('Error updating hero:', error);
      throw error;
    }
  },

  // Add new activity
  async addActivity(activityData) {
    try {
      if (useMockData) {
        console.log('Mock: Adding activity', activityData);
        return { success: true, data: { ...activityData, id: Date.now() } };
      }

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
      if (useMockData) {
        console.log('Mock: Updating activity', activityId, activityData);
        return { success: true, data: activityData };
      }

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
      if (useMockData) {
        console.log('Mock: Deleting activity', activityId);
        return { success: true };
      }

      const response = await API.delete(`/homepage-content/activities/${activityId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw error;
    }
  },

  // Add new outcome
  async addOutcome(outcomeData) {
    try {
      if (useMockData) {
        console.log('Mock: Adding outcome', outcomeData);
        return { success: true, data: { ...outcomeData, id: Date.now() } };
      }

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
      if (useMockData) {
        console.log('Mock: Updating outcome', outcomeId, outcomeData);
        return { success: true, data: outcomeData };
      }

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
      if (useMockData) {
        console.log('Mock: Deleting outcome', outcomeId);
        return { success: true };
      }

      const response = await API.delete(`/homepage-content/outcomes/${outcomeId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting outcome:', error);
      throw error;
    }
  },

  // Update monitoring section
  async updateMonitoring(monitoringData) {
    try {
      if (useMockData) {
        console.log('Mock: Updating monitoring section', monitoringData);
        return { success: true, data: monitoringData };
      }

      const response = await API.put('/homepage-content/monitoring', monitoringData);
      return response.data;
    } catch (error) {
      console.error('Error updating monitoring:', error);
      throw error;
    }
  },

  // Update ethics section
  async updateEthics(ethicsData) {
    try {
      if (useMockData) {
        console.log('Mock: Updating ethics section', ethicsData);
        return { success: true, data: ethicsData };
      }

      const response = await API.put('/homepage-content/ethics', ethicsData);
      return response.data;
    } catch (error) {
      console.error('Error updating ethics:', error);
      throw error;
    }
  },

  // Reorder items (activities or outcomes)
  async reorderItems(section, items) {
    try {
      if (useMockData) {
        console.log('Mock: Reordering items', section, items);
        return { success: true };
      }

      const response = await API.put(`/homepage-content/${section}/reorder`, { items });
      return response.data;
    } catch (error) {
      console.error('Error reordering items:', error);
      throw error;
    }
  },

  // Upload image
  async uploadImage(file) {
    try {
      if (useMockData) {
        console.log('Mock: Uploading image', file.name);
        return { success: true, url: `https://example.com/images/${file.name}` };
      }

      const formData = new FormData();
      formData.append('image', file);

      const response = await API.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
};

export default HomepageService;
