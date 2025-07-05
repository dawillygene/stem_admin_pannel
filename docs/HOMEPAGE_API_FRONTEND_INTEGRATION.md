# Homepage API - Frontend Integration Guide

## 🚀 **API Overview**
This document provides all the API endpoints for the Homepage functionality. All endpoints are implemented, tested, and ready for frontend integration.

## 📍 **Base URL**
```
http://localhost:8000/api
```

## 🔐 **Authentication**
- **Login Endpoint:** `POST /api/auth/login`
- **Admin Credentials:** username: `superadmin`, password: `superadmin123`
- **JWT Token:** Required for all admin endpoints (POST, PUT, DELETE)

---

## 📋 **Complete Endpoint List**

### 🔓 **PUBLIC ENDPOINTS (No Authentication Required)**

#### 1. Get Complete Homepage Content
```http
GET /api/homepage-content
```
**Description:** Retrieves all homepage content including hero, activities, outcomes, and sections.

**Response Structure:**
```json
{
  "success": true,
  "data": {
    "hero": { ... },
    "activities": { ... },
    "outcomes": { ... },
    "monitoring": { ... },
    "ethics": { ... },
    "meta": { ... }
  },
  "message": "Homepage content retrieved successfully"
}
```

#### 2. Get Hero Section
```http
GET /api/homepage-content/hero
```
**Description:** Retrieves hero section content with title, subtitle, CTA, and background settings.

#### 3. Get Activities Section
```http
GET /api/homepage-content/activities
```
**Description:** Retrieves all activities with descriptions, icons, colors, and ordering.

#### 4. Get Outcomes Section
```http
GET /api/homepage-content/outcomes
```
**Description:** Retrieves project outcomes with metrics, status, and progress tracking.

#### 5. Get Section Content
```http
GET /api/homepage-content/{section}
```
**Path Parameters:**
- `section`: Section type (`ACTIVITIES`, `OUTCOMES`, `MONITORING`, `ETHICS`)

**Description:** Retrieves specific section content (monitoring, ethics, etc.).

#### 6. Search Content
```http
GET /api/homepage-content/search?q={query}
```
**Query Parameters:**
- `q`: Search query (required)
- `limit`: Number of results (optional)

**Description:** Search across all homepage content.

---

### 🔒 **ADMIN ENDPOINTS (JWT Authentication Required)**

#### 7. Get Analytics
```http
GET /api/homepage-content/analytics
Authorization: Bearer {jwt_token}
```
**Description:** Retrieves homepage analytics and metrics.

#### 8. Update Hero Section
```http
PUT /api/homepage-content/hero
Authorization: Bearer {jwt_token}
Content-Type: application/json
```
**Request Body:**
```json
{
  "title": "New Hero Title",
  "subtitle": "Updated subtitle",
  "ctaText": "Get Started",
  "ctaLink": "/contact",
  "backgroundImage": "https://example.com/image.jpg"
}
```

#### 9. Create Activity
```http
POST /api/homepage-content/activities
Authorization: Bearer {jwt_token}
Content-Type: application/json
```
**Request Body:**
```json
{
  "title": "New Activity",
  "description": "Activity description",
  "iconClass": "fas fa-cog",
  "color": "#1976d2",
  "isFeatured": true
}
```

#### 10. Update Activity
```http
PUT /api/homepage-content/activities/{id}
Authorization: Bearer {jwt_token}
Content-Type: application/json
```
**Request Body:**
```json
{
  "title": "Updated Activity",
  "description": "Updated description"
}
```

#### 11. Delete Activity
```http
DELETE /api/homepage-content/activities/{id}
Authorization: Bearer {jwt_token}
```

#### 12. Reorder Activities
```http
PUT /api/homepage-content/activities/reorder
Authorization: Bearer {jwt_token}
Content-Type: application/json
```
**Request Body:**
```json
{
  "itemIds": [3, 1, 2, 4, 5, 6]
}
```

