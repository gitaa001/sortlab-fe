const API_BASE_URL = 'https://sortlab-be-production.up.railway.app'; 

// ===== Interfaces =====
export interface QuizProgress {
  score: number;
  done: boolean;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  totalPoints: number;
  progressPractice: {
    bubbleSort: boolean;
    selectionSort: boolean;
    insertionSort: boolean;
    mergeSort: boolean;
  };
  progressCompete: {
    bubbleSort: QuizProgress;
    selectionSort: QuizProgress;
    insertionSort: QuizProgress;
    mergeSort: QuizProgress;
  };
}

export interface LoginRequest {
  email: string;
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

export interface ApiLeaderboardUser {
  _id: string;
  username: string;
  email: string;
  totalPoints: number;
  completedQuizzes: number;
}

// ===== Internal token state =====
let authToken: string | null = null;

// ===== API Object =====
export const api = {
  setToken: (token: string) => {
    authToken = token;
    localStorage.setItem('auth_token', token);
  },

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

    api.setToken(data.token); 
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

  updateScore: async (userId: string, points: number, topic: string): Promise<{ totalPoints: number }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/update-score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...api.getAuthHeaders(),
      },
      body: JSON.stringify({ userId, points, topic }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update score");
    }

    return data;
  },

  updateProgress: async (userId: string, topic: string): Promise<{ progress: Record<string, boolean> }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/update-progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...api.getAuthHeaders(),
      },
      body: JSON.stringify({ userId, topic }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update progress");
    }

    return data;
  },

  getLeaderboard: async (): Promise<ApiLeaderboardUser[]> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/leaderboard`);

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to get leaderboard data');
    }

    return await response.json();
  },

  logout: (): void => {
    authToken = null;
    localStorage.removeItem('auth_token');
  }
};


