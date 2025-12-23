import { apiClient } from './api';

const AUTH_KEY = 'admin_auth';
const CREDENTIALS_KEY = 'admin_credentials';

export interface AuthResult {
  success: boolean;
  message?: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export const getStoredCredentials = (): AdminCredentials | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const stored = sessionStorage.getItem(CREDENTIALS_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const login = async (username: string, password: string): Promise<AuthResult> => {
  try {
    await apiClient.adminLogin(username, password);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(AUTH_KEY, 'authenticated');
      sessionStorage.setItem(CREDENTIALS_KEY, JSON.stringify({ username, password }));
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message || 'Invalid credentials' };
  }
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.adminLogout();
  } catch (error) {
    // Ignore logout errors
  } finally {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(AUTH_KEY);
      sessionStorage.removeItem(CREDENTIALS_KEY);
    }
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  return sessionStorage.getItem(AUTH_KEY) === 'authenticated';
};

export const checkAuth = (): boolean => {
  return isAuthenticated();
};

