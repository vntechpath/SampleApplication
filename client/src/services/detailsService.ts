import apiClient from '@/lib/apiClient';
import apiConfig from '@/config/apiConfig';

export interface WarehouseDetails {
  warehouseName: string;
  location: string;
  manager: string;
  status: string;
  capacity: string;
  items?: Array<{
    sku: string;
    quantity: number;
    value: string;
  }>;
}

export interface InventoryDetails {
  sku: string;
  productName: string;
  category: string;
  supplier: string;
  unitCost: string;
  quantityOnHand: number;
  quantityAvailable: number;
  totalValue: string;
  location: string;
  reorderLevel?: number;
  leadTime?: string;
}

// Sample warehouse details for demo
const generateWarehouseDetails = (warehouseName: string): WarehouseDetails => {
  const warehouses: Record<string, WarehouseDetails> = {
    'Warehouse A': {
      warehouseName: 'Warehouse A',
      location: 'New York, NY',
      manager: 'John Smith',
      status: 'Active',
      capacity: '85%',
      items: [
        { sku: 'SKU-12345', quantity: 450, value: '$20,695.50' },
        { sku: 'SKU-34567', quantity: 156, value: '$12,207.00' },
        { sku: 'SKU-45678', quantity: 620, value: '$9,913.80' },
      ]
    },
    'Warehouse B': {
      warehouseName: 'Warehouse B',
      location: 'Los Angeles, CA',
      manager: 'Sarah Johnson',
      status: 'Active',
      capacity: '72%',
      items: [
        { sku: 'SKU-23456', quantity: 280, value: '$9,100.00' },
        { sku: 'SKU-56789', quantity: 89, value: '$2,024.75' },
      ]
    }
  };
  return warehouses[warehouseName] || warehouses['Warehouse A'];
};

// Sample inventory details for demo
const generateInventoryDetails = (sku: string): InventoryDetails => {
  const inventoryMap: Record<string, InventoryDetails> = {
    'SKU-12345': {
      sku: 'SKU-12345',
      productName: 'Premium Widget Pro',
      category: 'Electronics',
      supplier: 'TechCorp Inc.',
      unitCost: '45.99',
      quantityOnHand: 450,
      quantityAvailable: 330,
      totalValue: '$20,695.50',
      location: 'Warehouse A-12',
      reorderLevel: 100,
      leadTime: '14 days'
    },
    'SKU-23456': {
      sku: 'SKU-23456',
      productName: 'Standard Gadget',
      category: 'Hardware',
      supplier: 'HardwareCo',
      unitCost: '32.50',
      quantityOnHand: 280,
      quantityAvailable: 210,
      totalValue: '$9,100.00',
      location: 'Warehouse B-5',
      reorderLevel: 50,
      leadTime: '7 days'
    }
  };
  return inventoryMap[sku] || inventoryMap['SKU-12345'];
};

export const detailsService = {
  async getWarehouseDetails(warehouseName: string): Promise<WarehouseDetails> {
    // TODO: Replace with actual API call
    // const response = await apiClient.get<WarehouseDetails>(`/api/warehouses/${warehouseName}`);
    // if (response.success && response.data) {
    //   return response.data;
    // }
    
    console.warn(`Using sample warehouse details for: "${warehouseName}"`);
    return generateWarehouseDetails(warehouseName);
  },

  async getInventoryDetails(sku: string): Promise<InventoryDetails> {
    // TODO: Replace with actual API call
    // const response = await apiClient.get<InventoryDetails>(`/api/inventory/${sku}`);
    // if (response.success && response.data) {
    //   return response.data;
    // }
    
    console.warn(`Using sample inventory details for: "${sku}"`);
    return generateInventoryDetails(sku);
  }
};
