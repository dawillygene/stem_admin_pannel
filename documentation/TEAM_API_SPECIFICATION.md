# Team Page API Specification

## Overview
This document outlines the API endpoints required to make the Team page dynamic. The current Team.jsx component displays project team members in a table format with search functionality.

## Base URL
```
{API_BASE_URL}/api
```

## Endpoints

### 1. Get All Team Members
**Endpoint:** `GET /team-members`

**Description:** Retrieves all team members for the project.

**Query Parameters:**
- `search` (optional): Filter team members by name, role, or qualification
- `limit` (optional): Number of results to return (default: 20)
- `offset` (optional): Number of results to skip (default: 0)
- `sort` (optional): Sort field (`name`, `role`, `qualification`) (default: `name`)
- `order` (optional): Sort order (`asc`, `desc`) (default: `asc`)

**Example Request:**
```
GET /api/team-members
GET /api/team-members?search=Dr&limit=10&sort=name&order=asc
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "team_members": [
      {
        "id": 1,
        "name": "Prof. Julius Nyahongo",
        "qualification": "Socio-ecology research",
        "role": "Principal Investigator (PI)",
        "contact": {
          "address": "P. O Box 523, Dodoma",
          "email": "nyahongo.jw@gmail.com",
          "phone": null
        },
        "profile_image": null,
        "bio": null,
        "linkedin": null,
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
      },
      {
        "id": 2,
        "name": "Dr. Rose E. Matete",
        "qualification": "Dr. of Philosophy in Educational Management (PhD)",
        "role": "Co PI",
        "contact": {
          "address": "P.O. Box 523, Dodoma",
          "email": "roseem2010@gmail.com",
          "phone": "+255 656 829 781"
        },
        "profile_image": "https://example.com/images/rose-matete.jpg",
        "bio": "Dr. Rose E. Matete is an expert in educational management...",
        "linkedin": "https://linkedin.com/in/rose-matete",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 4,
      "limit": 20,
      "offset": 0,
      "has_next": false,
      "has_previous": false
    }
  },
  "message": "Team members retrieved successfully"
}
```

### 2. Get Single Team Member
**Endpoint:** `GET /team-members/{id}`

**Description:** Retrieves detailed information about a specific team member.

**Path Parameters:**
- `id`: Team member ID (integer)

**Example Request:**
```
GET /api/team-members/1
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Prof. Julius Nyahongo",
    "qualification": "Socio-ecology research",
    "role": "Principal Investigator (PI)",
    "contact": {
      "address": "P. O Box 523, Dodoma",
      "email": "nyahongo.jw@gmail.com",
      "phone": null
    },
    "profile_image": null,
    "bio": "Professor Julius Nyahongo is a renowned expert in socio-ecology research...",
    "linkedin": null,
    "research_interests": [
      "Socio-ecology",
      "Environmental sustainability",
      "Community development"
    ],
    "publications": [
      {
        "title": "Socio-ecological systems in Tanzania",
        "year": 2023,
        "journal": "Journal of Environmental Studies"
      }
    ],
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  "message": "Team member retrieved successfully"
}
```

### 3. Create Team Member (Admin only)
**Endpoint:** `POST /team-members`

