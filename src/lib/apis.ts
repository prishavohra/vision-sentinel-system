
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Auth APIs
export const loginAdmin = async (credentials: { username: string; password: string }) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Login failed');
  }
  
  const data = await res.json();
  // Store token in localStorage
  localStorage.setItem('adminToken', data.token);
  return data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('adminToken');
      throw new Error('Authentication expired');
    }
    throw new Error('Failed to fetch user data');
  }
  
  return res.json();
};

// User Management APIs
export const getUsers = async () => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${API_BASE_URL}/api/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const createUser = async (userData: any) => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create user');
  }
  
  return res.json();
};

export const deleteUser = async (userId: string) => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!res.ok) throw new Error('Failed to delete user');
  return res.json();
};

// Dashboard Stats APIs
export const getDashboardStats = async () => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${API_BASE_URL}/api/stats/dashboard`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!res.ok) throw new Error('Failed to fetch dashboard stats');
  return res.json();
};

// Reports APIs
export const getScheduledReports = async () => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${API_BASE_URL}/api/reports/scheduled`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!res.ok) throw new Error('Failed to fetch scheduled reports');
  return res.json();
};

export const saveScheduledReport = async (reportData: any) => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${API_BASE_URL}/api/reports/scheduled`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(reportData),
  });
  
  if (!res.ok) throw new Error('Failed to save report schedule');
  return res.json();
};

export const generateReport = async (reportConfig: any) => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${API_BASE_URL}/api/reports/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(reportConfig),
  });
  
  if (!res.ok) throw new Error('Failed to generate report');
  return res.json();
};

// Settings APIs
export const getSystemSettings = async () => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${API_BASE_URL}/api/settings`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!res.ok) throw new Error('Failed to fetch system settings');
  return res.json();
};

export const updateSystemSettings = async (section: string, settings: any) => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${API_BASE_URL}/api/settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ section, settings }),
  });
  
  if (!res.ok) throw new Error('Failed to update settings');
  return res.json();
};

export const regenerateApiKey = async () => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${API_BASE_URL}/api/settings/regenerate-api-key`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!res.ok) throw new Error('Failed to regenerate API key');
  return res.json();
};

// Known Faces APIs
export const fetchKnownFaces = async () => {
  const res = await fetch(`${API_BASE_URL}/api/known-faces`);
  if (!res.ok) throw new Error('Failed to fetch known faces 😢');
  return res.json();
};

export const addKnownFace = async (newFace: { name: string; imageUrl: string; id?: string }) => {
  const res = await fetch(`${API_BASE_URL}/api/known-faces`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFace),
  });
  if (!res.ok) throw new Error('Failed to add new face 😞');
  return res.json();
};

export const deleteFace = async (faceId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/known-faces/${faceId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete face 😞');
  return res.json();
};

export const updateFace = async (faceId: string, updates: Partial<{ name: string; imageUrl: string }>) => {
  const res = await fetch(`${API_BASE_URL}/api/known-faces/${faceId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update face 😞');
  return res.json();
};
