
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BellRing, 
  ChevronDown, 
  ChevronUp,
  Filter, 
  Search,
  User
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AlertLevel = "info" | "warning" | "critical";

type Alert = {
  id: string;
  personId: string;
  personName: string;
  cameraId: string;
  cameraName: string;
  timestamp: string;
  level: AlertLevel;
  image: string;
  matched: string;
  acknowledged: boolean;
};

// Mock data for alerts
const mockAlerts: Alert[] = [
  {
    id: "alert-001",
    personId: "p-1234",
    personName: "John Doe",
    cameraId: "cam-001",
    cameraName: "Main Entrance",
    timestamp: new Date(Date.now() - 120000).toISOString(),
    level: "info",
    image: "placeholder.svg",
    matched: "placeholder.svg",
    acknowledged: false
  },
  {
    id: "alert-002",
    personId: "p-5678",
    personName: "Jane Smith",
    cameraId: "cam-003",
    cameraName: "Parking Lot",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    level: "warning",
    image: "placeholder.svg",
    matched: "placeholder.svg",
    acknowledged: false
  },
  {
    id: "alert-003",
    personId: "p-unknown",
    personName: "Unknown Person",
    cameraId: "cam-002",
    cameraName: "Lobby",
    timestamp: new Date(Date.now() - 450000).toISOString(),
    level: "critical",
    image: "placeholder.svg",
    matched: "placeholder.svg",
    acknowledged: false
  },
  {
    id: "alert-004",
    personId: "p-9012",
    personName: "Alex Johnson",
    cameraId: "cam-006",
    cameraName: "Server Room",
    timestamp: new Date(Date.now() - 600000).toISOString(),
    level: "warning",
    image: "placeholder.svg",
    matched: "placeholder.svg",
    acknowledged: true
  },
  {
    id: "alert-005",
    personId: "p-3456",
    personName: "Emily Davis",
    cameraId: "cam-001",
    cameraName: "Main Entrance",
    timestamp: new Date(Date.now() - 720000).toISOString(),
    level: "info",
    image: "placeholder.svg",
    matched: "placeholder.svg",
    acknowledged: true
  }
];

export default function AlertList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAlerts, setExpandedAlerts] = useState<Record<string, boolean>>({});

  const toggleExpand = (alertId: string) => {
    setExpandedAlerts(prev => ({
      ...prev,
      [alertId]: !prev[alertId]
    }));
  };

  // Filter alerts based on search term
  const filteredAlerts = mockAlerts.filter(alert => 
    alert.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.cameraName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.personId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-sentinel-alert/10 text-sentinel-alert p-2 rounded-md">
            <BellRing className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">System Alerts</h2>
            <p className="text-sm text-muted-foreground">
              {filteredAlerts.length} alerts • {filteredAlerts.filter(a => !a.acknowledged).length} unacknowledged
            </p>
          </div>
        </div>
        
        <div className="w-full sm:w-auto relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search alerts..."
            className="pl-9 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-4">
        {filteredAlerts.map((alert) => (
          <AlertCard 
            key={alert.id} 
            alert={alert} 
            isExpanded={!!expandedAlerts[alert.id]} 
            onToggleExpand={() => toggleExpand(alert.id)} 
          />
        ))}
        
        {filteredAlerts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <BellRing className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground">No alerts found matching your search criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function AlertCard({ 
  alert, 
  isExpanded, 
  onToggleExpand 
}: { 
  alert: Alert; 
  isExpanded: boolean; 
  onToggleExpand: () => void; 
}) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getAlertBadgeStyles = (level: AlertLevel) => {
    switch (level) {
      case "critical":
        return "bg-sentinel-danger/10 text-sentinel-danger";
      case "warning":
        return "bg-sentinel-alert/10 text-sentinel-alert";
      default:
        return "bg-sentinel-accent/10 text-sentinel-accent";
    }
  };

  return (
    <Card className={cn(
      "border-l-4 transition-all", 
      alert.level === "critical" ? "border-l-sentinel-danger" : 
      alert.level === "warning" ? "border-l-sentinel-alert" : 
      "border-l-sentinel-accent",
      alert.acknowledged ? "opacity-70" : "opacity-100"
    )}>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-base font-medium">{alert.personName}</CardTitle>
              <CardDescription>ID: {alert.personId}</CardDescription>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <Badge className={getAlertBadgeStyles(alert.level)}>
              {alert.level.toUpperCase()}
            </Badge>
            <span className="text-xs text-muted-foreground mt-1">
              {formatTime(alert.timestamp)}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">
              <span className="text-muted-foreground">Camera:</span> {alert.cameraName}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">ID:</span> {alert.cameraId}
            </p>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleExpand}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <p className="text-sm font-medium">Captured Image</p>
              <div className="bg-muted rounded-md aspect-square flex items-center justify-center overflow-hidden">
                <img 
                  src={alert.image} 
                  alt="Captured Face" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Matched Record</p>
              <div className="bg-muted rounded-md aspect-square flex items-center justify-center overflow-hidden">
                <img 
                  src={alert.matched} 
                  alt="Matched Face" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="col-span-2 flex justify-end gap-2 mt-2">
              <Button variant="outline" size="sm">Dismiss</Button>
              <Button size="sm">
                {alert.acknowledged ? "Mark as Unread" : "Acknowledge"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
