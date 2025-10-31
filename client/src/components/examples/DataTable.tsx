import { DataTable } from "../DataTable";
import { StatusBadge } from "../StatusBadge";

export default function DataTableExample() {
  const mockData = [
    { sku: "SKU-001", product: "Widget A", quantity: 150, cost: "$12.50", status: "shipped" },
    { sku: "SKU-002", product: "Widget B", quantity: 89, cost: "$24.99", status: "pending" },
    { sku: "SKU-003", product: "Widget C", quantity: 234, cost: "$8.75", status: "delivered" },
  ];

  const columns = [
    { key: "sku", label: "SKU", sortable: true, filterable: true },
    { key: "product", label: "Product", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true },
    { key: "cost", label: "Cost", sortable: true },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value: string) => <StatusBadge status={value} />
    },
  ];

  return (
    <div className="p-8">
      <DataTable 
        data={mockData} 
        columns={columns}
        onRowClick={(row) => console.log("Row clicked:", row)}
      />
    </div>
  );
}
