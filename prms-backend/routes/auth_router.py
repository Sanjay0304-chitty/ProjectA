from fastapi import APIRouter, Depends, status, HTTPException
from typing import Dict, Any
from services.user_service import UserService
from services.storage_service import StorageService

router = APIRouter()

# Dependency function (Simplified DI)
def get_user_service() -> UserService:
    # Placeholder for dependency resolution
    try:
        from main import user_service_instance # Assume this is set up in main.py
        return user_service_instance
    except ImportError:
        # Fallback
        storage = StorageService(base_path="./data")
        repo = UserRepository(storage_service=storage)
        return UserService(repo)

@router.post("/register", response_model=Dict[str, Any])
def register_user_endpoint(
    user_type: str, 
    data: Dict[str, Any], 
    service: UserService = Depends(get_user_service)
):
    """
    Handles user registration for Tenants and Landlords (Task 009).
    """
    try:
        return service.register_user(user_type, data)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.post("/login", response_model=Dict[str, str])
def login_user_endpoint(
    email: str, 
    password: str, 
    service: UserService = Depends(get_user_service)
):
    """
    Authenticates a user by email and password (Task 010).
    Returns a minimal user token/ID and role.
    """
    try:
        return service.login_user(email, password)
    except ValueError as e:
        # Generic error message for security
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials.")


@router.post("/logout")
def logout_user_endpoint(user_id: str, service: UserService = Depends(get_user_service)):
    """
    Handles user logout (Task 011).
    """
    if service.logout_user(user_id):
        return {"message": "Logout successful."}
    raise HTTPException(status_code=404, detail="User not found.")