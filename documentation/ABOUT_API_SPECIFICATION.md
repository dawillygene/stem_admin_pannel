# About Page API Specification

## Overview
This document outlines the API endpoints required to make the About page dynamic. The current About.jsx component displays background information, STEM benefits, project justification, and objectives with animations.

## Base URL
```
{API_BASE_URL}/api
```

## Endpoints

### 1. Get About Page Content
**Endpoint:** `GET /about-content`

**Description:** Retrieves all content for the About page including background information, STEM benefits, justification, and objectives.

**Query Parameters:**
- `section` (optional): Filter by specific section (`background`, `benefits`, `justification`, `objectives`)
- `published` (optional): Filter by published status (default: true)

**Example Request:**
```
GET /api/about-content
GET /api/about-content?section=background
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "background": {
      "id": 1,
      "title": "Background Information",
      "sections": [
        {
          "id": 1,
          "title": "The Importance of Science Education",
          "content": [
            "The science education field has been acknowledged to play a significant role in sustainable development all over the world. In the 21st century, science education is vital for countries' economic competitiveness, peace and security, and general quality of life.",
            "Integration of science activities cultivates students' critical thinking skills for them to be able to analyze, evaluate, and make arguments and conclusions correctly and logically about the problems and how they can solve them.",
            "Science education is thought to improve livelihood and an important tool for the advancement of socio-economic development in almost all countries. Indeed, Science, Mathematics, and Technology (SMT) is thought to accelerate socio-economic development."
          ],
          "order": 1,
          "background_color": "gray-50",
          "is_published": true
        }
      ],
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    },
    "stem_benefits": {
      "id": 2,
      "title": "STEM Education Benefits",
      "benefits": [
        {
          "id": 1,
          "text": "Creates active, creative, critical, and communicative individuals",
          "icon": "fas fa-check-circle",
          "order": 1,
          "is_published": true
        },
        {
          "id": 2,
          "text": "Contributes to scientific and technological innovations and advancement",
          "icon": "fas fa-check-circle",
          "order": 2,
          "is_published": true
        },
        {
          "id": 3,
          "text": "Enhances fight against diseases, food production, and environmental protection",
          "icon": "fas fa-check-circle",
          "order": 3,
          "is_published": true
        },
        {
          "id": 4,
          "text": "Drives industrial development and innovations",
          "icon": "fas fa-check-circle",
          "order": 4,
          "is_published": true
        },
        {
          "id": 5,
          "text": "Promotes tolerance, democracy, political awareness, and respect for dignity",
          "icon": "fas fa-check-circle",
          "order": 5,
          "is_published": true
        },
        {
          "id": 6,
          "text": "Increases employment opportunities in the fastest-growing job categories",
          "icon": "fas fa-check-circle",
          "order": 6,
          "is_published": true
        }
      ],
      "background_color": "gray-50",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    },
    "justification": {
      "id": 3,
      "title": "Justification of the Project",
      "content": [
        "The STEM-related workforce has been increasingly becoming important in the 21st century and many societies tend to integrate STEM education into the education curriculum with the intention of bringing about meaningful learning among the students.",
        "According to Smith (2019), the fastest-growing job categories are related to STEM, and about 90 percent of future jobs will require people with specialization in information and communication technology (ICT) skills.",
        "However, it has been observed that many students tend not to join STEM-related subjects and courses in both secondary schools and universities. A recent survey of 2017 in the Dodoma Region in Tanzania indicated a serious problem of lack of science laboratories and a shortage of teachers for science subjects in secondary schools.",
        "Matete's (2022) literature-based study in Tanzania also observed a shortage of science teachers and a lack of laboratories in secondary schools that forced teachers to teach science subjects using theories instead of practical ones."
      ],
      "background_color": "gray-50",
      "section_color": "gray-100",
      "references": [
        {
          "id": 1,
          "author": "Smith",
          "year": 2019,
          "title": "STEM Education and Future Job Markets",
          "journal": "Journal of Educational Technology"
        },
        {
          "id": 2,
          "author": "Matete",
          "year": 2022,
          "title": "Science Education Challenges in Tanzania",
          "journal": "African Education Review"
        }
      ],
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    },
    "objectives": {
      "id": 4,
      "title": "Project Objectives",
      "main_objective": "This project intends to strengthen the science related subjects in secondary schools by building capacity to science teachers on STEM related subjects to improve the quality of education that will enable the Tanzanian nation to have graduates who can survive in a competitive economy and labor market place of the 21st century.",
      "specific_objectives": [
        {
          "id": 1,
          "title": "Teacher Training",
          "description": "Training science teachers in secondary schools to enhance their capacity and teaching methodologies.",
          "icon": "fas fa-chalkboard-teacher",
          "color": "secondary",
          "order": 1,
          "is_published": true
        },
        {
          "id": 2,
          "title": "Decision-Maker Involvement",
          "description": "Training decision-makers to recognize the necessity of emphasizing science subjects in secondary education.",
          "icon": "fas fa-users-cog",
          "color": "secondary",
          "order": 2,
          "is_published": true
        },
        {
          "id": 3,
          "title": "Community Engagement",
          "description": "Training local community members and parents to participate actively in the education of their children.",
          "icon": "fas fa-hands-helping",
          "color": "secondary",
          "order": 3,
          "is_published": true
        },
        {
          "id": 4,
          "title": "Laboratory Enhancement",
          "description": "Strengthening laboratory services for effective teaching and learning of science subjects.",
          "icon": "fas fa-flask",
          "color": "secondary",
          "order": 4,
          "is_published": true
        }
      ],
      "background_color": "white",
      "section_color": "gray-100",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  },
  "message": "About content retrieved successfully"
}
```

