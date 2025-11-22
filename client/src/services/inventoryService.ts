// Boilerplate service - Replace with external API calls
// TODO: Replace with actual API endpoint when backend is ready

export interface InventoryItem {
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

export interface AlternativeSku {
  primarySku: string;
  alternativeSku: string;
  description: string;
  conversionRatio: string;
}

export const inventoryService = {
  async getInventoryItems(): Promise<InventoryItem[]> {
    // TODO: Replace with API call: return fetch(`${API_URL}/inventory`).then(r => r.json())
    return [
      {
        sku: "SKU-12345",
        productName: "Premium Widget Pro",
        category: "Electronics",
        quantityOnHand: 450,
        quantityAvailable: 330,
        unitCost: "45.99",
        totalValue: "20,695.50",
        supplier: "TechCorp Inc.",
        location: "Warehouse A-12"
      },
      {
        sku: "SKU-23456",
        productName: "Standard Gadget",
        category: "Hardware",
        quantityOnHand: 280,
        quantityAvailable: 210,
        unitCost: "32.50",
        totalValue: "9,100.00",
        supplier: "HardwareCo",
        location: "Warehouse B-5"
      },
      {
        sku: "SKU-34567",
        productName: "Deluxe Component",
        category: "Electronics",
        quantityOnHand: 156,
        quantityAvailable: 98,
        unitCost: "78.25",
        totalValue: "12,207.00",
        supplier: "ComponentsPlus",
        location: "Warehouse A-8"
      },
      {
        sku: "SKU-45678",
        productName: "Basic Tool",
        category: "Tools",
        quantityOnHand: 620,
        quantityAvailable: 580,
        unitCost: "15.99",
        totalValue: "9,913.80",
        supplier: "ToolMasters",
        location: "Warehouse C-3"
      },
      {
        sku: "SKU-56789",
        productName: "Pro Accessory",
        category: "Accessories",
        quantityOnHand: 89,
        quantityAvailable: 45,
        unitCost: "22.75",
        totalValue: "2,024.75",
        supplier: "AccessoryCorp",
        location: "Warehouse B-12"
      },
    ];
  },

  async getAlternativeSkus(): Promise<AlternativeSku[]> {
    // TODO: Replace with API call: return fetch(`${API_URL}/inventory/alternatives`).then(r => r.json())
    return [
      {
        primarySku: "SKU-12345",
        alternativeSku: "SKU-12345-ALT",
        description: "Standard variant of Premium Widget Pro",
        conversionRatio: "1.0"
      },
      {
        primarySku: "SKU-12345",
        alternativeSku: "SKU-12346",
        description: "Deluxe variant with enhanced features",
        conversionRatio: "0.8"
      },
      {
        primarySku: "SKU-23456",
        alternativeSku: "SKU-23457",
        description: "Budget version of Standard Gadget",
        conversionRatio: "1.2"
      },
    ];
  }
};
