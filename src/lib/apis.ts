
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const loginAdmin = async (credentials: { username: string; password: string }) => {
  console.log(`Attempting login at: ${API_BASE_URL}/api/auth/login`);
  
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
