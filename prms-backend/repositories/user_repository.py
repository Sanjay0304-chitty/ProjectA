from typing import Dict, Any, List
import csv
import os

class UserRepository:
    
    def __init__(self, csv_file='users.csv'):
        self.csv_file = csv_file
        self._ensure_csv_file_exists()
    
    def _ensure_csv_file_exists(self):
        if not os.path.exists(self.csv_file):
            with open(self.csv_file, 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerow([])  # Create an empty CSV file
                
    def get_all(self) -> List[Dict[str, Any]]:
        """Retrieve all user records from CSV."""
        users = []
        if os.path.exists(self.csv_file):
            with open(self.csv_file, mode='r') as csv_file:
                csv_reader = csv.DictReader(csv_file)
                for row in csv_reader:
                    users.append(row)
        return users
    
    def add(self, user: Dict[str, Any]) -> None:
        """Add new user record to CSV."""
        existing_users = self.get_all()
        existing_users.append(user)
        
        with open(self.csv_file, mode='w', newline='') as csv_file:
            fieldnames = existing_users[0].keys() if existing_users else ['email']
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(existing_users)
    
    def update(self, user_id: int, user: Dict[str, Any]) -> None:
        """Update existing user record by user_id."""
        existing_users = self.get_all()
        for i, existing_user in enumerate(existing_users):
            try:
                if int(existing_user.get('id', 0)) == user_id:
                    existing_users[i] = user
                    break
            except ValueError:
                continue
        self._write_updated_users(existing_users)
    
    def get_by_email(self, email: str) -> Dict[str, Any] | None:
        """Find and return user record by email (exact match)."""
        for user in self.get_all():
            if user.get("email", "").strip().lower() == email.strip().lower():
                return user
        return None
    
    def _write_updated_users(self, users: List[Dict[str, Any]]):
        if not users:
            return

        with open(self.csv_file, mode='w', newline='') as csv_file:
            fieldnames = users[0].keys()
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(users)