from typing import List, Dict, Any
from .base_repository import BaseRepository

class LandlordRepository(BaseRepository):
    """
    Concrete repository for handling landlord data interactions.
    """
    def __init__(self):
        fieldnames = [
            "landlordId", "userId", "companyName", 
            "totalProperties", "verificationStatus"
        ]
        super().__init__("storage/landlords.csv", fieldnames)

    def get_all(self) -> List[Dict[str, Any]]:
        return self._storage.load()

    def get_by_id(self, landlord_id: str) -> Dict[str, Any] | None:
        all_landlords = self.get_all()
        for landlord in all_landlords:
            if landlord.get('landlordId') == landlord_id:
                return landlord
        return None

    def create(self, new_landlord_data: Dict[str, Any]) -> Dict[str, Any]:
        new_landlord_data["landlordId"] = new_landlord_data.get("landlordId", f"landlord_{len(self.get_all()) + 1}")
        
        all_landlords = self.get_all()
        all_landlords.append(new_landlord_data)
        self._storage.save(all_landlords)
        return new_landlord_data

    def update(self, landlord_id: str, updated_data: Dict[str, Any]) -> Dict[str, Any] | None:
        all_landlords = self.get_all()
        for i, landlord in enumerate(all_landlords):
            if landlord.get('landlordId') == landlord_id:
                all_landlords[i].update(updated_data)
                self._storage.save(all_landlords)
                return all_landlords[i]
        return None

    def delete(self, landlord_id: str) -> bool:
        all_landlords = self.get_all()
        initial_count = len(all_landlords)
        new_landlords = [landlord for landlord in all_landlords if landlord.get('landlordId') != landlord_id]
        
        if len(new_landlords) < initial_count:
            self._storage.save(new_landlords)
            return True
        return False