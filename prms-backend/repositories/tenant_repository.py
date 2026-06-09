from typing import List, Dict, Any
from .base_repository import BaseRepository

class TenantRepository(BaseRepository):
    """
    Concrete repository for handling tenant data interactions.
    """
    def __init__(self):
        fieldnames = [
            "tenantId", "userId", "preferredPropertyType", 
            "preferredLocation", "identityVerified"
        ]
        super().__init__("storage/tenants.csv", fieldnames)

    def get_all(self) -> List[Dict[str, Any]]:
        return self._storage.load()

    def get_by_id(self, tenant_id: str) -> Dict[str, Any] | None:
        all_tenants = self.get_all()
        for tenant in all_tenants:
            if tenant.get('tenantId') == tenant_id:
                return tenant
        return None

    def create(self, new_tenant_data: Dict[str, Any]) -> Dict[str, Any]:
        new_tenant_data["tenantId"] = new_tenant_data.get("tenantId", f"tenant_{len(self.get_all()) + 1}")
        
        all_tenants = self.get_all()
        all_tenants.append(new_tenant_data)
        self._storage.save(all_tenants)
        return new_tenant_data

    def update(self, tenant_id: str, updated_data: Dict[str, Any]) -> Dict[str, Any] | None:
        all_tenants = self.get_all()
        for i, tenant in enumerate(all_tenants):
            if tenant.get('tenantId') == tenant_id:
                all_tenants[i].update(updated_data)
                self._storage.save(all_tenants)
                return all_tenants[i]
        return None

    def delete(self, tenant_id: str) -> bool:
        all_tenants = self.get_all()
        initial_count = len(all_tenants)
        new_tenants = [tenant for tenant in all_tenants if tenant.get('tenantId') != tenant_id]
        
        if len(new_tenants) < initial_count:
            self._storage.save(new_tenants)
            return True
        return False