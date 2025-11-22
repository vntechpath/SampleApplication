import apiClient from '@/lib/apiClient';
import apiConfig from '@/config/apiConfig';

export interface Lead {
  leadNumber: string;
  companyName: string;
  contactName: string;
  interestedSku: string;
  estimatedValue: string;
  status: string;
}

export interface Opportunity {
  opportunityNumber: string;
  companyName: string;
  sku: string;
  quantity: number;
  totalValue: string;
  probability: number;
  stage: string;
}

// Sample data for development/demo
const sampleLeads: Lead[] = [
  {
    leadNumber: "LEAD-301",
    companyName: "Future Tech LLC",
    contactName: "John Smith",
    interestedSku: "SKU-12345",
    estimatedValue: "15,000.00",
    status: "new"
  },
  {
    leadNumber: "LEAD-302",
    companyName: "Innovation Labs",
    contactName: "Sarah Johnson",
    interestedSku: "SKU-34567",
    estimatedValue: "28,500.00",
    status: "contacted"
  },
];

const sampleOpportunities: Opportunity[] = [
  {
    opportunityNumber: "OPP-401",
    companyName: "Enterprise Solutions",
    sku: "SKU-23456",
    quantity: 300,
    totalValue: "9,750.00",
    probability: 75,
    stage: "negotiation"
  },
  {
    opportunityNumber: "OPP-402",
    companyName: "MegaCorp Industries",
    sku: "SKU-12345",
    quantity: 500,
    totalValue: "22,995.00",
    probability: 60,
    stage: "proposal"
  },
];

export const leadsService = {
  async getLeads(): Promise<Lead[]> {
    // TODO: Replace with actual API call
    const response = await apiClient.get<Lead[]>(apiConfig.ENDPOINTS.LEADS);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    // Fallback to sample data if API is not available
    console.warn('Using sample leads data - API not available');
    return sampleLeads;
  },

  async getOpportunities(): Promise<Opportunity[]> {
    // TODO: Replace with actual API call
    const response = await apiClient.get<Opportunity[]>(apiConfig.ENDPOINTS.OPPORTUNITIES);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    // Fallback to sample data if API is not available
    console.warn('Using sample opportunities data - API not available');
    return sampleOpportunities;
  }
};
