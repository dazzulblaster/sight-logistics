import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Upload, Download, Mail, MessageSquare, Printer, QrCode, FileSpreadsheet, Webhook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Integrations() {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");

  const handleCSVImport = (type: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast({
          title: "Import Started",
          description: `Processing ${file.name}. This may take a moment...`,
        });
        // Simulate import
        setTimeout(() => {
          toast({
            title: "Import Successful",
            description: `${type} data has been imported successfully.`,
          });
        }, 2000);
      }
    };
    input.click();
  };

  const handleExport = (type: string) => {
    toast({
      title: "Export Started",
      description: `Preparing ${type} data for download...`,
    });
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export Ready",
        description: `${type} data has been exported to CSV.`,
      });
    }, 1500);
  };

  const saveNotificationSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Integrations & Data</h1>
        <p className="text-muted-foreground mt-2">
          Connect your existing workflows and manage data imports/exports
        </p>
      </div>

      {/* CSV Import/Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Excel & CSV Import/Export
          </CardTitle>
          <CardDescription>
            Import your existing inventory, orders, and supplier data from spreadsheets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Import Data
              </h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleCSVImport("Inventory")}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Inventory
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleCSVImport("Suppliers")}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Suppliers
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleCSVImport("Orders")}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Orders
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleExport("Inventory")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Inventory
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleExport("Suppliers")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Suppliers
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleExport("Orders")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Orders
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Tip:</strong> Download our Excel templates to ensure your data is formatted correctly before importing.
            </p>
            <Button variant="link" className="px-0 mt-2">Download Templates</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Notification Channels
          </CardTitle>
          <CardDescription>
            Get alerts via email and WhatsApp for important events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Low stock, order updates, supplier alerts
                  </p>
                </div>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            {emailNotifications && (
              <div className="ml-8 space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="whatsapp-notifications">WhatsApp Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Instant alerts for critical stock and order issues
                  </p>
                </div>
              </div>
              <Switch
                id="whatsapp-notifications"
                checked={whatsappNotifications}
                onCheckedChange={setWhatsappNotifications}
              />
            </div>
            
            {whatsappNotifications && (
              <div className="ml-8 space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="+60123456789"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Include country code (e.g., +60 for Malaysia)
                </p>
              </div>
            )}
          </div>

          <Button onClick={saveNotificationSettings} className="w-full">
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>

      {/* Webhook Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            Webhook Integration
          </CardTitle>
          <CardDescription>
            Connect to Zapier, Make.com, or your custom systems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook">Webhook URL</Label>
            <Input
              id="webhook"
              type="url"
              placeholder="https://hooks.zapier.com/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Events: Low stock alerts, new orders, supplier changes
            </p>
          </div>
          <Button variant="outline" className="w-full">
            Test Webhook
          </Button>
        </CardContent>
      </Card>

      {/* Print & QR Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Printer className="h-5 w-5" />
            Print & Labels
          </CardTitle>
          <CardDescription>
            Generate printable documents and QR codes for inventory
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start">
              <Printer className="h-4 w-4 mr-2" />
              Print Purchase Orders
            </Button>
            <Button variant="outline" className="justify-start">
              <Printer className="h-4 w-4 mr-2" />
              Print GRN Reports
            </Button>
            <Button variant="outline" className="justify-start">
              <QrCode className="h-4 w-4 mr-2" />
              Generate Inventory QR Codes
            </Button>
            <Button variant="outline" className="justify-start">
              <Printer className="h-4 w-4 mr-2" />
              Print Stock Labels
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
