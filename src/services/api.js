const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  // Register user
  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get current user
  getMe: async () => {
    return apiCall('/auth/me');
  },

  // Logout user
  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },
};

// Health check
export const healthCheck = async () => {
  return apiCall('/health');
};

// Quiz API calls
export const getQuizzes = async (params = '') => {
  const endpoint = params ? `/quizzes?${params}` : '/quizzes';
  return apiCall(endpoint);
};

export const getQuizById = async (id) => {
  return apiCall(`/quizzes/${id}`);
};

export const startQuiz = async (id) => {
  return apiCall(`/quizzes/${id}/start`, {
    method: 'POST',
  });
};

export const submitQuiz = async (id, data) => {
  return apiCall(`/quizzes/${id}/submit`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const createQuiz = async (quizData) => {
  return apiCall('/quizzes', {
    method: 'POST',
    body: JSON.stringify(quizData),
  });
};

export const getUserAttempts = async () => {
  return apiCall('/quizzes/attempts');
}; 