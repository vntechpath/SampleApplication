import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SkuDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sku: string;
  data: {
    inventory?: any;
    alternatives?: any[];
    openOrders?: any[];
    purchaseOrders?: any[];
    opportunities?: any[];
  };
}

export function SkuDetailModal({ isOpen, onClose, sku, data }: SkuDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold">SKU: {sku}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-modal">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details" data-testid="tab-details">Details</TabsTrigger>
            <TabsTrigger value="alternatives" data-testid="tab-alternatives">Alternatives</TabsTrigger>
            <TabsTrigger value="orders" data-testid="tab-orders">Orders</TabsTrigger>
            <TabsTrigger value="po" data-testid="tab-po">PO</TabsTrigger>
            <TabsTrigger value="opportunities" data-testid="tab-opportunities">Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            {data.inventory && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase text-muted-foreground">Product Name</p>
                  <p className="font-mono" data-testid="text-product-name">{data.inventory.productName}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase text-muted-foreground">Category</p>
                  <p className="font-mono">{data.inventory.category}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase text-muted-foreground">Quantity On Hand</p>
                  <p className="font-mono text-2xl font-semibold">{data.inventory.quantityOnHand}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase text-muted-foreground">Quantity Available</p>
                  <p className="font-mono text-2xl font-semibold">{data.inventory.quantityAvailable}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase text-muted-foreground">Unit Cost</p>
                  <p className="font-mono text-xl font-semibold">${data.inventory.unitCost}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase text-muted-foreground">Total Value</p>
                  <p className="font-mono text-xl font-semibold">${data.inventory.totalValue}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase text-muted-foreground">Supplier</p>
                  <p className="font-mono">{data.inventory.supplier}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase text-muted-foreground">Location</p>
                  <p className="font-mono">{data.inventory.location}</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="alternatives" className="space-y-4">
            {data.alternatives && data.alternatives.length > 0 ? (
              <div className="space-y-2">
                {data.alternatives.map((alt, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-mono font-semibold">{alt.alternativeSku}</p>
                        <p className="text-sm text-muted-foreground">{alt.description}</p>
                      </div>
                      <p className="font-mono">Ratio: {alt.conversionRatio}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No alternative SKUs available</p>
            )}
          </TabsContent>

          <TabsContent value="orders">
            <p className="text-center text-muted-foreground py-8">
              {data.openOrders?.length || 0} open orders
            </p>
          </TabsContent>

          <TabsContent value="po">
            <p className="text-center text-muted-foreground py-8">
              {data.purchaseOrders?.length || 0} purchase orders
            </p>
          </TabsContent>

          <TabsContent value="opportunities">
            <p className="text-center text-muted-foreground py-8">
              {data.opportunities?.length || 0} opportunities
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
