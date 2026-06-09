from typing import List, Dict, Any
from .base_repository import BaseRepository

class AdministratorRepository(BaseRepository):
    """
    Concrete repository for handling administrator data interactions.
    """
    def __init__(self):
        fieldnames = [
            "administratorId", "userId", "permissionLevel"
        ]
        super().__init__("storage/administrators.csv", fieldnames)

    def get_all(self) -> List[Dict[str, Any]]:
        return self._storage.load()

    def get_by_id(self, admin_id: str) -> Dict[str, Any] | None:
        all_admins = self.get_all()
        for admin in all_admins:
            if admin.get('administratorId') == admin_id:
                return admin
        return None

    def create(self, new_admin_data: Dict[str, Any]) -> Dict[str, Any]:
        new_admin_data["administratorId"] = new_admin_data.get("administratorId", f"admin_{len(self.get_all()) + 1}")
        
        all_admins = self.get_all()
        all_admins.append(new_admin_data)
        self._storage.save(all_admins)
        return new_admin_data

    def update(self, admin_id: str, updated_data: Dict[str, Any]) -> Dict[str, Any] | None:
        all_admins = self.get_all()
        for i, admin in enumerate(all_admins):
            if admin.get('administratorId') == admin_id:
                all_admins[i].update(updated_data)
                self._storage.save(all_admins)
                return all_admins[i]
        return None

    def delete(self, admin_id: str) -> bool:
        all_admins = self.get_all()
        initial_count = len(all_admins)
        new_admins = [admin for admin in all_admins if admin.get('administratorId') != admin_id]
        
        if len(new_admins) < initial_count:
            self._storage.save(new_admins)
            return True
        return False