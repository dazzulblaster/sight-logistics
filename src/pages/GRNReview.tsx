import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Edit2, CheckCircle2, Package, Calendar, Building2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExtractedItem {
  sku: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface OCRData {
  fileName: string;
  grnNumber: string;
  supplierName: string;
  deliveryDate: string;
  invoiceNumber: string;
  items: ExtractedItem[];
}

const GRNReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const ocrData = location.state?.ocrData as OCRData;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<OCRData>(
    ocrData || {
      fileName: "delivery_note_jan15.pdf",
      grnNumber: "GRN-2404",
      supplierName: "Acme Supplies Co.",
      deliveryDate: "2025-01-15",
      invoiceNumber: "INV-2025-001",
      items: [
        { sku: "SKU-001", description: "Widget A", quantity: 100, unitPrice: 25.50 },
        { sku: "SKU-002", description: "Widget B", quantity: 50, unitPrice: 45.00 },
        { sku: "SKU-003", description: "Widget C", quantity: 75, unitPrice: 30.00 },
      ],
    }
  );

  const handleSave = () => {
    toast({
      title: "GRN Saved Successfully",
      description: `${formData.grnNumber} has been added to inventory`,
    });
    navigate("/stocks");
  };

  const handleItemChange = (index: number, field: keyof ExtractedItem, value: string | number) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setFormData({ ...formData, items: updatedItems });
  };

  const totalValue = formData.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Review GRN Extract</h1>
              <p className="text-muted-foreground mt-1">
                Verify and edit extracted data from {formData.fileName}
              </p>
            </div>
            <Badge variant="default" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Extracted
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Document Details</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  {isEditing ? "Done" : "Edit"}
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="grnNumber">GRN Number</Label>
                  <Input
                    id="grnNumber"
                    value={formData.grnNumber}
                    onChange={(e) => setFormData({ ...formData, grnNumber: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="supplierName">Supplier Name</Label>
                  <Input
                    id="supplierName"
                    value={formData.supplierName}
                    onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryDate">Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Extracted Items</h2>
              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="grid gap-4 sm:grid-cols-4">
                      <div>
                        <Label htmlFor={`sku-${index}`} className="text-xs">SKU</Label>
                        <Input
                          id={`sku-${index}`}
                          value={item.sku}
                          onChange={(e) => handleItemChange(index, "sku", e.target.value)}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`desc-${index}`} className="text-xs">Description</Label>
                        <Input
                          id={`desc-${index}`}
                          value={item.description}
                          onChange={(e) => handleItemChange(index, "description", e.target.value)}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`qty-${index}`} className="text-xs">Quantity</Label>
                        <Input
                          id={`qty-${index}`}
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value))}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`price-${index}`} className="text-xs">Unit Price</Label>
                        <Input
                          id={`price-${index}`}
                          type="number"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(index, "unitPrice", parseFloat(e.target.value))}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-right text-sm text-muted-foreground">
                      Subtotal: ${(item.quantity * item.unitPrice).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <FileText className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Document</p>
                    <p className="font-medium text-sm">{formData.fileName}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Building2 className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Supplier</p>
                    <p className="font-medium text-sm">{formData.supplierName}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Calendar className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery Date</p>
                    <p className="font-medium text-sm">{formData.deliveryDate}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Package className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Items</p>
                    <p className="font-medium text-sm">{formData.items.length} SKUs</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Value</p>
                  <p className="text-2xl font-bold text-primary">${totalValue.toFixed(2)}</p>
                </div>
              </div>
            </Card>

            <Button onClick={handleSave} className="w-full gap-2">
              <Save className="h-4 w-4" />
              Save to Inventory
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GRNReview;
