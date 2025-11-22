import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface SkuSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export function SkuSearchInput({ 
  value, 
  onChange, 
  onSearch,
  placeholder = "Search by SKU, product name, or category...",
  isLoading = false
}: SkuSearchInputProps) {
  const { toast } = useToast();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!value || value.trim().length === 0) {
        toast({
          title: "Empty Search",
          description: "Please enter a SKU, product name, or category to search.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      onSearch(value);
    }
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="h-12 pl-12 pr-4 text-base"
        data-testid="input-sku-search"
        disabled={isLoading}
      />
    </div>
  );
}
