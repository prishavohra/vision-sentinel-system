
import Hero from "@/components/home/Hero";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Bell, 
  Camera, 
  Database, 
  Eye, 
  Lock, 
  Map, 
  ShieldCheck 
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      <div className="container py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Advanced Facial Recognition</h2>
          <p className="text-lg text-muted-foreground">
            Vision Sentinel provides enterprise-grade security through real-time facial recognition,
            movement tracking, and alert management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              icon: Camera, 
              title: "Live Monitoring", 
              description: "Monitor multiple camera feeds in real-time with AI-powered facial recognition." 
            },
            { 
              icon: Bell, 
              title: "Instant Alerts", 
              description: "Receive immediate notifications when known or restricted individuals are detected." 
            },
            { 
              icon: Map, 
              title: "Movement Tracking", 
              description: "Track individuals across your facility with detailed movement patterns." 
            },
            { 
              icon: Database, 
              title: "Face Database", 
              description: "Maintain a secure database of known faces with custom classifications." 
            },
            { 
              icon: ShieldCheck, 
              title: "Secure Access", 
              description: "Role-based system access with multiple authentication layers." 
            },
            { 
              icon: Eye, 
              title: "Real-time Analytics", 
              description: "Advanced metrics on detection accuracy and system performance." 
            },
          ].map((feature, i) => (
            <Card key={i} className="grid-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-sentinel-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-sentinel-accent" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        <div className="rounded-xl overflow-hidden border">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="col-span-2 bg-sentinel-dark text-white p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Enterprise Security</h2>
              <p className="mb-6">
                Vision Sentinel is built with enterprise security standards in mind, ensuring your data remains protected while providing powerful surveillance capabilities.
              </p>
              <div className="space-y-4">
                {[
                  "End-to-end encryption for all data",
                  "Compliant with privacy regulations",
                  "Customizable retention policies",
                  "Regular security updates"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-sentinel-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-3 p-4">
              <div className="h-full bg-muted rounded-lg overflow-hidden">
                <div className="bg-black/90 w-full h-full flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <Camera className="h-16 w-16 mx-auto mb-4 text-white/40" />
                    <p>System dashboard visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Vision Sentinel is compatible with most standard IP camera systems and can be integrated with existing security infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
}
