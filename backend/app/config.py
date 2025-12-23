import yaml
import os
from pathlib import Path
from typing import Dict, Any

# Get config file path
CONFIG_PATH = os.getenv(
    "BLOG_CONFIG_PATH",
    str(Path(__file__).parent.parent.parent / "config" / "blog-config.yaml")
)


def load_config() -> Dict[str, Any]:
    """Load blog configuration from YAML file."""
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            config = yaml.safe_load(f)
        return config or {}
    except FileNotFoundError:
        print(f"Config file not found at {CONFIG_PATH}")
        return {}
    except yaml.YAMLError as e:
        print(f"Error parsing YAML config: {e}")
        return {}


# Load config at module level
blog_config = load_config()


def get_config() -> Dict[str, Any]:
    """Get current blog configuration."""
    return blog_config


def reload_config() -> Dict[str, Any]:
    """Reload configuration from file."""
    global blog_config
    blog_config = load_config()
    return blog_config

