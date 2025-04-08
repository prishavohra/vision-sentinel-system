
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import CameraGrid from "@/components/cameras/CameraGrid";
import { Camera, Columns2, Columns3, EyeOff, Filter, RefreshCw, Rows2 } from "lucide-react";

export default function LiveCameras() {
  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-sentinel-light/10 text-sentinel-light p-2 rounded-md">
          <Camera className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Live Camera Feeds</h1>
          <p className="text-muted-foreground">
            Real-time monitoring with facial recognition
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Columns2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Columns3 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Rows2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Camera Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="building-a">Building A</SelectItem>
              <SelectItem value="building-b">Building B</SelectItem>
              <SelectItem value="exterior">Exterior</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Camera Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cameras</SelectItem>
              <SelectItem value="online">Online Only</SelectItem>
              <SelectItem value="offline">Offline Only</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
          
          <Button className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>
      
      <div className="mb-6 p-4 border rounded-md bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live Monitoring Active</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">4/6</span> cameras online
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">3</span> faces detected
          </div>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <EyeOff className="h-3 w-3" />
            <span>Hide Empty Feeds</span>
          </Button>
        </div>
      </div>
      
      <CameraGrid />
    </div>
  );
}
