from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import json
import os
import jwt
from functools import wraps

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Config
SECRET_KEY = "hdoc-bank-secret-key-2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

# Database file paths
USERS_DB = "data/users.json"
ADMIN_DB = "data/admin.json"

# Initialize database files
def init_databases():
    os.makedirs("data", exist_ok=True)
    
    # Initialize users database
    if not os.path.exists(USERS_DB):
        default_users = [
            {
                "id": 1,
                "user_id": "hdocuser",
                "name": "Rahul Kumar",
                "email": "rahul@example.com",
                "password": "HDOC@123",
                "balance": 254892.50,
                "account_number": "1234567890",
                "ifsc_code": "HDOC0000123",
                "branch": "Mumbai - Fort Branch",
                "status": "active",
                "created_at": datetime.now().isoformat(),
                "transactions": [
                    {"type": "credit", "description": "Salary Deposit", "amount": 75000, "date": "Today", "time": "09:30 AM", "status": "completed"},
                    {"type": "debit", "description": "Amazon Purchase", "amount": 5240, "date": "Yesterday", "time": "02:15 PM", "status": "completed"},
                    {"type": "debit", "description": "Electricity Bill", "amount": 2100, "date": "2 days ago", "time": "11:00 AM", "status": "completed"},
                    {"type": "credit", "description": "Freelance Payment", "amount": 8500, "date": "3 days ago", "time": "03:45 PM", "status": "completed"},
                    {"type": "debit", "description": "Mobile Recharge", "amount": 499, "date": "4 days ago", "time": "10:20 AM", "status": "completed"},
                ]
            },
            {
                "id": 2,
                "user_id": "user2",
                "name": "Priya Sharma",
                "email": "priya@example.com",
                "password": "User@123",
                "balance": 175430.00,
                "account_number": "0987654321",
                "ifsc_code": "HDOC0000124",
                "branch": "Delhi - Connaught Place",
                "status": "active",
                "created_at": datetime.now().isoformat(),
                "transactions": []
            },
            {
                "id": 3,
                "user_id": "user3",
                "name": "Amit Patel",
                "email": "amit@example.com",
                "password": "Amit@456",
                "balance": 425680.75,
                "account_number": "1122334455",
                "ifsc_code": "HDOC0000125",
                "branch": "Bangalore - MG Road",
                "status": "active",
                "created_at": datetime.now().isoformat(),
                "transactions": []
            }
        ]
        save_users(default_users)
    
    # Initialize admin database
    if not os.path.exists(ADMIN_DB):
        default_admin = {
            "admin_id": "admin",
            "password": "Admin@HDOC"
        }
        with open(ADMIN_DB, 'w') as f:
            json.dump(default_admin, f, indent=2)

# Database helper functions
def get_users():
    if os.path.exists(USERS_DB):
        with open(USERS_DB, 'r') as f:
            return json.load(f)
    return []

def save_users(users):
    with open(USERS_DB, 'w') as f:
        json.dump(users, f, indent=2)

def get_admin():
    if os.path.exists(ADMIN_DB):
        with open(ADMIN_DB, 'r') as f:
            return json.load(f)
    return {}

# JWT Functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except:
        return None

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]
            except:
                return jsonify({"error": "Invalid token format"}), 401
        
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        
        payload = verify_token(token)
        if not payload:
            return jsonify({"error": "Invalid or expired token"}), 401
        
        return f(payload, *args, **kwargs)
    return decorated

# Routes

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user_id = data.get('user_id')
    password = data.get('password')
    
    users = get_users()
    user = next((u for u in users if u['user_id'] == user_id), None)
    
    if not user or user['password'] != password:
        return jsonify({"error": "Invalid credentials"}), 401
    
    token = create_access_token({"user_id": user_id, "id": user['id']})
    return jsonify({
        "token": token,
        "user": {
            "user_id": user['user_id'],
            "name": user['name'],
            "email": user['email'],
            "balance": user['balance'],
            "account_number": user['account_number']
        }
    }), 200

@app.route('/api/auth/logout', methods=['POST'])
@token_required
def logout(payload):
    return jsonify({"message": "Logged out successfully"}), 200

