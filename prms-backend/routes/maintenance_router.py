from typing import Dict, Any, Optional, List
from repositories.maintenance_repository import MaintenanceRepository
from fastapi import APIRouter, HTTPException, Depends, status
from services.storage_service import StorageService

router = APIRouter()

# Dependency function (Simplified DI)
def get_maintenance_repository(storage_service: StorageService = Depends(lambda: StorageService(base_path="./data"))):
    return MaintenanceRepository(storage_service)

class MaintenanceService:
    """
    Service layer for handling maintenance ticket lifecycle (Task 017).
    This coordinates repository calls for ticket management.
    """
    def __init__(self, repository: MaintenanceRepository):
        self.repository = repository

    def create_ticket(self, record: Dict[str, Any]) -> Dict[str, Any]:
        """Creates a new maintenance ticket."""
        return self.repository.create(record)

    def get_ticket_details(self, ticket_id: str) -> Optional[Dict[str, Any]]:
        """Retrieves a specific ticket's full details."""
        return self.repository.get_by_id(ticket_id)

    def update_ticket_status(self, ticket_id: str, new_status: str, assigning_user_id: Optional[str] = None) -> Optional[Dict[str, Any]]:
        """
        Updates a ticket's status (e.g., Assigned, In Progress, Closed).
        Business logic enforces valid status transitions.
        """
        ticket = self.repository.get_by_id(ticket_id)
        if not ticket:
            raise HTTPException(status_code=404, detail="Ticket not found")

        valid_transitions = {
            'Open': ['Assigned', 'Closed'],
            'Assigned': ['InProgress', 'Closed'],
            'InProgress': ['Completed', 'Closed'],
            'Completed': ['Closed'],
            'Closed': []
        }
        
        current_status = ticket['status']
        if new_status not in valid_transitions.get(current_status, []):
             raise HTTPException(status_code=400, detail=f"Invalid status transition: Cannot move from {current_status} to {new_status}")


        update_data = {'status': new_status}
        if assigning_user_id:
            update_data['assigned_to'] = assigning_user_id # Field added for realism
            
        updated_record = self.repository.update(ticket_id, update_data)
        
        if not updated_record:
             raise HTTPException(status_code=500, detail="Failed to update ticket in storage.")
             
        return updated_record

# Dependency function for endpoint use
def get_maintenance_service() -> MaintenanceService:
    try:
        # Real DI setup would load this service instance
        from main import maintenance_repository_instance 
        return MaintenanceService(maintenance_repository_instance)
    except ImportError:
        # Fallback
        storage = StorageService(base_path="./data")
        return MaintenanceService(MaintenanceRepository(storage_service=storage))

@router.post("/", response_model=Dict[str, Any])
def create_ticket(record: Dict[str, Any], service: MaintenanceService = Depends(get_maintenance_service)):
    """Creates a new maintenance ticket (Task 017)."""
    return service.create_ticket(record)

@router.get("/tickets/{ticket_id}", response_model=Dict[str, Any])
def get_maintenance_ticket(ticket_id: str, service: MaintenanceService = Depends(get_maintenance_service)):
    """Retrieves a specific ticket's details."""
    details = service.get_ticket_details(ticket_id)
    if not details:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return details

@router.put("/tickets/{ticket_id}/status", response_model=Dict[str, Any])
def update_ticket_status(
    ticket_id: str, 
    new_status: str, 
    user_id: Optional[str] = None,
    service: MaintenanceService = Depends(get_maintenance_service)
):
    """Updates the status of a maintenance ticket (Task 017)."""
    return service.update_ticket_status(ticket_id, new_status, assigning_user_id=user_id)

@router.get("/tickets", response_model=List[Dict[str, Any]])
def list_all_tickets(service: MaintenanceService = Depends(get_maintenance_service)):
    """Retrieves a list of all maintenance tickets."""
    return service.get_all()