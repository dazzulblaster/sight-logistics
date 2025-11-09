import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, TrendingUp, Zap } from "lucide-react";

const ExceptionAlerts = () => {
  const alerts = [
    {
      type: "low_stock",
      icon: AlertTriangle,
      severity: "critical",
      title: "Critical Low Stock Alert",
      message: "SKU-1024 (Widget Pro X) has dropped below safety stock (45 < 120 units)",
      time: "5 min ago",
      action: "Create PO",
    },
    {
      type: "late_po",
      icon: Clock,
      severity: "high",
      title: "Late Purchase Order",
      message: "PO-8472 from Supplier Acme Corp is 3 days past promised delivery date",
      time: "2 hours ago",
      action: "Contact Supplier",
    },
    {
      type: "forecast_error",
      icon: TrendingUp,
      severity: "medium",
      title: "Forecast Error Spike",
      message: "SKU-2048 showing 35% deviation from forecast. Actual demand: 680, Forecast: 510",
      time: "4 hours ago",
      action: "Review Model",
    },
    {
      type: "demand_surge",
      icon: Zap,
      severity: "high",
      title: "Demand Surge Detected",
      message: "SKU-3072 experiencing 45% increase in orders over last 7 days",
      time: "1 day ago",
      action: "Increase Order",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "default";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h3 className="text-lg font-semibold">Exception Alerts</h3>
        </div>
        <Badge variant="destructive" className="text-xs animate-pulse">
          {alerts.filter(a => a.severity === "critical").length} Critical
        </Badge>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <div
              key={index}
              className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  alert.severity === "critical" ? "bg-destructive/10" :
                  alert.severity === "high" ? "bg-primary/10" : "bg-secondary/10"
                }`}>
                  <Icon className={`h-4 w-4 ${
                    alert.severity === "critical" ? "text-destructive" :
                    alert.severity === "high" ? "text-primary" : "text-secondary"
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getSeverityColor(alert.severity) as any} className="text-xs">
                      {alert.severity}
                    </Badge>
                    <p className="font-medium text-foreground">{alert.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      {alert.action}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Triggers:</span> Low stock threshold breach, 
          PO late vs promised date, forecast error &gt;30%, demand increase &gt;40% weekly
        </p>
      </div>
    </Card>
  );
};

export default ExceptionAlerts;
