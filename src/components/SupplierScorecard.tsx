import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

const SupplierScorecard = () => {
  const suppliers = [
    {
      name: "Acme Corp",
      score: "A",
      avgLeadTime: "12 days",
      latePercentage: 8,
      priceChange: -2.5,
      reliability: 92,
      recommendation: "maintain",
    },
    {
      name: "Global Supply Co",
      score: "B",
      avgLeadTime: "18 days",
      latePercentage: 22,
      priceChange: +5.2,
      reliability: 78,
      recommendation: "monitor",
    },
    {
      name: "FastTech Suppliers",
      score: "A",
      avgLeadTime: "9 days",
      latePercentage: 5,
      priceChange: +1.2,
      reliability: 95,
      recommendation: "preferred",
    },
    {
      name: "Budget Parts Ltd",
      score: "C",
      avgLeadTime: "25 days",
      latePercentage: 38,
      priceChange: -8.0,
      reliability: 62,
      recommendation: "switch",
    },
  ];

  const getScoreColor = (score: string) => {
    switch (score) {
      case "A":
        return "default";
      case "B":
        return "secondary";
      case "C":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "preferred":
        return "default";
      case "maintain":
        return "secondary";
      case "monitor":
        return "outline";
      case "switch":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Supplier Reliability Scorecard</h3>
        </div>
        <Badge variant="outline" className="text-xs">Auto-calculated</Badge>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead className="text-right">Avg Lead Time</TableHead>
              <TableHead className="text-right">Late %</TableHead>
              <TableHead className="text-right">Price Trend</TableHead>
              <TableHead className="text-right">Reliability</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.name}>
                <TableCell>
                  <p className="font-medium text-foreground">{supplier.name}</p>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={getScoreColor(supplier.score) as any} className="text-xs font-bold">
                    {supplier.score}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {supplier.avgLeadTime}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {supplier.latePercentage > 20 && (
                      <AlertCircle className="h-3 w-3 text-destructive" />
                    )}
                    <span className={supplier.latePercentage > 20 ? "text-destructive font-medium" : "text-muted-foreground"}>
                      {supplier.latePercentage}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {supplier.priceChange > 0 ? (
                      <>
                        <TrendingUp className="h-3 w-3 text-destructive" />
                        <span className="text-destructive">+{supplier.priceChange}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-3 w-3 text-success" />
                        <span className="text-success">{supplier.priceChange}%</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span className={
                    supplier.reliability >= 90 ? "text-success font-medium" :
                    supplier.reliability >= 75 ? "text-foreground" :
                    "text-warning font-medium"
                  }>
                    {supplier.reliability}%
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={getRecommendationColor(supplier.recommendation) as any} className="text-xs capitalize">
                    {supplier.recommendation}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {suppliers.filter(s => s.recommendation === "switch").length > 0 && (
        <div className="mt-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <p className="font-medium text-foreground mb-1">Switch Recommendation</p>
              <p className="text-sm text-muted-foreground mb-3">
                Budget Parts Ltd has poor reliability (62%) and high late deliveries (38%). 
                Consider switching to FastTech Suppliers for better performance.
              </p>
              <Button size="sm" variant="destructive">
                Review Alternative Suppliers
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Scoring:</span> A (90%+) | B (75-89%) | C (&lt;75%) based on 
          lead time consistency, late delivery %, and 6-month price stability
        </p>
      </div>
    </Card>
  );
};

export default SupplierScorecard;
