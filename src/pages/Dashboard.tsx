import Navigation from "@/components/Navigation";
import MetricsCards from "@/components/MetricsCards";
import InventoryReorderPanel from "@/components/InventoryReorderPanel";
import DemandForecastChart from "@/components/DemandForecastChart";
import SmartAllocationPanel from "@/components/SmartAllocationPanel";
import ExceptionAlerts from "@/components/ExceptionAlerts";
import SupplierScorecard from "@/components/SupplierScorecard";
import OrderTracker from "@/components/OrderTracker";
import OCRUpload from "@/components/OCRUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Stockly Dashboard
          </h1>
          <p className="text-muted-foreground">
            AI-powered inventory management and supply chain optimization
          </p>
        </div>

        <MetricsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExceptionAlerts />
          <DemandForecastChart />
        </div>

        <InventoryReorderPanel />

        <Tabs defaultValue="allocation" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="allocation">Smart Allocation</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="ocr">OCR Extract</TabsTrigger>
          </TabsList>

          <TabsContent value="allocation" className="mt-0">
            <SmartAllocationPanel />
          </TabsContent>

          <TabsContent value="suppliers" className="mt-0">
            <SupplierScorecard />
          </TabsContent>

          <TabsContent value="orders" className="mt-0">
            <OrderTracker />
          </TabsContent>

          <TabsContent value="ocr" className="mt-0">
            <OCRUpload />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
