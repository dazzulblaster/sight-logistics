import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Package, TrendingDown, TrendingUp } from "lucide-react";

const mockStocks = [
  { sku: "SKU-001", name: "Premium Widget A", category: "Electronics", currentStock: 450, reorderPoint: 200, maxStock: 1000, unit: "pcs", avgDemand: 80, status: "healthy" },
  { sku: "SKU-002", name: "Component B", category: "Parts", currentStock: 95, reorderPoint: 150, maxStock: 500, unit: "pcs", avgDemand: 45, status: "low" },
  { sku: "SKU-003", name: "Assembly C", category: "Finished Goods", currentStock: 15, reorderPoint: 50, maxStock: 300, unit: "units", avgDemand: 12, status: "critical" },
  { sku: "SKU-004", name: "Raw Material D", category: "Materials", currentStock: 2200, reorderPoint: 500, maxStock: 3000, unit: "kg", avgDemand: 150, status: "healthy" },
  { sku: "SKU-005", name: "Part E", category: "Parts", currentStock: 180, reorderPoint: 100, maxStock: 400, unit: "pcs", avgDemand: 25, status: "healthy" },
  { sku: "SKU-006", name: "Widget F", category: "Electronics", currentStock: 320, reorderPoint: 250, maxStock: 800, unit: "pcs", avgDemand: 60, status: "healthy" },
  { sku: "SKU-007", name: "Component G", category: "Parts", currentStock: 85, reorderPoint: 120, maxStock: 400, unit: "pcs", avgDemand: 35, status: "low" },
  { sku: "SKU-008", name: "Material H", category: "Materials", currentStock: 1500, reorderPoint: 800, maxStock: 2500, unit: "kg", avgDemand: 200, status: "healthy" },
];

const Stocks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const categories = Array.from(new Set(mockStocks.map(stock => stock.category)));

  const filteredStocks = mockStocks.filter(stock => {
    const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         stock.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || stock.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || stock.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical": return <Badge variant="destructive">Critical</Badge>;
      case "low": return <Badge variant="outline" className="border-orange-500 text-orange-500">Low</Badge>;
      case "healthy": return <Badge variant="default">Healthy</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const totalItems = filteredStocks.length;
  const criticalItems = filteredStocks.filter(s => s.status === "critical").length;
  const lowItems = filteredStocks.filter(s => s.status === "low").length;
  const totalValue = filteredStocks.reduce((sum, stock) => sum + stock.currentStock * 50, 0); // Mock pricing

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">Inventory Stocks</h1>
          <p className="text-muted-foreground">Monitor all stock levels and inventory status</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Items</CardDescription>
              <CardTitle className="text-3xl">{totalItems}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Package className="mr-2 h-4 w-4" />
                Active SKUs
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Critical Stock</CardDescription>
              <CardTitle className="text-3xl text-destructive">{criticalItems}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingDown className="mr-2 h-4 w-4 text-destructive" />
                Needs immediate attention
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Low Stock</CardDescription>
              <CardTitle className="text-3xl text-orange-500">{lowItems}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingDown className="mr-2 h-4 w-4 text-orange-500" />
                Below reorder point
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Value</CardDescription>
              <CardTitle className="text-3xl">${totalValue.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingUp className="mr-2 h-4 w-4" />
                Estimated inventory value
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Search and filter inventory items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
                <Input 
                  placeholder="Search by SKU or name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="healthy">Healthy</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setStatusFilter("all");
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
                <CardTitle>Stock Levels ({filteredStocks.length})</CardTitle>
                <CardDescription>Current inventory across all locations</CardDescription>
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
                  <TableHead>SKU</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Reorder Point</TableHead>
                  <TableHead>Max Stock</TableHead>
                  <TableHead>Avg Demand/Week</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fill %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStocks.map((stock) => (
                  <TableRow key={stock.sku}>
                    <TableCell className="font-medium">{stock.sku}</TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.category}</TableCell>
                    <TableCell>
                      {stock.currentStock} {stock.unit}
                    </TableCell>
                    <TableCell>{stock.reorderPoint} {stock.unit}</TableCell>
                    <TableCell>{stock.maxStock} {stock.unit}</TableCell>
                    <TableCell>{stock.avgDemand} {stock.unit}</TableCell>
                    <TableCell>{getStatusBadge(stock.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              stock.status === "critical" ? "bg-destructive" :
                              stock.status === "low" ? "bg-orange-500" :
                              "bg-primary"
                            }`}
                            style={{ width: `${getStockPercentage(stock.currentStock, stock.maxStock)}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {getStockPercentage(stock.currentStock, stock.maxStock)}%
                        </span>
                      </div>
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

export default Stocks;
