from fastapi import APIRouter, status, HTTPException
from typing import Dict, Any, List
from repositories.maintenance_repository import MaintenanceRepository
from schemas.maintenance_schema import MaintenanceCreateSchema, MaintenanceResponseSchema

router = APIRouter()
maintenance_repo = MaintenanceRepository()

# Task 017: Create a new maintenance ticket
@router.post("/", response_model=MaintenanceResponseSchema, status_code=status.HTTP_201_CREATED)
async def create_maintenance_ticket(ticket_data: MaintenanceCreateSchema):
    """
    Creates a new maintenance ticket for a property.
    Requires tenant/user authentication.
    """
    try:
        ticket_dict = ticket_data.model_dump()
        new_ticket = maintenance_repo.create(ticket_dict)
        return new_ticket
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create maintenance ticket: {e}"
        )

# Task 017: Get details for a specific ticket
@router.get("/{ticket_id}", response_model=MaintenanceResponseSchema, status_code=status.HTTP_200_OK)
async def get_ticket_detail(ticket_id: str):
    """
    Retrieves details for a specific maintenance ticket.
    """
    ticket_data = maintenance_repo.get_by_id(ticket_id)
    
    if not ticket_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Maintenance ticket ID '{ticket_id}' not found."
        )
    
    return MaintenanceResponseSchema(**ticket_data)

# Task 017: Update ticket status (Admin/Landlord Action)
@router.patch("/{ticket_id}/status", response_model=MaintenanceResponseSchema, status_code=status.HTTP_200_OK)
async def update_ticket_status(ticket_id: str, status: str):
    """
    Updates the status of a maintenance ticket.
    Restricted to Admin/Landlord roles.
    """
    if status not in ["Open", "Assigned", "In Progress", "Completed", "Closed"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid status provided."
        )
    
    updated_ticket = maintenance_repo.update_status(ticket_id, status)
    
    if not updated_ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Maintenance ticket ID '{ticket_id}' not found."
        )
    return updated_ticket