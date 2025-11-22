import apiClient from '@/lib/apiClient';
import apiConfig from '@/config/apiConfig';

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

// Sample data for development/demo
const sampleData: WarehouseStock[] = [
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

export const warehouseService = {
  async getWarehouseStock(): Promise<WarehouseStock[]> {
    // TODO: Replace with actual API call
    const response = await apiClient.get<WarehouseStock[]>(apiConfig.ENDPOINTS.WAREHOUSE);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    // Fallback to sample data if API is not available
    console.warn('Using sample warehouse data - API not available');
    return sampleData;
  }
};
