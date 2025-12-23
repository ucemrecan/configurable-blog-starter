# Backend Implementation with FastAPI and Nginx

## Overview
Create a FastAPI backend with SQLite database, Nginx as reverse proxy gateway, and a configurable YAML system for blog setup. The backend will handle blog CRUD operations, admin authentication, and serve blog configuration.

## Architecture

```
┌─────────────┐
│   Client    │
│  (Next.js)  │
└──────┬──────┘
       │
       │ (Port 80/443)
       ▼
┌─────────────┐
│    Nginx    │
│   Gateway   │
└──────┬──────┘
       │
       ├──────────────┬──────────────┐
       ▼              ▼              ▼
┌──────────┐   ┌──────────┐   ┌──────────┐
│ Frontend │   │  Backend │   │  Static  │
│  (Next)  │   │ (FastAPI)│   │  Files   │
└──────────┘   └──────────┘   └──────────┘
                        │
                        ▼
                  ┌──────────┐
                  │ SQLite   │
                  │ Database │
                  └──────────┘
```

## Folder Structure

```
configurable-blog-starter/
├── client/              # Next.js frontend
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py      # FastAPI app
│   │   ├── config.py    # Configuration loader
│   │   ├── database.py  # SQLite setup
│   │   ├── models.py    # SQLAlchemy models
│   │   ├── schemas.py   # Pydantic schemas
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── blogs.py      # Blog CRUD endpoints
│   │   │   ├── admin.py      # Admin auth endpoints
│   │   │   └── config.py     # Config endpoints
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── auth.py       # Authentication utilities
│   ├── requirements.txt
│   └── Dockerfile
├── nginx/
│   ├── nginx.conf        # Nginx configuration
│   └── Dockerfile
├── config/
│   └── blog-config.yaml  # Configurable blog settings
└── docker-compose.yml    # Docker Compose setup
```

## Implementation Steps

### 1. Backend Setup (FastAPI)
- Initialize FastAPI application
- Set up SQLite database with SQLAlchemy
- Create database models (Blog, Admin, Config)
- Create Pydantic schemas for request/response
- Set up CORS for frontend communication

### 2. Database Models
- **Blog Model**: id, title, content, excerpt, image_url, date, created_at, updated_at
- **Admin Model**: id, username, password_hash (for future expansion)
- **Config Model**: key, value (for blog configuration)

### 3. API Endpoints

#### Blog Endpoints (`/api/blogs`)
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/{id}` - Get single blog
- `POST /api/blogs` - Create blog (admin only)
- `PUT /api/blogs/{id}` - Update blog (admin only)
- `DELETE /api/blogs/{id}` - Delete blog (admin only)

#### Admin Endpoints (`/api/admin`)
- `POST /api/admin/login` - Admin login (basic auth)
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/me` - Get current admin info

#### Config Endpoints (`/api/config`)
- `GET /api/config` - Get blog configuration
- `PUT /api/config` - Update blog configuration (admin only)

### 4. Configuration System (YAML)
Create `config/blog-config.yaml`:
```yaml
blog:
  name: "John Doe"
  description: "Full-stack developer passionate about creating beautiful web experiences."
  profile_image: "/profile.svg"
  
about:
  bio: "Full-stack developer..."
  skills:
    - "Full-stack web development"
    - "React & Next.js"
    - "TypeScript"
  experience: "With several years of experience..."
  
contact:
  email: "contact@example.com"
  social_media:
    twitter: "https://twitter.com"
    github: "https://github.com/ucemrecan"
    linkedin: "https://linkedin.com"
    
footer:
  design_inspired_by: "https://dribbble.com/shots/15586970-Personal-Blogging-Portfolio"
  development: "github.com/ucemrecan"
```

### 5. Authentication
- Basic authentication for admin endpoints
- Store admin credentials in config or environment
- Session/cookie management through Nginx

### 6. Nginx Configuration
- Reverse proxy to FastAPI backend
- Serve Next.js static files
- Handle routing:
  - `/api/*` → FastAPI backend
  - `/*` → Next.js frontend
- Single port (80/443) for all services
- Cookie/auth handling

### 7. Docker Setup
- **Backend Dockerfile**: Python 3.11, FastAPI, uvicorn
- **Nginx Dockerfile**: Nginx with custom config
- **docker-compose.yml**: 
  - Nginx service (port 80)
  - Backend service (internal)
  - Frontend build and serve via Nginx

### 8. Database Migrations
- Use Alembic for database migrations
- Initial migration for tables
- Seed data from config YAML

## Files to Create

### Backend
- `backend/app/main.py` - FastAPI application entry point
- `backend/app/config.py` - YAML config loader
- `backend/app/database.py` - SQLite database setup
- `backend/app/models.py` - SQLAlchemy models
- `backend/app/schemas.py` - Pydantic schemas
- `backend/app/routers/blogs.py` - Blog endpoints
- `backend/app/routers/admin.py` - Admin endpoints
- `backend/app/routers/config.py` - Config endpoints
- `backend/app/utils/auth.py` - Authentication utilities
- `backend/requirements.txt` - Python dependencies
- `backend/Dockerfile` - Backend container

### Nginx
- `nginx/nginx.conf` - Nginx reverse proxy config
- `nginx/Dockerfile` - Nginx container

### Configuration
- `config/blog-config.yaml` - Blog configuration file
- `docker-compose.yml` - Docker Compose setup

## Dependencies

### Backend (requirements.txt)
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
pydantic==2.5.0
pydantic-settings==2.1.0
python-multipart==0.0.6
pyyaml==6.0.1
passlib[bcrypt]==1.7.4
python-jose[cryptography]==3.3.0
alembic==1.12.1
```

## Technical Considerations
- SQLite for simplicity (can upgrade to PostgreSQL later)
- YAML config loaded at startup
- Basic auth for admin (simple username/password)
- Nginx handles all routing and static files
- CORS configured for frontend
- Database migrations with Alembic
- Environment variables for sensitive data

## Future Enhancements (Not in Scope)
- PostgreSQL database
- JWT authentication
- Image upload to storage (S3/local)
- Blog categories/tags
- Draft/publish workflow
- Multiple admin users

## Implementation Todos

1. Set up FastAPI project structure and dependencies
2. Create SQLite database setup with SQLAlchemy
3. Create database models (Blog, Config)
4. Create Pydantic schemas for API
5. Create YAML config loader and blog-config.yaml
6. Implement blog CRUD endpoints
7. Implement admin authentication endpoints
8. Implement config endpoints
9. Create Nginx configuration and Dockerfile
10. Create Docker Compose setup with Nginx, backend, and frontend
11. Update frontend to use backend API instead of mock data
12. Test complete flow: config load, blog CRUD, admin auth

