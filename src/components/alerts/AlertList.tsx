import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Alert = {
  name: string;
  camera: string;
  timestamp: string;
};

const AlertList: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data.alerts))
      .catch((err) => console.error("Error fetching alerts:", err));
  }, []);

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {alerts.map((alert, index) => (
        <Card key={index} className="shadow-md border border-gray-200">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">{alert.name}</h3>
            <div className="mt-2">
              <Badge variant="outline">Camera: {alert.camera}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Detected at: {new Date(alert.timestamp).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AlertList;
