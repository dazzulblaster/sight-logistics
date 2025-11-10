import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, Eye } from "lucide-react";
import { format } from "date-fns";

const mockPOHistory = [
  { id: "PO-001", supplier: "ABC Suppliers", date: "2024-01-15", amount: 15000, status: "Received", items: 5 },
  { id: "PO-002", supplier: "XYZ Trading", date: "2024-01-20", amount: 8500, status: "Shipped", items: 3 },
  { id: "PO-003", supplier: "Global Parts", date: "2024-01-25", amount: 22000, status: "Confirmed", items: 8 },
  { id: "PO-004", supplier: "ABC Suppliers", date: "2024-02-01", amount: 12000, status: "Draft", items: 4 },
  { id: "PO-005", supplier: "Local Vendor", date: "2024-02-05", amount: 5500, status: "Received", items: 2 },
  { id: "PO-006", supplier: "XYZ Trading", date: "2024-02-10", amount: 18000, status: "Shipped", items: 6 },
  { id: "PO-007", supplier: "Global Parts", date: "2024-02-15", amount: 9200, status: "Confirmed", items: 3 },
  { id: "PO-008", supplier: "Premium Supply", date: "2024-02-20", amount: 31000, status: "Received", items: 10 },
];

const POHistory = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [supplierFilter, setSupplierFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  const suppliers = Array.from(new Set(mockPOHistory.map(po => po.supplier)));

  const filteredPOs = mockPOHistory.filter(po => {
    if (statusFilter !== "all" && po.status !== statusFilter) return false;
    if (supplierFilter !== "all" && po.supplier !== supplierFilter) return false;
    if (dateFrom && new Date(po.date) < dateFrom) return false;
    if (dateTo && new Date(po.date) > dateTo) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Received": return "default";
      case "Shipped": return "secondary";
      case "Confirmed": return "outline";
      case "Draft": return "outline";
      default: return "outline";
    }
  };

  const totalValue = filteredPOs.reduce((sum, po) => sum + po.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">Purchase Order History</h1>
          <p className="text-muted-foreground">View and filter all purchase orders</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter purchase orders by status, supplier, and date range</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Received">Received</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Supplier</label>
                <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Suppliers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Suppliers</SelectItem>
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Date From</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Date To</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setStatusFilter("all");
                  setSupplierFilter("all");
                  setDateFrom(undefined);
                  setDateTo(undefined);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Purchase Orders ({filteredPOs.length})</CardTitle>
                <CardDescription>Total Value: ${totalValue.toLocaleString()}</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO #</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPOs.map((po) => (
                  <TableRow key={po.id}>
                    <TableCell className="font-medium">{po.id}</TableCell>
                    <TableCell>{po.supplier}</TableCell>
                    <TableCell>{format(new Date(po.date), "PPP")}</TableCell>
                    <TableCell>{po.items}</TableCell>
                    <TableCell>${po.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(po.status)}>{po.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default POHistory;
