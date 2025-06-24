# STEM Education Admin Dashboard

A modern, full-featured admin dashboard for managing STEM education content, users, and activities at UDOM (University of Dodoma).

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Author](#author)

---

## Project Overview
This dashboard is designed for administrators and super admins to manage STEM education resources, users, blog content, comments, and system activities. It provides a clean, responsive UI and robust features for day-to-day management and analytics.

## Features
- **User Management:** Approve, suspend, promote, and demote users/admins
- **Blog Management:** Create, edit, delete, and search STEM blog posts
- **Comment Moderation:** Approve/reject comments on blog posts
- **Gallery Management:** Upload and manage STEM-related images
- **Activity Logs:** View, filter, and clean up system/user/content activity logs
- **Profile Management:** Edit personal info, password, notifications, and security settings
- **Role-based Access:** Super Admin and Admin dashboards with protected routes
- **Responsive Design:** Works on desktop and mobile
- **Modern UI:** Built with Tailwind CSS and Framer Motion for smooth animations

## Tech Stack
- **Frontend:** React 19, Vite, React Router 7, Framer Motion, Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** React Icons
- **State/Context:** React Context API
- **API:** RESTful endpoints (see below)

## Project Structure
```
adminDashbord/
├── public/
├── src/
│   ├── App.jsx, App1.jsx, main.jsx
│   ├── index.css
│   ├── Auth/           # Auth pages/components
│   ├── components/     # Reusable UI components
│   ├── Layout/         # Main layout and sidebar
│   ├── pages/          # Main dashboard pages (Home, SuperAdminDashboard, BlogList, etc.)
│   ├── utils/          # API utilities (axios, activityApi, etc.)
│   └── Context/        # App context/provider
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

## Setup & Installation
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd adminDashbord
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or as shown in your terminal).

4. **API Proxy:**
   - The frontend proxies `/api` requests to your backend (see `vite.config.js`).
   - Update the proxy target as needed for your backend server.

## Usage
- **Login:** Use your admin credentials to log in.
- **Navigation:** Use the sidebar to access dashboard sections (Users, Blogs, Gallery, Activity Logs, etc.).
- **Role-based Access:**
  - Super Admins have access to all features, including log cleanup and user role management.
  - Admins have limited access (no log cleanup or admin promotion/demotion).

## API Endpoints (Sample)
- `POST /api/admin/approve-user` — Approve a user
- `POST /api/admin/suspend-user` — Suspend a user
- `GET /api/activity` — Get activity logs
- `GET /api/activity/statistics` — Get activity statistics
- `POST /api/activity/cleanup` — Cleanup old logs (Super Admin only)
- `GET /api/blog/posts` — List blog posts
- `POST /api/blog/posts` — Create a blog post
- `GET /api/gallery` — List gallery items

> See `/src/utils/activityApi.js` and `/vite.config.js` for more API details and proxy setup.

## Author
**Dawollygene ELIA WILLIAM MARIKI**

---

For any questions or contributions, please contact the author or open an issue/pull request.