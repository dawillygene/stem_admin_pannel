import API from './axios.js';

// Get activity logs with optional filtering
export const getActivityLogs = async (limit = 20, type = null) => {
  try {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    if (type) {
      params.append('type', type);
    }
    
    const response = await API.get(`/activity?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    throw error;
  }
};

// Get activities for a specific user
export const getUserActivities = async (username, limit = 20) => {
  try {
    const response = await API.get(`/activity/user/${username}?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user activities:', error);
    throw error;
  }
};

// Get activities for a specific entity
export const getEntityActivities = async (entityType, entityId, limit = 20) => {
  try {
    const response = await API.get(`/activity/entity/${entityType}/${entityId}?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching entity activities:', error);
    throw error;
  }
};

// Get activity statistics
export const getActivityStatistics = async () => {
  try {
    const response = await API.get('/activity/statistics');
    return response.data;
  } catch (error) {
    console.error('Error fetching activity statistics:', error);
    throw error;
  }
};

// Get cleanup preview
export const getCleanupPreview = async (daysOld = 30) => {
  try {
    const response = await API.get(`/activity/cleanup/preview?daysOld=${daysOld}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cleanup preview:', error);
    throw error;
  }
};

// Perform manual cleanup (Super Admin only)
export const performCleanup = async (daysOld = 30) => {
  try {
    const response = await API.post(`/activity/cleanup?daysOld=${daysOld}`);
    return response.data;
  } catch (error) {
    console.error('Error performing cleanup:', error);
    throw error;
  }
};