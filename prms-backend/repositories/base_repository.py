from abc import ABC, abstractmethod
from typing import List, Dict, Any
from storage.csv_storage import CSVStorage

class BaseRepository(ABC):
    """
    Abstract base class for all data repositories.
    Defines the common CRUD interface.
    """
    def __init__(self, file_path: str, fieldnames: List[str]):
        self._storage = CSVStorage(file_path, fieldnames)
        self.fieldnames = fieldnames

    @abstractmethod
    def get_all(self) -> List[Dict[str, Any]]:
        """Retrieves all records from the data store."""
        pass

    @abstractmethod
    def get_by_id(self, record_id: str) -> Dict[str, Any] | None:
        """Retrieves a single record by its unique ID."""
        pass

    @abstractmethod
    def create(self, new_record: Dict[str, Any]) -> Dict[str, Any]:
        """Creates and saves a new record."""
        pass

    @abstractmethod
    def update(self, record_id: str, updated_record: Dict[str, Any]) -> Dict[str, Any] | None:
        """Updates an existing record by its ID."""
        pass

    @abstractmethod
    def delete(self, record_id: str) -> bool:
        """Deletes a record by its ID."""
        pass