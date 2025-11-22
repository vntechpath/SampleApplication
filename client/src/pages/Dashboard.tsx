import { useState } from "react";
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
import { detailsService } from "@/services/detailsService";

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
  const [detailsModal, setDetailsModal] = useState<{ isOpen: boolean; title: string; data: any; viewType?: 'default' | 'warehouse-table' | 'inventory-grid' }>({
    isOpen: false,
    title: '',
    data: {},
    viewType: 'default'
  });

  // Individual loading states for each grid
  const [isLoadingWarehouse, setIsLoadingWarehouse] = useState(false);
  const [isLoadingInventory, setIsLoadingInventory] = useState(false);
  const [isLoadingAlternatives, setIsLoadingAlternatives] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingPOs, setIsLoadingPOs] = useState(false);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [isLoadingOpportunities, setIsLoadingOpportunities] = useState(false);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

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

  const handleSkuSearch = async (query: string) => {
    try {
      setIsSearchLoading(true);
      setHasSearched(true);
      
      // Set all loading states
      setIsLoadingWarehouse(true);
      setIsLoadingInventory(true);
      setIsLoadingAlternatives(true);
      setIsLoadingOrders(true);
      setIsLoadingPOs(true);
      setIsLoadingLeads(true);
      setIsLoadingOpportunities(true);
      setIsLoadingAnalytics(true);

      // Load warehouse data immediately (0ms)
      warehouseService.getWarehouseStock().then(data => {
        setMockWarehouseStock(data);
        setIsLoadingWarehouse(false);
      });

      // Load inventory + search results (with 1s visual delay)
      setTimeout(async () => {
        try {
          const [inventoryData, results] = await Promise.all([
            inventoryService.getInventoryItems(),
            searchService.searchInventory(query)
          ]);
          setMockInventoryData(inventoryData);
          setSearchResults(results);
        } finally {
          setIsLoadingInventory(false);
        }
      }, 1000);

      // Load alternatives (with 2s visual delay)
      setTimeout(async () => {
        try {
          const altData = await inventoryService.getAlternativeSkus();
          setMockAlternativeSkus(altData);
        } finally {
          setIsLoadingAlternatives(false);
        }
      }, 2000);

      // Load open orders (with 3s visual delay)
      setTimeout(async () => {
        try {
          const ordersData = await ordersService.getOpenOrders();
          setMockOpenOrders(ordersData);
        } finally {
          setIsLoadingOrders(false);
        }
      }, 3000);

      // Load purchase orders (with 4s visual delay)
      setTimeout(async () => {
        try {
          const poData = await ordersService.getPurchaseOrders();
          setMockPurchaseOrders(poData);
        } finally {
          setIsLoadingPOs(false);
        }
      }, 4000);

      // Load leads (with 5s visual delay)
      setTimeout(async () => {
        try {
          const leadsData = await leadsService.getLeads();
          setMockLeads(leadsData);
        } finally {
          setIsLoadingLeads(false);
        }
      }, 5000);

      // Load opportunities (with 6s visual delay)
      setTimeout(async () => {
        try {
          const oppsData = await leadsService.getOpportunities();
          setMockOpportunities(oppsData);
        } finally {
          setIsLoadingOpportunities(false);
        }
      }, 6000);

      // Load analytics (with 7s visual delay)
      setTimeout(async () => {
        try {
          const [invChart, costChart] = await Promise.all([
            analyticsService.getInventoryChartData(),
            analyticsService.getCostAnalysisData()
          ]);
          setInventoryChartData(invChart);
          setCostAnalysisData(costChart);
        } finally {
          setIsLoadingAnalytics(false);
        }
      }, 7000);
    } finally {
      setIsSearchLoading(false);
    }
  };

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

  const handleViewDetails = async (row: any, title: string, type: 'warehouse' | 'inventory' = 'warehouse') => {
    try {
      let data;
      let viewType: 'default' | 'warehouse-table' | 'inventory-grid' = 'default';

      if (type === 'warehouse') {
        data = await detailsService.getWarehouseDetails(row.warehouseName);
        viewType = 'warehouse-table';
      } else if (type === 'inventory') {
        data = await detailsService.getInventoryDetails(row.sku);
        viewType = 'inventory-grid';
      } else {
        data = row;
      }

      setDetailsModal({
        isOpen: true,
        title,
        data,
        viewType
      });
    } catch (error) {
      console.error('Error loading details:', error);
      setDetailsModal({
        isOpen: true,
        title,
        data: row,
        viewType: 'default'
      });
    }
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

  // Calculate metrics from search results
  const totalSkusCount = searchResults.length;
  const totalValueAmount = searchResults.reduce((sum, item) => {
    const value = parseFloat(item.totalValue.replace(/,/g, ''));
    return sum + value;
  }, 0);
  const openOrdersCount = mockOpenOrders.length;
  const lowStockCount = searchResults.filter(item => item.quantityOnHand < 100).length;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      <SkuSearchInput 
        value={searchValue} 
        onChange={setSearchValue}
        onSearch={handleSkuSearch}
        isLoading={isSearchLoading}
      />

      {hasSearched && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4">
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                label="Total SKUs"
                value={totalSkusCount.toString()}
                icon={Package}
                trend={{ value: "12%", isPositive: true }}
              />
              <MetricCard
                label="Total Value"
                value={`$${(totalValueAmount / 1000000).toFixed(1)}M`}
                icon={DollarSign}
                trend={{ value: "8%", isPositive: true }}
              />
              <MetricCard
                label="Open Orders"
                value={openOrdersCount.toString()}
                icon={TrendingUp}
              />
              <MetricCard
                label="Low Stock"
                value={lowStockCount.toString()}
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
                    <div 
                      key={idx} 
                      className="p-2 border rounded-md hover-elevate text-xs cursor-pointer"
                      onClick={() => {
                        setSearchValue(alt.alternativeSku);
                        setTimeout(() => {
                          handleSkuSearch(alt.alternativeSku);
                        }, 0);
                      }}
                      data-testid={`alt-sku-${idx}`}
                    >
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

          <div className="flex gap-2 border-b overflow-x-auto">
            <Button
              variant={selectedMenu === 'warehouse' ? 'default' : 'ghost'}
              onClick={() => setSelectedMenu('warehouse')}
              data-testid="menu-warehouse"
              className="rounded-b-none whitespace-nowrap"
            >
              Warehouse Stock
            </Button>
            <Button
              variant={selectedMenu === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setSelectedMenu('dashboard')}
              data-testid="menu-dashboard"
              className="rounded-b-none whitespace-nowrap"
            >
              Dashboard
            </Button>
            <Button
              variant={selectedMenu === 'inventory' ? 'default' : 'ghost'}
              onClick={() => setSelectedMenu('inventory')}
              data-testid="menu-inventory"
              className="rounded-b-none whitespace-nowrap"
            >
              Inventory
            </Button>
            <Button
              variant={selectedMenu === 'orders' ? 'default' : 'ghost'}
              onClick={() => setSelectedMenu('orders')}
              data-testid="menu-open-orders"
              className="rounded-b-none whitespace-nowrap"
            >
              Open Orders
            </Button>
            <Button
              variant={selectedMenu === 'po' ? 'default' : 'ghost'}
              onClick={() => setSelectedMenu('po')}
              data-testid="menu-purchase-orders"
              className="rounded-b-none whitespace-nowrap"
            >
              Purchase Orders
            </Button>
            <Button
              variant={selectedMenu === 'leads' ? 'default' : 'ghost'}
              onClick={() => setSelectedMenu('leads')}
              data-testid="menu-leads"
              className="rounded-b-none whitespace-nowrap"
            >
              Leads
            </Button>
            <Button
              variant={selectedMenu === 'opportunities' ? 'default' : 'ghost'}
              onClick={() => setSelectedMenu('opportunities')}
              data-testid="menu-opportunities"
              className="rounded-b-none whitespace-nowrap"
            >
              Opportunities
            </Button>
            <Button
              variant={selectedMenu === 'analytics' ? 'default' : 'ghost'}
              onClick={() => setSelectedMenu('analytics')}
              data-testid="menu-analytics"
              className="rounded-b-none whitespace-nowrap"
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
                  onViewDetails={(row) => handleViewDetails(row, `Warehouse Details: ${row.warehouseName}`, 'warehouse')}
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
                  data={searchResults}
                  columns={inventoryColumns}
                  onViewDetails={(row) => handleViewDetails(row, `Inventory Details: ${row.sku}`, 'inventory')}
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
        </>
      )}

      {!hasSearched && (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Search to Get Started</h2>
            <p className="text-muted-foreground">Enter a SKU, product name, or category in the search box and press Enter to view inventory data</p>
          </div>
        </div>
      )}

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
        onClose={() => setDetailsModal({ isOpen: false, title: '', data: {}, viewType: 'default' })}
        title={detailsModal.title}
        data={detailsModal.data}
        viewType={detailsModal.viewType}
      />
    </div>
  );
}
