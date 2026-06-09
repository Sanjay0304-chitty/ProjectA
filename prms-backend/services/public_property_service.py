from typing import List, Dict, Any, Optional
from repositories.property_repository import PropertyRepository

class PublicPropertyService:
    """
    Service layer dedicated to handling public-facing property requests (Task 006).
    This service requires no authentication and serves general browsing needs.
    """
    def __init__(self, property_repository: PropertyRepository):
        self.property_repository = property_repository

    def get_all_available_properties(self) -> List[Dict[str, Any]]:
        """
        Retrieves all properties that are currently 'Available'.
        This serves as the core data for the Public Landing Page.
        """
        all_properties = self.property_repository.get_all()
        available_properties = [
            prop for prop in all_properties 
            if prop.get('status') == 'Available' and prop.get('rentPrice') is not None
        ]
        
        # Only return simplified, publicly viewable fields
        simplified = []
        for prop in available_properties:
            simplified.append({
                "propertyId": prop.get('propertyId'),
                "title": prop.get('title'),
                "propertyType": prop.get('propertyType'),
                "rentPrice": prop.get('rentPrice'),
                "bedrooms": prop.get('bedrooms'),
                "bathrooms": prop.get('bathrooms'),
                "status": prop.get('status')
            })
        return simplified

    def search_properties(self, location: Optional[str] = None, type: Optional[str] = None, min_price: Optional[float] = None) -> List[Dict[str, Any]]:
        """
        def search_properties(self, location: Optional[str] = None, type: Optional[str] = None, min_price: Optional[float] = None) -> List[Dict[str, Any]]:
            """
            Searches properties based on criteria (Task 014).
            Filters are applied against all properties regardless of status, but only returns 'Available' ones.
            """
            all_properties = self.property_repository.get_all()
            def search_properties(self, location: Optional[str] = None, type: Optional[str] = None, min_price: Optional[float] = None) -> List[Dict[str, Any]]:
                """
                Searches properties based on criteria (Task 014).
                Filters are applied against all properties regardless of status, but only returns 'Available' ones.
                """
                all_properties = self.property_repository.get_all()
        
                # Filter properties based on criteria
                filtered_properties = [
                    prop for prop in all_properties 
                    if prop.get('status') == 'Available' # Essential filter
                ]
        
                # Apply search filters
                if location:
                    filtered_properties = [prop for prop in filtered_properties if location.lower() in str(prop.get('title', '')).lower() or location.lower() in str(prop.get('propertyType', '')).lower()]
                if type:
                    filtered_properties = [prop for prop in filtered_properties if type.lower() in prop.get('propertyType', '').lower()]
                if min_price is not None:
                    filtered_properties = [prop for prop in filtered_properties if prop.get('rentPrice', 0) >= min_price]

                # Return simplified list
                simplified = []
                for prop in filtered_properties:
                    simplified.append({
                        "propertyId": prop.get('propertyId'),
                        "title": prop.get('title'),
                        "propertyType": prop.get('propertyType'),
                        "rentPrice": prop.get('rentPrice'),
                        "bedrooms": prop.get('bedrooms'),
                        "bathrooms": prop.get('bathrooms'),
                        "status": prop.get('status')
                    })
                return simplified