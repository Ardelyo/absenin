# 📚 API Documentation - Absenin

## Base URL
```
http://localhost:3001/api
```

## Authentication
Semua endpoint (kecuali auth) memerlukan JWT token di header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔐 Authentication Endpoints

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "fullName": "John Doe"
}
```

**Response (201):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "employee"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "employee",
    "department": "IT"
  }
}
```

### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "existing_token"
}
```

**Response (200):**
```json
{
  "accessToken": "new_token"
}
```

---

## 📍 Attendance Endpoints

### Check In
```http
POST /attendance/check-in
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "companyId": "uuid",
  "method": "qr_code",
  "latitude": -6.2088,
  "longitude": 106.8456,
  "notes": "Kantor pusat"
}
```

**Method Options:**
- `face_recognition`
- `qr_code`
- `nfc`
- `geolocation`
- `pin`
- `biometric`
- `voice`
- `manual`

**Response (201):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "date": "2024-01-15",
  "checkInTime": "08:30:45",
  "checkInMethod": "qr_code",
  "status": "present",
  "latitude": -6.2088,
  "longitude": 106.8456,
  "createdAt": "2024-01-15T08:30:45Z"
}
```

### Check Out
```http
POST /attendance/check-out
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "method": "qr_code",
  "notes": "Pulang ke rumah"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "checkInTime": "08:30:45",
  "checkOutTime": "17:30:45",
  "status": "present"
}
```

### Get Today's Attendance
```http
GET /attendance/today
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "id": "uuid",
  "date": "2024-01-15",
  "checkInTime": "08:30:45",
  "checkOutTime": "17:30:45",
  "status": "present"
}
```

### Get Attendance Records
```http
GET /attendance/my-records?month=1&year=2024
Authorization: Bearer TOKEN
```

**Query Parameters:**
- `month`: 1-12
- `year`: YYYY

**Response (200):**
```json
[
  {
    "id": "uuid",
    "date": "2024-01-15",
    "checkInTime": "08:30:45",
    "checkOutTime": "17:30:45",
    "status": "present"
  },
  // ... more records
]
```

### Get Attendance Detail
```http
GET /attendance/:id
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "user": {
    "id": "uuid",
    "fullName": "John Doe",
    "email": "john@example.com"
  },
  "date": "2024-01-15",
  "checkInTime": "08:30:45",
  "checkOutTime": "17:30:45",
  "checkInMethod": "qr_code",
  "checkOutMethod": "qr_code",
  "status": "present",
  "latitude": -6.2088,
  "longitude": 106.8456
}
```

---

## 📊 Leave Management (Coming Soon)

Endpoints untuk manajemen cuti akan ditambahkan di Phase 2.

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Invalid input",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Attendance record not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## 🧪 Testing dengan cURL

### Register User
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Check In
```bash
curl -X POST http://localhost:3001/attendance/check-in \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "companyId": "your-company-uuid",
    "method": "qr_code",
    "latitude": -6.2088,
    "longitude": 106.8456
  }'
```

---

## 📖 Dokumentasi Lengkap

Untuk dokumentasi Swagger interactive, buka:
```
http://localhost:3001/api/docs
```

(Coming in Phase 2)
