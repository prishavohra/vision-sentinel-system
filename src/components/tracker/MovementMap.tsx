import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Clock, 
  Map as MapIcon, 
  Search, 
  User 
} from "lucide-react";
import axios from "axios";

type CameraNode = {
  id: string;
  name: string;
  x: number;
  y: number;
  active: boolean;
};

type MovementPath = {
  personId: string;
  personName: string;
  path: {
    cameraId: string;
    timestamp: string;
  }[];
};

const mockCameras: CameraNode[] = [
  { id: "cam-001", name: "cam1", x: 100, y: 200, active: true },
  { id: "cam-002", name: "cam2", x: 250, y: 200, active: true },
  { id: "cam-003", name: "cam3", x: 50, y: 350, active: true },
];

export default function MovementMap() {
  const [allPaths, setAllPaths] = useState<MovementPath[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [searchId, setSearchId] = useState("");

  const selectedPath = selectedPerson 
    ? allPaths.find(p => p.personId === selectedPerson) 
    : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/alerts");
        setAllPaths(res.data);
      } catch (error) {
        console.error("Error fetching alert data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const found = allPaths.find(p =>
      p.personId.toLowerCase().includes(searchId.toLowerCase()) ||
      p.personName.toLowerCase().includes(searchId.toLowerCase())
    );
    if (found) setSelectedPerson(found.personId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapIcon className="h-5 w-5 text-muted-foreground" />
              <span>Facility Map</span>
            </CardTitle>
            {selectedPath && (
              <Badge variant="outline" className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>Tracking: {selectedPath.personName}</span>
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative bg-muted/50 border rounded-md h-[500px] overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN...')]"></div>
            </div>
            {mockCameras.map((camera) => (
              <div
                key={camera.id}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${
                  camera.active ? "bg-sentinel-accent sensor-active" : "bg-muted sensor-inactive"
                }`}
                style={{ left: camera.x, top: camera.y }}
                title={camera.name}
              >
                <span className="text-xs font-semibold text-white">
                  {camera.id.split('-')[1]}
                </span>
              </div>
            ))}
            {selectedPath && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="0"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                  </marker>
                </defs>
                {selectedPath.path.map((node, index, arr) => {
                  if (index < arr.length - 1) {
                    const currentCamera = mockCameras.find(c => c.id === node.cameraId);
                    const nextCamera = mockCameras.find(c => c.id === arr[index + 1].cameraId);
                    if (currentCamera && nextCamera) {
                      return (
                        <g key={index}>
                          <line
                            x1={currentCamera.x}
                            y1={currentCamera.y}
                            x2={nextCamera.x}
                            y2={nextCamera.y}
                            stroke="#10B981"
                            strokeWidth="2"
                            strokeDasharray="5,3"
                            markerEnd="url(#arrowhead)"
                          />
                          <foreignObject
                            x={(currentCamera.x + nextCamera.x) / 2 - 40}
                            y={(currentCamera.y + nextCamera.y) / 2 - 10}
                            width="80"
                            height="20"
                          >
                            <div className="text-xs bg-background/80 text-foreground px-1 rounded">
                              {new Date(arr[index + 1].timestamp).toLocaleTimeString([], {
                                hour: '2-digit', minute: '2-digit'
                              })}
                            </div>
                          </foreignObject>
                        </g>
                      );
                    }
                  }
                  return null;
                })}
              </svg>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Track Movement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID or name..."
                className="pl-9"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Find</Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Person</label>
            <Select
              value={selectedPerson || ""}
              onValueChange={(val) => setSelectedPerson(val || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select person to track" />
              </SelectTrigger>
              <SelectContent>
                {allPaths.map((person) => (
                  <SelectItem key={person.personId} value={person.personId}>
                    {person.personName} ({person.personId})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPath ? (
            <div className="pt-4 space-y-4">
              <h3 className="font-medium">Movement Timeline</h3>
              <div className="space-y-2">
                {selectedPath.path.map((node, index) => {
                  const camera = mockCameras.find(c => c.id === node.cameraId);
                  return (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1 h-full min-h-[40px] bg-sentinel-accent relative mt-2">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sentinel-accent"></div>
                      </div>
                      <div className="flex-1 pt-1 pb-2">
                        <div className="text-sm font-medium">{camera?.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(node.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="pt-4 text-center">
              <div className="p-4 rounded-md bg-muted/50 mb-2">
                <MapIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Select a person to view their movement path across cameras.
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Movement data includes timestamps and camera transitions.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
