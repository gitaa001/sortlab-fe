// api.ts
const API_BASE_URL = 'http://localhost:5000';

// ===== Interfaces =====
export interface User {
  quizScore: string;
  id: number;
  username: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: User;
}

export interface GazeData {
  timestamp: number;
  gaze_direction: number[];
}

export interface TextData {
  text: string[];
  positions: { x: number; y: number }[];
}

// ===== Internal token state =====
let authToken: string | null = null;

// ===== API Object =====
export const api = {
  // Set token manually (dipakai di AuthContext)
  setToken: (token: string) => {
    authToken = token;
    localStorage.setItem('auth_token', token);
  },

  // Ambil header Authorization
  getAuthHeaders: (): Record<string, string> => {
    const token = authToken || localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // ===== AUTH =====
  register: async (data: RegisterRequest): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Registration failed');
    }

    return await response.json();
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Login failed");
    }

    api.setToken(data.token); // simpan token
    return data;
  },

  getMe: async (): Promise<User> => {
    const token = authToken || localStorage.getItem('auth_token');
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to get user data');
    }

    return await response.json();
  },

  logout: (): void => {
    authToken = null;
    localStorage.removeItem('auth_token');
  },
};
