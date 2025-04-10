
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  MoreVertical, 
  Plus, 
  Search, 
  Trash, 
  Upload, 
  User, 
  UserPlus,
  File,
  Camera
} from "lucide-react";
import { useForm } from "react-hook-form";

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
  const [showAddFace, setShowAddFace] = useState(false);
  const [selectedFace, setSelectedFace] = useState<FaceRecord | null>(null);
  
  // Filter faces based on search term
  const filteredFaces = mockFaces.filter(face => {
    return face.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      face.id.toLowerCase().includes(searchTerm.toLowerCase());
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
              {mockFaces.length} total records
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
          
          <Button className="flex items-center gap-2" onClick={() => setShowAddFace(true)}>
            <UserPlus className="h-4 w-4" />
            <span>Add New</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredFaces.map((face) => (
          <FaceCard 
            key={face.id} 
            face={face} 
            onViewDetails={() => setSelectedFace(face)} 
          />
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
            <Button size="sm" onClick={() => setShowAddFace(true)}>
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
      
      {/* Add Face Dialog */}
      <AddFaceDialog open={showAddFace} onClose={() => setShowAddFace(false)} />
      
      {/* View Details Dialog */}
      {selectedFace && (
        <Dialog open={!!selectedFace} onOpenChange={() => setSelectedFace(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Face Record Details</DialogTitle>
              <DialogDescription>
                Complete information about this individual
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full bg-muted overflow-hidden mb-4">
                  <img 
                    src={selectedFace.thumbnail} 
                    alt={selectedFace.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{selectedFace.name}</h3>
                <p className="text-muted-foreground">{selectedFace.id}</p>
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                  <div>
                    <h4 className="text-sm text-muted-foreground">Date Added</h4>
                    <p>{selectedFace.dateAdded}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground">Last Seen</h4>
                    <p>{selectedFace.lastSeen ? new Date(selectedFace.lastSeen).toLocaleString() : "Never"}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Recent Activity</h4>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between text-sm p-2 rounded bg-muted/30">
                        <span>Detected at {i === 1 ? "Main Entrance" : i === 2 ? "Parking Lot" : "Security Gate"}</span>
                        <span className="text-muted-foreground">{new Date(Date.now() - i * 3600000).toLocaleTimeString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Notes</h4>
                  <p className="text-sm text-muted-foreground">
                    Subject has been identified multiple times at the north entrance during non-business hours.
                    Heightened monitoring recommended.
                  </p>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function FaceCard({ face, onViewDetails }: { face: FaceRecord; onViewDetails: () => void }) {
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
              <DropdownMenuItem onClick={onViewDetails}>View Details</DropdownMenuItem>
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
        <Button variant="outline" size="sm" onClick={onViewDetails}>
          View Details
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Download className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function AddFaceDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const form = useForm({
    defaultValues: {
      name: "",
      id: "",
    }
  });
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Face</DialogTitle>
          <DialogDescription>
            Fill out the information below to add a new face to the database
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter ID number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Face Images</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Upload 5 images from different angles for better recognition
              </p>
              
              <div className="grid grid-cols-5 gap-2">
                {["Front", "Slight Left", "Left", "Slight Right", "Right"].map((angle, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="bg-muted aspect-square w-full rounded-md mb-1 flex flex-col items-center justify-center">
                      <Camera className="h-6 w-6 text-muted-foreground mb-1" />
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        Upload
                      </Button>
                    </div>
                    <span className="text-xs text-muted-foreground">{angle}</span>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </Form>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>Add to Database</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
