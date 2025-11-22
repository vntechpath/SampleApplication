// Boilerplate service - Replace with external API calls
// TODO: Replace with actual API endpoint when backend is ready

export interface InventoryChartData {
  category: string;
  onHand: number;
  reserved: number;
  available: number;
}

export interface CostAnalysisData {
  month: string;
  inventoryValue: number;
  purchaseOrders: number;
  sales: number;
}

export const analyticsService = {
  async getInventoryChartData(): Promise<InventoryChartData[]> {
    // TODO: Replace with API call: return fetch(`${API_URL}/analytics/inventory`).then(r => r.json())
    return [
      { category: "Electronics", onHand: 606, reserved: 276, available: 428 },
      { category: "Hardware", onHand: 280, reserved: 70, available: 210 },
      { category: "Tools", onHand: 620, reserved: 40, available: 580 },
      { category: "Accessories", onHand: 89, reserved: 44, available: 45 },
    ];
  },

  async getCostAnalysisData(): Promise<CostAnalysisData[]> {
    // TODO: Replace with API call: return fetch(`${API_URL}/analytics/cost`).then(r => r.json())
    return [
      { month: "Jan", inventoryValue: 2100000, purchaseOrders: 450000, sales: 680000 },
      { month: "Feb", inventoryValue: 2250000, purchaseOrders: 520000, sales: 720000 },
      { month: "Mar", inventoryValue: 2180000, purchaseOrders: 480000, sales: 850000 },
      { month: "Apr", inventoryValue: 2400000, purchaseOrders: 610000, sales: 920000 },
      { month: "May", inventoryValue: 2350000, purchaseOrders: 550000, sales: 880000 },
      { month: "Jun", inventoryValue: 2500000, purchaseOrders: 670000, sales: 1020000 },
    ];
  }
};
