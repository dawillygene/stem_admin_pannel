# Homepage API Specification

## Overview
This document outlines the API endpoints required to make the Homepage dynamic. The current Home.jsx component displays a hero section, main activities, project outcomes, monitoring information, and ethical concerns.

## Base URL
```
{API_BASE_URL}/api
```

## Endpoints

### 1. Get Homepage Content
**Endpoint:** `GET /homepage-content`

**Description:** Retrieves all content for the homepage including hero, activities, outcomes, and other sections.

**Query Parameters:**
- `section` (optional): Filter by specific section (`hero`, `activities`, `outcomes`, `monitoring`, `ethics`)
- `published` (optional): Filter by published status (default: true)
- `featured` (optional): Filter featured content only

**Example Request:**
```
GET /api/homepage-content
GET /api/homepage-content?section=activities&published=true
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "hero": {
      "id": 1,
      "title": "Enhancing Mathematics and Science Education in Secondary Schools in Tanzania",
      "subtitle": "A Partnership Program with the Ministry of Education Science and Technology (MoEST) sponsored by The United Nations Children's Fund (UNICEF)",
      "background_image": "https://example.com/images/hero-bg.jpg",
      "background_gradient": "from-[#0066CC] to-[#FD9148]",
      "cta_text": "Learn More",
      "cta_link": "/about",
      "search_placeholder": "Search for programs...",
      "search_enabled": true,
      "animations": {
        "floating_elements": true,
        "gradient_overlay": true
      },
      "is_published": true,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    },
    "activities": {
      "id": 2,
      "title": "Main Activities of the Project",
      "subtitle": null,
      "background_color": "white",
      "activities": [
        {
          "id": 1,
          "title": "Situational Analysis",
          "description": "Conducting a situational analysis regarding the status of the science teachers in secondary schools.",
          "icon_class": "fas fa-search",
          "color": "primary",
          "order": 1,
          "is_featured": true,
          "is_published": true,
          "additional_info": null,
          "link": null,
          "created_at": "2024-01-15T10:30:00Z",
          "updated_at": "2024-01-15T10:30:00Z"
        },
        {
          "id": 2,
          "title": "Stakeholder Meetings",
          "description": "Conducting educational stakeholders meetings to create awareness on science education in secondary education.",
          "icon_class": "fas fa-users",
          "color": "secondary",
          "order": 2,
          "is_featured": true,
          "is_published": true,
          "additional_info": null,
          "link": null,
          "created_at": "2024-01-15T10:30:00Z",
          "updated_at": "2024-01-15T10:30:00Z"
        },
        {
          "id": 3,
          "title": "Teacher Training",
          "description": "Conducting training for science teachers in both secondary schools and university to strengthen their teaching capacity.",
          "icon_class": "fas fa-chalkboard-teacher",
          "color": "tertiary",
          "order": 3,
          "is_featured": true,
          "is_published": true,
          "additional_info": null,
          "link": null,
          "created_at": "2024-01-15T10:30:00Z",
          "updated_at": "2024-01-15T10:30:00Z"
        },
        {
          "id": 4,
          "title": "Community Training",
          "description": "Conducting training for local community members and parents to participate in the education of their children.",
          "icon_class": "fas fa-home",
          "color": "primary",
          "order": 4,
          "is_featured": true,
          "is_published": true,
          "additional_info": null,
          "link": null,
          "created_at": "2024-01-15T10:30:00Z",
          "updated_at": "2024-01-15T10:30:00Z"
        },
        {
          "id": 5,
          "title": "Laboratory Support",
          "description": "Supporting public secondary schools to have both quality laboratories and apparatus for effective science education.",
          "icon_class": "fas fa-flask",
          "color": "secondary",
          "order": 5,
          "is_featured": true,
          "is_published": true,
          "additional_info": null,
          "link": null,
          "created_at": "2024-01-15T10:30:00Z",
          "updated_at": "2024-01-15T10:30:00Z"
        }
      ],
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    },
    "outcomes": {
      "id": 3,
      "title": "Proposed Project Outcomes",
      "description": "After the project implementation, it is expected to yield the following outcomes:",
      "background_color": "gray-100",
      "content_background": "white",
      "outcomes": [
        {
          "id": 1,
          "title": "Increased Science Teachers",
          "description": "Increased number of science teachers in secondary schools and in the country as a whole.",
          "icon_class": "fas fa-user-graduate",
          "order": 1,
          "is_published": true,
          "metrics": {
            "target": "500+",
            "current": "250",
            "percentage": 50
          },
          "created_at": "2024-01-15T10:30:00Z",
          "updated_at": "2024-01-15T10:30:00Z"
        },
        {
          "id": 2,
          "title": "Improved Community Awareness",
          "description": "Improved awareness of community members and parents on how they can encourage and help their children to pursue science-related subjects.",
          "icon_class": "fas fa-lightbulb",
          "order": 2,
          "is_published": true,
          "metrics": {
            "target": "10,000+",
            "current": "3,500",
            "percentage": 35
          },
          "created_at": "2024-01-15T10:30:00Z",
          "updated_at": "2024-01-15T10:30:00Z"
        },
        {
          "id": 3,
          "title": "Enhanced Laboratory Facilities",
          "description": "Improved laboratories for enhancing teaching and learning of science subjects in secondary schools.",
          "icon_class": "fas fa-flask",
          "order": 3,
          "is_published": true,
          "metrics": {
            "target": "200+",
            "current": "75",
            "percentage": 37.5
          },
          "created_at": "2024-01-15T10:30:00Z",
          "updated_at": "2024-01-15T10:30:00Z"
        },
        {
          "id": 4,
          "title": "Well-Equipped Learning Environment",
          "description": "Well-equipped laboratories that facilitate students' learning of science-related field subjects.",
          "icon_class": "fas fa-microscope",
          "order": 4,
          "is_published": true,
          "metrics": {
            "target": "150+",
            "current": "40",
            "percentage": 26.7
          },
          "created_at": "2024-01-15T10:30:00Z",
          "updated_at": "2024-01-15T10:30:00Z"
        }
      ],
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    },
    "monitoring": {
      "id": 4,
      "title": "Project Monitoring and Evaluation",
      "content": "The project team will ensure that all activities are carried out as planned through regular follow-ups. Questionnaires will be used to get feedback from science teachers and students. Interviews will be employed for the school heads and educational leaders on the perceived impact of the program.",
      "background_color": "white",
      "methods": [
        {
          "id": 1,
          "name": "Questionnaires",
          "description": "Used to get feedback from science teachers and students",
          "frequency": "Quarterly",
          "participants": ["Teachers", "Students"]
        },
        {
          "id": 2,
          "name": "Interviews",
          "description": "Employed for school heads and educational leaders on perceived impact",
          "frequency": "Bi-annual",
          "participants": ["School Heads", "Educational Leaders"]
        }
      ],
      "is_published": true,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    },
    "ethics": {
      "id": 5,
      "title": "Ethical Concerns",
      "content": "All ethical concerns will be observed such as seeking the ethical research clearance letter, routing it to the respective Regional Administration Office (RAS), District Administrative Office (DAS), and District Directors (DDs), seeking the consent of the participants to take part in the study and keeping the collected information confidentially.",
      "background_color": "gray-100",
      "content_background": "white",
      "requirements": [
        {
          "id": 1,
          "requirement": "Ethical research clearance letter",
          "status": "completed",
          "description": "Official clearance from ethics committee"
        },
        {
          "id": 2,
          "requirement": "Regional Administration Office approval",
          "status": "completed",
          "description": "Approval from RAS"
        },
        {
          "id": 3,
          "requirement": "District Administrative Office approval",
          "status": "completed",
          "description": "Approval from DAS"
        },
        {
          "id": 4,
          "requirement": "District Directors approval",
          "status": "completed",
          "description": "Approval from DDs"
        },
        {
          "id": 5,
          "requirement": "Participant consent",
          "status": "ongoing",
          "description": "Seeking consent from all participants"
        },
        {
          "id": 6,
          "requirement": "Data confidentiality",
          "status": "ongoing",
          "description": "Maintaining confidentiality of collected information"
        }
      ],
      "is_published": true,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  },
  "meta": {
    "last_updated": "2024-01-15T10:30:00Z",
    "version": "1.0",
    "sections_count": 5
  },
  "message": "Homepage content retrieved successfully"
}
```

