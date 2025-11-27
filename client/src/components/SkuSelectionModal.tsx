import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface SearchResult {
  sku: string;
  productName: string;
  category: string;
  quantityOnHand: number;
  quantityAvailable: number;
  unitCost: string;
  totalValue: string;
  supplier: string;
  location: string;
}

interface SkuSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: SearchResult[];
  onSelect: (sku: string) => void;
}

export function SkuSelectionModal({
  isOpen,
  onClose,
  results,
  onSelect,
}: SkuSelectionModalProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return current.direction === "asc"
          ? { key, direction: "desc" }
          : null;
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = [...results].sort((a, b) => {
    if (!sortConfig) return 0;

    const key = sortConfig.key as keyof SearchResult;
    const aValue = a[key];
    const bValue = b[key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select a SKU</DialogTitle>
          <DialogDescription>
            Multiple SKUs found. Please select one to proceed.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead
                  className="font-semibold cursor-pointer hover-elevate"
                  onClick={() => handleSort("sku")}
                  data-testid="sort-sku"
                >
                  <div className="flex items-center gap-2">
                    <span>SKU</span>
                    {sortConfig?.key === "sku" ? (
                      sortConfig.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronDown className="h-4 w-4 opacity-30" />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="font-semibold cursor-pointer hover-elevate"
                  onClick={() => handleSort("productName")}
                  data-testid="sort-product"
                >
                  <div className="flex items-center gap-2">
                    <span>Product Name</span>
                    {sortConfig?.key === "productName" ? (
                      sortConfig.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronDown className="h-4 w-4 opacity-30" />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="font-semibold cursor-pointer hover-elevate"
                  onClick={() => handleSort("category")}
                  data-testid="sort-category"
                >
                  <div className="flex items-center gap-2">
                    <span>Category</span>
                    {sortConfig?.key === "category" ? (
                      sortConfig.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronDown className="h-4 w-4 opacity-30" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="font-semibold">Qty On Hand</TableHead>
                <TableHead className="font-semibold">Total Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((result, index) => (
                <TableRow
                  key={index}
                  className="cursor-pointer hover-elevate"
                  onClick={() => {
                    onSelect(result.sku);
                    onClose();
                  }}
                  data-testid={`sku-result-${index}`}
                >
                  <TableCell className="font-mono text-sm font-semibold">
                    {result.sku}
                  </TableCell>
                  <TableCell className="text-sm">{result.productName}</TableCell>
                  <TableCell className="text-sm">{result.category}</TableCell>
                  <TableCell className="text-sm">
                    {result.quantityOnHand}
                  </TableCell>
                  <TableCell className="text-sm">${result.totalValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
