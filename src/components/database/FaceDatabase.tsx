
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Database, 
  Download, 
  Filter, 
  MoreVertical, 
  Plus, 
  Search, 
  Trash, 
  Upload, 
  User, 
  UserPlus 
} from "lucide-react";

type FaceRecord = {
  id: string;
  name: string;
  category: "employee" | "visitor" | "restricted" | "unknown";
  dateAdded: string;
  lastSeen: string | null;
  thumbnail: string;
};

// Mock data for known faces
const mockFaces: FaceRecord[] = [
  {
    id: "p-1234",
    name: "John Doe",
    category: "employee",
    dateAdded: "2023-01-15",
    lastSeen: "2023-04-08T09:30:00Z",
    thumbnail: "placeholder.svg"
  },
  {
    id: "p-5678",
    name: "Jane Smith",
    category: "employee",
    dateAdded: "2023-02-20",
    lastSeen: "2023-04-08T10:20:10Z",
    thumbnail: "placeholder.svg"
  },
  {
    id: "p-9012",
    name: "Alex Johnson",
    category: "visitor",
    dateAdded: "2023-03-05",
    lastSeen: "2023-04-08T11:40:10Z",
    thumbnail: "placeholder.svg"
  },
  {
    id: "p-3456",
    name: "Emily Davis",
    category: "employee",
    dateAdded: "2023-01-30",
    lastSeen: "2023-04-07T15:20:00Z",
    thumbnail: "placeholder.svg"
  },
  {
    id: "p-7890",
    name: "Michael Wilson",
    category: "restricted",
    dateAdded: "2023-02-10",
    lastSeen: null,
    thumbnail: "placeholder.svg"
  },
  {
    id: "p-unknown-1",
    name: "Unknown Person",
    category: "unknown",
    dateAdded: "2023-04-01",
    lastSeen: "2023-04-08T08:15:30Z",
    thumbnail: "placeholder.svg"
  }
];

export default function FaceDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter faces based on search term and category
  const filteredFaces = mockFaces.filter(face => {
    // Search filter
    const matchesSearch = 
      face.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      face.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = 
      !selectedCategory || face.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-sentinel-accent/10 text-sentinel-accent p-2 rounded-md">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Known Faces Database</h2>
            <p className="text-sm text-muted-foreground">
              {mockFaces.length} total records • {mockFaces.filter(f => f.category === "employee").length} employees
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or ID..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                All Categories
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory("employee")}>
                Employees
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory("visitor")}>
                Visitors
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory("restricted")}>
                Restricted
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory("unknown")}>
                Unknown
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Add New</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredFaces.map((face) => (
          <FaceCard key={face.id} face={face} />
        ))}
        
        {/* Add new face card */}
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-full py-10">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-1">Add New Record</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Upload a new face to the database
            </p>
            <Button size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </CardContent>
        </Card>
        
        {filteredFaces.length === 0 && (
          <div className="col-span-full">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <User className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  No faces found matching your search criteria.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function FaceCard({ face }: { face: FaceRecord }) {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "employee":
        return <Badge className="bg-sentinel-accent">Employee</Badge>;
      case "visitor":
        return <Badge variant="outline">Visitor</Badge>;
      case "restricted":
        return <Badge variant="destructive">Restricted</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };
  
  const formatDate = (isoString: string | null) => {
    if (!isoString) return "Never";
    
    return new Date(isoString).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="grid-card">
      <CardHeader className="p-4 pb-0 relative">
        <div className="absolute top-4 right-4 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Record</DropdownMenuItem>
              <DropdownMenuItem>Update Image</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash className="h-4 w-4 mr-2" />
                Delete Record
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted overflow-hidden">
            <img 
              src={face.thumbnail} 
              alt={face.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <CardTitle className="text-base font-medium">{face.name}</CardTitle>
            <CardDescription>{face.id}</CardDescription>
            <div className="mt-1">{getCategoryBadge(face.category)}</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-4">
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Added:</span>
            <span>{face.dateAdded}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last seen:</span>
            <span>{formatDate(face.lastSeen)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Download className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
