# Homepage Management API Documentation

## Overview
This document provides comprehensive documentation for the Homepage Management API integration in the UDOM STEM Education Admin Dashboard. It covers all GET endpoints, data structures, error handling, and implementation details.

## API Base Configuration

### Base URL
```
/api
```

### Authentication
All API endpoints require JWT authentication via the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Request/Response Format
- **Content-Type:** `application/json`
- **Accept:** `application/json`

## GET Endpoints Implementation

### 1. Get All Homepage Content
**Function:** `getHomepageContent(params)`
**Endpoint:** `GET /homepage-content`
**File:** `src/utils/homeService.js`

**Parameters:**
- `section` (optional): Filter by specific section
- `published` (optional): Filter by published status
- `featured` (optional): Filter featured content only

**Usage:**
```javascript
// Get all homepage content
const content = await getHomepageContent();

// Get specific section
const heroContent = await getHomepageContent({ section: 'hero' });

// Get published content only
const publishedContent = await getHomepageContent({ published: true });
```

**Response Structure:**
```javascript
{
  success: true,
  data: {
    hero: { /* Hero section data */ },
    activities: { /* Activities section data */ },
    outcomes: { /* Outcomes section data */ },
    monitoring: { /* Monitoring section data */ },
    ethics: { /* Ethics section data */ }
  }
}
```

### 2. Get Hero Section
**Function:** `getHeroContent()`
**Endpoint:** `GET /homepage-content?section=hero`

**Response Data Structure:**
```javascript
{
  id: 1,
  title: "string",
  subtitle: "string",
  background_image: "string",
  background_gradient: "string",
  cta_text: "string",
  cta_link: "string",
  search_placeholder: "string",
  search_enabled: boolean,
  animations: {
    floating_elements: boolean,
    gradient_overlay: boolean
  },
  is_published: boolean,
  created_at: "ISO_DATE_STRING",
  updated_at: "ISO_DATE_STRING"
}
```

### 3. Get Activities Section
**Function:** `getActivitiesContent(params)`
**Endpoint:** `GET /homepage-content?section=activities`

**Response Data Structure:**
```javascript
{
  id: 2,
  title: "string",
  subtitle: "string",
  background_color: "string",
  activities: [
    {
      id: 1,
      title: "string",
      description: "string",
      icon_class: "string",
      color: "string",
      order: number,
      is_featured: boolean,
      is_published: boolean,
      additional_info: "string",
      link: "string",
      created_at: "ISO_DATE_STRING",
      updated_at: "ISO_DATE_STRING"
    }
  ],
  created_at: "ISO_DATE_STRING",
  updated_at: "ISO_DATE_STRING"
}
```

### 4. Get Outcomes Section
**Function:** `getOutcomesContent()`
**Endpoint:** `GET /homepage-content?section=outcomes`

**Response Data Structure:**
```javascript
{
  id: 3,
  title: "string",
  description: "string",
  background_color: "string",
  content_background: "string",
  outcomes: [
    {
      id: 1,
      title: "string",
      description: "string",
      icon_class: "string",
      order: number,
      is_published: boolean,
      metrics: {
        target: "string",
        current: "string",
        percentage: number
      },
      created_at: "ISO_DATE_STRING",
      updated_at: "ISO_DATE_STRING"
    }
  ],
  created_at: "ISO_DATE_STRING",
  updated_at: "ISO_DATE_STRING"
}
```

### 5. Get Monitoring Section
**Function:** `getMonitoringContent()`
**Endpoint:** `GET /homepage-content?section=monitoring`

**Response Data Structure:**
```javascript
{
  id: 4,
  title: "string",
  description: "string",
  background_color: "string",
  monitoring_aspects: [
    {
      id: 1,
      title: "string",
      description: "string",
      icon_class: "string",
      is_active: boolean,
      additional_info: "string",
      metrics: {
        current: number,
        target: number
      },
      created_at: "ISO_DATE_STRING",
      updated_at: "ISO_DATE_STRING"
    }
  ],
  created_at: "ISO_DATE_STRING",
  updated_at: "ISO_DATE_STRING"
}
```

### 6. Get Ethics Section
**Function:** `getEthicsContent()`
**Endpoint:** `GET /homepage-content?section=ethics`

**Response Data Structure:**
```javascript
{
  id: 5,
  title: "string",
  description: "string",
  background_color: "string",
  ethics_principles: [
    {
      id: 1,
      title: "string",
      description: "string",
      icon_class: "string",
      is_active: boolean,
      additional_info: "string",
      guidelines: ["string"],
      compliance_level: number,
      priority: "string",
      created_at: "ISO_DATE_STRING",
      updated_at: "ISO_DATE_STRING"
    }
  ],
  created_at: "ISO_DATE_STRING",
  updated_at: "ISO_DATE_STRING"
}
```

## Utility Functions

