from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import blogs, admin, config

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


@app.get("/")
def root():
    return {"message": "Blog API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}

