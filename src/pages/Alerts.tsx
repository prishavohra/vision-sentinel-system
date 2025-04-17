import React, { useEffect, useState } from 'react';
import AlertList from '@/components/AlertList';

interface Alert {
  name: string;
  camera: string;
  timestamp: string;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/alerts')
      .then(res => res.json())
      .then(data => setAlerts(data.alerts))
      .catch(err => console.error('Failed to fetch alerts:', err));
  }, []);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Live Alerts</h1>
      <AlertList alerts={alerts} />
    </div>
  );
}