### 2. Get Hero Section Content
**Endpoint:** `GET /homepage-content/hero`

**Description:** Retrieves hero section content with all customization options.

**Response Format:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Enhancing Mathematics and Science Education in Secondary Schools in Tanzania",
    "subtitle": "A Partnership Program with the Ministry of Education Science and Technology (MoEST) sponsored by The United Nations Children's Fund (UNICEF)",
    "background_image": "https://example.com/images/hero-bg.jpg",
    "background_gradient": "from-[#0066CC] to-[#FD9148]",
    "cta_text": "Learn More",
    "cta_link": "/about",
    "cta_color": "#FFAD03",
    "search_placeholder": "Search for programs...",
    "search_enabled": true,
    "animations": {
      "floating_elements": true,
      "gradient_overlay": true,
      "fade_in_duration": 0.8,
      "stagger_delay": 0.2
    },
    "responsive_settings": {
      "mobile_title": "Enhancing STEM Education in Tanzania",
      "tablet_layout": "stacked",
      "desktop_layout": "side-by-side"
    },
    "is_published": true,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  "message": "Hero content retrieved successfully"
}
```

### 3. Get Activities Section
**Endpoint:** `GET /homepage-content/activities`

**Description:** Retrieves main project activities with filtering options.

**Query Parameters:**
- `featured` (optional): Filter featured activities only
- `limit` (optional): Number of activities to return
- `color` (optional): Filter by color theme

**Response Format:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Main Activities of the Project",
    "subtitle": null,
    "background_color": "white",
    "layout": "grid",
    "columns": {
      "mobile": 1,
      "tablet": 2,
      "desktop": 3
    },
    "activities": [
      {
        "id": 1,
        "title": "Situational Analysis",
        "description": "Conducting a situational analysis regarding the status of the science teachers in secondary schools.",
        "icon_class": "fas fa-search",
        "color": "primary",
        "order": 1,
        "is_featured": true,
        "is_published": true,
        "additional_info": null,
        "link": "/activities/situational-analysis",
        "image": null,
        "tags": ["research", "analysis"],
        "progress": {
          "percentage": 75,
          "status": "in-progress",
          "last_updated": "2024-01-10T15:30:00Z"
        },
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
      }
    ],
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  "message": "Activities retrieved successfully"
}
```

