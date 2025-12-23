from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBasicCredentials
from ..schemas import AdminLogin, AdminResponse
from ..utils.auth import security, verify_admin_credentials

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.post("/login", response_model=AdminResponse)
def login(credentials: HTTPBasicCredentials = Depends(security)):
    """Admin login endpoint."""
    if verify_admin_credentials(credentials):
        return AdminResponse(username=credentials.username)
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Basic"},
    )


@router.post("/logout")
def logout():
    """Admin logout endpoint (stateless, just returns success)."""
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=AdminResponse)
def get_current_admin_info(credentials: HTTPBasicCredentials = Depends(security)):
    """Get current admin information."""
    from ..utils.auth import get_current_admin
    admin = get_current_admin(credentials)
    return AdminResponse(username=admin["username"])

