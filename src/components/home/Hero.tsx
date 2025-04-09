import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  
  // Enhanced subtle camera movement effect
  useEffect(() => {
    const zoomInterval = setInterval(() => {
      setZoomLevel(prev => {
        // Increased oscillation between 1 and 1.05
        return prev >= 1.05 ? 1 : prev + 0.0005;
      });
    }, 50);
    
    const panInterval = setInterval(() => {
      setPanPosition(prev => {
        // Slightly more noticeable panning effect
        return {
          x: prev.x >= 0.8 ? 0 : prev.x + 0.01,
          y: prev.y >= 0.5 ? 0 : prev.y + 0.008
        };
      });
    }, 100);
    
    return () => {
      clearInterval(zoomInterval);
      clearInterval(panInterval);
    };
  }, []);
  
  return (
    <div className="relative overflow-hidden">
      {/* Video Background with overlay */}
      <div className="absolute inset-0 z-0" style={{
        transform: `scale(${zoomLevel}) translate(${panPosition.x}%, ${panPosition.y}%)`,
        transition: 'transform 0.5s ease-out' // Reduced transition time for more visible movement
      }}>
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <div className="w-full h-full bg-gradient-to-br from-black to-gray-900"></div>
        
        {/* Animated scanning effect */}
        <div className="scanning-effect animate-scanning"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djI2aDI0VjM0SDM2ek0xMCAxMHYyNmgyNlYxMEgxMHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        
        {/* Added scanline effect */}
        <div className="scanline"></div>
      </div>
      
      <div className="container relative z-10 pt-20 pb-16 md:pt-32 md:pb-24">
        {/* Recording indicator */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-md border border-gray-800">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
          <span className="text-xs font-mono text-red-500">REC</span>
        </div>
        
        {/* Camera ID */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-md border border-gray-800">
          <span className="text-xs font-mono text-gray-400">CAM-01</span>
        </div>
        
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white">Criminal Recognition Active</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            EyeSpy Surveillance System
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-white/80">
            Advanced real-time criminal recognition and monitoring system. 
            Secure, accurate, and designed to identify persons of interest from your database.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="text-white border-white/20 bg-white/10 hover:bg-white/20">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Security Features
            </Button>
          </div>
        </div>
      </div>
      
      {/* Feature highlight boxes */}
      <div className="container relative z-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-white">Criminal Recognition</h3>
            <p className="text-white/70">Identify wanted criminals across multiple camera feeds with high accuracy.</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-white">Instant Alerts</h3>
            <p className="text-white/70">Immediate notifications when persons of interest are detected in surveillance zones.</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-white">Movement Tracking</h3>
            <p className="text-white/70">Visualize paths and monitor movement patterns of identified individuals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