### Error Handling
**Function:** `handleApiError(error, defaultMessage)`

**Usage:**
```javascript
try {
  const content = await getHomepageContent();
} catch (error) {
  const errorInfo = handleApiError(error, 'Failed to load content');
  console.error(errorInfo);
}
```

**Error Response Format:**
```javascript
{
  status: number,
  message: "string",
  details: object | null
}
```

### Loading State Management
**Function:** `isContentLoading(content)`

**Usage:**
```javascript
const isLoading = isContentLoading(homepageData.hero);
```

### Default Content
**Function:** `getDefaultHomepageContent()`

**Returns:** Complete default content structure for fallback scenarios

## Component Integration

### Hero Component Integration
**File:** `src/components/Hero.jsx`

**Props:**
- `heroData`: Hero section data from API
- `isLoading`: Loading state boolean
- `error`: Error object if any
- `onSearch`: Search handler function

**Features:**
- Dynamic title, subtitle, and description
- Background image/gradient support
- Search functionality
- CTA button with linking
- Framer Motion animations
- Loading states and error handling

### Activities Component Integration
**File:** `src/components/Activities.jsx`

**Props:**
- `activitiesData`: Activities section data from API
- `isLoading`: Loading state boolean
- `error`: Error object if any

**Features:**
- Grid-based activity display
- Dynamic icon and color mapping
- Card hover animations
- Featured content highlighting
- Link support for external resources

### Outcomes Component Integration
**File:** `src/components/Outcomes.jsx`

**Props:**
- `outcomesData`: Outcomes section data from API
- `isLoading`: Loading state boolean
- `error`: Error object if any

**Features:**
- Progress tracking with animated progress bars
- Metrics display (current/target values)
- Status indicators (active/pending)
- Summary statistics calculation

### Monitoring Component Integration
**File:** `src/components/Monitoring.jsx`

**Props:**
- `monitoringData`: Monitoring section data from API
- `isLoading`: Loading state boolean
- `error`: Error object if any

**Features:**
- KPI dashboard display
- Monitoring aspects grid
- Real-time progress indicators
- Completion rate calculations

### Ethics Component Integration
**File:** `src/components/Ethics.jsx`

**Props:**
- `ethicsData`: Ethics section data from API
- `isLoading`: Loading state boolean
- `error`: Error object if any

**Features:**
- Ethical principles showcase
- Compliance level tracking
- Priority level indicators
- Guidelines display

## Home Page Implementation
**File:** `src/pages/Home.jsx`

**Features:**
- Complete dynamic homepage integration
- API data fetching with error handling
- Section-by-section loading
- Retry mechanism with counter
- Search functionality
- Loading overlay with progress indication
- Error banner with retry options

**State Management:**
```javascript
const [homepageData, setHomepageData] = useState(getDefaultHomepageContent());
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
const [retryCount, setRetryCount] = useState(0);
```

## Error Handling Strategy

### API Error Types
1. **Network Errors:** Connection issues, timeout
2. **Server Errors:** 500, 502, 503 responses
3. **Authentication Errors:** 401, 403 responses
4. **Data Errors:** Invalid response format
5. **Not Found Errors:** 404 responses

### Error Recovery
- **Automatic Retry:** Network errors with exponential backoff
- **Fallback Content:** Default content when API fails
- **User Feedback:** Clear error messages and retry options
- **Graceful Degradation:** Components still render with fallback data

## Performance Optimizations

### Caching Strategy
- **Component State:** Cache API responses in component state
- **Default Content:** Pre-loaded fallback content
- **Lazy Loading:** Load content on viewport intersection

### Loading Optimization
- **Skeleton Screens:** Show content structure while loading
- **Progressive Loading:** Load sections independently
- **Error Boundaries:** Prevent component crashes

### Memory Management
- **Cleanup:** Clear state on component unmount
- **Debouncing:** Prevent excessive API calls
- **Memoization:** Cache expensive calculations

## Security Considerations

### Authentication
- JWT token validation for all requests
- Token refresh handling
- Secure token storage

### Data Validation
- Input sanitization
- XSS protection
- CSRF protection

### Error Information
- Sanitized error messages
- No sensitive data exposure
- Proper error logging

## Testing Strategy

### Unit Tests
- API function testing
- Component rendering tests
- Error handling validation

### Integration Tests
- API integration testing
- Component interaction tests
- Error scenario testing

### Manual Testing
- User interface testing
- Responsive design validation
- Performance testing

## Deployment Considerations

### Environment Variables
- API base URL configuration
- Authentication settings
- Feature flags

### Build Optimization
- Code splitting
- Bundle size optimization
- Asset optimization

### Monitoring
- API performance monitoring
- Error tracking
- User analytics

---
**Last Updated:** 2024-01-15
**Version:** 1.0.0
**Author:** Homepage Management Implementation Team
