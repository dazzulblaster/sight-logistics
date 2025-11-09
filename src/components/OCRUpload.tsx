import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scan, Upload, CheckCircle2, FileText } from "lucide-react";

const OCRUpload = () => {
  const recentExtractions = [
    { id: "GRN-2401", fileName: "delivery_note_jan10.pdf", status: "completed", items: 5, date: "2025-01-10" },
    { id: "GRN-2402", fileName: "invoice_acme_jan11.jpg", status: "completed", items: 3, date: "2025-01-11" },
    { id: "GRN-2403", fileName: "packing_list_jan12.pdf", status: "processing", items: null, date: "2025-01-12" },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Scan className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold">OCR Extract from GRN</h3>
        </div>
        <Badge variant="outline" className="text-xs">AI Powered</Badge>
      </div>

      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-6 hover:border-primary/50 transition-all cursor-pointer">
        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h4 className="text-lg font-medium text-foreground mb-2">Upload GRN Document</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop or click to upload PDF, JPG, or PNG files
        </p>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Select File
        </Button>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Recent Extractions</h4>
        {recentExtractions.map((extraction) => (
          <div
            key={extraction.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <FileText className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground">{extraction.id}</p>
                <p className="text-sm text-muted-foreground">{extraction.fileName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {extraction.status === "completed" ? (
                <>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{extraction.items} items extracted</p>
                    <p className="text-xs text-muted-foreground">{extraction.date}</p>
                  </div>
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </Badge>
                </>
              ) : (
                <Badge variant="secondary" className="animate-pulse">
                  Processing...
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Auto-extract:</span> SKU, quantity, supplier name, 
          delivery date, and invoice number from scanned documents using AI OCR
        </p>
      </div>
    </Card>
  );
};

export default OCRUpload;
