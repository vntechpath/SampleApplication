import { InventoryChart } from "../InventoryChart";

export default function InventoryChartExample() {
  const mockData = [
    { category: "Electronics", onHand: 450, reserved: 120, available: 330 },
    { category: "Hardware", onHand: 380, reserved: 85, available: 295 },
    { category: "Software", onHand: 220, reserved: 45, available: 175 },
    { category: "Accessories", onHand: 560, reserved: 180, available: 380 },
  ];

  return (
    <div className="p-8">
      <InventoryChart data={mockData} />
    </div>
  );
}
