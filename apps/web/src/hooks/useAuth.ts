import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { apiClient } from '@/lib/api';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const { user, isLoading, isAuthenticated, setUser, setLoading, logout } = useAuthStore();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('accessToken');
      if (token && !user) {
        try {
          setLoading(true);
          const response = await apiClient.getCurrentUser();
          setUser(response.data);
        } catch (error) {
          logout();
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
        } finally {
          setLoading(false);
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await apiClient.login(email, password);
      const { accessToken, refreshToken } = response.data;

      // Save tokens
      Cookies.set('accessToken', accessToken, { expires: 7 });
      Cookies.set('refreshToken', refreshToken, { expires: 30 });

      // Get user data
      const userResponse = await apiClient.getCurrentUser();
      setUser(userResponse.data);

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    try {
      setLoading(true);
      await apiClient.register(data);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout: logoutUser,
  };
};
