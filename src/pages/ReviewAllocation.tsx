import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Layers, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ReviewAllocation = () => {
  const allocation = {
    sku: "SKU-1024",
    name: "Widget Pro X",
    available: 45,
    totalRequested: 75,
    orders: [
      { channel: "Premium", customer: "Tech Corp A", requested: 30, allocated: 30, priority: "high" },
      { channel: "Standard", customer: "Retailer B", requested: 25, allocated: 15, priority: "medium" },
      { channel: "Standard", customer: "Distributor C", requested: 20, allocated: 0, priority: "low" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-bold text-foreground">Review Allocation</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Review and confirm inventory allocation for constrained items
          </p>
        </div>

        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-foreground">{allocation.sku}</p>
                <Badge variant="outline" className="text-xs">Auto Priority</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{allocation.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg border border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Available</p>
                <p className="text-lg font-bold text-warning">{allocation.available}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Requested</p>
                <p className="text-lg font-bold text-foreground">{allocation.totalRequested}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Allocation Details</h2>
          
          {allocation.orders.map((order, idx) => {
            const backorder = order.requested - order.allocated;
            return (
              <Card key={idx} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.channel}</p>
                    </div>
                    <Badge
                      variant={
                        order.priority === "high" ? "default" :
                        order.priority === "medium" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {order.priority}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Requested</p>
                      <p className="text-sm font-medium text-foreground">{order.requested}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Allocated</p>
                      <div className="flex items-center justify-center gap-1">
                        <CheckCircle className="h-3 w-3 text-success" />
                        <p className="text-sm font-medium text-success">{order.allocated}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Backorder</p>
                      {backorder > 0 ? (
                        <div className="flex items-center justify-center gap-1">
                          <AlertCircle className="h-3 w-3 text-destructive" />
                          <p className="text-sm font-medium text-destructive">{backorder}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">-</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-4 bg-accent/10 border-accent/20">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Auto-allocation logic:</span> Prioritizes by channel tier (Premium → Standard) 
            and customer loyalty score. Remaining orders flagged as backorder.
          </p>
        </Card>

        <div className="flex flex-col gap-3 sticky bottom-4">
          <Button size="lg" className="w-full">
            Confirm & Process Allocation
          </Button>
          <Button variant="outline" size="lg" className="w-full">
            Adjust Manually
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ReviewAllocation;
