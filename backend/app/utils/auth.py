from fastapi import HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import os

security = HTTPBasic()


def verify_admin_credentials(credentials: HTTPBasicCredentials) -> bool:
    """Verify admin credentials against environment variables."""
    username = os.getenv("ADMIN_USERNAME", "root")
    password = os.getenv("ADMIN_PASSWORD", "root")
    
    return (
        credentials.username == username and
        credentials.password == password
    )


def get_current_admin(credentials: HTTPBasicCredentials):
    """Get current admin if authenticated."""
    if not verify_admin_credentials(credentials):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return {"username": credentials.username}

