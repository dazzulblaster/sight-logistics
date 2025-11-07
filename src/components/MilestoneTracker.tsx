import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const MilestoneTracker = () => {
  const milestones = [
    {
      status: "completed",
      title: "Order Placed",
      location: "Shanghai, China",
      timestamp: "Jan 15, 2025 10:30 AM",
    },
    {
      status: "completed",
      title: "Departed Port",
      location: "Shanghai Port",
      timestamp: "Jan 16, 2025 2:15 PM",
    },
    {
      status: "active",
      title: "In Transit",
      location: "Pacific Ocean",
      timestamp: "Expected: Jan 28, 2025",
    },
    {
      status: "pending",
      title: "Customs Clearance",
      location: "Los Angeles, USA",
      timestamp: "Expected: Jan 30, 2025",
    },
    {
      status: "pending",
      title: "Final Delivery",
      location: "Denver, CO",
      timestamp: "Expected: Feb 2, 2025",
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Shipment Milestones</h3>
      <div className="space-y-1">
        {milestones.map((milestone, index) => (
          <div key={index} className="flex items-start gap-4 relative pb-8 last:pb-0">
            {index < milestones.length - 1 && (
              <div className="absolute left-[13px] top-8 w-0.5 h-full bg-border" />
            )}
            
            <div className="relative z-10">
              {milestone.status === "completed" ? (
                <CheckCircle2 className="h-6 w-6 text-success" />
              ) : milestone.status === "active" ? (
                <Clock className="h-6 w-6 text-secondary animate-pulse" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 pt-0.5">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-foreground">{milestone.title}</p>
                {milestone.status === "active" && (
                  <Badge variant="secondary" className="text-xs">In Progress</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{milestone.location}</p>
              <p className="text-xs text-muted-foreground mt-1">{milestone.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MilestoneTracker;
