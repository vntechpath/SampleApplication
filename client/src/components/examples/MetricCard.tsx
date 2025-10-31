import { MetricCard } from "../MetricCard";
import { Package, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

export default function MetricCardExample() {
  return (
    <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard
        label="Total SKUs"
        value="1,247"
        icon={Package}
        trend={{ value: "12% vs last month", isPositive: true }}
      />
      <MetricCard
        label="Total Value"
        value="$2.4M"
        icon={DollarSign}
        trend={{ value: "8% vs last month", isPositive: true }}
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
        trend={{ value: "5% vs last week", isPositive: false }}
      />
    </div>
  );
}
