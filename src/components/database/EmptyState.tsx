
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = "No faces found matching your search criteria." }: EmptyStateProps) {
  return (
    <div className="col-span-full">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <User className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-center text-muted-foreground">
            {message}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
