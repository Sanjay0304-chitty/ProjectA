from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class UserSchema(BaseModel):
    """
    Base schema for all registered users (User, Tenant, Landlord, Administrator).
    """
    userId: str = Field(..., description="Unique identifier for the user.")
    email: str = Field(..., description="User's primary email address.")
    hashed_password: str = Field(..., description="Securely hashed password.")
    created_date: datetime = Field(default_factory=datetime.utcnow, description="Timestamp of user creation.")
    
    class Config:
        orm_mode = True # Useful if integrating with an ORM later
