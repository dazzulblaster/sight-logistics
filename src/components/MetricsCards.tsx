import { Card } from "@/components/ui/card";
import { Package, TrendingUp, Clock, AlertCircle } from "lucide-react";

const MetricsCards = () => {
  const metrics = [
    {
      title: "Active Shipments",
      value: "127",
      change: "+12%",
      icon: Package,
      color: "text-primary",
    },
    {
      title: "On-Time Delivery",
      value: "94.2%",
      change: "+2.3%",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "Avg Transit Time",
      value: "3.4 days",
      change: "-0.5d",
      icon: Clock,
      color: "text-secondary",
    },
    {
      title: "Exceptions",
      value: "8",
      change: "-3",
      icon: AlertCircle,
      color: "text-warning",
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
