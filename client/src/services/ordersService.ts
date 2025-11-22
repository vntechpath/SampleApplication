// Boilerplate service - Replace with external API calls
// TODO: Replace with actual API endpoint when backend is ready

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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ordersService = {
  async getOpenOrders(): Promise<OpenOrder[]> {
    // TODO: Replace with API call: return fetch(`${API_URL}/orders/open`).then(r => r.json())
    await delay(10000); // 10 second delay for demo
    return [
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
  },

  async getPurchaseOrders(): Promise<PurchaseOrder[]> {
    // TODO: Replace with API call: return fetch(`${API_URL}/orders/purchase`).then(r => r.json())
    await delay(10000); // 10 second delay for demo
    return [
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
  }
};
