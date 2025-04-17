
import { Database, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DatabaseHeaderProps {
  faceCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function DatabaseHeader({ 
  faceCount, 
  searchTerm, 
  onSearchChange 
}: DatabaseHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="bg-sentinel-accent/10 text-sentinel-accent p-2 rounded-md">
          <Database className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Known Faces Database</h2>
          <p className="text-sm text-muted-foreground">
            {faceCount} total records
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
