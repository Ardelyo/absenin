# 🚀 Getting Started dengan Absenin

## Prerequisites

- **Node.js** 16.x atau lebih tinggi
- **npm** atau **yarn**
- **Docker** dan **Docker Compose** (untuk database)
- **Git**

## Quick Start (5 menit)

### 1. Clone Repository
```bash
git clone https://github.com/absenin/absenin.git
cd absenin
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database
```bash
npm run docker:up
```

Ini akan menjalankan:
- PostgreSQL (port 5432)
- Redis (port 6379)
- MinIO (port 9000)

### 4. Setup Environment Variables
```bash
cp apps/backend/.env.example apps/backend/.env
```

Edit `.env` jika diperlukan.

### 5. Run Migrations
```bash
npm run migration:run
```

### 6. Start Development Server
```bash
npm run dev
```

Sekarang Anda bisa akses:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **MinIO Console**: http://localhost:9001

## Struktur Project

```
absenin/
├── apps/
│   ├── backend/          # NestJS API
│   │   ├── src/
│   │   │   ├── modules/  # Business modules
│   │   │   ├── common/   # Shared utilities
│   │   │   └── main.ts   # Entry point
│   │   └── test/
│   │
│   └── web/              # Next.js Frontend
│       ├── src/
│       │   ├── app/      # Pages
│       │   ├── components/
│       │   └── lib/
│       └── public/
│
├── packages/             # Shared libraries
├── docs/                 # Documentation
└── docker-compose.yml    # Docker configuration
```

## API Endpoints (Phase 1)

### Authentication
- `POST /auth/register` - Register user baru
- `POST /auth/login` - Login
- `POST /auth/refresh` - Refresh token

### Attendance
- `POST /attendance/check-in` - Check in
- `POST /attendance/check-out` - Check out
- `GET /attendance/today` - Get today's attendance
- `GET /attendance/my-records` - Get attendance history

Contoh Check In:
```bash
curl -X POST http://localhost:3001/attendance/check-in \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "companyId": "uuid-here",
    "method": "qr_code",
    "latitude": -6.2088,
    "longitude": 106.8456
  }'
```

## Development Commands

```bash
# Frontend development
npm run dev:frontend

# Backend development
npm run dev:backend

# Run both simultaneously
npm run dev

# Linting
npm run lint
npm run lint:fix

# Testing
npm run test
npm run test:cov

# Build production
npm run build

# Database
npm run migration:run      # Run migrations
npm run migration:revert   # Revert migration

# Docker
npm run docker:up         # Start all services
npm run docker:down       # Stop all services
```

## Default Test Credentials

Setelah setup, Anda bisa test dengan:

**Email**: test@absenin.id  
**Password**: password123

Atau daftar akun baru di `/auth/register`.

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Database Connection Error
```bash
# Check if PostgreSQL is running
docker-compose ps

# View logs
docker-compose logs postgres
```

### Dependencies Issue
```bash
# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Baca dokumentasi**: [docs/README.md](./README.md)
2. **Kontribusi**: [CONTRIBUTING.md](../CONTRIBUTING.md)
3. **API Documentation**: Check Swagger pada `/api/docs`
4. **Join komunitas**: [Discord](https://discord.gg/absenin)

## Support

Butuh bantuan?
- 📧 Email: hello@absenin.id
- 💬 Discord: [discord.gg/absenin](https://discord.gg/absenin)
- 📝 GitHub Issues: [issues](https://github.com/absenin/absenin/issues)

Happy coding! 🎉
