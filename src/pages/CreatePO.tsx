import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle2, Package, FileText, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";

const CreatePO = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    sku: searchParams.get("sku") || "",
    productName: searchParams.get("name") || "",
    quantity: searchParams.get("qty") || "",
    supplier: "",
    unitPrice: "",
    deliveryDate: "",
    notes: "",
    autoInvoice: true,
    autoReminder: true,
  });

  const suppliers = [
    "Alpha Manufacturing Co.",
    "Beta Supply Ltd.",
    "Gamma Industries Inc.",
    "Delta Distributors",
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.supplier || !formData.quantity || !formData.unitPrice)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = () => {
    // Simulate PO creation
    toast({
      title: "Purchase Order Created!",
      description: `PO for ${formData.quantity} units of ${formData.productName} has been created successfully.`,
    });

    // Show automation notifications
    if (formData.autoInvoice) {
      setTimeout(() => {
        toast({
          title: "🤖 Invoice Auto-Creation Enabled",
          description: "Invoice will be automatically generated when goods are received.",
        });
      }, 1000);
    }

    if (formData.autoReminder) {
      setTimeout(() => {
        toast({
          title: "🤖 Reminder Automation Active",
          description: "Supplier will receive automatic reminders if delivery is delayed.",
        });
      }, 2000);
    }

    setTimeout(() => navigate("/dashboard"), 3000);
  };

  const totalAmount = formData.quantity && formData.unitPrice 
    ? (parseFloat(formData.quantity) * parseFloat(formData.unitPrice)).toFixed(2)
    : "0.00";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Purchase Order</h1>
          <p className="text-muted-foreground">Complete the form to generate a new PO</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              1
            </div>
            <span className={`text-sm font-medium ${step >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>Details</span>
          </div>
          <Separator className="flex-1 mx-4" />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              2
            </div>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>Automation</span>
          </div>
          <Separator className="flex-1 mx-4" />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              3
            </div>
            <span className={`text-sm font-medium ${step >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>Review</span>
          </div>
        </div>

        <Card className="p-6">
          {/* Step 1: PO Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Purchase Order Details</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                    placeholder="SKU-1024"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    value={formData.productName}
                    onChange={(e) => handleInputChange("productName", e.target.value)}
                    placeholder="Widget Pro X"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier *</Label>
                <Select value={formData.supplier} onValueChange={(value) => handleInputChange("supplier", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    placeholder="200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Unit Price *</Label>
                  <Input
                    id="unitPrice"
                    type="number"
                    step="0.01"
                    value={formData.unitPrice}
                    onChange={(e) => handleInputChange("unitPrice", e.target.value)}
                    placeholder="15.50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Expected Delivery</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Additional instructions or requirements..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNext}>
                  Next: Automation Settings
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Automation Settings */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Automation Settings</h2>
              </div>

              <p className="text-sm text-muted-foreground">
                Enable smart automations to reduce manual work and improve efficiency
              </p>

              <Card className="p-4 bg-muted/30">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-foreground">Auto-Generate Invoice</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically create an invoice when goods are received (GRN created). 
                      Includes all PO details, quantities, and pricing.
                    </p>
                    <Badge variant="secondary" className="mt-2">Recommended</Badge>
                  </div>
                  <Switch
                    checked={formData.autoInvoice}
                    onCheckedChange={(checked) => handleInputChange("autoInvoice", checked)}
                  />
                </div>
              </Card>

              <Card className="p-4 bg-muted/30">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-foreground">Auto-Reminder for Late Deliveries</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically send reminder emails to suppliers when expected delivery date passes. 
                      Sends follow-up every 2 days until goods are received.
                    </p>
                    <Badge variant="secondary" className="mt-2">Recommended</Badge>
                  </div>
                  <Switch
                    checked={formData.autoReminder}
                    onCheckedChange={(checked) => handleInputChange("autoReminder", checked)}
                  />
                </div>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Next: Review Order
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Review Purchase Order</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">SKU</p>
                    <p className="font-medium">{formData.sku}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Product</p>
                    <p className="font-medium">{formData.productName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Supplier</p>
                    <p className="font-medium">{formData.supplier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Delivery</p>
                    <p className="font-medium">{formData.deliveryDate || "Not specified"}</p>
                  </div>
                </div>

                <Separator />

                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="text-lg font-semibold">{formData.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Unit Price</p>
                      <p className="text-lg font-semibold">${formData.unitPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-lg font-semibold text-primary">${totalAmount}</p>
                    </div>
                  </div>
                </div>

                {formData.notes && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Notes</p>
                      <p className="text-sm">{formData.notes}</p>
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <p className="text-sm font-medium mb-2">Active Automations:</p>
                  <div className="space-y-2">
                    {formData.autoInvoice && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Auto-generate invoice on goods receipt</span>
                      </div>
                    )}
                    {formData.autoReminder && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Auto-send supplier reminders for late deliveries</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={handleSubmit}>
                  Create Purchase Order
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CreatePO;
