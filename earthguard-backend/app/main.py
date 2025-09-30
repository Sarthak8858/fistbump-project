from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from . import models, schemas
from .database import engine, get_db
from typing import List
from datetime import datetime, timedelta
import json
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from passlib.context import CryptContext

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FistBump Waste Management API",
    description="API for managing waste records, pickups, and environmental impact tracking",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://fistbump-project.onrender.com",
        "*"  # Allow all origins for now - tighten this in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"message": "Invalid data provided", "details": str(exc)},
    )

# Root endpoint
@app.get("/")
def read_root():
    """
    Welcome endpoint - provides API information and available routes
    """
    return {
        "message": "Welcome to FistBump Waste Management API",
        "status": "online",
        "version": "1.0.0",
        "documentation": {
            "swagger": "/docs",
            "redoc": "/redoc"
        },
        "endpoints": {
            "users": "/users/",
            "waste_records": "/waste-records/",
            "pickups": "/pickups/",
            "overview_stats": "/overview/stats",
            "impact_metrics": "/overview/impact",
            "health": "/healthz"
        }
    }

# Health check endpoint
@app.get("/healthz")
def health_check():
    """
    Health check endpoint for monitoring
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    try:
        db.commit()
        db.refresh(db_user)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    return db_user

@app.post("/waste-records/", response_model=schemas.WasteRecord)
def create_waste_record(record: schemas.WasteRecordCreate, db: Session = Depends(get_db)):
    db_record = models.WasteRecord(**record.dict())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

@app.get("/waste-records/{user_id}", response_model=List[schemas.WasteRecord])
def get_user_waste_records(user_id: int, db: Session = Depends(get_db)):
    records = db.query(models.WasteRecord).filter(models.WasteRecord.user_id == user_id).all()
    return records

@app.post("/pickups/", response_model=schemas.Pickup)
def create_pickup(pickup: schemas.PickupCreate, db: Session = Depends(get_db)):
    try:
        # Convert types to string if it's a list
        types_str = json.dumps(pickup.types) if isinstance(pickup.types, list) else pickup.types
        
        db_pickup = models.Pickup(
            user_id=pickup.user_id,
            date=pickup.date,
            time=pickup.time,
            address=pickup.address,
            types=types_str,
            special_instructions=pickup.special_instructions,
            status="Scheduled"
        )
        db.add(db_pickup)
        db.commit()
        db.refresh(db_pickup)
        
        # Convert types back to list for response
        db_pickup.types = json.loads(db_pickup.types if isinstance(db_pickup.types, str) else "")
        return db_pickup
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/pickups/", response_model=List[schemas.Pickup])
def get_pickups(db: Session = Depends(get_db)):
    try:
        pickups = db.query(models.Pickup).all()
        result = []
        for pickup in pickups:
            pickup_dict = pickup.__dict__.copy()
            try:
                pickup_dict["types"] = json.loads(getattr(pickup, "types"))
            except json.JSONDecodeError:
                pickup_dict["types"] = []
            result.append(schemas.Pickup(**pickup_dict))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/pickups/{pickup_id}")
def cancel_pickup(pickup_id: int, db: Session = Depends(get_db)):
    pickup = db.query(models.Pickup).filter(models.Pickup.id == pickup_id).first()
    if pickup:
        setattr(pickup, "status", "Cancelled")
        db.commit()
        return {"message": "Pickup cancelled successfully"}
    raise HTTPException(status_code=404, detail="Pickup not found")

@app.get("/overview/stats", response_model=schemas.OverviewStats)
def get_overview_stats(db: Session = Depends(get_db)):
    try:
        # Calculate stats from waste records
        today = datetime.now().date()
        yesterday = today - timedelta(days=1)
        
        today_stats = db.query(models.WasteRecord).filter(
            models.WasteRecord.date >= today
        ).all()
        
        yesterday_stats = db.query(models.WasteRecord).filter(
            models.WasteRecord.date >= yesterday,
            models.WasteRecord.date < today
        ).all()
        
        # Calculate metrics
        # In a real app, you'd aggregate actual data
        return {
            "recycled": len(today_stats),
            "recycledChange": 12,
            "composted": 84,
            "compostedChange": 8,
            "eWaste": 23,
            "eWasteChange": 15,
            "ideas": 56,
            "ideasChange": 5
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/overview/impact", response_model=schemas.ImpactMetrics)
def get_impact_metrics(db: Session = Depends(get_db)):
    try:
        # Calculate impact metrics based on waste records
        # In a real app, you'd calculate these based on actual data
        return {
            "treeSaved": 47,
            "waterSaved": 1250,
            "co2Reduced": 890
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
