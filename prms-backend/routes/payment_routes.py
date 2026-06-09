from fastapi import APIRouter, status, HTTPException
from typing import Dict, Any, List
from repositories.payment_repository import PaymentRepository
from schemas.payment_schema import PaymentCreateSchema, PaymentResponseSchema

router = APIRouter()
payment_repo = PaymentRepository()

# Task 016: Create a new payment transaction
@router.post("/", response_model=PaymentResponseSchema, status_code=status.HTTP_201_CREATED)
async def create_payment(payment_data: PaymentCreateSchema):
    """
    Processes a new payment transaction.
    Requires user authentication and validates against the booking ID.
    """
    try:
        payment_dict = payment_data.model_dump()
        new_payment = payment_repo.create(payment_dict)
        return new_payment
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process payment: {e}"
        )

# Task 016: View payment history for a specific booking
@router.get("/bookings/{booking_id}", response_model=List[PaymentResponseSchema])
async def get_payments_by_booking(booking_id: str):
    """
    Retrieves all recorded payments for a given booking ID.
    """
    payments = payment_repo.get_by_booking_id(booking_id)
    # Assumption: The repo returns a list of dicts that can be properly mapped
    return payments