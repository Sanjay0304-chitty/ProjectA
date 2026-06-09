from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class LandlordSchema(BaseModel):
    """
    Schema representing a Landlord entity.
    """
    landlordId: str = Field(..., description="Unique identifier for the Landlord.")
    user_id: str = Field(..., description="Foreign key linking to the base User.")
    company_name: Optional[str] = Field(None, description="Name of the landlord's company.")
    total_properties: int = Field(default=0, description="Count of properties owned by this landlord.")
    verification_status: Optional[str] = Field(None, description="Verification status (e.g., pending, verified).")
    
    class Config:
        orm_mode = True
