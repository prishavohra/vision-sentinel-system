
import { Button } from "@/components/ui/button";
import { RefreshCw, Camera, VideoOff } from "lucide-react";
import CameraGrid from "@/components/cameras/CameraGrid";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function LiveCameras() {
  const [key, setKey] = useState(0);
  const [selectedCamera, setSelectedCamera] = useState<any>(null);
  const [dialogImageError, setDialogImageError] = useState(false);
  
  const handleRefresh = () => {
    setKey(prevKey => prevKey + 1);
    setDialogImageError(false);
  };
  
  const handleDialogClose = () => {
    setSelectedCamera(null);
    setDialogImageError(false);
  };
  
  const handleDialogImageError = () => {
    console.log(`Failed to load dialog stream for camera: ${selectedCamera?.id}`);
    setDialogImageError(true);
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
        <Dialog open={!!selectedCamera} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedCamera.name} - {selectedCamera.location}</DialogTitle>
              <DialogDescription>
                Camera ID: {selectedCamera.id} • Status: {selectedCamera.status}
              </DialogDescription>
            </DialogHeader>
            <div className="w-full aspect-video bg-black relative">
              <div className="absolute top-2 left-2 z-10">
                <div className="flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span>LIVE</span>
                </div>
              </div>
              
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                {!dialogImageError ? (
                  <img 
                    src={selectedCamera.streamUrl} 
                    alt={`Live feed from ${selectedCamera.name}`}
                    className="w-full h-full object-cover"
                    onError={handleDialogImageError}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <Camera className="h-24 w-24 text-gray-600 mb-2" />
                    <span className="text-gray-500 text-lg">Stream unavailable</span>
                  </div>
                )}
              </div>
              
              {selectedCamera.detectedPersons.map((person: any) => (
                <div 
                  key={person.id}
                  className="face-highlight absolute border-2 border-red-500"
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
              
              <div className="scanning-effect absolute inset-0 border border-green-400/20 animate-pulse"></div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
