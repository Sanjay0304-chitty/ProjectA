from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Schema for creating a new maintenance ticket
class MaintenanceCreateSchema(BaseModel):
    propertyId: str
    tenantId: str
    issueDescription: str
    priority: str = "Medium"
    additionalDetails: Optional[str] = None

# Schema for fetching a single maintenance ticket detail
class MaintenanceResponseSchema(BaseModel):
    ticketId: str
    propertyId: str
    tenantId: str
    issueDescription: str
    createdAt: datetime
    status: str
    priority: str
    details: Optional[str] = None