from pydantic import BaseModel
from typing import Optional
from datetime import date

# Schema defining data needed to initiate a payment
class PaymentCreateSchema(BaseModel):
    bookingId: str
    amount: float
    paymentMethod: str
    # Optional: reference to transaction ID from payment gateway
    gatewayTransactionId: Optional[str] = None
    
# Schema for the successful Payment API response
class PaymentResponseSchema(BaseModel):
    paymentId: str
    bookingId: str
    amount: float
    paymentDate: date
    paymentMethod: str
    paymentStatus: str
    
class PaymentStatusEnum(str):
    COMPLETED = "Completed"
    FAILED = "Failed"
    PENDING = "Pending"
