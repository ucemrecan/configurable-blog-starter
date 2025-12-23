from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# Blog Schemas
class BlogBase(BaseModel):
    title: str = Field(..., min_length=1)
    content: str = Field(..., min_length=1)
    excerpt: Optional[str] = None
    image_url: Optional[str] = None
    date: str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$")


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1)
    content: Optional[str] = Field(None, min_length=1)
    excerpt: Optional[str] = None
    image_url: Optional[str] = None
    date: Optional[str] = Field(None, pattern=r"^\d{4}-\d{2}-\d{2}$")


class BlogResponse(BlogBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Admin Schemas
class AdminLogin(BaseModel):
    username: str
    password: str


class AdminResponse(BaseModel):
    username: str
    authenticated: bool = True


# Config Schemas
class BlogConfig(BaseModel):
    name: str
    description: str
    profile_image: str


class AboutConfig(BaseModel):
    bio: str
    skills: list[str]
    experience: str


class ContactConfig(BaseModel):
    email: str
    social_media: dict[str, str]


class ConfigResponse(BaseModel):
    blog: BlogConfig
    about: AboutConfig
    contact: ContactConfig


class ConfigUpdate(BaseModel):
    blog: Optional[BlogConfig] = None
    about: Optional[AboutConfig] = None
    contact: Optional[ContactConfig] = None

