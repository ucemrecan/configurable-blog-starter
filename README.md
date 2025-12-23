# Configurable Blog Starter

A configurable personal blog starter built with Next.js, FastAPI, and Docker. This project allows you to easily set up and customize your blog through a simple YAML configuration file. The blog features a clean, modern design with an admin panel for content management.

## Features

- **Configurable Setup**: Customize your blog name, description, profile image, about section, and contact information through a YAML configuration file
- **Blog Management**: Create, edit, and delete blog posts through the admin panel
- **Rich Text Editor**: Use React Quill for creating blog content with formatting options
- **Image Upload**: Upload and manage images for blog posts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Docker Support**: Run the entire stack with Docker Compose
- **Nginx Gateway**: Single port access with Nginx as reverse proxy

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, React 18
- **Backend**: FastAPI, SQLite, SQLAlchemy
- **Infrastructure**: Docker, Docker Compose, Nginx
- **Tools**: Makefile for project management

## Screenshots

<!-- Screenshots will be added here -->
<!-- Example format:
![Blog Homepage](screenshots/blog-homepage.png)
![Admin Panel](screenshots/admin-panel.png)
![Blog Post](screenshots/blog-post.png)
-->

## Prerequisites
å
- Docker and Docker Compose
- Make (optional, for convenience commands)

## Quick Start

### Step 1: Clone the Repository

```bash
git clone git@github.com:ucemrecan/configurable-blog-starter.git
cd configurable-blog-starter
```

### Step 2: Set Up Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit the `.env` file and set your admin credentials:

```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

### Step 3: Configure Your Blog

#### Add Profile Image

Place your profile image in the `client/public/` directory. Supported formats: JPG, PNG, SVG, WebP.

For example, if you add `profile.jpg`, you would reference it as `/profile.jpg` in the config.

#### Edit Configuration

Edit `config/blog-config.yaml` to customize your blog:

```yaml
blog:
  name: "Your Name"
  description: "Your blog description"
  profile_image: "/profile.svg" # Path to your image in client/public/

about:
  bio: "Your bio"
  skills:
    - "Skill 1"
    - "Skill 2"
  experience: "Your experience"

contact:
  email: "your@email.com"
  social_media:
    twitter: "https://twitter.com/yourhandle"
    github: "https://github.com/yourusername"
    linkedin: "https://linkedin.com/in/yourprofile"
```

**Note**: The `profile_image` path should start with `/` and reference a file in the `client/public/` directory.

### Step 4: Start the Project

#### Option 1: Using Make (Recommended)

```bash
make setup    # First time setup (creates .env from .env.example)
make dev      # Start development environment
```

#### Option 2: Using Docker Compose

```bash
docker-compose up --build
```

The blog will be available at [http://localhost](http://localhost)

### Step 5: Access Admin Panel

Navigate to [http://localhost/admin](http://localhost/admin) and log in with your admin credentials.

## Project Structure

```
configurable-blog-starter/
├── client/              # Next.js frontend application
├── backend/             # FastAPI backend application
├── nginx/               # Nginx configuration
├── config/              # Blog configuration (YAML)
├── docker-compose.yml   # Docker Compose configuration
├── Makefile             # Make commands for project management
└── .env.example         # Environment variables template
```

## Available Make Commands

- `make setup` - Initial setup (creates .env file)
- `make install` - Install all dependencies
- `make dev` - Start development environment
- `make up` - Start all services
- `make down` - Stop all services
- `make logs` - View logs from all services
- `make clean` - Clean build artifacts
- `make help` - Show all available commands

## Configuration

The blog is fully configurable through `config/blog-config.yaml`. You can customize:

- Blog name and description
- Profile image (place files in `client/public/` directory)
- About section (bio, skills, experience)
- Contact information (email, social media links)

### Profile Image

To add a custom profile image:

1. Place your image file (JPG, PNG, SVG, or WebP) in the `client/public/` directory
2. Update the `profile_image` field in `config/blog-config.yaml` with the path starting with `/`

Example:

- File location: `client/public/my-photo.jpg`
- Config value: `profile_image: "/my-photo.jpg"`

Changes to the configuration file require restarting the services.

## Admin Panel

The admin panel allows you to:

- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- Upload images for blog posts
- Use a rich text editor for content creation

Access the admin panel at `/admin` and log in with your configured credentials.

## Development

For local development without Docker:

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend (in another terminal)
cd client
yarn install
yarn dev
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Guidelines

- Follow the existing code style and conventions
- Write clear commit messages
- Add comments for complex logic
- Test your changes before submitting
- Update documentation if needed

### Reporting Issues

If you find a bug or have a suggestion, please open an issue on GitHub with:

- A clear description of the problem or suggestion
- Steps to reproduce (if it's a bug)
- Expected behavior
- Your environment (OS, Docker version, etc.)

Thank you for contributing!
