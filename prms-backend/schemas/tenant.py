from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class TenantSchema(BaseModel):
    """
    Schema representing a Tenant entity.
    """
    tenantId: str = Field(..., description="Unique identifier for the Tenant.")
    user_id: str = Field(..., description="Foreign key linking to the base User.")
    preferred_property_type: Optional[str] = Field(None, description="Preferred type of property (e.g., apartment, house).")
    preferred_location: Optional[str] = Field(None, description="Preferred geographical location.")
    identity_verified: bool = Field(default=False, description="Whether tenant identity has been verified.")
    
    class Config:
        orm_mode = True
        # Add additional configuration like aliases or extra fields if needed later
