import apiClient from '@/lib/apiClient';
import apiConfig from '@/config/apiConfig';

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

// Sample data for development/demo
const sampleInventoryChartData: InventoryChartData[] = [
  { category: "Electronics", onHand: 606, reserved: 276, available: 428 },
  { category: "Hardware", onHand: 280, reserved: 70, available: 210 },
  { category: "Tools", onHand: 620, reserved: 40, available: 580 },
  { category: "Accessories", onHand: 89, reserved: 44, available: 45 },
];

const sampleCostAnalysisData: CostAnalysisData[] = [
  { month: "Jan", inventoryValue: 2100000, purchaseOrders: 450000, sales: 680000 },
  { month: "Feb", inventoryValue: 2250000, purchaseOrders: 520000, sales: 720000 },
  { month: "Mar", inventoryValue: 2180000, purchaseOrders: 480000, sales: 850000 },
  { month: "Apr", inventoryValue: 2400000, purchaseOrders: 610000, sales: 920000 },
  { month: "May", inventoryValue: 2350000, purchaseOrders: 550000, sales: 880000 },
  { month: "Jun", inventoryValue: 2500000, purchaseOrders: 670000, sales: 1020000 },
];

export const analyticsService = {
  async getInventoryChartData(): Promise<InventoryChartData[]> {
    // TODO: Replace with actual API call
    const response = await apiClient.get<InventoryChartData[]>(apiConfig.ENDPOINTS.ANALYTICS_INVENTORY);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    // Fallback to sample data if API is not available
    console.warn('Using sample inventory chart data - API not available');
    return sampleInventoryChartData;
  },

  async getCostAnalysisData(): Promise<CostAnalysisData[]> {
    // TODO: Replace with actual API call
    const response = await apiClient.get<CostAnalysisData[]>(apiConfig.ENDPOINTS.ANALYTICS_COST);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    // Fallback to sample data if API is not available
    console.warn('Using sample cost analysis data - API not available');
    return sampleCostAnalysisData;
  }
};