@app.route('/api/auth/profile', methods=['GET'])
@token_required
def get_profile(payload):
    users = get_users()
    user = next((u for u in users if u['user_id'] == payload['user_id']), None)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({
        "user_id": user['user_id'],
        "name": user['name'],
        "email": user['email'],
        "balance": user['balance'],
        "account_number": user['account_number'],
        "ifsc_code": user['ifsc_code'],
        "branch": user['branch'],
        "status": user['status']
    }), 200

@app.route('/api/banking/balance', methods=['GET'])
@token_required
def get_balance(payload):
    users = get_users()
    user = next((u for u in users if u['user_id'] == payload['user_id']), None)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({"balance": user['balance']}), 200

@app.route('/api/banking/transactions', methods=['GET'])
@token_required
def get_transactions(payload):
    users = get_users()
    user = next((u for u in users if u['user_id'] == payload['user_id']), None)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({"transactions": user.get('transactions', [])}), 200

@app.route('/api/banking/cards', methods=['GET'])
@token_required
def get_cards(payload):
    cards = [
        {
            "id": 1,
            "type": "Debit",
            "number": "1234 5678 9012 3456",
            "holder": "RAHUL KUMAR",
            "expiry": "12/26",
            "color": "from-blue-500 to-purple-600"
        },
        {
            "id": 2,
            "type": "Credit",
            "number": "4532 1111 2222 3333",
            "holder": "RAHUL KUMAR",
            "expiry": "08/27",
            "color": "from-green-400 to-blue-500"
        }
    ]
    return jsonify({"cards": cards}), 200

@app.route('/api/banking/analytics', methods=['GET'])
@token_required
def get_analytics(payload):
    analytics = {
        "monthly_spending": [
            {"month": "Jan", "amount": 4200},
            {"month": "Feb", "amount": 3800},
            {"month": "Mar", "amount": 5200},
            {"month": "Apr", "amount": 4800},
            {"month": "May", "amount": 5500},
            {"month": "Jun", "amount": 6200}
        ],
        "income_vs_expenses": [
            {"name": "Income", "value": 75000},
            {"name": "Expenses", "value": 15240}
        ],
        "spending_by_category": [
            {"name": "Shopping", "value": 40},
            {"name": "Food", "value": 25},
            {"name": "Transport", "value": 20},
            {"name": "Utilities", "value": 15}
        ]
    }
    return jsonify(analytics), 200

# Admin Routes

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    admin_id = data.get('admin_id')
    password = data.get('password')
    
    admin = get_admin()
    if admin.get('admin_id') != admin_id or admin.get('password') != password:
        return jsonify({"error": "Invalid credentials"}), 401
    
    token = create_access_token({"admin_id": admin_id, "is_admin": True})
    return jsonify({
        "token": token,
        "admin": {"admin_id": admin_id}
    }), 200

@app.route('/api/admin/users', methods=['GET'])
@token_required
def get_all_users(payload):
    if not payload.get('is_admin'):
        return jsonify({"error": "Admin access required"}), 403
    
    users = get_users()
    return jsonify({
        "users": [{
            "id": u['id'],
            "user_id": u['user_id'],
            "name": u['name'],
            "email": u['email'],
            "balance": u['balance'],
            "status": u['status'],
            "created_at": u['created_at']
        } for u in users]
    }), 200

@app.route('/api/admin/update-balance', methods=['POST'])
@token_required
def update_balance(payload):
    if not payload.get('is_admin'):
        return jsonify({"error": "Admin access required"}), 403
    
    data = request.get_json()
    user_id = data.get('user_id')
    new_balance = data.get('balance')
    
    users = get_users()
    user = next((u for u in users if u['user_id'] == user_id), None)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    user['balance'] = new_balance
    save_users(users)
    
    return jsonify({"message": "Balance updated successfully"}), 200

