import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface CostAnalysisChartProps {
  data: Array<{
    month: string;
    inventoryValue: number;
    purchaseOrders: number;
    sales: number;
  }>;
}

export function CostAnalysisChart({ data }: CostAnalysisChartProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Cost Analysis Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="month" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
              fontFamily: 'var(--font-mono)'
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="inventoryValue" stroke="hsl(var(--chart-1))" name="Inventory Value" strokeWidth={2} />
          <Line type="monotone" dataKey="purchaseOrders" stroke="hsl(var(--chart-4))" name="Purchase Orders" strokeWidth={2} />
          <Line type="monotone" dataKey="sales" stroke="hsl(var(--chart-2))" name="Sales" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