### 2. Get Specific Section Content
**Endpoint:** `GET /about-content/{section}`

**Description:** Retrieves content for a specific section of the About page.

**Path Parameters:**
- `section`: Section name (`background`, `benefits`, `justification`, `objectives`)

**Example Request:**
```
GET /api/about-content/background
GET /api/about-content/objectives
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "id": 4,
    "title": "Project Objectives",
    "main_objective": "This project intends to strengthen the science related subjects...",
    "specific_objectives": [
      {
        "id": 1,
        "title": "Teacher Training",
        "description": "Training science teachers in secondary schools...",
        "icon": "fas fa-chalkboard-teacher",
        "color": "secondary",
        "order": 1,
        "is_published": true
      }
    ],
    "background_color": "white",
    "section_color": "gray-100",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  "message": "Section content retrieved successfully"
}
```

### 3. Update About Content (Admin only)
**Endpoint:** `PUT /about-content/{section}`

**Description:** Updates content for a specific section.

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Path Parameters:**
- `section`: Section name (`background`, `benefits`, `justification`, `objectives`)

**Request Body Example (for objectives):**
```json
{
  "title": "Updated Project Objectives",
  "main_objective": "Updated main objective text...",
  "specific_objectives": [
    {
      "title": "Enhanced Teacher Training",
      "description": "Updated description for teacher training...",
      "icon": "fas fa-chalkboard-teacher",
      "color": "secondary",
      "order": 1
    }
  ],
  "background_color": "white",
  "section_color": "gray-100"
}
```

### 4. Create New Benefit Item (Admin only)
**Endpoint:** `POST /about-content/benefits`

**Description:** Adds a new benefit to the STEM benefits list.

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "Enhances problem-solving and analytical thinking skills",
  "icon": "fas fa-check-circle",
  "order": 7
}
```

### 5. Update Benefit Item (Admin only)
**Endpoint:** `PUT /about-content/benefits/{id}`

**Description:** Updates a specific benefit item.

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "Updated benefit text",
  "icon": "fas fa-star",
  "order": 1
}
```

### 6. Delete Benefit Item (Admin only)
**Endpoint:** `DELETE /about-content/benefits/{id}`

**Description:** Deletes a specific benefit item.

**Headers:**
```
Authorization: Bearer {admin_token}
```

