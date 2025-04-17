import React from "react";
import AlertList from "@/components/alerts/AlertList";

const AlertsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Live Alerts</h1>
      <AlertList />
    </div>
  );
};

export default AlertsPage;
