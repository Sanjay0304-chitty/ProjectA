from fastapi import APIRouter, status, HTTPException
from typing import List, Dict, Any
from repositories.property_repository import PropertyRepository
from schemas.property_schema import PropertyBase, PropertyListResponse, PropertyDetailResponse

router = APIRouter()
property_repo = PropertyRepository()

# Task 007: Public Property Listing
@router.get("/", response_model=PropertyListResponse, status_code=status.HTTP_200_OK)
async def list_all_properties():
    """
    Returns a list of all available properties in the system.
    """
    try:
        # Retrieve all property records from the CSV storage via the repository
        all_props = property_repo.get_all()
        
        # Convert dictionary data to Pydantic models for consistent output structure
        property_objects = [
            PropertyBase(**props) for props in all_props
        ]
        return PropertyListResponse(properties=property_objects)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve properties: {e}"
        )

# Task 008: Single Property Detail View
@router.post("/", response_model=PropertyDetailResponse, status_code=status.HTTP_201_CREATED)
async def create_property(new_property_data: Dict[str, Any]):
    """
    Allows a verified user (Landlord/Admin) to register a new property.
    In a real app, identity/authorization should be passed via FastAPI dependencies.
    """
    try:
        new_prop = property_repo.create(new_property_data)
        return new_prop
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create property: {e}"
        )