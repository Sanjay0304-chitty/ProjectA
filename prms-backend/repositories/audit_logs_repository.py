from typing import List, Dict, Any
from .base_repository import BaseRepository

class AuditLogsRepository(BaseRepository):
    """
    Generic repository for capturing all significant system events and actions.
    """
    def __init__(self):
        fieldnames = [
            "logId", "timestamp", "userId", "action", "resourceType", 
            "resourceId", "details"
        ]
        super().__init__("storage/audit_logs.csv", fieldnames)

    def get_all(self) -> List[Dict[str, Any]]:
        return self._storage.load()

    def get_by_id(self, log_id: str) -> Dict[str, Any] | None:
        all_logs = self.get_all()
        for log in all_logs:
            if log.get('logId') == log_id:
                return log
        return None

    def create(self, new_log_data: Dict[str, Any]) -> Dict[str, Any]:
        # Generating ID for new log
        new_log_data["logId"] = new_log_data.get("logId", f"log_{len(self.get_all()) + 1}")
        
        all_logs = self.get_all()
        all_logs.append(new_log_data)
        self._storage.save(all_logs)
        return new_log_data

    def update(self, log_id: str, updated_data: Dict[str, Any]) -> Dict[str, Any] | None:
        # Logs are typically immutable for integrity, but keeping the interface for completeness.
        all_logs = self.get_all()
        for i, log in enumerate(all_logs):
            if log.get('logId') == log_id:
                all_logs[i].update(updated_data)
                self._storage.save(all_logs)
                return all_logs[i]
        return None

    def delete(self, log_id: str) -> bool:
        # Deletion of logs is generally not allowed in a secure system.
        return False 
