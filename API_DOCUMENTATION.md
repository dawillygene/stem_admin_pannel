# About Management API Documentation
**Author:** Elia William Mariki (@dawillygene)  
**Date:** July 4, 2025  
**Base URL:** `http://192.168.1.150:8000/api/`

## 🔐 Authentication
All endpoints require authentication via Bearer token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 📖 GET Endpoints

### 1. Get All About Content
**Endpoint:** `GET /about-content`  
**Purpose:** Retrieve complete about page content including all sections  
**Auth Required:** ✅ Yes  

**Response Structure:**
```json
{
  "success": true,
  "data": {
    "background": {
      "id": 1,
      "title": "Background Information",
      "mainContent": "Main background content text...",
      "ctaText": "Learn More About Our Mission",
      "ctaLink": "/contact",
      "sections": [
        {
          "id": 1,
          "title": "Section Title",
          "content": "Section content text...",
          "displayOrder": 1
        }
      ]
    },
    "benefits": [
      {
        "id": 1,
        "title": "STEM Benefit 1",
        "description": "Benefit description...",
        "icon": "fas fa-check-circle",
        "displayOrder": 1,
        "isActive": true
      }
    ],
    "justification": {
      "id": 1,
      "title": "Justification of the Project",
      "content": "Main justification content...",
      "conclusion": "Conclusion text...",
      "references": [
        {
          "id": 1,
          "title": "Reference Title",
          "url": "https://example.com/research",
          "author": "Author Name",
          "publicationDate": "2019",
          "displayOrder": 1
        }
      ]
    },
    "objectives": {
      "id": 1,
      "title": "Project Objectives",
      "introduction": "Objectives introduction...",
      "conclusion": "Objectives conclusion...",
      "specificObjectives": [
        {
          "id": 1,
          "title": "Objective Title",
          "description": "Objective description...",
          "displayOrder": 1,
          "isActive": true
        }
      ]
    },
    "lastUpdated": "2025-07-04T20:47:21.690846083"
  },
  "message": "About content retrieved successfully"
}
```

**Usage Example:**
```javascript
const response = await fetch('/api/about-content', {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
```

---

### 2. Get Specific Section
**Endpoint:** `GET /about-content/{section}`  
**Purpose:** Retrieve content for a specific section only  
**Auth Required:** ✅ Yes  

**Parameters:**
- `section` (required): One of `background`, `benefits`, `justification`, `objectives`

**Examples:**
- `GET /about-content/background` - Returns only background section
- `GET /about-content/benefits` - Returns only benefits array
- `GET /about-content/justification` - Returns only justification section
- `GET /about-content/objectives` - Returns only objectives section

**Response Structure:**
```json
{
  "success": true,
  "data": {
    // Single section data structure (varies by section)
  },
  "message": "Section retrieved successfully"
}
```

**Background Section Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Background Information",
    "mainContent": "Main content...",
    "ctaText": "Call to action text",
    "ctaLink": "/contact",
    "sections": [...]
  }
}
```

**Benefits Section Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Benefit Title",
      "description": "Benefit description",
      "icon": "fas fa-check-circle",
      "displayOrder": 1,
      "isActive": true
    }
  ]
}
```

---

### 3. Get Analytics Data
**Endpoint:** `GET /about-content/analytics`  
**Purpose:** Retrieve analytics and statistics for about content  
**Auth Required:** ✅ Yes (Admin only)  

**Response Structure:**
```json
{
  "success": true,
  "data": {
    "totalSections": 4,
    "totalBenefits": 6,
    "totalObjectives": 4,
    "totalReferences": 2,
    "activeBenefits": 6,
    "activeObjectives": 4,
    "lastUpdated": "2025-07-04T20:47:21.690846083",
    "contentStats": {
      "backgroundWordCount": 450,
      "justificationWordCount": 320,
      "objectivesWordCount": 280
    },
    "recentActivity": [
      {
        "action": "updated",
        "section": "background",
        "timestamp": "2025-07-04T20:47:21.690846083",
        "user": "superadmin"
      }
    ]
  },
  "message": "Analytics retrieved successfully"
}
```

---

### 4. Export Content
**Endpoint:** `GET /about-content/export?format={format}`  
**Purpose:** Export about content in different formats  
**Auth Required:** ✅ Yes  

**Query Parameters:**
- `format` (optional): Export format - `json` (default), `csv`, `pdf`

**Examples:**
- `GET /about-content/export` - Exports as JSON
- `GET /about-content/export?format=json` - Exports as JSON
- `GET /about-content/export?format=csv` - Exports as CSV
- `GET /about-content/export?format=pdf` - Exports as PDF