@app.route('/api/admin/update-profile', methods=['POST'])
@token_required
def update_profile(payload):
    if not payload.get('is_admin'):
        return jsonify({"error": "Admin access required"}), 403
    
    data = request.get_json()
    user_id = data.get('user_id')
    
    users = get_users()
    user = next((u for u in users if u['user_id'] == user_id), None)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    user.update({k: v for k, v in data.items() if k != 'user_id'})
    save_users(users)
    
    return jsonify({"message": "Profile updated successfully"}), 200

@app.route('/api/admin/delete-user', methods=['POST'])
@token_required
def delete_user(payload):
    if not payload.get('is_admin'):
        return jsonify({"error": "Admin access required"}), 403
    
    data = request.get_json()
    user_id = data.get('user_id')
    
    users = get_users()
    users = [u for u in users if u['user_id'] != user_id]
    save_users(users)
    
    return jsonify({"message": "User deleted successfully"}), 200

@app.route('/api/admin/analytics', methods=['GET'])
@token_required
def admin_analytics(payload):
    if not payload.get('is_admin'):
        return jsonify({"error": "Admin access required"}), 403
    
    users = get_users()
    total_balance = sum(u['balance'] for u in users)
    active_count = sum(1 for u in users if u['status'] == 'active')
    
    analytics = {
        "total_users": len(users),
        "active_accounts": active_count,
        "total_balance": total_balance,
        "frozen_accounts": sum(1 for u in users if u['status'] == 'frozen'),
        "user_growth": [
            {"month": "Jan", "users": 1},
            {"month": "Feb", "users": 2},
            {"month": "Mar", "users": 3}
        ],
        "transaction_volume": [
            {"month": "Jan", "volume": 150000},
            {"month": "Feb", "volume": 200000},
            {"month": "Mar", "volume": 280000}
        ]
    }
    
    return jsonify(analytics), 200

# Health check
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "Backend is running!"}), 200

# Swagger-like docs endpoint
@app.route('/docs', methods=['GET'])
def docs():
    return '''
    <html>
    <head>
        <title>HDOC Bank API Documentation</title>
        <style>
            body { font-family: Arial; margin: 20px; }
            .endpoint { background: #f5f5f5; padding: 10px; margin: 10px 0; border-left: 4px solid #0066ff; }
            .method { color: white; padding: 5px 10px; border-radius: 3px; display: inline-block; margin-right: 10px; }
            .get { background: #61affe; }
            .post { background: #49cc90; }
            .put { background: #fca130; }
        </style>
    </head>
    <body>
        <h1>HDOC Bank API</h1>
        <p>Backend running successfully! Access frontend at http://localhost:3000</p>
        <h2>Auth Endpoints</h2>
        <div class="endpoint">
            <span class="method post">POST</span> /api/auth/login
            <p>Login with user credentials</p>
        </div>
        <div class="endpoint">
            <span class="method post">POST</span> /api/auth/logout
            <p>Logout (requires token)</p>
        </div>
        <div class="endpoint">
            <span class="method get">GET</span> /api/auth/profile
            <p>Get user profile (requires token)</p>
        </div>
        <h2>Banking Endpoints</h2>
        <div class="endpoint">
            <span class="method get">GET</span> /api/banking/balance
            <p>Get account balance (requires token)</p>
        </div>
        <div class="endpoint">
            <span class="method get">GET</span> /api/banking/transactions
            <p>Get transactions (requires token)</p>
        </div>
        <div class="endpoint">
            <span class="method get">GET</span> /api/banking/cards
            <p>Get cards (requires token)</p>
        </div>
        <div class="endpoint">
            <span class="method get">GET</span> /api/banking/analytics
            <p>Get analytics (requires token)</p>
        </div>
    </body>
    </html>
    ''', 200

if __name__ == '__main__':
    init_databases()
    print("=" * 50)
    print("🚀 HDOC Bank Backend is Starting...")
    print("=" * 50)
    print("📊 API Documentation: http://localhost:8000/docs")
    print("🏠 Frontend: http://localhost:3000")
    print("=" * 50)
    print("\n✅ Backend started on http://localhost:8000")
    print("Press CTRL+C to stop the server\n")
    app.run(debug=True, host='0.0.0.0', port=8000)
