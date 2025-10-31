import { useState } from "react";
import { SkuDetailModal } from "../SkuDetailModal";
import { Button } from "@/components/ui/button";

export default function SkuDetailModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const mockData = {
    inventory: {
      sku: "SKU-12345",
      productName: "Premium Widget Pro",
      category: "Electronics",
      quantityOnHand: 450,
      quantityReserved: 120,
      quantityAvailable: 330,
      unitCost: "45.99",
      totalValue: "20,695.50",
      supplier: "TechCorp Inc.",
      location: "Warehouse A-12",
    },
    alternatives: [
      { alternativeSku: "SKU-12346", description: "Standard Widget", conversionRatio: "1.0" },
      { alternativeSku: "SKU-12347", description: "Deluxe Widget", conversionRatio: "0.8" },
    ],
    openOrders: [],
    purchaseOrders: [],
    opportunities: [],
  };

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)}>Open SKU Detail Modal</Button>
      <SkuDetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sku="SKU-12345"
        data={mockData}
      />
    </div>
  );
}
