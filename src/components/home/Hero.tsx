
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Video Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-sentinel-dark/70 z-10"></div>
        <div className="w-full h-full bg-gradient-to-br from-sentinel-dark to-sentinel-DEFAULT"></div>
        
        {/* Animated scanning effect */}
        <div className="scanning-effect animate-scanning"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djI2aDI0VjM0SDM2ek0xMCAxMHYyNmgyNlYxMEgxMHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      </div>
      
      <div className="container relative z-10 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-sentinel-accent rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white">Facial Recognition Active</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Vision Sentinel System
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-white/80">
            Advanced real-time facial recognition and monitoring system. 
            Secure, accurate, and built for enterprise surveillance needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-sentinel-accent hover:bg-sentinel-accent/90">
              Live Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-white">Real-time Recognition</h3>
            <p className="text-white/70">Identify and track individuals across multiple camera feeds with millisecond response time.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-white">Advanced Alerts</h3>
            <p className="text-white/70">Instant notifications when known or flagged individuals are detected in surveillance zones.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-white">Movement Tracking</h3>
            <p className="text-white/70">Visualize paths and monitor movement patterns across your entire security infrastructure.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
