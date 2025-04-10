
import { Button } from "@/components/ui/button";
import { RefreshCw, Camera } from "lucide-react";
import CameraGrid from "@/components/cameras/CameraGrid";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function LiveCameras() {
  const [key, setKey] = useState(0);
  const [selectedCamera, setSelectedCamera] = useState<any>(null);
  
  const handleRefresh = () => {
    setKey(prevKey => prevKey + 1);
  };
  
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
        <Button className="flex items-center gap-2" onClick={handleRefresh}>
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
      
      <CameraGrid key={key} onCameraSelect={setSelectedCamera} />

      {selectedCamera && (
        <Dialog open={!!selectedCamera} onOpenChange={() => setSelectedCamera(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedCamera.name} - {selectedCamera.location}</DialogTitle>
            </DialogHeader>
            <div className="w-full aspect-video bg-black relative">
              <div className="absolute top-2 left-2 z-10">
                <div className="flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span>LIVE</span>
                </div>
              </div>
              
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <Camera className="h-24 w-24 text-gray-600" />
              </div>
              
              {selectedCamera.detectedPersons.map((person: any) => (
                <div 
                  key={person.id}
                  className="face-highlight"
                  style={{
                    left: `${person.boundingBox.x / 2}px`,
                    top: `${person.boundingBox.y / 2}px`,
                    width: `${person.boundingBox.width}px`,
                    height: `${person.boundingBox.height}px`
                  }}
                ></div>
              ))}
              
              {selectedCamera.detectedPersons.map((person: any) => (
                <div 
                  key={person.id}
                  className="absolute left-4 bottom-4 z-10 bg-black/80 border border-primary/30 text-white text-xs p-3 rounded flex flex-col gap-2"
                >
                  <div className="flex items-center gap-1">
                    <div className="font-semibold text-base">{person.name}</div>
                  </div>
                  <div className="text-sm">
                    Match confidence: {(person.confidence * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm">ID: {person.id}</div>
                </div>
              ))}
              
              <div className="scanning-effect"></div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Camera ID: {selectedCamera.id}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
