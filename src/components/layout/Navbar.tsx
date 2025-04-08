
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Camera, 
  BellRing, 
  Map, 
  Database, 
  Settings, 
  Mail, 
  Menu, 
  X
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/live-cameras', label: 'Live Cameras', icon: Camera },
  { path: '/alerts', label: 'Alerts', icon: BellRing },
  { path: '/movement-tracker', label: 'Movement Tracker', icon: Map },
  { path: '/known-faces', label: 'Known Faces DB', icon: Database },
  { path: '/admin', label: 'Admin Panel', icon: Settings },
  { path: '/contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-sentinel-accent rounded-md flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:inline-block">Vision Sentinel</span>
          </NavLink>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "nav-link",
                isActive ? "nav-link-active" : "text-foreground/70 hover:text-foreground hover:bg-accent/10"
              )}
              end={item.path === '/'}
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
        
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background border-b md:hidden z-50 animate-fade-in">
            <div className="container py-4 flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "nav-link py-3",
                    isActive ? "nav-link-active" : "text-foreground/70 hover:text-foreground hover:bg-accent/10"
                  )}
                  end={item.path === '/'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
