// API Configuration
// Update the API_BASE_URL to point to your external API

export const apiConfig = {
  // Base URL for all API calls
  // Change this to your actual API endpoint
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  
  // API Endpoints
  ENDPOINTS: {
    WAREHOUSE: '/warehouses',
    INVENTORY: '/inventory',
    INVENTORY_ALTERNATIVES: '/inventory/alternatives',
    OPEN_ORDERS: '/orders/open',
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
