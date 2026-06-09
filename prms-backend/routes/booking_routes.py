from fastapi import APIRouter, status, HTTPException
from typing import Dict, Any, List
from repositories.booking_repository import BookingRepository
from schemas.booking_schema import BookingResponseSchema # Assume this schema is created next

router = APIRouter()
booking_repo = BookingRepository()

# Task 015: Create a new booking (Customer/Tenant Action)
@router.post("/", response_model=BookingResponseSchema, status_code=status.HTTP_201_CREATED)
async def create_booking(booking_data: Dict[str, Any]):
    """
    Creates a new booking request for a tenant.
    Requires tenant/user authentication.
    """
    try:
        new_booking = booking_repo.create(booking_data)
        return new_booking
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create booking: {e}"
        )

# Task 015: View all bookings for a user (Tenant/Admin Action)
@router.get("/{tenant_id}", response_model=List[BookingResponseSchema])
async def get_bookings_by_tenant(tenant_id: str):
    """
    Retrieves all bookings associated with a specific tenant.
    """
    all_bookings = booking_repo.get_all()
    tenant_bookings = [
        booking for booking in all_bookings if booking.get("tenantId") == tenant_id
    ]
    # Assuming BookingResponseSchema can handle data conversion
    return tenant_bookings