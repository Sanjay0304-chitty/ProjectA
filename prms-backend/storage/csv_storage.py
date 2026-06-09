import csv
from typing import Any, List, Dict

class CSVStorage:
    """
    Handles low-level data persistence for CSV files.
    Assumes the first row is the header.
    """
    def __init__(self, file_path: str, fieldnames: List[str]):
        self.file_path = file_path
        self.fieldnames = fieldnames

    def load(self) -> List[Dict[str, Any]]:
        """Loads all records from the CSV file."""
        try:
            data = []
            with open(self.file_path, mode='r', newline='') as csvfile:
                reader = csv.DictReader(csvfile, fieldnames=self.fieldnames)
                # Skip the header row if it was included in the file
                next(reader) 
                for row in reader:
                    data.append(row)
            return data
        except FileNotFoundError:
            print(f"Warning: CSV file not found at {self.file_path}. Returning empty list.")
            return []
        except Exception as e:
            print(f"Error loading CSV file {self.file_path}: {e}")
            return []

    def save(self, data: List[Dict[str, Any]]) -> None:
        """Saves or updates all records in the CSV file."""
        try:
            with open(self.file_path, mode='w', newline='') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=self.fieldnames)
                writer.writeheader()
                writer.writerows(data)
        except Exception as e:
            print(f"Error saving CSV file {self.file_path}: {e}")