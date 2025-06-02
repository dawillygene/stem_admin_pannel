# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



## Approve User Endpoint
**Endpoint:** `POST /api/admin/approve-user`
**Authorization Required:**
- Users with or roles `ROLE_ADMIN``ROLE_SUPER_ADMIN`

**Request Body:**
``` json
{
  "userId": 123
}
```
**Successful Response (200 OK):**
``` json
{
  "message": "User has been approved successfully"
}
```
**Error Responses:**
- **404 Not Found**: When the user ID doesn't exist
``` json
  {
    "message": "User not found with ID: 123"
  }
```
- **500 Internal Server Error**: For unexpected server errors
``` json
  {
    "message": "An error occurred while approving the user: [error details]"
  }
```
**Description:** This endpoint allows administrators to approve a user account, which enables the user to log in to the system. When a user is approved, their status is set to `true`. `approved`
## Suspend User Endpoint
**Endpoint:** `POST /api/admin/suspend-user`
**Authorization Required:**
- Users with or roles `ROLE_ADMIN``ROLE_SUPER_ADMIN`

**Request Body:**
``` json
{
  "userId": 123
}
```
**Successful Response (200 OK):**
``` json
{
  "message": "User has been suspended successfully"
}
```
**Error Responses:**
- **404 Not Found**: When the user ID doesn't exist
``` json
  {
    "message": "User not found with ID: 123"
  }
```
- **500 Internal Server Error**: For unexpected server errors
``` json
  {
    "message": "An error occurred while suspending the user: [error details]"
  }
```