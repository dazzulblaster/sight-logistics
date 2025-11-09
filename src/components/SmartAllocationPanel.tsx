import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Layers, AlertCircle } from "lucide-react";

const SmartAllocationPanel = () => {
  const allocations = [
    {
      sku: "SKU-1024",
      name: "Widget Pro X",
      available: 45,
      orders: [
        { channel: "Premium", customer: "Tech Corp A", requested: 30, allocated: 30, priority: "high" },
        { channel: "Standard", customer: "Retailer B", requested: 25, allocated: 15, priority: "medium" },
        { channel: "Standard", customer: "Distributor C", requested: 20, allocated: 0, priority: "low" },
      ],
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold">Smart Allocation</h3>
        </div>
        <Badge variant="outline" className="text-xs">Auto Priority</Badge>
      </div>

      {allocations.map((item) => (
        <div key={item.sku} className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">{item.sku} - {item.name}</p>
              <p className="text-sm text-muted-foreground">Available: <span className="font-medium text-warning">{item.available} units</span></p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Requested</p>
              <p className="text-lg font-bold text-foreground">
                {item.orders.reduce((sum, o) => sum + o.requested, 0)} units
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel / Customer</TableHead>
                  <TableHead className="text-center">Priority</TableHead>
                  <TableHead className="text-right">Requested</TableHead>
                  <TableHead className="text-right">Allocated</TableHead>
                  <TableHead className="text-right">Backorder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {item.orders.map((order, idx) => {
                  const backorder = order.requested - order.allocated;
                  return (
                    <TableRow key={idx}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.channel}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            order.priority === "high" ? "default" :
                            order.priority === "medium" ? "secondary" : "outline"
                          }
                          className="text-xs"
                        >
                          {order.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {order.requested}
                      </TableCell>
                      <TableCell className="text-right font-medium text-success">
                        {order.allocated}
                      </TableCell>
                      <TableCell className="text-right">
                        {backorder > 0 ? (
                          <div className="flex items-center justify-end gap-2">
                            <AlertCircle className="h-3 w-3 text-destructive" />
                            <span className="text-destructive font-medium">{backorder}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">Review Allocation</Button>
            <Button size="sm">Confirm & Process</Button>
          </div>
        </div>
      ))}

      <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Auto-allocation logic:</span> Prioritizes by channel tier (Premium → Standard) 
          and customer loyalty score. Remaining orders flagged as backorder.
        </p>
      </div>
    </Card>
  );
};

export default SmartAllocationPanel;
