'use client';

import { useEffect, useState } from "react";
import FaceDatabase from "@/components/database/FaceDatabase";
import { fetchKnownFaces } from "@/lib/api";

export default function KnownFaces() {
  const [faces, setFaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFaces = async () => {
      try {
        const data = await fetchKnownFaces();
        setFaces(data);
      } catch (error) {
        console.error("Failed to fetch known faces:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFaces();
  }, []);

  return (
    <div className="container py-8">
      <FaceDatabase faces={faces} loading={loading} />
    </div>
  );
}
