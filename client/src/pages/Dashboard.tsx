import { useState, useEffect } from "react";
import { Package, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { SkuSearchInput } from "@/components/SkuSearchInput";
import { MetricCard } from "@/components/MetricCard";
import { DataTableWithContext, Column } from "@/components/DataTableWithContext";
import { InventoryChart } from "@/components/InventoryChart";
import { CostAnalysisChart } from "@/components/CostAnalysisChart";
import { SkuDetailModal } from "@/components/SkuDetailModal";
import { DetailsModal } from "@/components/DetailsModal";
import { DataLoader } from "@/components/DataLoader";
import { StatusBadge } from "@/components/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { warehouseService } from "@/services/warehouseService";
import { inventoryService } from "@/services/inventoryService";
import { ordersService } from "@/services/ordersService";
import { leadsService } from "@/services/leadsService";
import { analyticsService } from "@/services/analyticsService";
import { searchService } from "@/services/searchService";

type MenuOption = 'warehouse' | 'dashboard' | 'inventory' | 'orders' | 'po' | 'leads' | 'opportunities' | 'analytics';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function Dashboard() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuOption>('warehouse');
  const [selectedSku, setSelectedSku] = useState<string | null>(null);
  const [isSkuModalOpen, setIsSkuModalOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState<{ isOpen: boolean; title: string; data: any }>({
    isOpen: false,
    title: '',
    data: {}
  });

  // Individual loading states for each grid
  const [isLoadingWarehouse, setIsLoadingWarehouse] = useState(true);
  const [isLoadingInventory, setIsLoadingInventory] = useState(true);
  const [isLoadingAlternatives, setIsLoadingAlternatives] = useState(true);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [isLoadingPOs, setIsLoadingPOs] = useState(true);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const [isLoadingOpportunities, setIsLoadingOpportunities] = useState(true);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);

  // Service data states
  const [mockWarehouseStock, setMockWarehouseStock] = useState<any[]>([]);
  const [mockInventoryData, setMockInventoryData] = useState<any[]>([]);
  const [mockAlternativeSkus, setMockAlternativeSkus] = useState<any[]>([]);
  const [mockOpenOrders, setMockOpenOrders] = useState<any[]>([]);
  const [mockPurchaseOrders, setMockPurchaseOrders] = useState<any[]>([]);
  const [mockLeads, setMockLeads] = useState<any[]>([]);
  const [mockOpportunities, setMockOpportunities] = useState<any[]>([]);
  const [inventoryChartData, setInventoryChartData] = useState<any[]>([]);
  const [costAnalysisData, setCostAnalysisData] = useState<any[]>([]);

  // Load warehouse data (0ms delay)
  useEffect(() => {
    const loadWarehouseData = async () => {
      try {
        const data = await warehouseService.getWarehouseStock();
        setMockWarehouseStock(data);
      } finally {
        setIsLoadingWarehouse(false);
      }
    };
    loadWarehouseData();
  }, []);

  // Load inventory data (incremental delay 1000ms)
  useEffect(() => {
    const loadInventoryData = async () => {
      try {
        await delay(1000);
        const data = await inventoryService.getInventoryItems();
        setMockInventoryData(data);
      } finally {
        setIsLoadingInventory(false);
      }
    };
    loadInventoryData();
  }, []);

  // Load alternative skus (incremental delay 2000ms)
  useEffect(() => {
    const loadAlternativeData = async () => {
      try {
        await delay(2000);
        const data = await inventoryService.getAlternativeSkus();
        setMockAlternativeSkus(data);
      } finally {
        setIsLoadingAlternatives(false);
      }
    };
    loadAlternativeData();
  }, []);

  // Load open orders (incremental delay 3000ms)
  useEffect(() => {
    const loadOrdersData = async () => {
      try {
        await delay(3000);
        const data = await ordersService.getOpenOrders();
        setMockOpenOrders(data);
      } finally {
        setIsLoadingOrders(false);
      }
    };
    loadOrdersData();
  }, []);

  // Load purchase orders (incremental delay 4000ms)
  useEffect(() => {
    const loadPOData = async () => {
      try {
        await delay(4000);
        const data = await ordersService.getPurchaseOrders();
        setMockPurchaseOrders(data);
      } finally {
        setIsLoadingPOs(false);
      }
    };
    loadPOData();
  }, []);

  // Load leads (incremental delay 5000ms)
  useEffect(() => {
    const loadLeadsData = async () => {
      try {
        await delay(5000);
        const data = await leadsService.getLeads();
        setMockLeads(data);
      } finally {
        setIsLoadingLeads(false);
      }
    };
    loadLeadsData();
  }, []);

  // Load opportunities (incremental delay 6000ms)
  useEffect(() => {
    const loadOpportunitiesData = async () => {
      try {
        await delay(6000);
        const data = await leadsService.getOpportunities();
        setMockOpportunities(data);
      } finally {
        setIsLoadingOpportunities(false);
      }
    };
    loadOpportunitiesData();
  }, []);

  // Load analytics (incremental delay 7000ms)
  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        await delay(7000);
        const [invChart, costChart] = await Promise.all([
          analyticsService.getInventoryChartData(),
          analyticsService.getCostAnalysisData()
        ]);
        setInventoryChartData(invChart);
        setCostAnalysisData(costChart);
      } finally {
        setIsLoadingAnalytics(false);
      }
    };
    loadAnalyticsData();
  }, []);

  const warehouseColumns: Column<any>[] = [
    { key: "warehouseName", label: "Warehouse", sortable: true },
    { key: "location", label: "Location", sortable: true },
    { key: "totalSKUs", label: "Total SKUs", sortable: true },
    { key: "totalQuantity", label: "Total Quantity", sortable: true },
    { key: "totalValue", label: "Total Value", sortable: true },
    { key: "capacity", label: "Capacity", sortable: true },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value: string) => <StatusBadge status={value} />
    },
    { key: "manager", label: "Manager", sortable: true },
  ];

  const inventoryColumns: Column<any>[] = [
    { key: "sku", label: "SKU", sortable: true, filterable: true },
    { key: "productName", label: "Product Name", sortable: true },
    { key: "category", label: "Category", sortable: true, filterable: true },
    { key: "quantityOnHand", label: "On Hand", sortable: true },
    { key: "quantityAvailable", label: "Available", sortable: true },
    { key: "unitCost", label: "Unit Cost", sortable: true, render: (value) => `$${value}` },
    { key: "totalValue", label: "Total Value", sortable: true, render: (value) => `$${value}` },
  ];

  const orderColumns: Column<any>[] = [
    { key: "orderNumber", label: "Order #", sortable: true },
    { key: "sku", label: "SKU", sortable: true },
    { key: "customerName", label: "Customer", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true },
    { key: "totalAmount", label: "Amount", sortable: true, render: (value) => `$${value}` },
    { key: "orderDate", label: "Order Date", sortable: true },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value: string) => <StatusBadge status={value} />
    },
  ];

  const poColumns: Column<any>[] = [
    { key: "poNumber", label: "PO #", sortable: true },
    { key: "sku", label: "SKU", sortable: true },
    { key: "supplier", label: "Supplier", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true },
    { key: "totalCost", label: "Total Cost", sortable: true, render: (value) => `$${value}` },
    { key: "orderDate", label: "Order Date", sortable: true },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value: string) => <StatusBadge status={value} />
    },
  ];

  const leadColumns: Column<any>[] = [
    { key: "leadNumber", label: "Lead #", sortable: true },
    { key: "companyName", label: "Company", sortable: true },
    { key: "contactName", label: "Contact", sortable: true },
    { key: "interestedSku", label: "SKU", sortable: true },
    { key: "estimatedValue", label: "Est. Value", sortable: true, render: (value) => `$${value}` },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value: string) => <StatusBadge status={value} />
    },
  ];

  const opportunityColumns: Column<any>[] = [
    { key: "opportunityNumber", label: "Opportunity #", sortable: true },
    { key: "companyName", label: "Company", sortable: true },
    { key: "sku", label: "SKU", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true },
    { key: "totalValue", label: "Total Value", sortable: true, render: (value) => `$${value}` },
    { key: "probability", label: "Probability", sortable: true, render: (value) => `${value}%` },
    { 
      key: "stage", 
      label: "Stage", 
      sortable: true,
      render: (value: string) => <StatusBadge status={value} />
    },
  ];

  const handleSkuSearch = async (query: string) => {
    try {
      setIsSearchLoading(true);
      const results = await searchService.searchInventory(query);
      setSearchResults(results);
      setHasSearched(true);
      setSelectedMenu('inventory');
    } finally {
      setIsSearchLoading(false);
    }
  };

  const filteredInventory = hasSearched && searchResults.length > 0 ? searchResults : mockInventoryData.filter(item => 
    searchValue === "" || 
    item.sku.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.productName.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.category.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleViewDetails = (row: any, title: string) => {
    setDetailsModal({
      isOpen: true,
      title,
      data: row
    });
  };

  const handleInventoryDetails = (row: any) => {
    setSelectedSku(row.sku);
    setIsSkuModalOpen(true);
  };

  const getSkuData = (sku: string) => {
    const inventory = mockInventoryData.find(item => item.sku === sku);
    return {
      inventory,
      alternatives: mockAlternativeSkus.filter(alt => alt.primarySku === sku),
      openOrders: mockOpenOrders.filter(order => order.sku === sku),
      purchaseOrders: mockPurchaseOrders.filter(po => po.sku === sku),
      opportunities: mockOpportunities.filter(opp => opp.sku === sku),
    };
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      <SkuSearchInput 
        value={searchValue} 
        onChange={setSearchValue}
        onSearch={handleSkuSearch}
        isLoading={isSearchLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4">
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="Total SKUs"
            value="1,247"
            icon={Package}
            trend={{ value: "12%", isPositive: true }}
          />
          <MetricCard
            label="Total Value"
            value="$2.5M"
            icon={DollarSign}
            trend={{ value: "8%", isPositive: true }}
          />
          <MetricCard
            label="Open Orders"
            value="342"
            icon={TrendingUp}
          />
          <MetricCard
            label="Low Stock"
            value="23"
            icon={AlertTriangle}
            trend={{ value: "5%", isPositive: false }}
          />
        </div>

        <Card className="p-4">
          <h3 className="text-xs font-medium uppercase text-muted-foreground mb-3">Alternative SKUs</h3>
          {isLoadingAlternatives ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <div className="inline-block animate-spin">
                  <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Loading...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 max-h-[140px] overflow-y-auto">
              {mockAlternativeSkus.map((alt, idx) => (
                <div key={idx} className="p-2 border rounded-md hover-elevate text-xs">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono font-semibold truncate">{alt.alternativeSku}</p>
                      <p className="text-muted-foreground truncate">{alt.description}</p>
                    </div>
                    <p className="font-mono text-xs whitespace-nowrap">×{alt.conversionRatio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="flex gap-2 border-b">
        <Button
          variant={selectedMenu === 'warehouse' ? 'default' : 'ghost'}
          onClick={() => setSelectedMenu('warehouse')}
          data-testid="menu-warehouse"
          className="rounded-b-none"
        >
          Warehouse Stock
        </Button>
        <Button
          variant={selectedMenu === 'dashboard' ? 'default' : 'ghost'}
          onClick={() => setSelectedMenu('dashboard')}
          data-testid="menu-dashboard"
          className="rounded-b-none"
        >
          Dashboard
        </Button>
        <Button
          variant={selectedMenu === 'inventory' ? 'default' : 'ghost'}
          onClick={() => setSelectedMenu('inventory')}
          data-testid="menu-inventory"
          className="rounded-b-none"
        >
          Inventory
        </Button>
        <Button
          variant={selectedMenu === 'orders' ? 'default' : 'ghost'}
          onClick={() => setSelectedMenu('orders')}
          data-testid="menu-open-orders"
          className="rounded-b-none"
        >
          Open Orders
        </Button>
        <Button
          variant={selectedMenu === 'po' ? 'default' : 'ghost'}
          onClick={() => setSelectedMenu('po')}
          data-testid="menu-purchase-orders"
          className="rounded-b-none"
        >
          Purchase Orders
        </Button>
        <Button
          variant={selectedMenu === 'leads' ? 'default' : 'ghost'}
          onClick={() => setSelectedMenu('leads')}
          data-testid="menu-leads"
          className="rounded-b-none"
        >
          Leads
        </Button>
        <Button
          variant={selectedMenu === 'opportunities' ? 'default' : 'ghost'}
          onClick={() => setSelectedMenu('opportunities')}
          data-testid="menu-opportunities"
          className="rounded-b-none"
        >
          Opportunities
        </Button>
        <Button
          variant={selectedMenu === 'analytics' ? 'default' : 'ghost'}
          onClick={() => setSelectedMenu('analytics')}
          data-testid="menu-analytics"
          className="rounded-b-none"
        >
          Analytics
        </Button>
      </div>

      <div className="min-h-[calc(100vh-420px)]">
        {selectedMenu === 'warehouse' && (
          isLoadingWarehouse ? (
            <DataLoader message="Loading warehouse data..." />
          ) : (
            <DataTableWithContext
              data={mockWarehouseStock}
              columns={warehouseColumns}
              onViewDetails={(row) => handleViewDetails(row, `Warehouse Details: ${row.warehouseName}`)}
              onExportRow={(row, format) => console.log(`Exporting ${row.warehouseName} to ${format}`)}
              onOpenWebPage={(row) => window.open(`https://example.com/warehouse/${row.warehouseName}`, '_blank')}
            />
          )
        )}

        {selectedMenu === 'dashboard' && (
          isLoadingAnalytics ? (
            <DataLoader message="Loading analytics..." />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InventoryChart data={inventoryChartData} />
              <CostAnalysisChart data={costAnalysisData} />
            </div>
          )
        )}

        {selectedMenu === 'inventory' && (
          isLoadingInventory ? (
            <DataLoader message="Loading inventory..." />
          ) : (
            <DataTableWithContext
              data={filteredInventory}
              columns={inventoryColumns}
              onViewDetails={handleInventoryDetails}
              onExportRow={(row, format) => console.log(`Exporting ${row.sku} to ${format}`)}
              onOpenWebPage={(row) => window.open(`https://example.com/sku/${row.sku}`, '_blank')}
            />
          )
        )}

        {selectedMenu === 'orders' && (
          isLoadingOrders ? (
            <DataLoader message="Loading open orders..." />
          ) : (
            <DataTableWithContext
              data={mockOpenOrders}
              columns={orderColumns}
              onViewDetails={(row) => handleViewDetails(row, `Order Details: ${row.orderNumber}`)}
              onExportRow={(row, format) => console.log(`Exporting ${row.orderNumber} to ${format}`)}
              onOpenWebPage={(row) => window.open(`https://example.com/order/${row.orderNumber}`, '_blank')}
            />
          )
        )}

        {selectedMenu === 'po' && (
          isLoadingPOs ? (
            <DataLoader message="Loading purchase orders..." />
          ) : (
            <DataTableWithContext
              data={mockPurchaseOrders}
              columns={poColumns}
              onViewDetails={(row) => handleViewDetails(row, `Purchase Order Details: ${row.poNumber}`)}
              onExportRow={(row, format) => console.log(`Exporting ${row.poNumber} to ${format}`)}
              onOpenWebPage={(row) => window.open(`https://example.com/po/${row.poNumber}`, '_blank')}
            />
          )
        )}

        {selectedMenu === 'leads' && (
          isLoadingLeads ? (
            <DataLoader message="Loading leads..." />
          ) : (
            <DataTableWithContext
              data={mockLeads}
              columns={leadColumns}
              onViewDetails={(row) => handleViewDetails(row, `Lead Details: ${row.leadNumber}`)}
              onExportRow={(row, format) => console.log(`Exporting ${row.leadNumber} to ${format}`)}
              onOpenWebPage={(row) => window.open(`https://example.com/lead/${row.leadNumber}`, '_blank')}
            />
          )
        )}

        {selectedMenu === 'opportunities' && (
          isLoadingOpportunities ? (
            <DataLoader message="Loading opportunities..." />
          ) : (
            <DataTableWithContext
              data={mockOpportunities}
              columns={opportunityColumns}
              onViewDetails={(row) => handleViewDetails(row, `Opportunity Details: ${row.opportunityNumber}`)}
              onExportRow={(row, format) => console.log(`Exporting ${row.opportunityNumber} to ${format}`)}
              onOpenWebPage={(row) => window.open(`https://example.com/opportunity/${row.opportunityNumber}`, '_blank')}
            />
          )
        )}

        {selectedMenu === 'analytics' && (
          isLoadingAnalytics ? (
            <DataLoader message="Loading analytics..." />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InventoryChart data={inventoryChartData} />
              <CostAnalysisChart data={costAnalysisData} />
            </div>
          )
        )}
      </div>

      {selectedSku && (
        <SkuDetailModal
          isOpen={isSkuModalOpen}
          onClose={() => setIsSkuModalOpen(false)}
          sku={selectedSku}
          data={getSkuData(selectedSku)}
        />
      )}

      <DetailsModal
        isOpen={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false, title: '', data: {} })}
        title={detailsModal.title}
        data={detailsModal.data}
      />
    </div>
  );
}