**JSON Response:**
```json
{
  "success": true,
  "data": {
    "exportId": "export_20250704_204721",
    "format": "json",
    "content": {
      // Complete about content structure
    },
    "exportedAt": "2025-07-04T20:47:21.690846083",
    "exportedBy": "superadmin"
  },
  "message": "Content exported successfully"
}
```

**CSV Response:**
```json
{
  "success": true,
  "data": {
    "exportId": "export_20250704_204721",
    "format": "csv",
    "downloadUrl": "/downloads/about-content-20250704.csv",
    "exportedAt": "2025-07-04T20:47:21.690846083"
  },
  "message": "CSV export ready for download"
}
```

---

### 5. Search Content
**Endpoint:** `GET /about-content/search?q={query}&section={section}`  
**Purpose:** Search across about content  
**Auth Required:** ✅ Yes  

**Query Parameters:**
- `q` (required): Search query string
- `section` (optional): Filter by section - `background`, `benefits`, `justification`, `objectives`

**Examples:**
- `GET /about-content/search?q=STEM` - Search all content for "STEM"
- `GET /about-content/search?q=education&section=benefits` - Search only benefits for "education"
- `GET /about-content/search?q=Tanzania&section=justification` - Search justification for "Tanzania"

**Response Structure:**
```json
{
  "success": true,
  "data": {
    "query": "STEM",
    "totalResults": 15,
    "results": [
      {
        "section": "benefits",
        "itemType": "benefit",
        "itemId": 1,
        "title": "STEM Benefit 1",
        "excerpt": "...STEM education creates active...",
        "relevanceScore": 0.95
      },
      {
        "section": "background",
        "itemType": "mainContent",
        "itemId": null,
        "title": "Background Information",
        "excerpt": "...STEM fields are vital for...",
        "relevanceScore": 0.87
      }
    ],
    "searchTime": "0.045s"
  },
  "message": "Search completed successfully"
}
```

---

## 📊 Data Structure Details

### Background Object
```json
{
  "id": 1,
  "title": "string (max 255 chars)",
  "mainContent": "string (required)",
  "ctaText": "string (optional)",
  "ctaLink": "string (optional, URL format)",
  "sections": [
    {
      "id": 1,
      "title": "string",
      "content": "string",
      "displayOrder": 1
    }
  ]
}
```

### Benefit Object
```json
{
  "id": 1,
  "title": "string (max 100 chars, required)",
  "description": "string (max 500 chars, required)",
  "icon": "string (Font Awesome class, default: 'fas fa-check-circle')",
  "displayOrder": 1,
  "isActive": true
}
```

### Justification Object
```json
{
  "id": 1,
  "title": "string (required)",
  "content": "string (required)",
  "conclusion": "string (optional)",
  "references": [
    {
      "id": 1,
      "title": "string (required)",
      "url": "string (optional, valid URL)",
      "author": "string (required)",
      "publicationDate": "string (required, YYYY format)",
      "displayOrder": 1
    }
  ]
}
```

### Objectives Object
```json
{
  "id": 1,
  "title": "string (required)",
  "introduction": "string (required)",
  "conclusion": "string (optional)",
  "specificObjectives": [
    {
      "id": 1,
      "title": "string (max 255 chars, required)",
      "description": "string (required)",
      "displayOrder": 1,
      "isActive": true
    }
  ]
}
```

---

## 🛡️ Error Responses

**401 Unauthorized:**
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Authentication token required or invalid"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "Insufficient permissions for this operation"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Requested section not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "An error occurred while processing the request"
}
```

---

## 📝 Usage Notes

1. **Authentication:** All endpoints require valid JWT token
2. **Rate Limiting:** API may have rate limits (check response headers)
3. **Content Types:** All responses are `application/json`
4. **Timestamps:** All timestamps are in ISO 8601 format (UTC)
5. **IDs:** All IDs are integers starting from 1
6. **Ordering:** Items with `displayOrder` are sorted ascending
7. **Active Status:** Items with `isActive: false` may be hidden in frontend
8. **Search:** Search is case-insensitive and supports partial matching

---

## 🔄 Frontend Integration Examples

### React/JavaScript Usage:
```javascript
// Get all content
const aboutData = await getAboutContent();

// Get specific section
const benefits = await getAboutSection('benefits');

// Search content
const searchResults = await searchAboutContent('STEM', 'benefits');

// Get analytics
const analytics = await getAboutAnalytics();

// Export content
const exportData = await exportAboutContent('json');
```

### Error Handling:
```javascript
try {
  const data = await getAboutContent();
  // Process data
} catch (error) {
  if (error.response?.status === 401) {
    // Redirect to login
  } else if (error.response?.status === 500) {
    // Show error message
  }
}
```