### 7. Create New Objective (Admin only)
**Endpoint:** `POST /about-content/objectives`

**Description:** Adds a new specific objective.

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Objective",
  "description": "Description of the new objective",
  "icon": "fas fa-target",
  "color": "secondary",
  "order": 5
}
```

### 8. Get Page Analytics (Admin only)
**Endpoint:** `GET /about-content/analytics`

**Description:** Retrieves analytics data for the About page.

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "page_views": 1250,
    "average_time_on_page": 180,
    "most_viewed_section": "objectives",
    "section_engagement": {
      "background": 85,
      "benefits": 92,
      "justification": 78,
      "objectives": 95
    },
    "last_updated": "2024-01-15T10:30:00Z"
  },
  "message": "Analytics retrieved successfully"
}
```

## Data Models

### Background Section Schema
```json
{
  "id": "integer (auto-increment, primary key)",
  "title": "string (required, max 255 characters)",
  "sections": "array of objects",
  "background_color": "string (optional, CSS class)",
  "is_published": "boolean (default: true)",
  "created_at": "datetime (auto-generated)",
  "updated_at": "datetime (auto-updated)"
}
```

### Background Subsection Schema
```json
{
  "id": "integer (auto-increment, primary key)",
  "background_id": "integer (foreign key)",
  "title": "string (required, max 255 characters)",
  "content": "array of strings (paragraphs)",
  "order": "integer (for sorting)",
  "background_color": "string (optional, CSS class)",
  "is_published": "boolean (default: true)"
}
```

### STEM Benefits Schema
```json
{
  "id": "integer (auto-increment, primary key)",
  "text": "string (required, max 500 characters)",
  "icon": "string (optional, CSS class, default: 'fas fa-check-circle')",
  "order": "integer (for sorting)",
  "is_published": "boolean (default: true)",
  "created_at": "datetime (auto-generated)",
  "updated_at": "datetime (auto-updated)"
}
```

### Justification Schema
```json
{
  "id": "integer (auto-increment, primary key)",
  "title": "string (required, max 255 characters)",
  "content": "array of strings (paragraphs)",
  "references": "array of objects (citations)",
  "background_color": "string (optional, CSS class)",
  "section_color": "string (optional, CSS class)",
  "is_published": "boolean (default: true)",
  "created_at": "datetime (auto-generated)",
  "updated_at": "datetime (auto-updated)"
}
```

### Objectives Schema
```json
{
  "id": "integer (auto-increment, primary key)",
  "title": "string (required, max 255 characters)",
  "main_objective": "text (required)",
  "background_color": "string (optional, CSS class)",
  "section_color": "string (optional, CSS class)",
  "is_published": "boolean (default: true)",
  "created_at": "datetime (auto-generated)",
  "updated_at": "datetime (auto-updated)"
}
```

### Specific Objective Schema
```json
{
  "id": "integer (auto-increment, primary key)",
  "objectives_id": "integer (foreign key)",
  "title": "string (required, max 255 characters)",
  "description": "text (required)",
  "icon": "string (optional, CSS class)",
  "color": "string (optional, CSS class)",
  "order": "integer (for sorting)",
  "is_published": "boolean (default: true)",
  "created_at": "datetime (auto-generated)",
  "updated_at": "datetime (auto-updated)"
}
```

### Reference Schema
```json
{
  "id": "integer (auto-increment, primary key)",
  "justification_id": "integer (foreign key)",
  "author": "string (required, max 255 characters)",
  "year": "integer (required)",
  "title": "string (required, max 500 characters)",
  "journal": "string (optional, max 255 characters)",
  "url": "string (optional, URL format)",
  "order": "integer (for sorting)"
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
      "title": ["This field is required"],
      "content": ["Content cannot be empty"]
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
    "message": "Section not found"
  }
}
```

## Frontend Integration Notes

### Current Frontend Changes Needed:

1. **Create AboutService** for API calls:
   ```javascript
   // src/services/aboutService.js
   import API from './api.js';
   
   export const getAboutContent = async (section = null) => {
     const endpoint = section ? `/about-content/${section}` : '/about-content';
     const response = await API.get(endpoint);
     return response.json();
   };
   ```

