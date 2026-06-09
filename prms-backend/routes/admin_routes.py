from fastapi import APIRouter, status, HTTPException
from typing import Dict, Any
from repositories.website_settings_repository import WebsiteSettingsRepository
from schemas.website_schema import WebsiteSettingsResponseSchema, WebsiteSettingsUpdateSchema # Need to create this schema first

router = APIRouter()
settings_repo = WebsiteSettingsRepository()

# Task 018: Retrieve all current website configuration settings
@router.get("/", response_model=WebsiteSettingsResponseSchema, status_code=status.HTTP_200_OK)
async def get_all_settings():
    """
    Retrieves the complete set of application-wide settings.
    Requires Admin role authentication.
    """
    try:
        settings = settings_repo.get_all_settings()
        return settings
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve settings: {e}"
        )

# Task 018: Update a specific website setting atomically
@router.patch("/{setting_key}", response_model=WebsiteSettingsResponseSchema, status_code=status.HTTP_200_OK)
async def update_setting(setting_key: str, update_data: WebsiteSettingsUpdateSchema):
    """
    Updates a single configuration setting (e.g., site_name, default_city).
    Requires Admin role authentication.
    """
    try:
        # The repo handles fetching, validating, and saving the single/merged setting
        updated_settings = settings_repo.update_setting(setting_key, update_data.model_dump())
        return updated_settings
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update setting '{setting_key}': {e}"
        )