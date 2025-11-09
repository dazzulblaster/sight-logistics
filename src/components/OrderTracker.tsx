import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, Package, FileText, CheckCircle2, Truck, Clock } from "lucide-react";

const OrderTracker = () => {
  const salesOrders = [
    { id: "SO-2401", customer: "Tech Corp A", items: 3, status: "shipped", value: "$12,450", date: "2025-01-10", backorder: false },
    { id: "SO-2402", customer: "Retailer B", items: 5, status: "packed", value: "$8,200", date: "2025-01-11", backorder: true },
    { id: "SO-2403", customer: "Distributor C", items: 2, status: "confirmed", value: "$5,680", date: "2025-01-12", backorder: false },
    { id: "SO-2404", customer: "Local Shop D", items: 1, status: "draft", value: "$1,250", date: "2025-01-13", backorder: false },
  ];

  const purchaseOrders = [
    { id: "PO-8470", supplier: "Acme Corp", items: 200, status: "received", value: "$24,500", date: "2025-01-08", expectedDate: "2025-01-10" },
    { id: "PO-8471", supplier: "FastTech Suppliers", items: 150, status: "shipped", value: "$18,750", date: "2025-01-09", expectedDate: "2025-01-15" },
    { id: "PO-8472", supplier: "Global Supply Co", items: 180, status: "confirmed", value: "$21,600", date: "2025-01-10", expectedDate: "2025-01-28" },
    { id: "PO-8473", supplier: "Budget Parts Ltd", items: 120, status: "draft", value: "$9,840", date: "2025-01-13", expectedDate: "2025-02-05" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft": return Clock;
      case "confirmed": return FileText;
      case "packed": return Package;
      case "shipped": return Truck;
      case "received": return CheckCircle2;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "outline";
      case "confirmed": return "secondary";
      case "packed": return "default";
      case "shipped": return "default";
      case "received": return "default";
      default: return "outline";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Order Tracker</h3>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="sales">Sales Orders</TabsTrigger>
          <TabsTrigger value="purchase">Purchase Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="mt-0">
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Items</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{order.id}</p>
                          {order.backorder && (
                            <Badge variant="destructive" className="text-xs">Backorder</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{order.customer}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <StatusIcon className="h-4 w-4 text-muted-foreground" />
                          <Badge variant={getStatusColor(order.status) as any} className="text-xs capitalize">
                            {order.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">{order.items}</TableCell>
                      <TableCell className="text-right font-medium text-foreground">{order.value}</TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">{order.date}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="purchase" className="mt-0">
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO ID</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Items</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Expected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-foreground">{order.id}</TableCell>
                      <TableCell className="text-muted-foreground">{order.supplier}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <StatusIcon className="h-4 w-4 text-muted-foreground" />
                          <Badge variant={getStatusColor(order.status) as any} className="text-xs capitalize">
                            {order.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">{order.items}</TableCell>
                      <TableCell className="text-right font-medium text-foreground">{order.value}</TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">{order.expectedDate}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Status Flow:</span> Draft → Confirmed → Packed → Shipped / Received. 
          Backorder flags show when allocation is incomplete.
        </p>
      </div>
    </Card>
  );
};

export default OrderTracker;
