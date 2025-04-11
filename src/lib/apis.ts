
// Use the environment variable for the API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchKnownFaces = async () => {
  const res = await fetch(`${API_BASE_URL}/api/known-faces`);
  if (!res.ok) throw new Error('Failed to fetch known faces 😢');
  return res.json();
};

export const addKnownFace = async (faceData: { name: string; imageUrl: string; id?: string }) => {
  const res = await fetch(`${API_BASE_URL}/api/known-faces`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(faceData),
  });
  if (!res.ok) throw new Error('Failed to add known face 😞');
  return res.json();
};

export const deleteFace = async (faceId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/known-faces/${faceId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete face 😞');
  return res.json();
};

export const updateFace = async (faceId: string, faceData: Partial<{ name: string; imageUrl: string }>) => {
  const res = await fetch(`${API_BASE_URL}/api/known-faces/${faceId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(faceData),
  });
  if (!res.ok) throw new Error('Failed to update face 😞');
  return res.json();
};

export const getUsers = async () => {
  const res = await fetch(`${API_BASE_URL}/api/users`);
  if (!res.ok) throw new Error('Failed to fetch users 😢');
  return res.json();
};

export const addUser = async (userData: any) => {
  const res = await fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error('Failed to add user 😞');
  return res.json();
};

export const getReports = async () => {
  const res = await fetch(`${API_BASE_URL}/api/reports`);
  if (!res.ok) throw new Error('Failed to fetch reports 😢');
  return res.json();
};

export const configureReport = async (reportId: string, config: any) => {
  const res = await fetch(`${API_BASE_URL}/api/reports/${reportId}/configure`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
  if (!res.ok) throw new Error('Failed to configure report 😞');
  return res.json();
};
