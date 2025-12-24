from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, SessionLocal
from .routers import blogs, admin, config
from .models import Blog

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Blog API",
    description="API for configurable blog starter",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(blogs.router)
app.include_router(admin.router)
app.include_router(config.router)


def init_mock_blogs():
    """Initialize database with 3 mock blog posts if database is empty."""
    db = SessionLocal()
    try:
        # Check if there are any blogs
        blog_count = db.query(Blog).count()
        
        if blog_count == 0:
            # Create 3 mock blog posts
            mock_blogs = [
                Blog(
                    title="Getting Started with Next.js 14",
                    date="2024-01-15",
                    content="<p>Next.js 14 brings exciting new features including the App Router, Server Components, and improved performance. In this post, we'll explore how to get started with the latest version of Next.js and build modern web applications.</p><p>The new App Router provides a more intuitive file-based routing system, while Server Components enable us to render components on the server for better performance and SEO.</p>",
                    excerpt="Next.js 14 introduces groundbreaking features that revolutionize how we build React applications. The new App Router provides a more intuitive file-based routing system, while Server Components enable us to render components on the server for better performance and SEO.",
                    image_url="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop"
                ),
                Blog(
                    title="Mastering Tailwind CSS",
                    date="2024-01-10",
                    content="<p>Tailwind CSS is a utility-first CSS framework that allows you to rapidly build custom user interfaces. Learn how to leverage its powerful features to create responsive and beautiful designs without leaving your HTML.</p><p>Tailwind CSS has transformed the way developers approach styling in modern web development. This utility-first framework eliminates the need to write custom CSS by providing a comprehensive set of utility classes.</p>",
                    excerpt="Tailwind CSS has transformed the way developers approach styling in modern web development. This utility-first framework eliminates the need to write custom CSS by providing a comprehensive set of utility classes that can be combined to create any design.",
                    image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop"
                ),
                Blog(
                    title="TypeScript Best Practices",
                    date="2024-01-05",
                    content="<p>TypeScript adds static type checking to JavaScript, making your code more maintainable and less error-prone. Discover best practices for using TypeScript in your projects, from type definitions to advanced patterns.</p><p>TypeScript has become an essential tool for building large-scale JavaScript applications. By adding static type checking, TypeScript helps catch errors at compile time, improves code readability, and enhances developer experience.</p>",
                    excerpt="TypeScript has become an essential tool for building large-scale JavaScript applications. By adding static type checking, TypeScript helps catch errors at compile time, improves code readability, and enhances developer experience through better IDE support.",
                    image_url="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop"
                )
            ]
            
            for blog in mock_blogs:
                db.add(blog)
            
            db.commit()
            print("✓ Initialized database with 3 mock blog posts")
        else:
            print(f"✓ Database already contains {blog_count} blog post(s)")
    except Exception as e:
        print(f"✗ Error initializing mock blogs: {e}")
        db.rollback()
    finally:
        db.close()


@app.on_event("startup")
async def startup_event():
    """Initialize mock blogs on application startup."""
    init_mock_blogs()


@app.get("/")
def root():
    return {"message": "Blog API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}

