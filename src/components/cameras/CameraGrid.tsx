
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera, Video, VideoOff } from "lucide-react";

type Person = {
  id: string;
  name: string;
  confidence: number;
  timestamp: string;
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
  detectedPersons: Person[];
};

// Mock data for camera feeds
const mockCameraFeeds: CameraFeed[] = [
  {
    id: "cam-001",
    name: "Main Entrance",
    location: "Building A",
    status: "online",
    detectedPersons: [
      {
        id: "p-1234",
        name: "John Doe",
        confidence: 0.94,
        timestamp: new Date().toISOString(),
        boundingBox: { x: 120, y: 80, width: 100, height: 120 }
      }
    ]
  },
  {
    id: "cam-002",
    name: "Lobby",
    location: "Building A",
    status: "online",
    detectedPersons: []
  },
  {
    id: "cam-003",
    name: "Parking Lot",
    location: "Exterior",
    status: "online",
    detectedPersons: [
      {
        id: "p-5678",
        name: "Jane Smith",
        confidence: 0.88,
        timestamp: new Date().toISOString(),
        boundingBox: { x: 200, y: 120, width: 90, height: 110 }
      }
    ]
  },
  {
    id: "cam-004",
    name: "Side Entrance",
    location: "Building B",
    status: "offline",
    detectedPersons: []
  },
  {
    id: "cam-005",
    name: "Corridor",
    location: "Building A",
    status: "online",
    detectedPersons: []
  },
  {
    id: "cam-006",
    name: "Server Room",
    location: "Building B",
    status: "online",
    detectedPersons: [
      {
        id: "p-9012",
        name: "Alex Johnson",
        confidence: 0.92,
        timestamp: new Date().toISOString(),
        boundingBox: { x: 150, y: 100, width: 95, height: 115 }
      }
    ]
  }
];

export default function CameraGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockCameraFeeds.map((camera) => (
        <CameraCard key={camera.id} camera={camera} />
      ))}
    </div>
  );
}

function CameraCard({ camera }: { camera: CameraFeed }) {
  return (
    <Card className="grid-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-medium">{camera.name}</CardTitle>
          <Badge variant={camera.status === "online" ? "default" : "secondary"} className="uppercase text-xs">
            {camera.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground flex items-center">
          <Camera className="h-3 w-3 mr-1" /> {camera.location} • ID: {camera.id}
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
              
              {/* Camera feed placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <Video className="h-12 w-12 text-gray-600" />
              </div>
              
              {/* Face detection overlays */}
              {camera.detectedPersons.map((person) => (
                <div 
                  key={person.id}
                  className="face-highlight"
                  style={{
                    left: `${person.boundingBox.x / 4}px`,
                    top: `${person.boundingBox.y / 4}px`,
                    width: `${person.boundingBox.width / 2}px`,
                    height: `${person.boundingBox.height / 2}px`
                  }}
                ></div>
              ))}
              
              {/* Person identification tags */}
              {camera.detectedPersons.map((person) => (
                <div 
                  key={person.id}
                  className="absolute left-2 bottom-2 z-10 bg-sentinel-dark/80 text-white text-xs p-1 rounded"
                >
                  <div className="font-semibold">{person.name}</div>
                  <div className="text-xs opacity-75">ID: {person.id}</div>
                  <div className="text-xs">
                    Confidence: {(person.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
              
              {/* Scanning animation effect */}
              <div className="scanning-effect"></div>
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
