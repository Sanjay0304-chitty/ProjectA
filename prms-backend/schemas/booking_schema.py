from pydantic import BaseModel
from typing import Optional
from datetime import date

# Schema for a single Booking response (used in API output)
class BookingResponseSchema(BaseModel):
    bookingId: str
    propertyId: str
    tenantId: str
    startDate: date
    endDate: date
    status: str
    # Add calculated fields here (e.g., totalCost)
    
class BookingCreateSchema(BaseModel):
    propertyId: str
    tenantId: str
    startDate: date
    endDate: date
    # Additional payment/user meta-data
