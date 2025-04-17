
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const loginAdmin = async (credentials: { username: string; password: string }) => {
  console.log(`Attempting login at: ${API_BASE_URL}/api/auth/login`);
  console.log(`Using credentials: ${JSON.stringify(credentials)}`);
  
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      // Add timeout to prevent indefinite waiting
      signal: AbortSignal.timeout(10000)  // 10 second timeout
    });
    
    console.log('Login response status:', res.status);
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Login response error:', errorData);
      throw new Error(errorData.message || 'Login failed');
    }
    
    const data = await res.json();
    console.log('Login successful, token received');
    
    // Store token in localStorage
    localStorage.setItem('adminToken', data.token);
    return data;
  } catch (error) {
    console.error('Login fetch error:', error);
    
    // More specific error handling
    if (error instanceof TypeError) {
      throw new Error('Network error. Please check your server connection.');
    }
    throw error;
  }
};

// Get current user from token
export const getCurrentUser = async () => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      signal: AbortSignal.timeout(10000)
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch user data');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

// Fetch all known faces
export const fetchKnownFaces = async (): Promise<any[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/known-faces`, {
      signal: AbortSignal.timeout(10000)
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch known faces');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Fetch known faces error:', error);
    throw error;
  }
};

// Add a new known face
export const addKnownFace = async (faceData: { name: string; imageUrl: string }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/known-faces`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(faceData),
      signal: AbortSignal.timeout(10000)
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to add known face');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Add known face error:', error);
    throw error;
  }
};

// Delete a face by ID
export const deleteFace = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/known-faces/${id}`, {
      method: 'DELETE',
      signal: AbortSignal.timeout(10000)
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete face');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Delete face error:', error);
    throw error;
  }
};

// Update a face by ID
export const updateFace = async (id: string, updates: { name?: string; imageUrl?: string }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/known-faces/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
      signal: AbortSignal.timeout(10000)
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update face');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Update face error:', error);
    throw error;
  }
};
