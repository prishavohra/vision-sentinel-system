
import { FaceRecord } from "./FaceCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";

interface FaceDetailsDialogProps {
  face: FaceRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FaceDetailsDialog({ face, open, onOpenChange }: FaceDetailsDialogProps) {
  if (!face) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Face Record Details</DialogTitle>
          <DialogDescription>
            Complete information about this individual
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full bg-muted overflow-hidden mb-4">
              <img 
                src={face.imageUrl || face.thumbnail} 
                alt={face.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">{face.name}</h3>
            <p className="text-muted-foreground">{face.id}</p>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
              <div>
                <h4 className="text-sm text-muted-foreground">Date Added</h4>
                <p>{face.dateAdded || 'Not available'}</p>
              </div>
              <div>
                <h4 className="text-sm text-muted-foreground">Last Seen</h4>
                <p>{face.lastSeen ? new Date(face.lastSeen).toLocaleString() : "Never"}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Recent Activity</h4>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between text-sm p-2 rounded bg-muted/30">
                    <span>Detected at {i === 1 ? "Main Entrance" : i === 2 ? "Parking Lot" : "Security Gate"}</span>
                    <span className="text-muted-foreground">{new Date(Date.now() - i * 3600000).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Notes</h4>
              <p className="text-sm text-muted-foreground">
                Subject has been identified multiple times at the north entrance during non-business hours.
                Heightened monitoring recommended.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
