from typing import List, Dict, Any, Optional
from repositories.booking_repository import BookingRepository
from services.storage_service import StorageService
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter()

# Dependency function (Simplified DI)
def get_booking_repository(storage_service: StorageService = Depends(lambda: StorageService(base_path="./data"))):
    # This is a placeholder dependency resolution. In a real FastAPI app, DI would handle this better.
    return BookingRepository(storage_service)

class BookingService:
    """
    Service layer for handling complex booking logic (Task 015).
    This service coordinates repository calls to manage the booking lifecycle.
    """
    def __init__(self, booking_repository: BookingRepository):
        self.repository = booking_repository

    def create_booking(self, record: Dict[str, Any]) -> Dict[str, Any]:
        """Creates a new booking request."""
        # Additional business logic (e.g., checking property availability, user payment eligibility) would live here.
        return self.repository.create(record)

    def get_booking_details(self, booking_id: str) -> Optional[Dict[str, Any]]:
        """Retrieves booking details."""
        return self.repository.get_by_id(booking_id)

    def approve_booking(self, booking_id: str) -> Optional[Dict[str, Any]]:
        """Marks a pending booking as approved (lifecycle update)."""
        booking = self.repository.get_by_id(booking_id)
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        if booking['status'] != 'Pending':
            return booking # Already in a different state
        
        # Update status
        updated_record = self.repository.update(booking_id, {'status': 'Approved'})
        return updated_record

    def reject_booking(self, booking_id: str) -> Optional[Dict[str, Any]]:
        """Marks a pending booking as rejected."""
        booking = self.repository.get_by_id(booking_id)
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        # Update status
        updated_record = self.repository.update(booking_id, {'status': 'Rejected'})
        return updated_record
        
    def cancel_booking(self, booking_id: str) -> Optional[Dict[str, Any]]:
        """Marks a booking as cancelled, handling state change."""
        booking = self.repository.get_by_id(booking_id)
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        # Update status
        updated_record = self.repository.update(booking_id, {'status': 'Cancelled'})
        return updated_record

# Dependency function to instantiate the service
# Since this is challenging to do globally in FastAPI without a DI container,
# we pass it through the endpoint dependency call.
def get_booking_service() -> BookingService:
    # Note: In a true setup, the service would be globally available or managed by the container.
    try:
        from main import booking_repository_instance
        return BookingService(booking_repository_instance)
    except ImportError:
        # Fallback for testing
        storage = StorageService(base_path="./data")
        return BookingService(BookingRepository(storage_service=storage))


@router.post("/", response_model=Dict[str, Any])
def create_booking(record: Dict[str, Any], service: BookingService = Depends(get_booking_service)):
    """Creates a new booking request (Task 015)."""
    return service.create_booking(record)

@router.get("/{booking_id}", response_model=Dict[str, Any])
def get_booking(booking_id: str, service: BookingService = Depends(get_booking_service)):
    """Retrieves details for a specific booking."""
    details = service.get_booking_details(booking_id)
    if not details:
        raise HTTPException(status_code=404, detail="Booking not found")
    return details

@router.put("/{booking_id}/approve", response_model=Dict[str, Any])
def approve_booking(booking_id: str, service: BookingService = Depends(get_booking_service)):
    """Approves a booking."""
    return service.approve_booking(booking_id)

@router.put("/{booking_id}/reject", response_model=Dict[str, Any])
def reject_booking(booking_id: str, service: BookingService = Depends(get_booking_service)):
    """Rejects a booking."""
    return service.reject_booking(booking_id)

@router.put("/{booking_id}/cancel", response_model=Dict[str, Any])
def cancel_booking(booking_id: str, service: BookingService = Depends(get_booking_service)):
    """Cancels a booking."""
    return service.cancel_booking(booking_id)