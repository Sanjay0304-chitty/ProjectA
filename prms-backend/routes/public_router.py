from fastapi import APIRouter, Depends
from typing import List, Dict, Any, Optional
from services.public_property_service import PublicPropertyService

router = APIRouter()

# Dependency function to instantiate the service (Simplified DI)
def get_public_property_service() -> PublicPropertyService:
    # In a real application, this would fetch the service from a global container.
    # Here we rely on the fact that the main app already initialized the necessary components.
    # We'll rely on the caller context or assume a simplified instance for this file.
    # For prototype, we assume existence or pass a placeholder.
    try:
        from main import public_property_service
        return public_property_service
    except ImportError:
        # Fallback for standalone testing
        raise Exception("PublicPropertyService not initialized in main.py context.")


@router.get("/properties", response_model=List[Dict[str, Any]])
def list_all_properties(service: PublicPropertyService = Depends(get_public_property_service)):
    """
    Lists all properties that are publicly available (Task 006 - Featured Properties).
    """
    return service.get_all_available_properties()

@router.get("/properties/search", response_model=List[Dict[str, Any]])
def search_properties_endpoint(
    service: PublicPropertyService = Depends(get_public_property_service),
    location: Optional[str] = None,
    prop_type: Optional[str] = None,
    min_price: Optional[float] = None
):
    """
    Searches properties based on criteria (Task 006 - Search Bar).
    """
    return service.search_properties(location=location, type=prop_type, min_price=min_price)
