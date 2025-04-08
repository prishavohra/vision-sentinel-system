
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  FileText, 
  Key, 
  Lock, 
  Settings, 
  Shield, 
  Upload, 
  UserPlus, 
  Users 
} from "lucide-react";

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="bg-sentinel-dark/10 text-sentinel-dark p-2 rounded-md">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Admin Control Panel</h2>
          <p className="text-sm text-muted-foreground">
            System configuration, reporting, and user management
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="dashboard">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="embeddings">Embeddings</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="embeddings">
            <EmbeddingsManagement />
          </TabsContent>
          
          <TabsContent value="reports">
            <ReportsPanel />
          </TabsContent>
          
          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-sentinel-accent rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <CardTitle>Admin Access</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="username">Username</label>
                <Input id="username" placeholder="Enter your username" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="password">Password</label>
                  <a href="#" className="text-xs text-sentinel-accent hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Recognized</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,547</div>
            <p className="text-xs text-muted-foreground mt-1">+15% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alert Triggers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">128</div>
            <p className="text-xs text-muted-foreground mt-1">-3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>System logs and recent events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">System {i % 2 === 0 ? "Alert Triggered" : "Update Completed"}</p>
                  <p className="text-sm text-muted-foreground">
                    {i % 2 === 0 ? "Restricted individual detected at Main Entrance" : "Face recognition model updated to version 2.4.1"}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(Date.now() - i * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Quick Actions</h3>
        <Button variant="link" className="text-sentinel-accent">View All</Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
          <FileText className="h-5 w-5" />
          <span>Generate Report</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
          <UserPlus className="h-5 w-5" />
          <span>Add User</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
          <Upload className="h-5 w-5" />
          <span>Update Database</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
          <Settings className="h-5 w-5" />
          <span>System Config</span>
        </Button>
      </div>
    </div>
  );
}

function UserManagement() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage system access and permissions</CardDescription>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-6 p-4 bg-muted/50">
            <div className="col-span-2 font-medium">User</div>
            <div className="font-medium">Role</div>
            <div className="font-medium">Status</div>
            <div className="font-medium">Last Login</div>
            <div></div>
          </div>
          
          <Separator />
          
          {[
            { name: "Admin User", email: "admin@example.com", role: "Administrator", status: "Active" },
            { name: "Security Staff", email: "security@example.com", role: "Operator", status: "Active" },
            { name: "Front Desk", email: "frontdesk@example.com", role: "Viewer", status: "Active" },
            { name: "Backup User", email: "backup@example.com", role: "Administrator", status: "Inactive" },
          ].map((user, i) => (
            <div key={i} className="grid grid-cols-6 p-4 hover:bg-muted/30 transition-colors">
              <div className="col-span-2">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </div>
              <div className="self-center">{user.role}</div>
              <div className="self-center">
                <span 
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    user.status === "Active" ? "bg-sentinel-accent" : "bg-muted-foreground"
                  }`}
                ></span>
                {user.status}
              </div>
              <div className="self-center text-sm text-muted-foreground">
                {i === 3 ? "Never" : new Date(Date.now() - i * 86400000).toLocaleDateString()}
              </div>
              <div className="self-center text-right">
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              
              {i < 3 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function EmbeddingsManagement() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Face Embeddings</CardTitle>
              <CardDescription>Manage face recognition data</CardDescription>
            </div>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Embeddings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">512</div>
                  <p className="text-xs text-muted-foreground mt-1">Across all categories</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Model Version</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">v2.4.1</div>
                  <p className="text-xs text-muted-foreground mt-1">Last updated Apr 1, 2023</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded"></div>
                        <div>
                          <p className="font-medium">Batch Upload #{1000 + i}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Badge>{10 + i * 5} faces</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Model Performance</CardTitle>
          <CardDescription>Recognition accuracy and speed metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60 flex items-center justify-center">
            <div className="text-center space-y-2">
              <BarChart className="h-10 w-10 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Performance metrics visualization will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ReportsPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Export system data for analysis</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "Recognition Activity", description: "Face detection and identification events" },
              { title: "Alert Summary", description: "System alerts and triggered events" },
              { title: "Movement Patterns", description: "Subject movement across camera zones" },
              { title: "System Performance", description: "Processing time and accuracy metrics" },
            ].map((report, i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded border hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-medium">{report.title}</p>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Automated report generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "Daily Summary", frequency: "Daily at 00:00", status: "Active" },
              { title: "Weekly Activity", frequency: "Every Monday at 08:00", status: "Active" },
              { title: "Monthly Analytics", frequency: "First day of month", status: "Inactive" },
            ].map((scheduled, i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded border hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-medium">{scheduled.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{scheduled.frequency}</span>
                    <span 
                      className={`inline-block w-2 h-2 rounded-full ${
                        scheduled.status === "Active" ? "bg-sentinel-accent" : "bg-muted-foreground"
                      }`}
                    ></span>
                    <span className="text-sm">{scheduled.status}</span>
                  </div>
                </div>
                <div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SystemSettings() {
  const [openSection, setOpenSection] = useState<string | null>("general");
  
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Adjust system settings and parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* General Settings */}
          <div className="border rounded-md overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection("general")}
            >
              <div className="font-medium">General Settings</div>
              <div>{openSection === "general" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</div>
            </div>
            
            {openSection === "general" && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">System Name</label>
                    <Input defaultValue="Vision Sentinel System" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Recognition Threshold</label>
                    <Input defaultValue="0.85" />
                    <p className="text-xs text-muted-foreground">
                      Minimum confidence score required for positive identification (0-1)
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Security Settings */}
          <div className="border rounded-md overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection("security")}
            >
              <div className="font-medium">Security Settings</div>
              <div>{openSection === "security" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</div>
            </div>
            
            {openSection === "security" && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">API Access Keys</label>
                    <div className="flex">
                      <Input type="password" defaultValue="••••••••••••••••" className="rounded-r-none" />
                      <Button variant="outline" className="rounded-l-none border-l-0">
                        <Key className="h-4 w-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Two-Factor Authentication</label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="tfa" className="accent-sentinel-accent h-4 w-4" />
                      <label htmlFor="tfa" className="text-sm">Require 2FA for admin access</label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Alert Configuration */}
          <div className="border rounded-md overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection("alerts")}
            >
              <div className="font-medium">Alert Configuration</div>
              <div>{openSection === "alerts" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</div>
            </div>
            
            {openSection === "alerts" && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Notifications</label>
                    <Input placeholder="security@example.com" />
                    <p className="text-xs text-muted-foreground">
                      Receive alerts via email (comma-separated for multiple recipients)
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Alert Categories</label>
                    <div className="space-y-2">
                      {["Restricted Person Detection", "Unknown Person Detection", "System Errors"].map((category, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <input type="checkbox" id={`cat-${i}`} className="accent-sentinel-accent h-4 w-4" defaultChecked />
                          <label htmlFor={`cat-${i}`} className="text-sm">{category}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
