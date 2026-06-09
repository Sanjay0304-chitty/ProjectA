from pydantic import BaseModel, Field
from typing import Optional, List

# Schema representing a single Property object returned to the public.
class PropertyBase(BaseModel):
    title: str
    description: str
    propertyType: str
    rentalPrice: int
    address: str
    bedrooms: int
    bathrooms: int
    status: str
    propertyImages: Optional[str] = None
    
# Schema for listing many properties
class PropertyListResponse(BaseModel):
    properties: List[PropertyBase]

# Schema for a single detailed Property view
class PropertyDetailResponse(PropertyBase):
    propertyId: str
    # Add other detailed fields here if needed