2. **Update About.jsx component** to use API:
   ```javascript
   // Remove hardcoded data arrays
   // Add useEffect to fetch data from API
   // Add loading and error states
   // Maintain existing animations
   ```

3. **Add Content Management Interface** (Admin):
   - Inline editing for content sections
   - Drag-and-drop reordering for benefits and objectives
   - Rich text editor for long content
   - Image upload for section backgrounds

### Animation Considerations:
- Maintain existing Framer Motion animations
- Add skeleton loaders that match animation patterns
- Preserve stagger effects and timing
- Add smooth transitions between content updates

### SEO Considerations:
- Server-side rendering support for content
- Meta tags generation from content
- Structured data markup
- Content versioning for A/B testing

## Database Considerations

### Recommended Database Schema (SQL):
```sql
-- Background sections
CREATE TABLE about_background (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    background_color VARCHAR(50) DEFAULT 'gray-50',
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE about_background_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    background_id INT,
    title VARCHAR(255) NOT NULL,
    content JSON NOT NULL,
    order_index INT DEFAULT 0,
    background_color VARCHAR(50) DEFAULT 'gray-50',
    is_published BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (background_id) REFERENCES about_background(id) ON DELETE CASCADE,
    INDEX idx_order (order_index)
);

-- STEM Benefits
CREATE TABLE stem_benefits (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(500) NOT NULL,
    icon VARCHAR(100) DEFAULT 'fas fa-check-circle',
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order (order_index)
);

-- Project Justification
CREATE TABLE about_justification (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content JSON NOT NULL,
    background_color VARCHAR(50) DEFAULT 'gray-50',
    section_color VARCHAR(50) DEFAULT 'gray-100',
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE justification_references (
    id INT PRIMARY KEY AUTO_INCREMENT,
    justification_id INT,
    author VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    title VARCHAR(500) NOT NULL,
    journal VARCHAR(255),
    url VARCHAR(500),
    order_index INT DEFAULT 0,
    FOREIGN KEY (justification_id) REFERENCES about_justification(id) ON DELETE CASCADE
);

-- Project Objectives
CREATE TABLE about_objectives (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    main_objective TEXT NOT NULL,
    background_color VARCHAR(50) DEFAULT 'white',
    section_color VARCHAR(50) DEFAULT 'gray-100',
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE specific_objectives (
    id INT PRIMARY KEY AUTO_INCREMENT,
    objectives_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) DEFAULT 'fas fa-target',
    color VARCHAR(50) DEFAULT 'secondary',
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (objectives_id) REFERENCES about_objectives(id) ON DELETE CASCADE,
    INDEX idx_order (order_index)
);
```

### Content Versioning:
```sql
-- For content versioning and history
CREATE TABLE content_versions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    table_name VARCHAR(100) NOT NULL,
    record_id INT NOT NULL,
    content_json JSON NOT NULL,
    version_number INT NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_table_record (table_name, record_id)
);
```

## Security Considerations

1. **Content Sanitization:** Sanitize all HTML content to prevent XSS
2. **Version Control:** Track all content changes with user attribution
3. **Role-based Access:** Different permission levels for content management
4. **Content Approval:** Workflow for content review before publishing
5. **Rate Limiting:** Implement rate limiting for content update endpoints

## Testing Requirements

### Unit Tests:
- Test all CRUD operations for each section
- Test content validation rules
- Test ordering and publishing logic
- Test reference management

### Integration Tests:
- Test full page content retrieval
- Test section-specific endpoints
- Test admin permissions
- Test content versioning

### Example Test Cases:
1. Get complete about content returns all sections
2. Update objective with invalid data returns validation errors
3. Unauthorized access to admin endpoints returns 401
4. Published/unpublished content filtering works correctly
5. Content ordering is maintained correctly

This specification provides a comprehensive foundation for making the About page fully dynamic while maintaining its current design and animation structure.