### 4. Get Outcomes Section
**Endpoint:** `GET /homepage-content/outcomes`

**Description:** Retrieves project outcomes with progress metrics.

**Response Format:**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "Proposed Project Outcomes",
    "description": "After the project implementation, it is expected to yield the following outcomes:",
    "background_color": "gray-100",
    "content_background": "white",
    "show_metrics": true,
    "outcomes": [
      {
        "id": 1,
        "title": "Increased Science Teachers",
        "description": "Increased number of science teachers in secondary schools and in the country as a whole.",
        "icon_class": "fas fa-user-graduate",
        "order": 1,
        "is_published": true,
        "metrics": {
          "target": "500+",
          "current": "250",
          "percentage": 50,
          "unit": "teachers",
          "timeline": "2024-2026"
        },
        "status": "on-track",
        "milestones": [
          {
            "date": "2024-06-01",
            "description": "First batch of 100 teachers trained",
            "completed": true
          },
          {
            "date": "2024-12-01",
            "description": "Second batch of 150 teachers to be trained",
            "completed": false
          }
        ],
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
      }
    ],
    "overall_progress": 42.5,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  "message": "Outcomes retrieved successfully"
}
```

### 5. Update Hero Content (Admin only)
**Endpoint:** `PUT /homepage-content/hero`

**Description:** Updates hero section content.

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Hero Title",
  "subtitle": "Updated subtitle text",
  "background_image": "https://example.com/new-hero-bg.jpg",
  "cta_text": "Get Started",
  "cta_link": "/contact",
  "search_enabled": true,
  "animations": {
    "floating_elements": true,
    "gradient_overlay": false
  }
}
```

