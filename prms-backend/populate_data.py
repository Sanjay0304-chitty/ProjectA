import csv
import random
from typing import Dict, Any, List

# --- Utility Functions ---

def generate_random_string(length: int = 10) -> str:
    letters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    return ''.join(random.choice(letters) for i in range(length))

def generate_address() -> str:
    streets = ['Main St', 'Oak Ave', 'Pine Ln', 'Maple Ct', 'Elm Rd']
    cities = ['Springfield', 'Riverside', 'Metroville', 'Northport']
    return f"{random.randint(100, 999)} {random.choice(streets)}, {random.choice(cities)}"

def generate_full_name() -> str:
    first_names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona']
    last_names = ['Smith', 'Jones', 'Brown', 'Miller', 'Davis', 'Garcia']
    return f"{random.choice(first_names)} {random.choice(last_names)}"

def generate_property_details() -> Dict[str, Any]:
    property_types = ['Apartment', 'House', 'Condo', 'Villa']
    statuses = ['Available', 'Rented', 'Maintenance']
    return {
        "title": generate_random_string(15),
        "description": f"A beautiful {random.choice(property_types)} located in a prime area. ID: {generate_random_string(5)}.",
        "propertyType": random.choice(property_types),
        "rentalPrice": random.randint(1000, 5000),
        "address": generate_address(),
        "bedrooms": random.randint(1, 5),
        "bathrooms": random.randint(1, 3),
        "propertyImages": f"url/img_{generate_random_string(5)}.jpg",
        "status": random.choice(statuses)
    }

# --- Data Generation Functions ---

def generate_users(count: int) -> List[Dict[str, Any]]:
    users = []
    roles = ["Tenant", "Landlord", "Administrator"]
    for i in range(1, count + 1):
        user = {
            "userId": f"user_{i}",
            "firstName": generate_random_string(5),
            "lastName": generate_random_string(5),
            "email": f"user{i}@prms.com",
            "password": "hashed_password_placeholder", 
            "phoneNumber": f"555-123-{i:04d}",
            "role": random.choice(roles),
            "accountStatus": "Active",
            "createdDate": "2026-01-01"
        }
        users.append(user)
    return users

