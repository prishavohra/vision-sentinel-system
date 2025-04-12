
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
