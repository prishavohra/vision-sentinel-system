import React from 'react';

interface AlertProps {
  name: string;
  camera: string;
  timestamp: string;
}

const AlertList: React.FC<{ alerts: AlertProps[] }> = ({ alerts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className="bg-zinc-900 text-white p-4 rounded-lg shadow-md border border-white/20"
        >
          <h2 className="text-lg font-semibold">{alert.name}</h2>
          <p className="text-sm mt-1">
            <span className="bg-zinc-700 px-2 py-1 rounded-full">Camera: {alert.camera}</span>
          </p>
          <p className="mt-2 text-sm text-white/80">Detected at: {alert.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default AlertList;