**Description:** Creates a new team member entry.

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Dr. John Smith",
  "qualification": "PhD in Computer Science",
  "role": "Research Associate",
  "contact": {
    "address": "P.O. Box 123, Dodoma",
    "email": "john.smith@email.com",
    "phone": "+255 123 456 789"
  },
  "profile_image": "https://example.com/images/john-smith.jpg",
  "bio": "Dr. John Smith specializes in...",
  "linkedin": "https://linkedin.com/in/john-smith",
  "research_interests": ["Machine Learning", "Data Science"]
}
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "name": "Dr. John Smith",
    "qualification": "PhD in Computer Science",
    "role": "Research Associate",
    "contact": {
      "address": "P.O. Box 123, Dodoma",
      "email": "john.smith@email.com",
      "phone": "+255 123 456 789"
    },
    "profile_image": "https://example.com/images/john-smith.jpg",
    "bio": "Dr. John Smith specializes in...",
    "linkedin": "https://linkedin.com/in/john-smith",
    "research_interests": ["Machine Learning", "Data Science"],
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  "message": "Team member created successfully"
}
```

### 4. Update Team Member (Admin only)
**Endpoint:** `PUT /team-members/{id}`

**Description:** Updates an existing team member's information.

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Path Parameters:**
- `id`: Team member ID (integer)

**Request Body:** (Same structure as POST, all fields optional)
```json
{
  "name": "Dr. John Smith Updated",
  "bio": "Updated biography..."
}
```

### 5. Delete Team Member (Admin only)
**Endpoint:** `DELETE /team-members/{id}`

**Description:** Deletes a team member entry.

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Path Parameters:**
- `id`: Team member ID (integer)

**Response Format:**
```json
{
  "success": true,
  "message": "Team member deleted successfully"
}
```

## Data Model

### Team Member Schema
```json
{
  "id": "integer (auto-increment, primary key)",
  "name": "string (required, max 255 characters)",
  "qualification": "string (required, max 500 characters)",
  "role": "string (required, max 255 characters)",
  "contact": {
    "address": "string (optional, max 500 characters)",
    "email": "string (optional, valid email format)",
    "phone": "string (optional, max 20 characters)"
  },
  "profile_image": "string (optional, URL format)",
  "bio": "text (optional)",
  "linkedin": "string (optional, URL format)",
  "research_interests": "array of strings (optional)",
  "publications": "array of objects (optional)",
  "created_at": "datetime (auto-generated)",
  "updated_at": "datetime (auto-updated)"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": 400,
    "message": "Validation error",
    "details": {
      "name": ["This field is required"],
      "email": ["Invalid email format"]
    }
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": 401,
    "message": "Authentication required"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": 403,
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": 404,
    "message": "Team member not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": 500,
    "message": "Internal server error"
  }
}
```

## Frontend Integration Notes

### Current Frontend Changes Needed:

1. **Update Team.jsx component** to use API instead of hardcoded data:
   ```javascript
   // Remove hardcoded teamMembers array
   // Add useEffect to fetch data from API
   // Add loading and error states
   ```

2. **Create TeamService** for API calls:
   ```javascript
   // src/services/teamService.js
   import API from './api.js';
   
   export const getTeamMembers = async (searchTerm = '') => {
     const response = await API.get(`/team-members${searchTerm ? `?search=${searchTerm}` : ''}`);
     return response.json();
   };
   ```

3. **Add Loading and Error States** to the component:
   - Show skeleton loader while fetching data
   - Display error message if API call fails
   - Handle empty states appropriately

### Search Implementation:
- Frontend should debounce search input (300ms delay)
- Send search term as query parameter to API
- Backend should handle search across name, role, and qualification fields

### Pagination (Future Enhancement):
- Add pagination controls to the table
- Implement virtual scrolling for large datasets
- Add items-per-page selector

## Database Considerations

### Recommended Database Schema (SQL):
```sql
CREATE TABLE team_members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    qualification VARCHAR(500) NOT NULL,
    role VARCHAR(255) NOT NULL,
    address TEXT,
    email VARCHAR(255),
    phone VARCHAR(20),
    profile_image VARCHAR(500),
    bio TEXT,
    linkedin VARCHAR(500),
    research_interests JSON,
    publications JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_role (role)
);
```

### Search Optimization:
- Add full-text search indexes on name, qualification, and role fields
- Consider using elasticsearch for advanced search functionality

## Security Considerations

1. **Authentication:** Admin endpoints require valid JWT token
2. **Rate Limiting:** Implement rate limiting for public endpoints
3. **Input Validation:** Sanitize all input data
4. **CORS:** Configure appropriate CORS settings
5. **File Upload:** If implementing profile image upload, validate file types and sizes

## Testing Requirements

### Unit Tests:
- Test all CRUD operations
- Test search functionality
- Test validation rules
- Test error handling

### Integration Tests:
- Test API endpoints with different scenarios
- Test authentication and authorization
- Test pagination and sorting

### Example Test Cases:
1. Get all team members returns correct data structure
2. Search functionality filters results correctly
3. Create team member with invalid data returns validation errors
4. Unauthorized access to admin endpoints returns 401
5. Non-existent team member returns 404

This specification provides a complete foundation for the backend team to implement the Team page API endpoints while maintaining consistency with your existing API structure.
