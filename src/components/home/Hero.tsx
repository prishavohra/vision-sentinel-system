
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  
  // Enhanced camera movement effect with better visibility
  useEffect(() => {
    const zoomInterval = setInterval(() => {
      setZoomLevel(prev => {
        // Increased zoom range for better visibility
        return prev >= 1.08 ? 1 : prev + 0.0008;
      });
    }, 50);
    
    const panInterval = setInterval(() => {
      setPanPosition(prev => {
        // Enhanced panning for better visibility
        return {
          x: prev.x >= 1.2 ? 0 : prev.x + 0.015,
          y: prev.y >= 0.8 ? 0 : prev.y + 0.01
        };
      });
    }, 100);
    
    return () => {
      clearInterval(zoomInterval);
      clearInterval(panInterval);
    };
  }, []);
  
  // Function to scroll to security section
  const scrollToSecuritySection = () => {
    const securitySection = document.getElementById('security-section');
    if (securitySection) {
      securitySection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative overflow-hidden">
      {/* Video Background with enhanced visibility */}
      <div className="absolute inset-0 z-0" style={{
        transform: `scale(${zoomLevel}) translate(${panPosition.x}%, ${panPosition.y}%)`,
        transition: 'transform 0.5s ease-out' 
      }}>
        {/* Changed background to have a pattern that shows movement better */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-10"></div>
        
        {/* Added subtle pattern that helps reveal movement */}
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMzMzMiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2MjZoMjRWMzRIMzZ6TTEwIDEwdjI2aDI2VjEwSDEweiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        
        {/* More visible scanning effect */}
        <div className="scanning-effect"></div>
        
        {/* Enhanced grid pattern overlay with higher opacity */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMzMzMiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0djI2aDI0VjM0SDM2ek0xMCAxMHYyNmgyNlYxMEgxMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-80"></div>
        
        {/* Multiple scanlines for better visibility */}
        <div className="scanline"></div>
        <div className="scanline" style={{ animationDelay: "2s" }}></div>
        <div className="scanline" style={{ animationDelay: "4s" }}></div>
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
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white/20 bg-white/10 hover:bg-white/20"
              onClick={scrollToSecuritySection}
            >
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