def generate_tenants(count: int, users: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    tenants = []
    for i in range(1, count + 1):
        user = users[i-1]
        tenant = {
            "tenantId": f"tenant_{i}",
            "userId": user["userId"],
            "preferredPropertyType": random.choice(['House', 'Apartment']),
            "preferredLocation": random.choice(['Downtown', 'Suburbs', 'Outskirts']),
            "identityVerified": random.choice([True, False])
        }
        tenants.append(tenant)
    return tenants

def generate_landlords(count: int, users: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    landlords = []
    for i in range(1, count + 1):
        user = users[i-1]
        landlord = {
            "landlordId": f"landlord_{i}",
            "userId": user["userId"],
            "companyName": f"Landlord Corp {i}",
            "totalProperties": random.randint(1, 20),
            "verificationStatus": random.choice(['Verified', 'Pending'])
        }
        landlords.append(landlord)
    return landlords

def generate_administrators(count: int, users: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    admins = []
    for i in range(1, count + 1):
        user = users[i-1]
        admin = {
            "administratorId": f"admin_{i}",
            "userId": user["userId"],
            "permissionLevel": random.choice([1, 2, 3]) # 1=Low, 3=SuperAdmin
        }
        admins.append(admin)
    return admins

# --- Mocking other data for structure ---

def generate_properties(count: int) -> List[Dict[str, Any]]:
    properties = []
    for i in range(count):
        # Ensure the propertyId is always generated here and is consistent
        property_data = generate_property_details()
        property_data["propertyId"] = f"property_{i+1}" 
        properties.append(property_data)
    return properties

def generate_bookings(count: int, properties: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    bookings = []
    # FIX: Ensure propertyId is accessed correctly from the dictionary keys
    property_ids = [p["propertyId"] for p in properties]
    for i in range(1, count + 1):
        booking = {
            "bookingId": f"book_{i}",
            "propertyId": random.choice(property_ids),
            "tenantId": f"tenant_{random.randint(1, 50)}", # Assuming 50 tenants exist
            "startDate": "2026-07-01",
            "endDate": "2026-07-15",
            "status": random.choice(['Pending', 'Approved', 'Rejected'])
        }
        bookings.append(booking)
    return bookings

def generate_payments(count: int) -> List[Dict[str, Any]]:
    return [{
        "paymentId": f"pay_{i}", 
        "bookingId": f"book_{random.randint(1, 200)}",
        "amount": random.randint(500, 5000),
        "paymentDate": "2026-06-01",
        "paymentMethod": random.choice(['FPX', 'Credit Card', 'E-Wallet']),
        "paymentStatus": random.choice(['Completed', 'Failed'])
    } for i in range(1, count + 1)]

def generate_maintenance_tickets(count: int) -> List[Dict[str, Any]]:
    return [{
        "ticketId": f"ticket_{i}", 
        "tenantId": f"tenant_{random.randint(1, 50)}",
        "propertyId": f"property_{random.randint(1, 100)}",
        "issueDescription": f"Minor issue in property {random.randint(1, 100)}. Needs review.",
        "createdAt": "2026-06-10",
        "status": random.choice(['Open', 'Assigned', 'In Progress', 'Completed', 'Closed'])
    } for i in range(1, count + 1)]

def generate_website_settings(count: int) -> List[Dict[str, Any]]:
    settings = []
    settings.append({
        "settingKey": "MAIN_BANNER_TEXT", 
        "settingValue": "Welcome to PRMS!", 
        "description": "The main headline text on the homepage."
    })
    settings.append({
        "settingKey": "HOME_PAGE_SEO_KEYWORDS", 
        "settingValue": "properties, rent, rental, homes", 
        "description": "Keywords for search engine optimization."
    })
    return settings

def generate_dummy_data(root_path: str):
    print("--- Starting Data Population (Phase 3) ---")
    
    # 1. User Generation (Base for all roles) - Total 100 users
    all_users = generate_users(100)
    print(f"Generated {len(all_users)} Users.")

    # 2. Role-Specific Generation
    tenants = generate_tenants(50, all_users)
    landlords = generate_landlords(20, all_users)
    administrators = generate_administrators(3, all_users)
    
    # 3. Property Generation
    properties = generate_properties(100)
    print(f"Generated {len(properties)} Properties.")
    
    # 4. Supporting Data Generation
    bookings = generate_bookings(200, properties)
    payments = generate_payments(300)
    maintenance_tickets = generate_maintenance_tickets(50)
    website_settings = generate_website_settings(2)
    
    # 5. Save all data to CSV files
    
    # Function to write to CSV
    def write_to_csv(data: List[Dict[str, Any]], fieldnames: List[str], file_path: str):
        print(f"Writing {len(data)} records to {file_path}")
        with open(file_path, mode='w', newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(data)

    # Map of data to their fieldnames and file paths
    data_map = {
        "users": (all_users, ["userId", "firstName", "lastName", "email", "password", "phoneNumber", "role", "accountStatus", "createdDate"], 
                  f"{root_path}/storage/users.csv"),
        "tenants": (tenants, ["tenantId", "userId", "preferredPropertyType", "preferredLocation", "identityVerified"], 
                    f"{root_path}/storage/tenants.csv"),
        "landlords": (landlords, ["landlordId", "userId", "companyName", "totalProperties", "verificationStatus"], 
                       f"{root_path}/storage/landlords.csv"),
        "administrators": (administrators, ["administratorId", "userId", "permissionLevel"], 
                             f"{root_path}/storage/administrators.csv"),
        "properties": (properties, ["propertyId", "title", "description", "propertyType", "rentalPrice", "address", "bedrooms", "bathrooms", "propertyImages", "status"], 
                        f"{root_path}/storage/properties.csv"),
        "bookings": (bookings, ["bookingId", "propertyId", "tenantId", "startDate", "endDate", "status"], 
                     f"{root_path}/storage/bookings.csv"),
        "payments": (payments, ["paymentId", "bookingId", "amount", "paymentDate", "paymentMethod", "paymentStatus"], 
                     f"{root_path}/storage/payments.csv"),
        "maintenance_tickets": (maintenance_tickets, ["ticketId", "tenantId", "propertyId", "issueDescription", "createdAt", "status"], 
                                  f"{root_path}/storage/maintenance_tickets.csv"),
        "website_settings": (website_settings, ["settingKey", "settingValue", "description"], 
                                f"{root_path}/storage/website_settings.csv"),
        # Audit logs will be empty initially, as they are event-driven, but we create the file
        "audit_logs": ([], ["logId", "timestamp", "userId", "action", "resourceType", "resourceId", "details"],
                       f"{root_path}/storage/audit_logs.csv")
    }

    # Run the writers
    for name, (data, fields, path) in data_map.items():
        write_to_csv(data, fields, path)
        
    print("\n--- Data Population Complete ---")

if __name__ == "__main__":
    BASE_DIR = "/home/wong/ProjectA/prms-backend"
    generate_dummy_data(BASE_DIR)