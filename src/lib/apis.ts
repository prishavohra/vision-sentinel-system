export const fetchKnownFaces = async () => {
  const res = await fetch(`${API_BASE_URL}/api/known-faces`);
  if (!res.ok) throw new Error('Failed to fetch known faces 😢');
  return res.json();
};
