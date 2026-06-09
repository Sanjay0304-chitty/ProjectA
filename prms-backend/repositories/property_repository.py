from typing import List, Dict, Any
from .base_repository import BaseRepository

class PropertyRepository(BaseRepository):
    """
    Concrete repository for handling property data interactions.
    """
    def __init__(self):
        fieldnames = [
            "propertyId", "title", "description", "propertyType", 
            "rentalPrice", "address", "bedrooms", "bathrooms", 
            "propertyImages", "status"
        ]
        super().__init__("storage/properties.csv", fieldnames)

    def get_all(self) -> List[Dict[str, Any]]:
        return self._storage.load()

    def get_by_id(self, property_id: str) -> Dict[str, Any] | None:
        all_properties = self.get_all()
        for property_ in all_properties:
            if property_.get('propertyId') == property_id:
                return property_
        return None

    def create(self, new_property_data: Dict[str, Any]) -> Dict[str, Any]:
        new_property_data["propertyId"] = new_property_data.get("propertyId", f"property_{len(self.get_all()) + 1}")
        
        all_properties = self.get_all()
        all_properties.append(new_property_data)
        self._storage.save(all_properties)
        return new_property_data

    def update(self, property_id: str, updated_data: Dict[str, Any]) -> Dict[str, Any] | None:
        all_properties = self.get_all()
        for i, property_ in enumerate(all_properties):
            if property_.get('propertyId') == property_id:
                all_properties[i].update(updated_data)
                self._storage.save(all_properties)
                return all_properties[i]
        return None

    def delete(self, property_id: str) -> bool:
        all_properties = self.get_all()
        initial_count = len(all_properties)
        new_properties = [property_ for property_ in all_properties if property_.get('propertyId') != property_id]
        
        if len(new_properties) < initial_count:
            self._storage.save(new_properties)
            return True
        return False