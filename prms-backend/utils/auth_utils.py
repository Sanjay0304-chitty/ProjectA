from fastapi import HTTPException, Depends, status
from typing import Dict, Any

# Placeholder for a dependency injector that provides the logged-in user's details.
# In a real application, this would read a JWT from the request header.
# Here, we assume the user_id and role are passed/injected correctly after a successful login.

def get_current_user_info(user_id: str, role: str = "default") -> Dict[str, Any]:
    """
    Mock dependency function to simulate retrieving user information after authentication.
    The actual implementation would check JWT/Session state.
    """
    return {"user_id": user_id, "role": role}

def require_role(required_role: str):
    """
    Dependency function that enforces role-based access control.
    It requires the 'current_user_info' dependency to be present in the route.
    """
    def role_checker(current_user: Dict[str, Any] = Depends(get_current_user_info)):
        if current_user['role'] != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, 
                detail=f"Access denied. Requires {required_role} role."
            )
        return current_user
    return role_checker
