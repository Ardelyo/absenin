# 🚀 Frontend Quick Start Guide

## Installation & Setup

```bash
# Navigate to web directory
cd apps/web

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
```

Edit `.env.local` and set:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Running the Frontend

### Development
```bash
npm run dev
# Opens http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
```

### Code Quality
```bash
npm run lint       # Check code style
npm run type-check # Check TypeScript
npm run format     # Format code with Prettier
```

---

## 📁 Project Structure

```
apps/web/src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── providers.tsx      # Query & Theme providers
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── dashboard/         # Dashboard
│   ├── attendance/        # Attendance pages
│   ├── leaves/            # Leave pages
│   └── profile/           # Profile page
├── components/            # Reusable components
│   ├── Navbar.tsx        # Top navigation
│   └── ProtectedRoute.tsx # Route protection
├── hooks/                 # Custom React hooks
│   └── useAuth.ts        # Auth hook
├── lib/                   # Utilities & services
│   └── api.ts            # API client
├── store/                 # Zustand stores
│   └── auth.ts           # Auth state
├── types/                 # TypeScript types
│   └── index.ts
└── styles/                # Global styles
    └── globals.css
```

---

## 🔐 Authentication

### Login
```typescript
import { useAuth } from '@/hooks/useAuth';

export function LoginForm() {
  const { login, isLoading } = useAuth();

  const handleSubmit = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      // Redirected to dashboard
    }
  };
}
```

### Protected Routes
```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
```

### Current User
```typescript
import { useAuth } from '@/hooks/useAuth';

export function UserInfo() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <div>Not logged in</div>;

  return <div>Welcome, {user.firstName}!</div>;
}
```

---

## 📡 API Calls

### Using API Client
```typescript
import { apiClient } from '@/lib/api';

// Check-in
const response = await apiClient.checkIn({
  latitude: 10.1234,
  longitude: 105.5678,
  notes: 'Working from home'
});

// Get attendance history
const history = await apiClient.getAttendanceHistory(1, 10);

// Request leave
await apiClient.requestLeave({
  type: 'annual',
  startDate: '2024-12-01',
  endDate: '2024-12-05',
  reason: 'Holiday'
});
```

### Using React Query
```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

function AttendanceList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['attendance'],
    queryFn: () => apiClient.getAttendanceHistory(1, 10),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <table>
      {data?.data.map(record => (
        <tr key={record.id}>
          <td>{record.date}</td>
          <td>{record.checkInTime}</td>
        </tr>
      ))}
    </table>
  );
}
```

---

## 🎨 Styling

### Using Tailwind Classes
```typescript
<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    Title
  </h1>
  <p className="text-gray-600 dark:text-gray-400 mt-2">
    Subtitle
  </p>
</div>
```

### Dark Mode
The app automatically supports dark mode. Users can:
- Use system preference (default)
- Switch manually (ready for implementation)

All components use `dark:` prefix for dark mode styles.

### Responsive Design
```typescript
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3
  gap-4
">
  {/* Content */}
</div>
```

---

## 🔧 Adding a New Page

### 1. Create page file
```typescript
// apps/web/src/app/new-page/page.tsx
'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';

function NewPageContent() {
  return <div>New Page</div>;
}

export default function NewPage() {
  return (
    <ProtectedRoute>
      <NewPageContent />
    </ProtectedRoute>
  );
}
```

### 2. Add route to Navbar
```typescript
<Link href="/new-page" className="...">
  New Page
</Link>
```

### 3. Add types if needed
```typescript
// apps/web/src/types/index.ts
export interface NewPageData {
  id: string;
  title: string;
}
```

---

## 🧪 Testing (Ready for Phase 2.5)

### Unit Test Example
```typescript
// __tests__/hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';

describe('useAuth', () => {
  it('should login user', async () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.login('test@example.com', 'password');
    });

    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

---

## 🐛 Debugging

### Console Logs
```typescript
// API calls
console.log('API Response:', response);

// State changes
console.log('User updated:', user);
```

### DevTools
- Chrome DevTools (F12)
- React DevTools extension
- Redux DevTools (for Zustand)

### Network Tab
Check all API calls:
1. Open DevTools → Network
2. Filter by XHR
3. Check request/response

---

## 📦 Dependencies

### Core
- `next` - React framework
- `react` - UI library
- `react-dom` - DOM rendering

### State Management
- `zustand` - Lightweight store
- `@tanstack/react-query` - Server state

### HTTP
- `axios` - HTTP client
- `js-cookie` - Cookie management

### Styling
- `tailwindcss` - Utility CSS
- `next-themes` - Dark mode

### Development
- `typescript` - Type safety
- `eslint` - Code linting
- `prettier` - Code formatting

---

## 🚨 Common Issues

### Issue: Geolocation not working
**Solution:** 
- Check browser geolocation permission
- Must be HTTPS (except localhost)
- Add `NEXT_PUBLIC_ENABLE_GEOLOCATION=true` to env

### Issue: API calls failing
**Solution:**
- Check API URL in `.env.local`
- Ensure backend is running
- Check CORS settings
- Check network tab in DevTools

### Issue: Dark mode not working
**Solution:**
- Clear browser cache
- Check `next-themes` initialization
- Verify Tailwind `dark:` classes

### Issue: Protected route redirecting to login
**Solution:**
- Check if token is in cookies
- Verify token is valid
- Check auth endpoint returning user

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys from GitHub
# Set env variables in Vercel dashboard
```

### Docker
```bash
# Build image
docker build -t absenin-web .

# Run container
docker run -p 3000:3000 absenin-web
```

### Traditional Hosting
```bash
# Build
npm run build

# Upload 'apps/web' to hosting
# Set Node.js version to 18+
# Set start command to 'npm start'
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Query](https://tanstack.com/query)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 💡 Tips

1. **Use TypeScript** - Catch errors early
2. **Check types** - Run `npm run type-check`
3. **Format code** - Run `npm run format` regularly
4. **Test in mobile** - Use DevTools device toolbar
5. **Check dark mode** - Toggle in system settings
6. **Use React Query DevTools** - See cache state

---

## ✅ Checklist Before Deployment

- [ ] Environment variables set
- [ ] Backend API running
- [ ] All pages load without errors
- [ ] Forms validate correctly
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] API calls working
- [ ] Authentication flow working
- [ ] Type checking passes

---

**Happy coding!** 🎉
