# Admin Page Implementation Plan

## Overview
Create an admin panel where users can log in with "root/root" credentials and manage blogs. All operations will be mock for now, backend integration will be done later.

## Implementation Steps

### 1. Admin Login Page
- Create `/admin` route
- Simple login form with username and password fields
- Credentials: username="root", password="root"
- Redirect to admin dashboard on successful login
- Store login state with session/cookie (mock)

### 2. Admin Dashboard Layout
- Use a different layout (no sidebar)
- Admin navbar/header
- Display blog list
- "Add New Blog" button

### 3. Blog Management Components
- **Blog List Component**: List existing blogs with delete button
- **Add/Edit Blog Form**: 
  - Title input
  - Image upload (React Dropzone)
  - Paragraph editor (React Quill)
  - Date picker
  - Save/Cancel buttons

### 4. Image Upload (Dropzone)
- Use React Dropzone library
- Image preview
- Mock upload (no real upload, just URL/local state)

### 5. Text Editor (React Quill)
- Install React Quill library
- Rich text editing features
- Store content in HTML format

## Files to Create

### Pages
- `client/app/admin/page.tsx` - Login page
- `client/app/admin/dashboard/page.tsx` - Admin dashboard
- `client/app/admin/layout.tsx` - Admin layout (without sidebar)

### Components
- `client/components/admin/LoginForm.tsx` - Login form component
- `client/components/admin/BlogList.tsx` - Blog list with delete functionality
- `client/components/admin/BlogForm.tsx` - Add/edit blog form
- `client/components/admin/ImageUpload.tsx` - Dropzone image upload component

### Utilities
- `client/lib/adminAuth.ts` - Mock authentication utilities
- `client/lib/adminStore.ts` - Mock blog management (localStorage or state)

## Dependencies to Add
- `react-dropzone` - For image upload
- `react-quill` - For rich text editor
- `quill` - React Quill dependency

## Design Approach
- Clean, minimal admin interface
- Form validation
- Loading states
- Success/error messages
- Responsive design

## Implementation Todos

1. Install required dependencies (react-dropzone, react-quill, quill)
2. Create admin layout without sidebar
3. Create login page with root/root credentials
4. Create mock authentication utilities
5. Create admin dashboard page with blog list
6. Create BlogForm component with title, image upload (dropzone), and text editor (react-quill)
7. Create BlogList component with delete functionality
8. Create mock blog management store (localStorage or state)
9. Integrate all components and test admin flow

