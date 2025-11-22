import apiClient from '@/lib/apiClient';
import apiConfig from '@/config/apiConfig';
import { InventoryItem } from './inventoryService';

export interface SearchResult {
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

// Sample search results for demo
const generateSampleResults = (searchQuery: string): SearchResult[] => {
  const allItems: SearchResult[] = [
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

  const query = searchQuery.toLowerCase();
  return allItems.filter(item =>
    item.sku.toLowerCase().includes(query) ||
    item.productName.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query)
  );
};

export const searchService = {
  async searchInventory(query: string): Promise<SearchResult[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }

    // TODO: Replace with actual API call
    // const response = await apiClient.get<SearchResult[]>(`${apiConfig.ENDPOINTS.INVENTORY_SEARCH}?q=${encodeURIComponent(query)}`);
    // 
    // if (response.success && response.data) {
    //   return response.data;
    // }

    // Fallback to sample data
    console.warn(`Using sample search results for query: "${query}"`);
    return generateSampleResults(query);
  }
};
