import API from './axios.js';

/**
 * Team API Service
 * Handles all Team Member related API calls
 * Following TEAM_API_SPECIFICATION.md requirements
 */

// Get all team members with optional search and pagination
export const getTeamMembers = async (params = {}) => {
  try {
    const searchParams = new URLSearchParams();
    
    // Add optional parameters
    if (params.search) searchParams.append('search', params.search);
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.offset) searchParams.append('offset', params.offset.toString());
    if (params.sort) searchParams.append('sort', params.sort);
    if (params.order) searchParams.append('order', params.order);
    
    const queryString = searchParams.toString();
    const url = queryString ? `/team-members?${queryString}` : '/team-members';
    
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};

// Get single team member by ID
export const getTeamMemberById = async (id) => {
  try {
    if (!id) {
      throw new Error('Team member ID is required');
    }
    
    const response = await API.get(`/team-members/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching team member ${id}:`, error);
    throw error;
  }
};

// Create new team member (Admin only)
export const createTeamMember = async (teamMemberData) => {
  try {
    if (!teamMemberData.name || !teamMemberData.qualification || !teamMemberData.role) {
      throw new Error('Name, qualification, and role are required fields');
    }
    
    const response = await API.post('/team-members', teamMemberData);
    return response.data;
  } catch (error) {
    console.error('Error creating team member:', error);
    throw error;
  }
};

// Update existing team member (Admin only)
export const updateTeamMember = async (id, updateData) => {
  try {
    if (!id) {
      throw new Error('Team member ID is required');
    }
    
    const response = await API.put(`/team-members/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating team member ${id}:`, error);
    throw error;
  }
};

// Delete team member (Admin only)
export const deleteTeamMember = async (id) => {
  try {
    if (!id) {
      throw new Error('Team member ID is required');
    }
    
    const response = await API.delete(`/team-members/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting team member ${id}:`, error);
    throw error;
  }
};

// Utility function to validate team member data
export const validateTeamMemberData = (data) => {
  const errors = {};
  
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name is required';
  }
  
  if (!data.qualification || data.qualification.trim() === '') {
    errors.qualification = 'Qualification is required';
  }
  
  if (!data.role || data.role.trim() === '') {
    errors.role = 'Role is required';
  }
  
  if (data.contact?.email && !isValidEmail(data.contact.email)) {
    errors.email = 'Valid email address is required';
  }
  
  if (data.profile_image && !isValidUrl(data.profile_image)) {
    errors.profile_image = 'Valid image URL is required';
  }
  
  if (data.linkedin && !isValidUrl(data.linkedin)) {
    errors.linkedin = 'Valid LinkedIn URL is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate URL format
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Helper function to format team member data for display
export const formatTeamMemberForDisplay = (teamMember) => {
  if (!teamMember) return null;
  
  return {
    ...teamMember,
    displayName: teamMember.name,
    displayRole: teamMember.role,
    displayQualification: teamMember.qualification,
    contactEmail: teamMember.contact?.email || '',
    contactPhone: teamMember.contact?.phone || '',
    contactAddress: teamMember.contact?.address || '',
    profileImage: teamMember.profile_image || '/default-avatar.png',
    joinedDate: teamMember.created_at ? new Date(teamMember.created_at).toLocaleDateString() : '',
    researchInterests: Array.isArray(teamMember.research_interests) ? teamMember.research_interests : [],
    publications: Array.isArray(teamMember.publications) ? teamMember.publications : []
  };
};

// Helper function to prepare team member data for API submission
export const prepareTeamMemberForSubmission = (formData) => {
  return {
    name: formData.name?.trim(),
    qualification: formData.qualification?.trim(),
    role: formData.role?.trim(),
    contact: {
      address: formData.address?.trim() || null,
      email: formData.email?.trim() || null,
      phone: formData.phone?.trim() || null
    },
    profile_image: formData.profile_image?.trim() || null,
    bio: formData.bio?.trim() || null,
    linkedin: formData.linkedin?.trim() || null,
    research_interests: Array.isArray(formData.research_interests) 
      ? formData.research_interests.filter(interest => interest.trim() !== '') 
      : [],
    publications: Array.isArray(formData.publications) 
      ? formData.publications 
      : []
  };
};
