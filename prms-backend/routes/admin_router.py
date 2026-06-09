from fastapi import APIRouter, Depends, status, HTTPException
from typing import Dict, Any, List
from services.user_service import UserService
from utils.auth_utils import require_role

router = APIRouter()

# Dependency injection for core services (using stubs for now)
def get_user_service() -> UserService:
    # Placeholder for DI - relies on module-level setup in main.py
    from main import user_service_instance 
    return user_service_instance

@router.get("/dashboard_config", response_model=Dict[str, Any])
@Depends(require_role("Administrator"))
def get_cms_settings(service: UserService = Depends(get_user_service)):
    """
    Admin endpoint to retrieve global application settings (Task 018).
    The implementation currently returns hardcoded values to simulate CMS data retrieval.
    """
    print("Fetching global CMS configuration...")
    return {
        "global_notifications": True,
        "default_service_fee_percent": 1.5,
        "allowed_property_types": ["apartment", "house", "condo"]
    }

@router.put("/cms/settings")
@Depends(require_role("Administrator"))
def update_cms_settings(settings: Dict[str, Any], service: UserService = Depends(get_user_service)):
    """
    Admin endpoint to update global application settings (Task 018).
    This endpoint is a stub and merely logs the update attempt.
    """
    print(f"Attempting to update CMS settings: {settings}")
    return {"message": "Settings updated successfully (Stub response)."}

@router.get("/users/all", response_model=List[Dict[str, Any]])
@Depends(require_role("Administrator"))
def list_all_users(service: UserService = Depends(get_user_service)):
    """
    Admin endpoint to view all registered users (Task 018).
    This endpoint currently returns mock data, simulating database access.
    """
    print("Fetching all users for administrative oversight...")
    # Real implementation would use UserService.list_all_users()
    return [{"id": "u001", "email": "a@b.com", "role": "Tenant"}, {"id": "u003", "email": "c@d.com", "role": "Administrator"}]