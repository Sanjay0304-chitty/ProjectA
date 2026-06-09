# /home/wong/ProjectA/prms-backend/models/user.py
from pydantic import BaseModel

class User(BaseModel):
    userId: str
    firstName: str
    lastName: str
    email: str
    password: str
    phoneNumber: str
    role: str # Tenant, Landlord, Administrator
    accountStatus: str
    createdDate: str

# /home/wong/ProjectA/prms-backend/models/tenant.py
from pydantic import BaseModel

class Tenant(BaseModel):
    tenantId: str
    userId: str
    preferredPropertyType: str
    preferredLocation: str
    identityVerified: bool

# /home/wong/ProjectA/prms-backend/models/landlord.py
from pydantic import BaseModel

class Landlord(BaseModel):
    landlordId: str
    userId: str
    companyName: str
    totalProperties: int
    verificationStatus: str

# /home/wong/ProjectA/prms-backend/models/administrator.py
from pydantic import BaseModel

class Administrator(BaseModel):
    administratorId: str
    userId: str
    permissionLevel: int