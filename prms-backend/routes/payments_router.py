from typing import Dict, Any, Optional, List
from repositories.payment_repository import PaymentRepository
from fastapi import APIRouter, HTTPException, Depends
from services.storage_service import StorageService

router = APIRouter()

# Dependency function (Simplified DI)
def get_payment_repository(storage_service: StorageService = Depends(lambda: StorageService(base_path="./data"))):
    return PaymentRepository(storage_service)

class PaymentService:
    """
    Service layer for handling payment logic (Task 016).
    This coordinates repository calls to manage payment records.
    """
    def __init__(self, repository: PaymentRepository):
        self.repository = repository

    def create_payment(self, record: Dict[str, Any]) -> Dict[str, Any]:
        """Creates a new payment record, establishing payment history."""
        # In a real system, this would integrate with a payment gateway (Stripe/PayPal)
        print(f"Simulating payment processing for {record.get('amount')}...")
        return self.repository.create(record)

    def get_payment_details(self, payment_id: str) -> Optional[Dict[str, Any]]:
        """Retrieves specific payment details."""
        return self.repository.get_by_id(payment_id)

    def get_payment_history(self) -> List[Dict[str, Any]]:
        """Retrieves all payment records for reporting."""
        return self.repository.get_all()

# Dependency function for endpoint use
def get_payment_service() -> PaymentService:
    try:
        # Relying on previous setup for service retrieval
        from main import payment_repository_instance # Placeholder for actual instance retrieval
        return PaymentService(payment_repository_instance)
    except ImportError:
        # Fallback for testing purposes
        storage = StorageService(base_path="./data")
        return PaymentService(PaymentRepository(storage_service=storage))

@router.post("/", response_model=Dict[str, Any])
def create_payment(record: Dict[str, Any], service: PaymentService = Depends(get_payment_service)):
    """Creates a payment record (Task 016 CRUD)."""
    return service.create_payment(record)

@router.get("/{payment_id}", response_model=Dict[str, Any])
def get_payment_details(payment_id: str, service: PaymentService = Depends(get_payment_service)):
    """Retrieves details of a specific payment."""
    details = service.get_payment_details(payment_id)
    if not details:
        raise HTTPException(status_code=404, detail="Payment not found")
    return details

@router.get("/", response_model=List[Dict[str, Any]])
def get_all_payments(service: PaymentService = Depends(get_payment_service)):
    """Retrieves a list of all payment records for reporting."""
    return service.get_payment_history()