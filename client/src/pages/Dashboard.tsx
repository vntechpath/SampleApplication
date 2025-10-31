import { useState } from "react";
import { Package, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { SkuSearchInput } from "@/components/SkuSearchInput";
import { MetricCard } from "@/components/MetricCard";
import { DataTable, Column } from "@/components/DataTable";
import { InventoryChart } from "@/components/InventoryChart";
import { CostAnalysisChart } from "@/components/CostAnalysisChart";
import { SkuDetailModal } from "@/components/SkuDetailModal";
import { StatusBadge } from "@/components/StatusBadge";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedSku, setSelectedSku] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // todo: remove mock functionality
  const mockInventoryData = [
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

  const mockAlternativeSkus = [
    { 
      primarySku: "SKU-12345", 
      alternativeSku: "SKU-12345-ALT", 
      description: "Standard variant of Premium Widget Pro",
      conversionRatio: "1.0"
    },
    { 
      primarySku: "SKU-12345", 
      alternativeSku: "SKU-12346", 
      description: "Deluxe variant with enhanced features",
      conversionRatio: "0.8"
    },
    { 
      primarySku: "SKU-23456", 
      alternativeSku: "SKU-23457", 
      description: "Budget version of Standard Gadget",
      conversionRatio: "1.2"
    },
    { 
      primarySku: "SKU-34567", 
      alternativeSku: "SKU-34568", 
      description: "Compact version",
      conversionRatio: "1.5"
    },
  ];

  const mockOpenOrders = [
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

  const mockPurchaseOrders = [
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

  const mockLeads = [
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

  const mockOpportunities = [
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

  const inventoryChartData = [
    { category: "Electronics", onHand: 606, reserved: 276, available: 428 },
    { category: "Hardware", onHand: 280, reserved: 70, available: 210 },
    { category: "Tools", onHand: 620, reserved: 40, available: 580 },
    { category: "Accessories", onHand: 89, reserved: 44, available: 45 },
  ];

  const costAnalysisData = [
    { month: "Jan", inventoryValue: 2100000, purchaseOrders: 450000, sales: 680000 },
    { month: "Feb", inventoryValue: 2250000, purchaseOrders: 520000, sales: 720000 },
    { month: "Mar", inventoryValue: 2180000, purchaseOrders: 480000, sales: 850000 },
    { month: "Apr", inventoryValue: 2400000, purchaseOrders: 610000, sales: 920000 },
    { month: "May", inventoryValue: 2350000, purchaseOrders: 550000, sales: 880000 },
    { month: "Jun", inventoryValue: 2500000, purchaseOrders: 670000, sales: 1020000 },
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

  const alternativeSkuColumns: Column<any>[] = [
    { key: "primarySku", label: "Primary SKU", sortable: true },
    { key: "alternativeSku", label: "Alternative SKU", sortable: true },
    { key: "description", label: "Description", sortable: true },
    { key: "conversionRatio", label: "Conversion Ratio", sortable: true },
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

  const filteredInventory = mockInventoryData.filter(item => 
    searchValue === "" || 
    item.sku.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.productName.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.category.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredAlternatives = mockAlternativeSkus.filter(item =>
    searchValue === "" ||
    item.primarySku.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.alternativeSku.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleRowClick = (row: any) => {
    setSelectedSku(row.sku);
    setIsModalOpen(true);
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
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold" data-testid="text-page-title">SKU Warehouse Management</h1>
        <p className="text-muted-foreground">
          Real-time inventory tracking, order management, and business analytics
        </p>
      </div>

      <div className="max-w-2xl">
        <SkuSearchInput value={searchValue} onChange={setSearchValue} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total SKUs"
          value="1,247"
          icon={Package}
          trend={{ value: "12% vs last month", isPositive: true }}
        />
        <MetricCard
          label="Total Value"
          value="$2.5M"
          icon={DollarSign}
          trend={{ value: "8% vs last month", isPositive: true }}
        />
        <MetricCard
          label="Open Orders"
          value="342"
          icon={TrendingUp}
        />
        <MetricCard
          label="Low Stock Items"
          value="23"
          icon={AlertTriangle}
          trend={{ value: "5% vs last week", isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InventoryChart data={inventoryChartData} />
        <CostAnalysisChart data={costAnalysisData} />
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold" data-testid="text-section-inventory">Inventory</h2>
        <DataTable
          data={filteredInventory}
          columns={inventoryColumns}
          onRowClick={handleRowClick}
          onExport={(format) => console.log(`Exporting inventory to ${format}`)}
        />
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold" data-testid="text-section-alternatives">Alternative SKUs</h2>
        <DataTable
          data={filteredAlternatives}
          columns={alternativeSkuColumns}
          onExport={(format) => console.log(`Exporting alternative SKUs to ${format}`)}
        />
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold" data-testid="text-section-open-orders">Open Orders</h2>
        <DataTable
          data={mockOpenOrders}
          columns={orderColumns}
          onExport={(format) => console.log(`Exporting orders to ${format}`)}
        />
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold" data-testid="text-section-purchase-orders">Purchase Orders</h2>
        <DataTable
          data={mockPurchaseOrders}
          columns={poColumns}
          onExport={(format) => console.log(`Exporting purchase orders to ${format}`)}
        />
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold" data-testid="text-section-leads">Leads</h2>
        <DataTable
          data={mockLeads}
          columns={leadColumns}
          onExport={(format) => console.log(`Exporting leads to ${format}`)}
        />
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold" data-testid="text-section-opportunities">Opportunities</h2>
        <DataTable
          data={mockOpportunities}
          columns={opportunityColumns}
          onExport={(format) => console.log(`Exporting opportunities to ${format}`)}
        />
      </Card>

      {selectedSku && (
        <SkuDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sku={selectedSku}
          data={getSkuData(selectedSku)}
        />
      )}
    </div>
  );
}
