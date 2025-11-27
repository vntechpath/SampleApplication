// API Configuration
// Update the API_BASE_URL to point to your external API

export const apiConfig = {
  // Base URL for all API calls
  // Configure your API base URL here
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:123456',
  
  // API Endpoints
  ENDPOINTS: {
    WAREHOUSE: '/warehouses',
    INVENTORY: '/inventory',
    INVENTORY_SEARCH: '/api/InventoryAPI/SearchSKU',
    INVENTORY_ALTERNATIVES: '/api/InventoryAPI/GetAltSKUs',
    OPEN_ORDERS: '/api/InventoryAPI/GetOpenOrders',
    PURCHASE_ORDERS: '/orders/purchase',
    LEADS: '/leads',
    OPPORTUNITIES: '/opportunities',
    ANALYTICS_INVENTORY: '/analytics/inventory',
    ANALYTICS_COST: '/analytics/cost',
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 30000,
  
  // Retry configuration
  RETRY: {
    enabled: true,
    maxAttempts: 3,
    delayMs: 1000,
  }
};

export default apiConfig;
