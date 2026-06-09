from typing import List, Dict, Any
from .base_repository import BaseRepository

class WebsiteSettingsRepository(BaseRepository):
    """
    Concrete repository for handling global application settings.
    """
    def __init__(self):
        fieldnames = [
            "settingKey", "settingValue", "description"
        ]
        super().__init__("storage/website_settings.csv", fieldnames)

    def get_all(self) -> List[Dict[str, Any]]:
        return self._storage.load()

    def get_by_id(self, setting_key: str) -> Dict[str, Any] | None:
        all_settings = self.get_all()
        for setting in all_settings:
            if setting.get('settingKey') == setting_key:
                return setting
        return None
    
    def create(self, new_setting_data: Dict[str, Any]) -> Dict[str, Any]:
        new_setting_data["settingKey"] = new_setting_data.get("settingKey", f"setting_{len(self.get_all()) + 1}")
        
        all_settings = self.get_all()
        all_settings.append(new_setting_data)
        self._storage.save(all_settings)
        return new_setting_data

    def update(self, setting_key: str, updated_data: Dict[str, Any]) -> Dict[str, Any] | None:
        all_settings = self.get_all()
        for i, setting in enumerate(all_settings):
            if setting.get('settingKey') == setting_key:
                # Handle merging the update, assuming key must remain the same
                all_settings[i].update(updated_data)
                self._storage.save(all_settings)
                return all_settings[i]
        return None

    def delete(self, setting_key: str) -> bool:
        all_settings = self.get_all()
        initial_count = len(all_settings)
        new_settings = [setting for setting in all_settings if setting.get('settingKey') != setting_key]
        
        if len(new_settings) < initial_count:
            self._storage.save(new_settings)
            return True
        return False