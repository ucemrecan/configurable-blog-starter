const ADMIN_USERNAME = 'root';
const ADMIN_PASSWORD = 'root';
const AUTH_KEY = 'admin_auth';

export interface AuthResult {
  success: boolean;
  message?: string;
}

export const login = (username: string, password: string): AuthResult => {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(AUTH_KEY, 'authenticated');
    }
    return { success: true };
  }
  return { success: false, message: 'Invalid credentials' };
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_KEY);
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

