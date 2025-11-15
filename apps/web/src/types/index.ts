// Authentication
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'employee';
  companyId: string;
  createdAt: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyId?: string;
}

// Attendance
export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: 'present' | 'absent' | 'late' | 'half_day';
  location?: {
    latitude: number;
    longitude: number;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckInRequest {
  latitude?: number;
  longitude?: number;
  notes?: string;
}

export interface CheckOutRequest {
  latitude?: number;
  longitude?: number;
  notes?: string;
}

// Leave
export interface Leave {
  id: string;
  userId: string;
  type: 'sick' | 'annual' | 'unpaid' | 'maternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequest {
  type: 'sick' | 'annual' | 'unpaid' | 'maternity';
  startDate: string;
  endDate: string;
  reason: string;
}

// Company
export interface Company {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  createdAt: string;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
