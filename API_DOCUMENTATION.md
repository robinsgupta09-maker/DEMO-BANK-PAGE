# HDOC Bank - API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### 1. User Login
**POST** `/auth/login`

Request:
```json
{
  "user_id": "hdocuser",
  "password": "HDOC@123"
}
```

Response (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "user_id": "hdocuser",
    "name": "Rahul Kumar",
    "email": "rahul@example.com",
    "balance": 254892.50,
    "account_number": "1234567890",
    "ifsc_code": "HDOC0000123",
    "branch": "Mumbai - Fort Branch"
  }
}
```

Error (401):
```json
{
  "detail": "Invalid credentials"
}
```

**Demo Credentials:**
- User ID: `hdocuser`
- Password: `HDOC@123`

---

### 2. User Logout
**POST** `/auth/logout`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "message": "Logged out successfully"
}
```

---

### 3. Get User Profile
**GET** `/auth/profile`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "message": "Profile",
  "user": {
    "id": 1,
    "user_id": "hdocuser",
    "name": "Rahul Kumar"
  }
}
```

---

## 💰 Banking Endpoints

### 1. Get Account Balance
**GET** `/banking/balance`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "balance": 254892.50
}
```

---

### 2. Get Transactions
**GET** `/banking/transactions`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "transactions": [
    {
      "id": 1,
      "type": "credit",
      "description": "Salary Deposit",
      "amount": 75000,
      "date": "Today",
      "time": "09:30 AM",
      "status": "completed"
    },
    {
      "id": 2,
      "type": "debit",
      "description": "Online Shopping",
      "amount": 2499,
      "date": "Yesterday",
      "time": "02:15 PM",
      "status": "completed"
    }
  ]
}
```

---

### 3. Get User Cards
**GET** `/banking/cards`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "cards": [
    {
      "id": 1,
      "type": "debit",
      "number": "•••• •••• •••• 4521",
      "brand": "Visa"
    },
    {
      "id": 2,
      "type": "credit",
      "number": "•••• •••• •••• 1234",
      "brand": "Mastercard"
    }
  ]
}
```

---

### 4. Get Analytics
**GET** `/banking/analytics`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "monthly_spending": [
    {
      "month": "Jan",
      "amount": 12500
    },
    {
      "month": "Feb",
      "amount": 19200
    }
  ]
}
```

---

## 👨‍💼 Admin Endpoints

### 1. Admin Login
**POST** `/admin/login`

Request:
```json
{
  "user_id": "admin",
  "password": "Admin@HDOC"
}
```

Response (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "admin_id": "admin",
    "role": "admin"
  }
}
```

**Admin Credentials:**
- Admin ID: `admin`
- Password: `Admin@HDOC`

---

### 2. Get All Users
**GET** `/admin/users`

Headers:
```
Authorization: Bearer <admin_token>
```

Response (200):
```json
{
  "users": [
    {
      "id": 1,
      "user_id": "hdocuser",
      "name": "Rahul Kumar",
      "email": "rahul@example.com",
      "balance": 254892.50,
      "account_number": "1234567890",
      "ifsc_code": "HDOC0000123",
      "branch": "Mumbai - Fort Branch",
      "status": "active",
      "created_at": "2024-01-15T10:00:00"
    }
  ]
}
```

---

### 3. Update User Balance
**POST** `/admin/update-balance`

Headers:
```
Authorization: Bearer <admin_token>
```

Request:
```json
{
  "user_id": "hdocuser",
  "balance": 500000
}
```

Response (200):
```json
{
  "success": true,
  "message": "Balance updated"
}
```

Error (404):
```json
{
  "detail": "User not found"
}
```

---

### 4. Update User Profile
**POST** `/admin/update-profile`

Headers:
```
Authorization: Bearer <admin_token>
```

Request:
```json
{
  "user_id": "hdocuser",
  "name": "New Name",
  "email": "newemail@example.com"
}
```

Response (200):
```json
{
  "success": true,
  "message": "Profile updated"
}
```

---

### 5. Add Transaction
**POST** `/admin/add-transaction`

Headers:
```
Authorization: Bearer <admin_token>
```

Request:
```json
{
  "user_id": "hdocuser",
  "type": "credit",
  "description": "Bonus Payment",
  "amount": 10000,
  "date": "Today",
  "time": "03:00 PM",
  "status": "completed"
}
```

Response (200):
```json
{
  "success": true,
  "message": "Transaction added"
}
```

---

### 6. Get Admin Analytics
**GET** `/admin/analytics`

Headers:
```
Authorization: Bearer <admin_token>
```

Response (200):
```json
{
  "total_users": 145,
  "active_accounts": 138,
  "total_balance": 5420000.00,
  "transactions_today": 234
}
```

---

## 🔄 Request/Response Examples

### cURL Examples

**User Login:**
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"user_id\": \"hdocuser\",
    \"password\": \"HDOC@123\"
  }"
```

**Get Balance:**
```bash
curl -X GET "http://localhost:8000/api/banking/balance" \
  -H "Authorization: Bearer <token>"
```

**Update User Balance (Admin):**
```bash
curl -X POST "http://localhost:8000/api/admin/update-balance" \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d "{
    \"user_id\": \"hdocuser\",
    \"balance\": 500000
  }"
```

---

## 📊 Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Success |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid credentials |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## 🔍 Error Responses

### Invalid Credentials
```json
{
  "detail": "Invalid credentials"
}
```

### User Not Found
```json
{
  "detail": "User not found"
}
```

### Invalid Token
```json
{
  "detail": "Invalid token"
}
```

---

## 🧪 API Testing with Swagger

Access Swagger UI at: `http://localhost:8000/docs`

Features:
- Interactive API testing
- Request/response examples
- Authentication support
- Real-time API calls

---

## 📝 Data Types

### Strings
- user_id: Min 3 chars
- password: Min 8 chars
- email: Valid email format

### Numbers
- balance: Float, min 0
- amount: Float, min 0
- id: Integer

### Dates
- created_at: ISO 8601 format
- Timestamps: ISO 8601 format

---

## 🔐 Security Headers

All requests should include:
```
Content-Type: application/json
Authorization: Bearer <token>
```

---

## 💾 Database Models

### User
- id: Integer (Primary Key)
- user_id: String (Unique)
- name: String
- email: String (Unique)
- password: String (Hashed)
- balance: Float
- account_number: String
- ifsc_code: String
- branch: String
- status: String (active/frozen/suspended)
- created_at: DateTime
- transactions: Array

### Transaction
- id: Integer (Auto-generated)
- type: String (credit/debit)
- description: String
- amount: Float
- date: String
- time: String
- status: String

### Admin
- admin_id: String (Unique)
- password: String (Hashed)
- created_at: DateTime

---

## 🚀 Rate Limiting

- Login attempts: 5 per minute
- API requests: 100 per minute
- File uploads: 10 per hour

---

## 📞 API Support

For API issues:
1. Check status codes
2. Verify authentication
3. Check request format
4. Review error messages
5. Check browser console

---

**API Version: 1.0.0**
**Last Updated: 2024**
