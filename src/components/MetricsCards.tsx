import { Card } from "@/components/ui/card";
import { Package, TrendingDown, DollarSign, AlertCircle } from "lucide-react";

const MetricsCards = () => {
  const metrics = [
    {
      title: "Total SKUs",
      value: "1,247",
      change: "+23 this month",
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Low Stock Items",
      value: "18",
      change: "Needs attention",
      icon: TrendingDown,
      color: "text-warning",
    },
    {
      title: "Inventory Value",
      value: "$2.4M",
      change: "+8.5%",
      icon: DollarSign,
      color: "text-success",
    },
    {
      title: "Active Alerts",
      value: "12",
      change: "5 critical",
      icon: AlertCircle,
      color: "text-destructive",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card
            key={metric.title}
            className="p-6 hover:shadow-lg transition-all duration-300"
            style={{ boxShadow: "var(--shadow-elevated)" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-foreground mb-2">{metric.value}</p>
                <p className="text-sm font-medium text-success">{metric.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-muted ${metric.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsCards;
