"use client";

import { useEffect, useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle, BellRing, ChevronDown, ChevronUp, Search, User
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AlertLevel = "low" | "medium" | "high";
type CriminalStatus = "wanted" | "suspect" | "missing";

type Alert = {
  _id: string;
  personId: string;
  personName: string;
  status: CriminalStatus;
  cameraId: string;
  cameraName: string;
  timestamp: string;
  level: AlertLevel;
  image: string;
  matched: string;
  acknowledged: boolean;
};

export default function AlertList() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAlerts, setExpandedAlerts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch("/api/alerts");
        const data = await res.json();
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  const toggleExpand = (alertId: string) => {
    setExpandedAlerts(prev => ({
      ...prev,
      [alertId]: !prev[alertId]
    }));
  };

  const filteredAlerts = alerts.filter(alert =>
    alert.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.cameraName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.personId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary p-2 rounded-md">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Criminal Detection Alerts</h2>
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
            key={alert._id}
            alert={alert}
            isExpanded={!!expandedAlerts[alert._id]}
            onToggleExpand={() => toggleExpand(alert._id)}
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

function AlertCard({ alert, isExpanded, onToggleExpand }: {
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
      case "high": return "bg-red-600/10 text-red-600";
      case "medium": return "bg-amber-500/10 text-amber-500";
      default: return "bg-blue-500/10 text-blue-500";
    }
  };

  const getStatusBadge = (status: CriminalStatus) => {
    switch (status) {
      case "wanted": return <Badge className="bg-red-600">WANTED</Badge>;
      case "suspect": return <Badge className="bg-amber-500">SUSPECT</Badge>;
      case "missing": return <Badge className="bg-blue-500">MISSING</Badge>;
    }
  };

  return (
    <Card className={cn(
      "border-l-4 transition-all bg-black/20",
      alert.level === "high" ? "border-l-red-600" :
        alert.level === "medium" ? "border-l-amber-500" :
          "border-l-blue-500",
      alert.acknowledged ? "opacity-70" : "opacity-100"
    )}>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                {alert.personName} {getStatusBadge(alert.status)}
              </CardTitle>
              <CardDescription>ID: {alert.personId}</CardDescription>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <Badge className={getAlertBadgeStyles(alert.level)}>
              {alert.level.toUpperCase()} PRIORITY
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
            <p className="text-sm"><span className="text-muted-foreground">Camera:</span> {alert.cameraName}</p>
            <p className="text-sm"><span className="text-muted-foreground">ID:</span> {alert.cameraId}</p>
          </div>

          <Button variant="ghost" size="icon" onClick={onToggleExpand}>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <p className="text-sm font-medium">Captured Image</p>
              <div className="bg-muted rounded-md aspect-square flex items-center justify-center overflow-hidden">
                <img src={alert.image} alt="Captured Face" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Database Match</p>
              <div className="bg-muted rounded-md aspect-square flex items-center justify-center overflow-hidden">
                <img src={alert.matched} alt="Matched Face" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="col-span-2 flex justify-end gap-2 mt-2">
              <Button variant="outline" size="sm">Dismiss</Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                {alert.acknowledged ? "Mark as Unread" : "Acknowledge"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
