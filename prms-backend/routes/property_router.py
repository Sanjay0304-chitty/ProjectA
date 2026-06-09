from typing import Dict, Any, Optional, List
from repositories.property_repository import PropertyRepository
from fastapi import APIRouter, HTTPException, Depends, status
from services.storage_service import StorageService

router = APIRouter()

class PropertyService:
    """
    Service layer for handling propertyCRUD logic for Landlords (Task 013).
    This service encapsulates business rules around property management.
    """
    def __init__(self, repository: PropertyRepository):
        self.repository = repository

    def add_property(self, record: Dict[str, Any]) -> Dict[str, Any]:
        """Creates a new property listed by a landlord."""
        # Business rule: Ensure the landlord ID exists and is verified before listing. (Skipped validation for prototype)
        return self.repository.create(record)

    def get_property_by_id(self, property_id: str) -> Optional[Dict[str, Any]]:
        """Retrieves a single property."""
        return self.repository.get_by_id(property_id)

    def update_property(self, property_id: str, record: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Updates details of an existing property."""
        # Business rule: Only the associated landlord can update this property. (Skipped auth check for prototype)
        return self.repository.update(property_id, record)

    def delete_property(self, property_id: str) -> bool:
        """Deletes a property from the system. Note: This is often proxied via soft deletion in real systems."""
        # Business rule: Prevent deletion if there are active bookings or maintenance tickets. (Skipped complexity for prototype)
        return self.repository.delete(property_id)
        
    def all_properties(self) -> List[Dict[str, Any]]:
        """Retrieves all properties available in the system."""
        return self.repository.get_all()
        """Retrieves all properties belonging to a specific landlord."""
        all_properties = self.repository.get_all()
        return [p for p in all_properties if p.get('landlordId') == landlord_id]

# Dependency function for endpoint use
def get_property_service():
    return PropertyService(
        PropertyRepository()
    )

@router.post("/", response_model=Dict[str, Any])
def create_property_endpoint(record: Dict[str, Any], service: PropertyService = Depends(get_property_service)):
    """Endpoint to add a new property (Task 013)."""
    return service.add_property(record)

@router.get("/{property_id}", response_model=Dict[str, Any])
def get_property_endpoint(property_id: str, service: PropertyService = Depends(get_property_service)):
    """Endpoint to fetch a specific property detail."""
    details = service.get_property_by_id(property_id)
    if not details:
        raise HTTPException(status_code=404, detail="Property not found")
    return details

@router.put("/{property_id}", response_model=Dict[str, Any])
def update_property_endpoint(property_id: str, record: Dict[str, Any], service: PropertyService = Depends(get_property_service)):
    """Endpoint to update an existing property."""
    updated_details = service.update_property(property_id, record)
    if not updated_details:
        raise HTTPException(status_code=404, detail="Property not found or update failed.")
    return updated_details

@router.get("/", response_model=List[Dict[str, Any]])
def get_properties_endpoint(service: PropertyService = Depends(get_property_service)):
    """Endpoint to list all properties in the system."""
    return service.all_properties()    """Endpoint to delete a property."""
    if not service.delete_property(property_id):
        raise HTTPException(status_code=404, detail="Property not found for deletion.")
    return {}

@router.get("/landlord/{landlord_id}", response_model=List[Dict[str, Any]])
def get_landlord_properties_endpoint(landlord_id: str, service: PropertyService = Depends(get_property_service)):
    """Endpoint to list all properties managed by a specific landlord."""
    return service.get_landlord_properties(landlord_id)