### 6. Create New Activity (Admin only)
**Endpoint:** `POST /homepage-content/activities`

**Description:** Creates a new project activity.

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Activity",
  "description": "Description of the new activity",
  "icon_class": "fas fa-cog",
  "color": "primary",
  "order": 6,
  "is_featured": true,
  "link": "/activities/new-activity",
  "tags": ["innovation", "technology"]
}
```

### 7. Update Activity (Admin only)
**Endpoint:** `PUT /homepage-content/activities/{id}`

**Description:** Updates an existing activity.

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Activity Title",
  "description": "Updated description",
  "progress": {
    "percentage": 85,
    "status": "completed"
  }
}
```

### 8. Create New Outcome (Admin only)
**Endpoint:** `POST /homepage-content/outcomes`

**Description:** Creates a new project outcome.

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Outcome",
  "description": "Description of the new outcome",
  "icon_class": "fas fa-trophy",
  "order": 5,
  "metrics": {
    "target": "1000+",
    "current": "0",
    "unit": "beneficiaries",
    "timeline": "2024-2025"
  }
}
```

### 9. Update Section Content (Admin only)
**Endpoint:** `PUT /homepage-content/{section}`

**Description:** Updates monitoring or ethics section content.

**Path Parameters:**
- `section`: Section name (`monitoring`, `ethics`)

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body (for monitoring):**
```json
{
  "title": "Updated Monitoring Title",
  "content": "Updated monitoring content",
  "methods": [
    {
      "name": "Digital Surveys",
      "description": "Online surveys for real-time feedback",
      "frequency": "Monthly",
      "participants": ["Teachers", "Students", "Parents"]
    }
  ]
}
```

### 10. Get Homepage Analytics (Admin only)
**Endpoint:** `GET /homepage-content/analytics`

**Description:** Retrieves analytics data for homepage sections.

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "total_views": 15420,
    "average_time_on_page": 145,
    "bounce_rate": 23.5,
    "section_engagement": {
      "hero": {
        "views": 15420,
        "interactions": 3205,
        "cta_clicks": 1890
      },
      "activities": {
        "views": 12380,
        "card_clicks": 2340,
        "most_viewed": "Teacher Training"
      },
      "outcomes": {
        "views": 8920,
        "time_spent": 89,
        "most_engaging": "Increased Science Teachers"
      }
    },
    "device_breakdown": {
      "mobile": 45.2,
      "tablet": 23.8,
      "desktop": 31.0
    },
    "geographic_data": {
      "top_regions": [
        {"region": "Dodoma", "percentage": 35.2},
        {"region": "Dar es Salaam", "percentage": 28.7},
        {"region": "Arusha", "percentage": 15.3}
      ]
    },
    "last_updated": "2024-01-15T10:30:00Z"
  },
  "message": "Analytics retrieved successfully"
}
```

### 11. Search Homepage Content
**Endpoint:** `GET /homepage-content/search`

**Description:** Search across all homepage content.

**Query Parameters:**
- `q` (required): Search query
- `section` (optional): Limit search to specific section
- `limit` (optional): Number of results to return

