import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, TrendingDown, AlertTriangle } from "lucide-react";

const InventoryReorderPanel = () => {
  const reorderItems = [
    {
      sku: "SKU-1024",
      name: "Widget Pro X",
      currentStock: 45,
      safetyStock: 120,
      reorderQty: 200,
      targetDays: 30,
      atp: 25,
      status: "critical",
      leadTime: "14 days",
    },
    {
      sku: "SKU-2048",
      name: "Connector Elite",
      currentStock: 89,
      safetyStock: 150,
      reorderQty: 150,
      targetDays: 28,
      atp: 61,
      status: "low",
      leadTime: "10 days",
    },
    {
      sku: "SKU-3072",
      name: "Cable Assembly V2",
      currentStock: 34,
      safetyStock: 100,
      reorderQty: 180,
      targetDays: 35,
      atp: 14,
      status: "critical",
      leadTime: "21 days",
    },
    {
      sku: "SKU-4096",
      name: "Sensor Module",
      currentStock: 112,
      safetyStock: 180,
      reorderQty: 120,
      targetDays: 25,
      atp: 88,
      status: "low",
      leadTime: "12 days",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Low-Stock Reorder Suggestions</h3>
        </div>
        <Badge variant="destructive" className="text-xs">
          {reorderItems.filter(i => i.status === "critical").length} Critical
        </Badge>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU / Product</TableHead>
              <TableHead className="text-right">Current</TableHead>
              <TableHead className="text-right">Safety Stock</TableHead>
              <TableHead className="text-right">ATP</TableHead>
              <TableHead className="text-right">Reorder Qty</TableHead>
              <TableHead className="text-right">Lead Time</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reorderItems.map((item) => (
              <TableRow key={item.sku}>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{item.sku}</p>
                    <p className="text-sm text-muted-foreground">{item.name}</p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {item.status === "critical" && (
                      <AlertTriangle className="h-3 w-3 text-destructive" />
                    )}
                    <span className={item.status === "critical" ? "text-destructive font-medium" : ""}>
                      {item.currentStock}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {item.safetyStock}
                </TableCell>
                <TableCell className="text-right">
                  <span className={item.atp < 30 ? "text-warning font-medium" : "text-muted-foreground"}>
                    {item.atp}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium text-primary">
                  {item.reorderQty}
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {item.leadTime}
                </TableCell>
                <TableCell className="text-center">
                  <Button size="sm" className="gap-1">
                    <ShoppingCart className="h-3 w-3" />
                    Create PO
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
        <div className="flex items-start gap-2">
          <TrendingDown className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div className="text-sm">
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Formula:</span> Safety Stock = Service Level + Demand Variability + Lead Time | 
              Reorder Qty = Target Days Cover − ATP
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InventoryReorderPanel;
