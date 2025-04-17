
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, MoreVertical, Trash } from "lucide-react";

export type FaceRecord = {
  id: string;
  name: string;
  category?: "employee" | "visitor" | "restricted" | "unknown";
  dateAdded?: string;
  lastSeen?: string | null;
  thumbnail?: string;
  imageUrl: string;
};

interface FaceCardProps {
  face: FaceRecord;
  onViewDetails: () => void;
  onEditRecord?: () => void;
  onUpdateImage?: () => void;
  onDeleteRecord?: () => void;
}

export default function FaceCard({ 
  face, 
  onViewDetails,
  onEditRecord,
  onUpdateImage,
  onDeleteRecord
}: FaceCardProps) {
  const formatDate = (isoString: string | null) => {
    if (!isoString) return "Never";
    
    return new Date(isoString).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="grid-card">
      <CardHeader className="p-4 pb-0 relative">
        <div className="absolute top-4 right-4 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onViewDetails}>View Details</DropdownMenuItem>
              <DropdownMenuItem onClick={onEditRecord}>Edit Record</DropdownMenuItem>
              <DropdownMenuItem onClick={onUpdateImage}>Update Image</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={onDeleteRecord}>
                <Trash className="h-4 w-4 mr-2" />
                Delete Record
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted overflow-hidden">
            <img 
              src={face.imageUrl || face.thumbnail || "/placeholder.svg"} 
              alt={face.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <CardTitle className="text-base font-medium">{face.name}</CardTitle>
            <CardDescription>{face.id}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-4">
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Added:</span>
            <span>{face.dateAdded || 'Not available'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last seen:</span>
            <span>{formatDate(face.lastSeen || null)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={onViewDetails}>
          View Details
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Download className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