#### 13. Create Outcome
```http
POST /api/homepage-content/outcomes
Authorization: Bearer {jwt_token}
Content-Type: application/json
```
**Request Body:**
```json
{
  "title": "New Outcome",
  "description": "Outcome description",
  "iconClass": "fas fa-chart-bar"
}
```

#### 14. Update Outcome
```http
PUT /api/homepage-content/outcomes/{id}
Authorization: Bearer {jwt_token}
Content-Type: application/json
```
**Request Body:**
```json
{
  "title": "Updated Outcome",
  "description": "Updated description"
}
```

#### 15. Delete Outcome
```http
DELETE /api/homepage-content/outcomes/{id}
Authorization: Bearer {jwt_token}
```

#### 16. Reorder Outcomes
```http
PUT /api/homepage-content/outcomes/reorder
Authorization: Bearer {jwt_token}
Content-Type: application/json
```
**Request Body:**
```json
{
  "itemIds": [2, 1, 3, 4, 5, 6]
}
```

#### 17. Update Section Content
```http
PUT /api/homepage-content/{section}
Authorization: Bearer {jwt_token}
Content-Type: application/json
```
**Path Parameters:**
- `section`: Section type (`ACTIVITIES`, `OUTCOMES`, `MONITORING`, `ETHICS`)

**Request Body:**
```json
{
  "title": "Updated Section Title",
  "description": "Updated section description",
  "backgroundColor": "#f0f0f0"
}
```

---

## 📊 **Response Format**

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

---

## 🛠️ **Frontend Integration Code Examples**