**Example Request:**
```
GET /api/homepage-content/search?q=teacher training&limit=10
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "query": "teacher training",
    "total_results": 3,
    "results": [
      {
        "type": "activity",
        "id": 3,
        "title": "Teacher Training",
        "description": "Conducting training for science teachers...",
        "section": "activities",
        "relevance_score": 0.95,
        "url": "/activities/teacher-training"
      },
      {
        "type": "outcome",
        "id": 1,
        "title": "Increased Science Teachers",
        "description": "Increased number of science teachers...",
        "section": "outcomes",
        "relevance_score": 0.78,
        "url": "/outcomes/increased-teachers"
      }
    ],
    "suggestions": ["teacher development", "science education", "capacity building"]
  },
  "message": "Search completed successfully"
}
```

### 12. Reorder Content (Admin only)
**Endpoint:** `PUT /homepage-content/{section}/reorder`

**Description:** Reorders activities or outcomes.

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "items": [
    {"id": 3, "order": 1},
    {"id": 1, "order": 2},
    {"id": 2, "order": 3},
    {"id": 4, "order": 4},
    {"id": 5, "order": 5}
  ]
}
```

## Data Models

### Hero Section Schema
```json
{
  "id": "integer (auto-increment, primary key)",
  "title": "string (required, max 500 characters)",
  "subtitle": "text (optional)",
  "background_image": "string (optional, URL format)",
  "background_gradient": "string (optional, CSS gradient)",
  "cta_text": "string (optional, max 50 characters)",
  "cta_link": "string (optional, URL format)",
  "cta_color": "string (optional, hex color)",
  "search_placeholder": "string (optional, max 100 characters)",
  "search_enabled": "boolean (default: true)",
  "animations": "json (animation settings)",
  "responsive_settings": "json (responsive configurations)",
  "is_published": "boolean (default: true)",
  "created_at": "datetime (auto-generated)",
  "updated_at": "datetime (auto-updated)"
}
```

### Activities Schema
```json
{
  "id": "integer (auto-increment, primary key)",
  "title": "string (required, max 255 characters)",
  "description": "text (required)",
  "icon_class": "string (optional, CSS class)",
  "color": "string (optional, theme color)",
  "order": "integer (for sorting)",
  "is_featured": "boolean (default: false)",
  "is_published": "boolean (default: true)",
  "additional_info": "text (optional)",
  "link": "string (optional, URL format)",
  "image": "string (optional, URL format)",
  "tags": "json (array of strings)",
  "progress": "json (progress tracking)",
  "created_at": "datetime (auto-generated)",
  "updated_at": "datetime (auto-updated)"
}
```

### Outcomes Schema
```json
{
  "id": "integer (auto-increment, primary key)",
  "title": "string (required, max 255 characters)",
  "description": "text (required)",
  "icon_class": "string (optional, CSS class)",
  "order": "integer (for sorting)",
  "is_published": "boolean (default: true)",
  "metrics": "json (target, current, percentage, unit, timeline)",
  "status": "string (on-track, behind, completed, at-risk)",
  "milestones": "json (array of milestone objects)",
  "created_at": "datetime (auto-generated)",
  "updated_at": "datetime (auto-updated)"
}
```

### Section Content Schema
```json
{
  "id": "integer (auto-increment, primary key)",
  "section_type": "string (monitoring, ethics)",
  "title": "string (required, max 255 characters)",
  "content": "text (required)",
  "background_color": "string (optional, CSS class)",
  "content_background": "string (optional, CSS class)",
  "additional_data": "json (methods, requirements, etc.)",
  "is_published": "boolean (default: true)",
  "created_at": "datetime (auto-generated)",
  "updated_at": "datetime (auto-updated)"
}
```

## Error Responses

### Standard Error Format
```json
{
  "success": false,
  "error": {
    "code": 400,
    "message": "Validation error",
    "details": {
      "title": ["This field is required"],
      "order": ["Order must be a positive integer"]
    }
  }
}
```

## Frontend Integration Notes

### Current Frontend Changes Needed:

1. **Create HomeService** for API calls:
   ```javascript
   // src/services/homeService.js
   import API from './api.js';
   
   export const getHomepageContent = async (section = null) => {
     const endpoint = section ? `/homepage-content/${section}` : '/homepage-content';
     const response = await API.get(endpoint);
     return response.json();
   };
   ```

2. **Update Home.jsx component** to use API:
   - Remove hardcoded CARD_DATA and OUTCOME_DATA imports
   - Add useEffect to fetch data from API
   - Add loading and error states
   - Maintain existing layout and styling

3. **Update Hero.jsx component** for dynamic content:
   - Make title, subtitle, and CTA configurable
   - Add support for dynamic background images
   - Implement search functionality if enabled

### Animation Preservation:
- Maintain all existing animations and transitions
- Add skeleton loaders that match current design
- Preserve responsive behavior
- Add smooth transitions for content updates

### Search Implementation:
- Implement functional search in hero section
- Connect to search API endpoint
- Add search suggestions and autocomplete
- Handle search results display

## Database Considerations

### Recommended Database Schema (SQL):
```sql
-- Hero section
CREATE TABLE homepage_hero (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    subtitle TEXT,
    background_image VARCHAR(500),
    background_gradient VARCHAR(200),
    cta_text VARCHAR(50),
    cta_link VARCHAR(500),
    cta_color VARCHAR(7),
    search_placeholder VARCHAR(100) DEFAULT 'Search for programs...',
    search_enabled BOOLEAN DEFAULT TRUE,
    animations JSON,
    responsive_settings JSON,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Activities
CREATE TABLE homepage_activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_class VARCHAR(100),
    color VARCHAR(50),
    order_index INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    additional_info TEXT,
    link VARCHAR(500),
    image VARCHAR(500),
    tags JSON,
    progress JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order (order_index),
    INDEX idx_featured (is_featured),
    INDEX idx_published (is_published)
);

