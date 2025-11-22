import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, any>;
  viewType?: 'default' | 'warehouse-table' | 'inventory-grid';
}

export function DetailsModal({ isOpen, onClose, title, data, viewType = 'default' }: DetailsModalProps) {
  const formatKey = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const renderWarehouseTable = () => {
    return (
      <div className="space-y-6">
        {/* Basic Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Basic Information</h3>
          {Object.entries(data).filter(([key]) => key !== 'items').map(([key, value]) => (
            <div key={key} className="grid grid-cols-3 gap-4 py-2">
              <div className="font-medium text-muted-foreground">
                {formatKey(key)}
              </div>
              <div className="col-span-2 font-mono text-sm">
                {typeof value === 'object' && value !== null ? (
                  <pre className="text-xs">{JSON.stringify(value, null, 2)}</pre>
                ) : (
                  String(value)
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Items Table */}
        {data.items && data.items.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Warehouse Items</h3>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-semibold">SKU</TableHead>
                    <TableHead className="font-semibold text-right">Quantity</TableHead>
                    <TableHead className="font-semibold text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.map((item: any, idx: number) => (
                    <TableRow key={idx} className="hover:bg-muted/50">
                      <TableCell className="font-mono font-semibold">{item.sku}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right font-semibold text-green-600">{item.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderInventoryGrid = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="p-4 border rounded-lg bg-muted/30 space-y-1">
              <div className="text-sm font-medium text-muted-foreground">
                {formatKey(key)}
              </div>
              <div className="text-lg font-semibold font-mono">
                {typeof value === 'object' && value !== null ? (
                  <pre className="text-xs">{JSON.stringify(value, null, 2)}</pre>
                ) : (
                  String(value)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDefault = () => {
    return (
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="grid grid-cols-3 gap-4 py-3 border-b">
            <div className="font-medium text-muted-foreground">
              {formatKey(key)}
            </div>
            <div className="col-span-2 font-mono text-sm" data-testid={`text-detail-${key}`}>
              {typeof value === 'object' && value !== null ? (
                <pre className="text-xs">{JSON.stringify(value, null, 2)}</pre>
              ) : (
                String(value)
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid="button-close-details-modal"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-4">
          {viewType === 'warehouse-table' && renderWarehouseTable()}
          {viewType === 'inventory-grid' && renderInventoryGrid()}
          {viewType === 'default' && renderDefault()}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose} data-testid="button-close-details">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
