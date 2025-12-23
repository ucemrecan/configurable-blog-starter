from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBasicCredentials
from ..schemas import ConfigResponse, ConfigUpdate
from ..config import get_config, reload_config
from ..utils.auth import security, get_current_admin
import yaml
from pathlib import Path
import os

router = APIRouter(prefix="/api/config", tags=["config"])


@router.get("", response_model=ConfigResponse)
def get_blog_config():
    """Get blog configuration."""
    config = get_config()
    
    try:
        return ConfigResponse(
            blog=config["blog"],
            about=config["about"],
            contact=config["contact"]
        )
    except KeyError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Missing configuration section: {e}"
        )


@router.put("", response_model=ConfigResponse)
def update_blog_config(
    config_update: ConfigUpdate,
    credentials: HTTPBasicCredentials = Depends(security)
):
    """Update blog configuration (admin only)."""
    # Verify admin
    get_current_admin(credentials)
    
    # Get current config
    current_config = get_config()
    
    # Update config
    if config_update.blog:
        current_config["blog"].update(config_update.blog.model_dump())
    if config_update.about:
        current_config["about"].update(config_update.about.model_dump())
    if config_update.contact:
        current_config["contact"].update(config_update.contact.model_dump())
    
    # Save to YAML file
    CONFIG_PATH = os.getenv(
        "BLOG_CONFIG_PATH",
        str(Path(__file__).parent.parent.parent.parent / "config" / "blog-config.yaml")
    )
    
    try:
        with open(CONFIG_PATH, "w", encoding="utf-8") as f:
            yaml.dump(current_config, f, default_flow_style=False, allow_unicode=True)
        
        # Reload config
        reload_config()
        
        return ConfigResponse(
            blog=current_config["blog"],
            about=current_config["about"],
            contact=current_config["contact"]
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update config: {str(e)}"
        )

