import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SkuSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SkuSearchInput({ value, onChange, placeholder = "Search by SKU, product name, or category..." }: SkuSearchInputProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 pl-12 pr-4 text-base"
        data-testid="input-sku-search"
      />
    </div>
  );
}
