import apiClient from '@/lib/apiClient';
import apiConfig from '@/config/apiConfig';

export interface OpenOrder {
  orderNumber: string;
  sku: string;
  customerName: string;
  quantity: number;
  totalAmount: string;
  orderDate: string;
  status: string;
}

export interface PurchaseOrder {
  poNumber: string;
  sku: string;
  supplier: string;
  quantity: number;
  totalCost: string;
  orderDate: string;
  status: string;
}

// Sample data for development/demo
const sampleOpenOrders: OpenOrder[] = [
  {
    orderNumber: "ORD-1001",
    sku: "SKU-12345",
    customerName: "Acme Corp",
    quantity: 50,
    totalAmount: "2,299.50",
    orderDate: "2025-10-28",
    status: "pending"
  },
  {
    orderNumber: "ORD-1002",
    sku: "SKU-23456",
    customerName: "TechStart Inc",
    quantity: 120,
    totalAmount: "3,900.00",
    orderDate: "2025-10-29",
    status: "processing"
  },
  {
    orderNumber: "ORD-1003",
    sku: "SKU-34567",
    customerName: "Global Widgets",
    quantity: 35,
    totalAmount: "2,738.75",
    orderDate: "2025-10-30",
    status: "shipped"
  },
];

const samplePurchaseOrders: PurchaseOrder[] = [
  {
    poNumber: "PO-5001",
    sku: "SKU-12345",
    supplier: "TechCorp Inc.",
    quantity: 200,
    totalCost: "9,198.00",
    orderDate: "2025-10-25",
    status: "ordered"
  },
  {
    poNumber: "PO-5002",
    sku: "SKU-45678",
    supplier: "ToolMasters",
    quantity: 500,
    totalCost: "7,995.00",
    orderDate: "2025-10-27",
    status: "received"
  },
];

export const ordersService = {
  async getOpenOrders(): Promise<OpenOrder[]> {
    // TODO: Replace with actual API call
    const response = await apiClient.get<OpenOrder[]>(apiConfig.ENDPOINTS.OPEN_ORDERS);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    // Fallback to sample data if API is not available
    console.warn('Using sample open orders data - API not available');
    return sampleOpenOrders;
  },

  async getPurchaseOrders(): Promise<PurchaseOrder[]> {
    // TODO: Replace with actual API call
    const response = await apiClient.get<PurchaseOrder[]>(apiConfig.ENDPOINTS.PURCHASE_ORDERS);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    // Fallback to sample data if API is not available
    console.warn('Using sample purchase orders data - API not available');
    return samplePurchaseOrders;
  }
};
