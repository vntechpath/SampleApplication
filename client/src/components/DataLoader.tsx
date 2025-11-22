import { Loader2 } from "lucide-react";

interface DataLoaderProps {
  message?: string;
}

export function DataLoader({ message = "Loading data..." }: DataLoaderProps) {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground font-medium">{message}</p>
      </div>
    </div>
  );
}
