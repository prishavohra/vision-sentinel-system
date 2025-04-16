import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, VideoOff, AlertTriangle, Camera } from "lucide-react";
import { useState } from "react";

type Person = {
  id: string;
  name: string;
  confidence: number;
  timestamp: string;
  status: "wanted" | "suspect" | "missing";
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

type CameraFeed = {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline";
  streamUrl: string;
  detectedPersons: Person[];
};

const realTimeCameraFeeds: CameraFeed[] = [
  {
    id: "cam-001",
    name: "Main Entrance",
    location: "North Wing",
    status: "online",
    streamUrl: "https://b92d-202-71-156-66.ngrok-free.app/video_feed/cam1",
    detectedPersons: []
  },
  {
    id: "cam-002",
    name: "Parking Lot",
    location: "South Wing",
    status: "online",
    streamUrl: "https://b92d-202-71-156-66.ngrok-free.app/video_feed/cam2",
    detectedPersons: []
  },
  {
    id: "cam-003",
    name: "Security Gate",
    location: "East Wing",
    status: "online",
    streamUrl: "https://f464-202-71-156-66.ngrok-free.app/video_feed/cam3",
    detectedPersons: []
  }
];

interface CameraGridProps {
  onCameraSelect?: (camera: CameraFeed) => void;
}

export default function CameraGrid({ onCameraSelect }: CameraGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {realTimeCameraFeeds.map((camera) => (
        <CameraCard 
          key={camera.id} 
          camera={camera} 
          onClick={() => onCameraSelect && onCameraSelect(camera)} 
        />
      ))}
    </div>
  );
}

function CameraCard({ camera, onClick }: { camera: CameraFeed; onClick?: () => void }) {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    console.log(`Failed to load stream for camera: ${camera.id}`);
    setImageError(true);
  };

  return (
    <Card
      className="grid-card overflow-hidden cursor-pointer hover:ring-1 hover:ring-primary/40 transition-all"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-medium">{camera.name}</CardTitle>
          <Badge variant={camera.status === "online" ? "default" : "secondary"} className="uppercase text-xs">
            {camera.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {camera.location} • ID: {camera.id}
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative w-full aspect-video bg-black">
          {camera.status === "online" ? (
            <>
              <div className="absolute top-2 left-2 z-10">
                <div className="flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span>LIVE</span>
                </div>
              </div>

              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                {!imageError ? (
                  <img 
                    src={camera.streamUrl} 
                    alt={`Live feed from ${camera.name}`}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <Camera className="h-12 w-12 text-gray-600 mb-2" />
                    <span className="text-gray-500 text-sm">Stream unavailable</span>
                  </div>
                )}
              </div>

              {camera.detectedPersons.map((person) => (
                <div 
                  key={person.id}
                  className="face-highlight absolute border border-red-500"
                  style={{
                    left: `${person.boundingBox.x / 4}px`,
                    top: `${person.boundingBox.y / 4}px`,
                    width: `${person.boundingBox.width / 2}px`,
                    height: `${person.boundingBox.height / 2}px`
                  }}
                ></div>
              ))}

              {camera.detectedPersons.map((person) => (
                <div 
                  key={person.id}
                  className="absolute left-2 bottom-2 z-10 bg-black/80 border border-primary/30 text-white text-xs p-2 rounded flex flex-col gap-1"
                >
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-red-500" />
                    <div className="font-semibold">{person.name}</div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs opacity-75">ID: {person.id}</div>
                  </div>
                  <div className="text-xs">
                    Match confidence: {(person.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              ))}

              <div className="scanning-effect absolute inset-0 border border-green-400/20 animate-pulse"></div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center">
              <VideoOff className="h-12 w-12 text-gray-600 mb-2" />
              <span className="text-gray-500 text-sm">Camera Offline</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
