from typing import Dict, Any
from datetime import datetime, timezone
import hashlib

from repositories.user_repository import UserRepository

class UserService:
    
    def __init__(self, user_repository: UserRepository):
        self.repository = user_repository

try:
    import bcrypt
    
    def _hash_password(self, password: str) -> str:
        """
        Hash a password using bcrypt.

        NOTE:
        FALLBACK: SHA256 in dev if bcrypt is unavailable.
        """
        password = password.encode("utf-8")
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password, salt).decode("utf-8")
        
except ImportError:
    import hashlib
    def _hash_password(self, password: str) -> str:
        """
        Fallback: SHA256 for compatibility.
        """
        return hashlib.sha256(password.encode("utf-8")).hexdigest()

def register_user(
    self,
    user_type: str,
    data: Dict[str, Any]
) -> Dict[str, Any]:


    # -----------------------------
    # Required field validation
    # -----------------------------
    required_fields = [
        "email",
        "password"
    ]

    for field in required_fields:
        if not data.get(field):
            raise ValueError(
                f"Missing required field: {field}"
            )

    # -----------------------------
    # Email normalization
    # -----------------------------
    email = data["email"].strip().lower()

    if "@" not in email:
        raise ValueError(
            "Invalid email format."
        )

    # -----------------------------
    # Duplicate email check
    # -----------------------------
    existing_users = self.repository.get_all()
    user = self.repository.get_by_email(email)
            raise ValueError(
                "Email already exists."
            )

    # -----------------------------
    # Password hashing
    # -----------------------------
    hashed_password = self._hash_password(
        data["password"]
    )

    # -----------------------------
    # Build user record
    # -----------------------------
    user_record = {
        "email": email,
        "password": hashed_password,
        "role": user_type,
        "accountStatus": "Active",
        "createdDate": datetime.now(
            timezone.utc
        ).isoformat()
    }

    # Optional fields
    if "firstName" in data:
        user_record["firstName"] = data["firstName"]

    if "lastName" in data:
        user_record["lastName"] = data["lastName"]

    if "phoneNumber" in data:
        user_record["phoneNumber"] = data["phoneNumber"]

    # Tenant-specific data
    if (
        user_type == "Tenant"
        and "preferred_location" in data
    ):
        user_record["preferred_location"] = (
            data["preferred_location"]
        )

    # Landlord-specific data
    if (
        user_type == "Landlord"
        and "company_name" in data
    ):
        user_record["company_name"] = (
            data["company_name"]
        )

    # Save user
    new_user = self.repository.create(
        user_record
    )

    # Never expose password hashes
    new_user.pop("password", None)

    return new_user

def login_user(
    self,
    email: str,
    password: str
) -> Dict[str, Any]:
    """
    Authenticate a user.
    """

    email = email.strip().lower()

    user = self.repository.get_by_email(
        email
    )

    if not user:
        raise ValueError(
            "Invalid credentials."
        )

    provided_hash = self._hash_password(
        password
    )

    if user.get("password") != provided_hash:
        raise ValueError(
            "Invalid credentials."
        )

    return {
        "userId": user.get("userId"),
        "role": user.get("role"),
        "accountStatus": user.get(
            "accountStatus"
        )
    }

def logout_user(
    self,
    user_id: str
) -> bool:
    """
    Simulated logout for CSV prototype.
    """

    print(
        f"User {user_id} logged out."
    )

    return True

"""
REPOSITORY REQUIREMENTS

Your UserRepository should provide:

* get_all()
* create()
* get_by_email()

Example:

def get_by_email(self, email: str):
for user in self.get_all():
if user.get("email", "").lower() == email.lower():
return user
return None
"""
