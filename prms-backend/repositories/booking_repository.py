from typing import List, Dict, Any
from .base_repository import BaseRepository

class BookingRepository(BaseRepository):
    """
    Concrete repository for handling property booking interactions.
    """
    def __init__(self):
        fieldnames = [
            "bookingId", "propertyId", "tenantId", "startDate", 
            "endDate", "status" # Status: Pending, Approved, Rejected, Cancelled
        ]
        super().__init__("storage/bookings.csv", fieldnames)

    def get_all(self) -> List[Dict[str, Any]]:
        return self._storage.load()

    def get_by_id(self, booking_id: str) -> Dict[str, Any] | None:
        all_bookings = self.get_all()
        for booking in all_bookings:
            if booking.get('bookingId') == booking_id:
                return booking
        return None

    def create(self, new_booking_data: Dict[str, Any]) -> Dict[str, Any]:
        # Generating ID for new booking
        new_booking_data["bookingId"] = new_booking_data.get("bookingId", f"booking_{len(self.get_all()) + 1}")
        
        all_bookings = self.get_all()
        all_bookings.append(new_booking_data)
        self._storage.save(all_bookings)
        return new_booking_data

    def update(self, booking_id: str, updated_data: Dict[str, Any]) -> Dict[str, Any] | None:
        all_bookings = self.get_all()
        for i, booking in enumerate(all_bookings):
            if booking.get('bookingId') == booking_id:
                all_bookings[i].update(updated_data)
                self._storage.save(all_bookings)
                return all_bookings[i]
        return None

    def delete(self, booking_id: str) -> bool:
        all_bookings = self.get_all()
        initial_count = len(all_bookings)
        new_bookings = [booking for booking in all_bookings if booking.get('bookingId') != booking_id]
        
        if len(new_bookings) < initial_count:
            self._storage.save(new_bookings)
            return True
        return False