
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchKnownFaces, deleteFace, updateFace } from "@/lib/apis";
import { toast } from "sonner";

// Import refactored components
import FaceCard, { FaceRecord } from "./FaceCard";
import FaceDetailsDialog from "./FaceDetailsDialog";
import DatabaseHeader from "./DatabaseHeader";
import EmptyState from "./EmptyState";

export default function FaceDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFace, setSelectedFace] = useState<FaceRecord | null>(null);
  
  // Fetch known faces from the API
  const { data: faces, isLoading, error } = useQuery({
    queryKey: ['known-faces'],
    queryFn: fetchKnownFaces
  });
  
  // Filter faces based on search term
  const filteredFaces = faces?.filter(face => {
    return face.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      face.id?.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];
  
  const handleDeleteFace = async (id: string) => {
    try {
      await deleteFace(id);
      toast.success("Face deleted successfully");
    } catch (error) {
      toast.error("Failed to delete face");
      console.error(error);
    }
  };
  
  return (
    <div className="space-y-4">
      <DatabaseHeader 
        faceCount={faces?.length || 0} 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-sentinel-accent" />
          <span className="ml-2 text-lg">Loading faces...</span>
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load faces from the database. Please try again later.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFaces.map((face) => (
            <FaceCard 
              key={face.id} 
              face={face} 
              onViewDetails={() => setSelectedFace(face)}
              onDeleteRecord={() => handleDeleteFace(face.id)}
            />
          ))}
          
          {filteredFaces.length === 0 && <EmptyState />}
        </div>
      )}
      
      <FaceDetailsDialog 
        face={selectedFace} 
        open={!!selectedFace} 
        onOpenChange={() => setSelectedFace(null)} 
      />
    </div>
  );
}
