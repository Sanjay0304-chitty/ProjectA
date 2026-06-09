import bcrypt
from fastapi import APIRouter, HTTPException, status
from schemas.user_schema import UserBase, UserRegistrationSchema, UserResponseSchema
from repositories.user_repository import UserRepository
from typing import Dict, Any
from datetime import datetime

router = APIRouter()
user_repo = UserRepository()

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(user_data, plain_password):
    stored_hash = user_data.get("password", "")

    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        stored_hash.encode("utf-8")
    )

@router.post("/register", response_model=UserResponseSchema, status_code=status.HTTP_201_CREATED)
async def register_user(user_data: UserRegistrationSchema):
    try:
        user_dict = user_data.model_dump()
        # SECURITY NOTE: Password hashing is omitted for this demo.
        new_user = user_repo.create(user_dict)
        return new_user
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"User registration failed: {e}"
        )

@router.post("/login")
async def login_user(form_data: Dict[str, Any]):
    """
    Handles user authentication by finding a user by email and verifying credentials.
    """
    email = form_data.get("email")
    password = form_data.get("password")
    
    if not email or not password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email and password are required."
        )

    # 1. Find user by email
    all_users = user_repo.get_all()
    found_user = None
    for user in all_users:
        if user.get("email") == email:
            found_user = user
            break
    
    if not found_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials."
        )

    # 2. Verify password (Using mock check)
    if not verify_password(found_user, password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials."
        )

    return {"message": "Login successful", "user": found_user}