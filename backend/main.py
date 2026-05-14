from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import os
import jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer

app = FastAPI(title="HDOC Bank Core API", version="2.5.0")

# --- CONFIGURATION ---
SECRET_KEY = "HDOC_SUPER_SECRET_KEY_2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
DB_FILE = "database.json"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODELS ---
class LoginRequest(BaseModel):
    userId: str
    password: str

class UserUpdate(BaseModel):
    userId: str
    name: Optional[str] = None
    balance: Optional[float] = None

class Token(BaseModel):
    access_token: str
    token_type: str

# --- DATABASE LOGIC ---
def load_db():
    if not os.path.exists(DB_FILE):
        default_data = {
            "users": [
                { "id": 1, "userId": "hdocuser", "password": "HDOC@123", "name": "RAHUL KUMAR", "balance": 254892.50, "status": "ACTIVE", "acc": "50100451278964", "role": "user" },
                { "id": 2, "userId": "admin", "password": "Admin@HDOC", "name": "Super Admin", "status": "ACTIVE", "acc": "ADMIN-001", "role": "admin" }
            ]
        }
        with open(DB_FILE, "w") as f:
            json.dump(default_data, f, indent=4)
        return default_data
    with open(DB_FILE, "r") as f:
        return json.load(f)

def save_db(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=4)

# --- AUTH LOGIC ---
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# --- ENDPOINTS ---
@app.post("/api/auth/login", response_model=Token)
async def login(req: LoginRequest):
    db = load_db()
    user = next((u for u in db["users"] if u["userId"] == req.userId and u["password"] == req.password), None)
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user["userId"], "role": user["role"]})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/user/profile")
async def get_profile(token: str):
    # Simplified token verify for demo
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        db = load_db()
        user = next((u for u in db["users"] if u["userId"] == payload["sub"]), None)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/api/admin/users")
async def get_all_users():
    db = load_db()
    return db["users"]

@app.post("/api/admin/update-user")
async def update_user(req: UserUpdate):
    db = load_db()
    for u in db["users"]:
        if u["userId"] == req.userId:
            if req.name: u["name"] = req.name
            if req.balance is not None: u["balance"] = req.balance
            save_db(db)
            return {"status": "success", "message": "User updated"}
    raise HTTPException(status_code=404, detail="User not found")

@app.get("/")
async def root():
    return {"message": "HDOC Bank Core API is Online"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
