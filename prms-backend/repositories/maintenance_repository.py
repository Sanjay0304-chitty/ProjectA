from typing import List, Dict, Any
from .base_repository import BaseRepository

class MaintenanceRepository(BaseRepository):
    """
    Concrete repository for handling property maintenance ticket interactions.
    """
    def __init__(self):
        fieldnames = [
            "ticketId", "tenantId", "propertyId", "issueDescription", 
            "createdAt", "status" # Status: Open, Assigned, In Progress, Completed, Closed
        ]
        super().__init__("storage/maintenance_tickets.csv", fieldnames)

    def get_all(self) -> List[Dict[str, Any]]:
        return self._storage.load()

    def get_by_id(self, ticket_id: str) -> Dict[str, Any] | None:
        all_tickets = self.get_all()
        for ticket in all_tickets:
            if ticket.get('ticketId') == ticket_id:
                return ticket
        return None

    def create(self, new_ticket_data: Dict[str, Any]) -> Dict[str, Any]:
        # Generating ID for new ticket
        new_ticket_data["ticketId"] = new_ticket_data.get("ticketId", f"ticket_{len(self.get_all()) + 1}")
        
        all_tickets = self.get_all()
        all_tickets.append(new_ticket_data)
        self._storage.save(all_tickets)
        return new_ticket_data

    def update(self, ticket_id: str, updated_data: Dict[str, Any]) -> Dict[str, Any] | None:
        all_tickets = self.get_all()
        for i, ticket in enumerate(all_tickets):
            if ticket.get('ticketId') == ticket_id:
                all_tickets[i].update(updated_data)
                self._storage.save(all_tickets)
                return all_tickets[i]
        return None

    def delete(self, ticket_id: str) -> bool:
        all_tickets = self.get_all()
        initial_count = len(all_tickets)
        new_tickets = [ticket for ticket in all_tickets if ticket.get('ticketId') != ticket_id]
        
        if len(new_tickets) < initial_count:
            self._storage.save(new_tickets)
            return True
        return False