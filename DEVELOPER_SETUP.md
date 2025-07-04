# Developer Setup Guide

## Quick Start

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://192.168.1.150:8000/api/

## Test Credentials

**Super Admin Account:**
- Username: `superadmin`
- Password: `superadmin123`
- Role: SUPER_ADMIN (full access)

## Authentication Flow

1. **Login**: Navigate to http://localhost:5173/auth/login
2. **Enter credentials** above
3. **Access About Management**: http://localhost:5173/about

## API Endpoints

The backend provides these About Management endpoints:

- `GET /api/about-content` - Get all about content
- `PUT /api/about-content/background` - Update background section
- `POST /api/about-content/benefits` - Create new benefit
- `PUT /api/about-content/benefits/{id}` - Update benefit
- `DELETE /api/about-content/benefits/{id}` - Delete benefit
- `PUT /api/about-content/justification` - Update justification
- `PUT /api/about-content/objectives` - Update objectives
- `GET /api/about-content/analytics` - Get analytics data
- `GET /api/about-content/export` - Export content

## Troubleshooting

**401 Unauthorized Error:**
- You need to login first at `/auth/login`
- Use the test credentials above

**500 Internal Server Error:**
- Check if backend is running at http://192.168.1.150:8000
- Verify API endpoint exists
- Check server logs

**Network Error:**
- Verify network connection
- Check if backend server is accessible
- Confirm proxy settings in vite.config.js

## About Management Features

✅ **Implemented:**
- Complete CRUD operations for all sections
- Tabbed interface (Overview, Background, Benefits, Justification, Objectives, Analytics)
- Search functionality
- Modal-based editing
- Export functionality
- Analytics dashboard
- Role-based access control
- Toast notifications
- Error handling with authentication redirects

✅ **Backend Data Structure:**
- Background: Title, content, sections, CTA
- Benefits: List of benefits with icons and descriptions
- Justification: Content, conclusion, references
- Objectives: Introduction, specific objectives, conclusion
- Analytics: Usage statistics and metrics

## Testing the Implementation

1. Login with test credentials
2. Navigate to About Management
3. Test each tab (Overview, Background, Benefits, etc.)
4. Try editing content through modals
5. Test search functionality
6. Export content data
7. View analytics data

All features should work seamlessly with the backend API.
