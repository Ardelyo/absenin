import axios, { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use((config) => {
      const token = Cookies.get('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Clear auth and redirect to login
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async register(data: any) {
    const response = await this.client.post('/auth/register', data);
    return response.data;
  }

  async logout() {
    await this.client.post('/auth/logout');
  }

  async getCurrentUser() {
    const response = await this.client.get('/auth/me');
    return response.data;
  }

  // Attendance endpoints
  async checkIn(data: any) {
    const response = await this.client.post('/attendance/check-in', data);
    return response.data;
  }

  async checkOut(data: any) {
    const response = await this.client.post('/attendance/check-out', data);
    return response.data;
  }

  async getTodayAttendance() {
    const response = await this.client.get('/attendance/today');
    return response.data;
  }

  async getAttendanceHistory(page = 1, limit = 10) {
    const response = await this.client.get('/attendance/history', {
      params: { page, limit },
    });
    return response.data;
  }

  async getAttendanceStats(month?: string) {
    const response = await this.client.get('/attendance/stats', {
      params: { month },
    });
    return response.data;
  }

  // Leave endpoints
  async requestLeave(data: any) {
    const response = await this.client.post('/leaves', data);
    return response.data;
  }

  async getMyLeaves(page = 1, limit = 10) {
    const response = await this.client.get('/leaves/my', {
      params: { page, limit },
    });
    return response.data;
  }

  async getLeaveById(id: string) {
    const response = await this.client.get(`/leaves/${id}`);
    return response.data;
  }

  // Company endpoints
  async getCompanyInfo() {
    const response = await this.client.get('/companies/current');
    return response.data;
  }

  // User endpoints
  async updateProfile(data: any) {
    const response = await this.client.put('/users/profile', data);
    return response.data;
  }

  async getTeamMembers(page = 1, limit = 20) {
    const response = await this.client.get('/users/team', {
      params: { page, limit },
    });
    return response.data;
  }
}

export const apiClient = new ApiClient();
