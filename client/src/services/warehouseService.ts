// Boilerplate service - Replace with external API calls
// TODO: Replace with actual API endpoint when backend is ready

export interface WarehouseStock {
  warehouseName: string;
  location: string;
  totalSKUs: number;
  totalQuantity: number;
  totalValue: string;
  capacity: string;
  status: string;
  manager: string;
}

export const warehouseService = {
  async getWarehouseStock(): Promise<WarehouseStock[]> {
    // TODO: Replace with API call: return fetch(`${API_URL}/warehouses`).then(r => r.json())
    return [
      {
        warehouseName: "Warehouse A",
        location: "New York, NY",
        totalSKUs: 342,
        totalQuantity: 15420,
        totalValue: "$1,245,600",
        capacity: "85%",
        status: "active",
        manager: "John Smith"
      },
      {
        warehouseName: "Warehouse B",
        location: "Los Angeles, CA",
        totalSKUs: 298,
        totalQuantity: 12850,
        totalValue: "$987,400",
        capacity: "72%",
        status: "active",
        manager: "Sarah Johnson"
      },
      {
        warehouseName: "Warehouse C",
        location: "Chicago, IL",
        totalSKUs: 425,
        totalQuantity: 18900,
        totalValue: "$1,543,200",
        capacity: "91%",
        status: "active",
        manager: "Michael Chen"
      },
      {
        warehouseName: "Warehouse D",
        location: "Houston, TX",
        totalSKUs: 182,
        totalQuantity: 8320,
        totalValue: "$654,800",
        capacity: "58%",
        status: "active",
        manager: "Emily Davis"
      },
    ];
  }
};
