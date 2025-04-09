
import { Button } from "@/components/ui/button";
import { RefreshCw, Camera } from "lucide-react";
import CameraGrid from "@/components/cameras/CameraGrid";

export default function LiveCameras() {
  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-primary/10 text-primary p-2 rounded-md">
          <Camera className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Live Camera Feeds</h1>
          <p className="text-muted-foreground">
            Real-time monitoring with criminal recognition
          </p>
        </div>
      </div>
      
      <div className="flex justify-end mb-6">
        <Button className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>
      
      <div className="mb-6 p-4 border rounded-md bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live Monitoring Active</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">3/3</span> cameras online
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">5</span> criminals in database
          </div>
        </div>
      </div>
      
      <CameraGrid />
    </div>
  );
}
