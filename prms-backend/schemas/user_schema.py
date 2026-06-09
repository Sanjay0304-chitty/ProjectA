from pydantic import BaseModel, Field, field_validator
from typing import Optional
import re

# Base schema for input validation
class UserBase(BaseModel):
    firstName: str = Field(..., min_length=1)
    lastName: str = Field(..., min_length=1)
    email: str
    phoneNumber: str | None = None
    password: str = Field(..., min_length=8)
    role: str = "Tenant"
    
    @field_validator("password")
    @classmethod
    
    def validate_password(cls, value):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters")

        if not re.search(r"[A-Z]", value):
            raise ValueError("Password must contain an uppercase letter")

        if not re.search(r"[a-z]", value):
            raise ValueError("Password must contain a lowercase letter")

        if not re.search(r"\d", value):
            raise ValueError("Password must contain a number")

        return value

# Schema used when creating a new user (simplified registration)
class UserRegistrationSchema(UserBase):
    pass

# Schema for User output (what is returned after creation)
class UserResponseSchema(BaseModel):
    userId: str
    firstName: str
    lastName: str
    email: str
    role: str
    accountStatus: str
    
    class Config:
        from_attributes = True

# This file will eventually import UserRepository from /repositories and use it
# for service layer logic.