### 1. Service Layer (homeService.js)
```javascript
const API_BASE_URL = 'http://localhost:8000/api';

class HomeService {
  // Get JWT token from localStorage
  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // Get all homepage content
  async getAllContent() {
    const response = await fetch(`${API_BASE_URL}/homepage-content`);
    return await response.json();
  }

  // Get hero section
  async getHeroContent() {
    const response = await fetch(`${API_BASE_URL}/homepage-content/hero`);
    return await response.json();
  }

  // Get activities
  async getActivities() {
    const response = await fetch(`${API_BASE_URL}/homepage-content/activities`);
    return await response.json();
  }

  // Get outcomes
  async getOutcomes() {
    const response = await fetch(`${API_BASE_URL}/homepage-content/outcomes`);
    return await response.json();
  }

  // Search content
  async searchContent(query) {
    const response = await fetch(`${API_BASE_URL}/homepage-content/search?q=${encodeURIComponent(query)}`);
    return await response.json();
  }

  // Admin: Update hero content
  async updateHeroContent(heroData) {
    const response = await fetch(`${API_BASE_URL}/homepage-content/hero`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders()
      },
      body: JSON.stringify(heroData)
    });
    return await response.json();
  }

  // Admin: Create activity
  async createActivity(activityData) {
    const response = await fetch(`${API_BASE_URL}/homepage-content/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders()
      },
      body: JSON.stringify(activityData)
    });
    return await response.json();
  }

  // Admin: Update activity
  async updateActivity(id, activityData) {
    const response = await fetch(`${API_BASE_URL}/homepage-content/activities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders()
      },
      body: JSON.stringify(activityData)
    });
    return await response.json();
  }

  // Admin: Delete activity
  async deleteActivity(id) {
    const response = await fetch(`${API_BASE_URL}/homepage-content/activities/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return await response.json();
  }

  // Admin: Reorder activities
  async reorderActivities(itemIds) {
    const response = await fetch(`${API_BASE_URL}/homepage-content/activities/reorder`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders()
      },
      body: JSON.stringify({ itemIds })
    });
    return await response.json();
  }

  // Admin: Create outcome
  async createOutcome(outcomeData) {
    const response = await fetch(`${API_BASE_URL}/homepage-content/outcomes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders()
      },
      body: JSON.stringify(outcomeData)
    });
    return await response.json();
  }

  // Admin: Update outcome
  async updateOutcome(id, outcomeData) {
    const response = await fetch(`${API_BASE_URL}/homepage-content/outcomes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders()
      },
      body: JSON.stringify(outcomeData)
    });
    return await response.json();
  }

  // Admin: Delete outcome
  async deleteOutcome(id) {
    const response = await fetch(`${API_BASE_URL}/homepage-content/outcomes/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return await response.json();
  }

  // Admin: Get analytics
  async getAnalytics() {
    const response = await fetch(`${API_BASE_URL}/homepage-content/analytics`, {
      headers: this.getAuthHeaders()
    });
    return await response.json();
  }

  // Authentication
  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    return await response.json();
  }
}

export default new HomeService();
```

### 2. React Component Integration (Home.jsx)
```jsx
import React, { useState, useEffect } from 'react';
import HomeService from '../services/homeService';

const Home = () => {
  const [homepageContent, setHomepageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomepageContent = async () => {
      try {
        setLoading(true);
        const response = await HomeService.getAllContent();
        if (response.success) {
          setHomepageContent(response.data);
        } else {
          setError(response.message || 'Failed to load homepage content');
        }
      } catch (err) {
        setError('Network error: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageContent();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!homepageContent) return <div>No content available</div>;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection hero={homepageContent.hero} />
      
      {/* Activities Section */}
      <ActivitiesSection activities={homepageContent.activities} />
      
      {/* Outcomes Section */}
      <OutcomesSection outcomes={homepageContent.outcomes} />
      
      {/* Monitoring Section */}
      <MonitoringSection monitoring={homepageContent.monitoring} />
      
      {/* Ethics Section */}
      <EthicsSection ethics={homepageContent.ethics} />
    </div>
  );
};

export default Home;
```

### 3. Hero Component with Search
```jsx
import React, { useState } from 'react';
import HomeService from '../services/homeService';

const HeroSection = ({ hero }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setIsSearching(true);
      const response = await HomeService.searchContent(searchQuery);
      if (response.success) {
        setSearchResults(response.data.results);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="hero-section" style={{ backgroundImage: `url(${hero.background_image})` }}>
      <div className="hero-content">
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
        
        {hero.search_enabled && (
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder={hero.search_placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
            />
            <button type="submit" disabled={isSearching}>
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </form>
        )}
        
        <a href={hero.cta_link} className="cta-button">
          {hero.cta_text}
        </a>
      </div>
      
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map(result => (
            <div key={result.id} className="search-result">
              <h3>{result.title}</h3>
              <p>{result.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
```

---

## 🔧 **Important Notes**

### 1. **CORS Configuration**
The backend is configured to accept requests from your frontend origin.

### 2. **Error Handling**
All endpoints return consistent error responses. Always check the `success` field in responses.

### 3. **Authentication**
- Admin endpoints require JWT token in `Authorization` header
- Token format: `Bearer {token}`
- Get token from login endpoint first

### 4. **Data Structure**
All endpoints return data in the exact format shown in the examples. The structure matches your existing frontend expectations.

### 5. **Performance**
- Use the complete homepage content endpoint (`GET /api/homepage-content`) for initial page load
- Use individual section endpoints for updates or admin operations

---

## 📚 **Testing**

### Example Test Command
```bash
# Test public endpoint
curl -X GET "http://localhost:8000/api/homepage-content"

# Test admin endpoint (replace TOKEN with actual JWT)
curl -X PUT "http://localhost:8000/api/homepage-content/hero" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

---

## 🚀 **Ready for Integration**

✅ **All 17 endpoints implemented and tested**  
✅ **Authentication system working**  
✅ **Database integration complete**  
✅ **Sample data populated**  
✅ **Error handling implemented**  
✅ **CORS configured**  

Your frontend team can now integrate these endpoints to make the homepage fully dynamic while maintaining all existing animations and styling.

---

**Last Updated:** July 5, 2025  
**API Status:** Production Ready  
**Backend URL:** http://localhost:8000/api
