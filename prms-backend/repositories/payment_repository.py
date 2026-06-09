from typing import List, Dict, Any
from .base_repository import BaseRepository

class PaymentRepository(BaseRepository):
    """
    Concrete repository for handling payment records interactions.
    """
    def __init__(self):
        fieldnames = [
            "paymentId", "bookingId", "amount", "paymentDate", 
            "paymentMethod", "paymentStatus"
        ]
        super().__init__("storage/payments.csv", fieldnames)

    def get_all(self) -> List[Dict[str, Any]]:
        return self._storage.load()

    def get_by_id(self, payment_id: str) -> Dict[str, Any] | None:
        all_payments = self.get_all()
        for payment in all_payments:
            if payment.get('paymentId') == payment_id:
                return payment
        return None

    def create(self, new_payment_data: Dict[str, Any]) -> Dict[str, Any]:
        # Generating ID for new payment
        new_payment_data["paymentId"] = new_payment_data.get("paymentId", f"payment_{len(self.get_all()) + 1}")
        
        all_payments = self.get_all()
        all_payments.append(new_payment_data)
        self._storage.save(all_payments)
        return new_payment_data

    def update(self, payment_id: str, updated_data: Dict[str, Any]) -> Dict[str, Any] | None:
        all_payments = self.get_all()
        for i, payment in enumerate(all_payments):
            if payment.get('paymentId') == payment_id:
                all_payments[i].update(updated_data)
                self._storage.save(all_payments)
                return all_payments[i]
        return None

    def delete(self, payment_id: str) -> bool:
        all_payments = self.get_all()
        initial_count = len(all_payments)
        new_payments = [payment for payment in all_payments if payment.get('paymentId') != payment_id]
        
        if len(new_payments) < initial_count:
            self._storage.save(new_payments)
            return True
        return False