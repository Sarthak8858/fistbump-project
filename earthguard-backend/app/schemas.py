from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import date, time, datetime

class UserBase(BaseModel):
    email: str
    model_config = ConfigDict(from_attributes=True)

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

class WasteRecordBase(BaseModel):
    type: str
    weight: int
    model_config = ConfigDict(from_attributes=True)

class WasteRecordCreate(WasteRecordBase):
    user_id: int
    collection_date: Optional[date] = None

class WasteRecord(WasteRecordBase):
    id: int
    collection_date: date

class PickupBase(BaseModel):
    user_id: int
    date: date
    time: time
    address: str
    types: List[str]
    special_instructions: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

class PickupCreate(PickupBase):
    pass

class Pickup(PickupBase):
    id: int
    status: str
    created_at: datetime

class OverviewStats(BaseModel):
    recycled: int
    recycledChange: int
    composted: int
    compostedChange: int
    eWaste: int
    eWasteChange: int
    ideas: int
    ideasChange: int
    model_config = ConfigDict(arbitrary_types_allowed=True)

class ImpactMetrics(BaseModel):
    treeSaved: int
    waterSaved: int
    co2Reduced: int
    model_config = ConfigDict(arbitrary_types_allowed=True)
