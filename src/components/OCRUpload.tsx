import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scan, Upload, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OCRUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const recentExtractions = [
    { id: "GRN-2401", fileName: "delivery_note_jan10.pdf", status: "completed", items: 5, date: "2025-01-10" },
    { id: "GRN-2402", fileName: "invoice_acme_jan11.jpg", status: "completed", items: 3, date: "2025-01-11" },
    { id: "GRN-2403", fileName: "packing_list_jan12.pdf", status: "processing", items: null, date: "2025-01-12" },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF, JPG, or PNG file",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    toast({
      title: "Processing Document",
      description: "Extracting data using AI OCR...",
    });

    // Simulate OCR processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Extraction Complete",
        description: "Successfully extracted GRN data",
      });
      
      // Navigate to review page with mock extracted data
      navigate("/grn-review", {
        state: {
          ocrData: {
            fileName: file.name,
            grnNumber: `GRN-${Math.floor(Math.random() * 9000) + 1000}`,
            supplierName: "Acme Supplies Co.",
            deliveryDate: new Date().toISOString().split('T')[0],
            invoiceNumber: `INV-2025-${Math.floor(Math.random() * 900) + 100}`,
            items: [
              { sku: "SKU-001", description: "Widget A", quantity: 100, unitPrice: 25.50 },
              { sku: "SKU-002", description: "Widget B", quantity: 50, unitPrice: 45.00 },
              { sku: "SKU-003", description: "Widget C", quantity: 75, unitPrice: 30.00 },
            ],
          },
        },
      });
    }, 2000);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRecentClick = (extraction: typeof recentExtractions[0]) => {
    if (extraction.status === "completed") {
      navigate("/grn-review");
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Scan className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold">OCR Extract from GRN</h3>
        </div>
        <Badge variant="outline" className="text-xs">AI Powered</Badge>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div 
        className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-6 hover:border-primary/50 transition-all cursor-pointer"
        onClick={handleUploadClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <h4 className="text-lg font-medium text-foreground mb-2">Processing Document...</h4>
            <p className="text-sm text-muted-foreground">
              Extracting data using AI OCR
            </p>
          </>
        ) : (
          <>
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">Upload GRN Document</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop or click to upload PDF, JPG, or PNG files
            </p>
            <Button className="gap-2" type="button">
              <Upload className="h-4 w-4" />
              Select File
            </Button>
          </>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Recent Extractions</h4>
        {recentExtractions.map((extraction) => (
          <div
            key={extraction.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer"
            onClick={() => handleRecentClick(extraction)}
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
