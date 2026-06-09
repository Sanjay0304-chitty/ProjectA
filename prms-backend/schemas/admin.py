from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class AdministratorSchema(BaseModel):
    """
    Schema representing an Administrator entity.
    """
    administratorId: str = Field(..., description="Unique identifier for the Administrator.")
    user_id: str = Field(..., description="Foreign key linking to the base User.")
    permission_level: int = Field(default=1, description="Numeric level indicating granted permissions.")
    
    class Config:
        orm_mode = True
        # Note: Permissions should ideally be mapped to an ENUM or a role table later.
