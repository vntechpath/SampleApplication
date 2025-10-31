import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface InventoryChartProps {
  data: Array<{
    category: string;
    onHand: number;
    reserved: number;
    available: number;
  }>;
}

export function InventoryChart({ data }: InventoryChartProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Inventory by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="category" className="text-xs" />
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
          <Bar dataKey="onHand" fill="hsl(var(--chart-1))" name="On Hand" />
          <Bar dataKey="reserved" fill="hsl(var(--chart-3))" name="Reserved" />
          <Bar dataKey="available" fill="hsl(var(--chart-2))" name="Available" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
