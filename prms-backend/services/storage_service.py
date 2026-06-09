import csv
import os
from typing import Dict, Any, List, Optional

class StorageService:
    """
    Handles concrete data access operations (simulating a database layer)
    by reading/writing to CSV files in the designated data directory.
    
    This service is the concrete implementation of the layer that repositories
    depend on.
    """
    def __init__(self, base_path: str):
        self.base_path = base_path

    def _get_file_path(self, table_name: str) -> str:
        """Returns the full path for a given table name."""
        return os.path.join(self.base_path, f"{table_name}.csv")

    def load_table(self, table_name: str) -> List[Dict[str, Any]]:
        """
        Loads all records from a specified table CSV file.
        Returns a list of dictionaries (records).
        """
        filepath = self._get_file_path(table_name)
        records = []
        try:
            with open(filepath, mode='r', newline='') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    records.append(dict(row))
        except FileNotFoundError:
            print(f"Warning: CSV file not found for table '{table_name}' at {filepath}")
        return records

    def get_record(self, table_name: str, entity_id: str) -> Optional[Dict[str, Any]]:
        """
        Retrieves a single record by a specific ID field (assuming ID is the primary key).
        """
        records = self.load_table(table_name)
        for record in records:
            # Assuming the ID field name is consistent across tables
            if record.get('id') == entity_id or record.get('userId') == entity_id or record.get('tenantId') == entity_id or record.get('propertyId') == entity_id or record.get('bookingId') == entity_id or record.get('paymentId') == entity_id or record.get('ticketId') == entity_id:
                 return record
        return None

    def insert_record(self, table_name: str, record: Dict[str, Any]) -> Dict[str, Any]:
        """
        Inserts a new record by appending it to the CSV file.
        (Does not handle ID generation here; relies on external data loader or the record input).
        """
        filepath = self._get_file_path(table_name)
        
        # To correctly append, we need headers. This is a simplification.
        try:
            all_records = self.load_table(table_name)
            if not all_records:
                # If file is empty, we assume headers from common schemas/manual setup
                # This is a brittle design for a real system but works for a CSV prototype.
                pass 
        except Exception as e:
            print(f"Error checking CSV structure: {e}")
            return {}

        # Write the single record
        try:
            with open(filepath, mode='a', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=list(record.keys()))
                writer.writerow(record)
            return record
        except Exception as e:
            print(f"Error inserting record into {table_name}: {e}")
            return {}

    def update_record(self, table_name: str, entity_id: str, record: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Updates an existing record by reading all, finding the match, updating, and rewriting the entire file.
        WARNING: Inefficient for large files, but necessary for CSV prototype.
        """
        filepath = self._get_file_path(table_name)
        
        all_records = self.load_table(table_name)
        updated_records = []
        found = False
        
        # Identify the ID column name based on the table (simplification)
        if table_name == "users": id_field = "userId"
        elif table_name == "tenants": id_field = "tenantId"
        elif table_name == "landlords": id_field = "landlordId"
        elif table_name == "administrators": id_field = "adminId"
        elif table_name == "properties": id_field = "propertyId"
        elif table_name == "bookings": id_field = "bookingId"
        elif table_name == "payments": id_field = "paymentId"
        elif table_name == "maintenance_tickets": id_field = "ticketId"
        else: id_field = None

        if not id_field:
            print(f"Error: ID field unknown for table {table_name}")
            return None

        for old_record in all_records:
            # Check if this record matches the ID
            if old_record.get(id_field) == entity_id:
                # Create new record by merging existing data with updates
                new_record = old_record.copy()
                new_record.update(record)
                updated_records.append(new_record)
                found = True
            else:
                updated_records.append(old_record)

        if not found:
            print(f"Update failed: ID {entity_id} not found in {table_name}.")
            return None
        
        # Rewrite the file
        try:
            fieldnames = list(all_records[0].keys()) if all_records else list(record.keys())
            with open(filepath, mode='w', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(updated_records)
            return updated_records[0] # Return the updated record
        except Exception as e:
            print(f"Error rewriting CSV file {filepath}: {e}")
            return None


    def delete_record(self, table_name: str, entity_id: str) -> bool:
        """
        Deletes a record by rewriting the file without the target record.
        """
        filepath = self._get_file_path(table_name)
        all_records = self.load_table(table_name)
        new_records = []
        deleted = False

        # Identify the ID column name based on the table
        if table_name == "users": id_field = "userId"
        elif table_name == "tenants": id_field = "tenantId"
        elif table_name == "landlords": id_field = "landlordId"
        elif table_name == "administrators": id_field = "adminId"
        elif table_name == "properties": id_field = "propertyId"
        elif table_name == "bookings": id_field = "bookingId"
        elif table_name == "payments": id_field = "paymentId"
        elif table_name == "maintenance_tickets": id_field = "ticketId"
        else: 
            print(f"Error: ID field unknown for table {table_name}")
            return False
        
        for record in all_records:
            if record.get(id_field) != entity_id:
                new_records.append(record)
            else:
                deleted = True

        if not deleted:
            return False
        
        # Rewrite the file
        try:
            fieldnames = list(all_records[0].keys()) if all_records else list(record.keys())
            with open(filepath, mode='w', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(new_records)
            return True
        except Exception as e:
            print(f"Error rewriting CSV file {filepath} during deletion: {e}")
            return False

