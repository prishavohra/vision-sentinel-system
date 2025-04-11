const BASE_URL = 'http://localhost:5000'; // your backend server

export const fetchKnownFaces = async () => {
  const res = await fetch(`${BASE_URL}/api/known-faces`);
  if (!res.ok) throw new Error('Failed to fetch known faces');
  return res.json();
};

export const addKnownFace = async (faceData: any) => {
  const res = await fetch(`${BASE_URL}/api/known-faces`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(faceData),
  });
  if (!res.ok) throw new Error('Failed to add known face');
  return res.json();
};
