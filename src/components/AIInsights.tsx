import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

const AIInsights = () => {
  const insights = [
    {
      type: "optimization",
      icon: TrendingUp,
      title: "Route Optimization Available",
      description: "AI suggests alternate route via Singapore, saving 2 days transit time.",
      impact: "High Impact",
      color: "text-success",
      badgeColor: "default",
    },
    {
      type: "alert",
      icon: AlertTriangle,
      title: "Weather Alert",
      description: "Tropical storm detected on current route. Consider rerouting shipment SH-4782.",
      impact: "Action Required",
      color: "text-warning",
      badgeColor: "destructive",
    },
    {
      type: "prediction",
      icon: Brain,
      title: "Demand Forecast",
      description: "15% increase in demand predicted for next quarter. Consider increasing inventory.",
      impact: "Medium Impact",
      color: "text-secondary",
      badgeColor: "secondary",
    },
    {
      type: "suggestion",
      icon: Lightbulb,
      title: "Cost Savings Opportunity",
      description: "Consolidating shipments SH-4801 and SH-4803 could reduce costs by $3,200.",
      impact: "High Impact",
      color: "text-primary",
      badgeColor: "default",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="h-5 w-5 text-secondary" />
        <h3 className="text-lg font-semibold">AI Insights & Recommendations</h3>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div
              key={index}
              className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-muted ${insight.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{insight.title}</p>
                    <Badge variant={insight.badgeColor as any} className="text-xs">
                      {insight.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AIInsights;
