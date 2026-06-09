from fastapi import FastAPI
from routes.auth_routes import router as auth_router
from routes.property_routes import router as property_router
from routes.booking_routes import router as booking_router
from routes.payment_routes import router as payment_router
from routes.maintenance_routes import router as maintenance_router

app = FastAPI(
    title="PRMS Backend API",
    description="Property Rental Management System Backend",
    version="1.0.0"
)

# Registering all core routes to form the unified API Gateway
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(property_router, prefix="/api/v1/properties", tags=["Properties"])
app.include_router(booking_router, prefix="/api/v1/bookings", tags=["Bookings"])
app.include_router(payment_router, prefix="/api/v1/payments", tags=["Payments"])
app.include_router(maintenance_router, prefix="/api/v1/maintenance", tags=["Maintenance"])

@app.get("/")
def read_root():
    """Root health check endpoint."""
    return {"message": "PRMS Backend API is running successfully."}

# Future base for root routes (Task 006: Landing Page support)
# @app.get("/api/v1/properties")
# def list_properties():
#     # Will use PropertyRepository here
#     return []