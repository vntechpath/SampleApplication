// Boilerplate service - Replace with external API calls
// TODO: Replace with actual API endpoint when backend is ready

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

export const leadsService = {
  async getLeads(): Promise<Lead[]> {
    // TODO: Replace with API call: return fetch(`${API_URL}/leads`).then(r => r.json())
    return [
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
  },

  async getOpportunities(): Promise<Opportunity[]> {
    // TODO: Replace with API call: return fetch(`${API_URL}/opportunities`).then(r => r.json())
    return [
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
  }
};