-- Outcomes
CREATE TABLE homepage_outcomes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_class VARCHAR(100),
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    metrics JSON,
    status ENUM('on-track', 'behind', 'completed', 'at-risk') DEFAULT 'on-track',
    milestones JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order (order_index),
    INDEX idx_status (status)
);

-- Section content
CREATE TABLE homepage_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_type ENUM('activities', 'outcomes', 'monitoring', 'ethics') NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(500),
    description TEXT,
    background_color VARCHAR(50),
    content_background VARCHAR(50),
    additional_data JSON,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_section (section_type)
);

-- Search and analytics
CREATE TABLE homepage_analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    section VARCHAR(50) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    additional_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_daily_metric (date, section, metric_name)
);

CREATE TABLE homepage_searches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    query VARCHAR(255) NOT NULL,
    results_count INT DEFAULT 0,
    user_ip VARCHAR(45),
    user_agent TEXT,
    clicked_result VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_query (query),
    INDEX idx_date (created_at)
);
```

## Security Considerations

1. **Input Validation:** Sanitize all user inputs, especially search queries
2. **Rate Limiting:** Implement rate limiting for search and content endpoints
3. **Image Upload:** Validate image files for hero background uploads
4. **Content Approval:** Workflow for content review before publishing
5. **Analytics Privacy:** Anonymize user data in analytics

## Testing Requirements

### Unit Tests:
- Test all CRUD operations for each content type
- Test search functionality with various queries
- Test content reordering and publishing logic
- Test analytics data collection

### Integration Tests:
- Test complete homepage content retrieval
- Test search functionality end-to-end
- Test admin content management workflow
- Test responsive content delivery

### Example Test Cases:
1. Get homepage content returns all sections with correct structure
2. Search functionality returns relevant results
3. Activity reordering updates correctly
4. Unpublished content is filtered from public endpoints
5. Analytics tracking records user interactions accurately

This specification provides a comprehensive foundation for making the homepage fully dynamic while maintaining its current design, animations, and user experience.
