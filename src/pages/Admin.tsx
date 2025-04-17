
import { useEffect, useState } from "react";
import AdminPanel from "@/components/admin/AdminPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, AlertTriangle } from "lucide-react";
import { loginAdmin, getCurrentUser } from "@/lib/apis";
import { toast } from "@/components/ui/use-toast";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [connectionError, setConnectionError] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is already authenticated
        if (localStorage.getItem('adminToken')) {
          await getCurrentUser();
          setIsLoggedIn(true);
        }
      } catch (error) {
        // Token invalid or expired
        localStorage.removeItem('adminToken');
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setConnectionError(false);
    
    try {
      setIsLoading(true);
      console.log("Attempting login with:", { username, password });
      await loginAdmin({ username, password });
      setIsLoggedIn(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      
      if (error.message === "Network error. Please check your server connection.") {
        setConnectionError(true);
        setLoginError("Cannot connect to server. Please make sure your backend server is running.");
      } else {
        setLoginError(error.message || "Invalid username or password");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-16rem)]">
        <div className="text-center">Loading...</div>
      </div>
    );
  }
  
  if (!isLoggedIn) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-16rem)]">
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
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                {loginError && (
                  <div className="bg-red-100 text-red-800 p-3 rounded-md text-sm">
                    {connectionError && (
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-semibold">Connection Error</span>
                      </div>
                    )}
                    {loginError}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="username">Username</label>
                  <Input 
                    id="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium" htmlFor="password">Password</label>
                    <a href="#" className="text-xs text-sentinel-accent hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password" 
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                
                <div className="text-xs text-center text-muted-foreground mt-4">
                  Default credentials: username "admin" / password "admin123"
                  <br/>
                  Make sure your backend server is running on port 5000.
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <AdminPanel />
    </div>
  );
}
