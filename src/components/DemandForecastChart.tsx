import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from "recharts";

const DemandForecastChart = () => {
  const forecastData = [
    { week: "Week 1", actual: 450, forecast: 440, upper: 480, lower: 400 },
    { week: "Week 2", actual: 520, forecast: 510, upper: 560, lower: 460 },
    { week: "Week 3", actual: 480, forecast: 490, upper: 530, lower: 450 },
    { week: "Week 4", actual: 550, forecast: 540, upper: 590, lower: 490 },
    { week: "Week 5", actual: null, forecast: 580, upper: 640, lower: 520 },
    { week: "Week 6", actual: null, forecast: 610, upper: 680, lower: 540 },
    { week: "Week 7", actual: null, forecast: 590, upper: 660, lower: 520 },
    { week: "Week 8", actual: null, forecast: 620, upper: 690, lower: 550 },
  ];

  const topSKUs = [
    { sku: "SKU-1024", name: "Widget Pro X", forecast: 620, confidence: 87, trend: "up" },
    { sku: "SKU-2048", name: "Connector Elite", forecast: 450, confidence: 92, trend: "stable" },
    { sku: "SKU-5120", name: "Premium Housing", forecast: 380, confidence: 78, trend: "up" },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-secondary" />
          <h3 className="text-lg font-semibold">Demand Forecasting</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-3 w-3" />
            Ramadan Mode
          </Button>
          <Badge variant="secondary" className="text-xs">28-Day MA</Badge>
        </div>
      </div>

      <div className="mb-6">
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="week" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="hsl(var(--secondary))"
              fillOpacity={0.2}
              name="Upper Confidence"
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="hsl(var(--secondary))"
              fillOpacity={0.2}
              name="Lower Confidence"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              name="Actual Demand"
              dot={{ fill: 'hsl(var(--primary))', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Forecast"
              dot={{ fill: 'hsl(var(--secondary))', r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Top SKU Forecasts - Next Week</h4>
        {topSKUs.map((sku) => (
          <div key={sku.sku} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
            <div>
              <p className="font-medium text-foreground">{sku.sku}</p>
              <p className="text-sm text-muted-foreground">{sku.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{sku.forecast}</p>
                <p className="text-xs text-muted-foreground">units forecast</p>
              </div>
              <Badge variant={sku.confidence > 85 ? "default" : "secondary"} className="text-xs">
                {sku.confidence}% confidence
              </Badge>
              {sku.trend === "up" && (
                <TrendingUp className="h-4 w-4 text-success" />
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DemandForecastChart;
