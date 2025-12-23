from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Blog
from ..schemas import BlogCreate, BlogUpdate, BlogResponse
from ..utils.auth import security, get_current_admin

router = APIRouter(prefix="/api/blogs", tags=["blogs"])


@router.get("", response_model=List[BlogResponse])
def get_blogs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all blog posts."""
    blogs = db.query(Blog).offset(skip).limit(limit).all()
    return blogs


@router.get("/{blog_id}", response_model=BlogResponse)
def get_blog(blog_id: int, db: Session = Depends(get_db)):
    """Get a single blog post by ID."""
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog not found"
        )
    return blog


@router.post("", response_model=BlogResponse, status_code=status.HTTP_201_CREATED)
def create_blog(
    blog: BlogCreate,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    """Create a new blog post (admin only)."""
    db_blog = Blog(**blog.model_dump())
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog


@router.put("/{blog_id}", response_model=BlogResponse)
def update_blog(
    blog_id: int,
    blog_update: BlogUpdate,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    """Update a blog post (admin only)."""
    db_blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not db_blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog not found"
        )
    
    update_data = blog_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_blog, field, value)
    
    db.commit()
    db.refresh(db_blog)
    return db_blog


@router.delete("/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_blog(
    blog_id: int,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    """Delete a blog post (admin only)."""
    db_blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not db_blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog not found"
        )
    
    db.delete(db_blog)
    db.commit()
    return None

