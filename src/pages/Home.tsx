
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
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      <div className="container py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Advanced Criminal Recognition</h2>
          <p className="text-lg text-muted-foreground">
            EyeSpy provides enterprise-grade security through real-time facial recognition,
            movement tracking, and alert management focused on identifying known criminals.
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
              icon: AlertTriangle, 
              title: "Criminal Identification", 
              description: "Instantly recognize individuals from your database of wanted persons." 
            },
            { 
              icon: Bell, 
              title: "Instant Alerts", 
              description: "Receive immediate notifications when known criminals are detected." 
            },
            { 
              icon: Map, 
              title: "Movement Tracking", 
              description: "Track individuals across your facility with detailed movement patterns." 
            },
            { 
              icon: Database, 
              title: "Criminal Database", 
              description: "Maintain a secure database of wanted individuals with custom classifications." 
            },
            { 
              icon: ShieldCheck, 
              title: "Secure Access", 
              description: "Role-based system access with multiple authentication layers." 
            },
          ].map((feature, i) => (
            <Card key={i} className="grid-card bg-black/20 border-gray-800">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        {/* Added id to the security section for scroll targeting */}
        <div id="security-section" className="rounded-xl overflow-hidden border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="col-span-2 bg-black p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Law Enforcement Security</h2>
              <p className="mb-6">
                EyeSpy is built with law enforcement security standards in mind, ensuring your data remains protected while providing powerful surveillance capabilities.
              </p>
              <div className="space-y-4">
                {[
                  "End-to-end encryption for all data",
                  "Compliant with privacy regulations",
                  "Customizable retention policies",
                  "Regular security updates"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-3 p-4 bg-gray-900">
              <div className="h-full bg-black/80 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center p-6">
                  <img 
                    src="/lovable-uploads/4384c84a-0f35-40f2-a88b-603e677867c6.png" 
                    alt="EyeSpy Logo" 
                    className="h-32"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-8 text-center">
          <p className="text-sm text-muted-foreground">
            EyeSpy is compatible with most standard IP camera systems and can be integrated with existing security infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
}
