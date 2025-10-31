import { CostAnalysisChart } from "../CostAnalysisChart";

export default function CostAnalysisChartExample() {
  const mockData = [
    { month: "Jan", inventoryValue: 2100000, purchaseOrders: 450000, sales: 680000 },
    { month: "Feb", inventoryValue: 2250000, purchaseOrders: 520000, sales: 720000 },
    { month: "Mar", inventoryValue: 2180000, purchaseOrders: 480000, sales: 850000 },
    { month: "Apr", inventoryValue: 2400000, purchaseOrders: 610000, sales: 920000 },
    { month: "May", inventoryValue: 2350000, purchaseOrders: 550000, sales: 880000 },
    { month: "Jun", inventoryValue: 2500000, purchaseOrders: 670000, sales: 1020000 },
  ];

  return (
    <div className="p-8">
      <CostAnalysisChart data={mockData} />
    </div>
  );
}
