import Navigation from "@/components/Navigation";
import MetricsCards from "@/components/MetricsCards";
import Map from "@/components/Map";
import MilestoneTracker from "@/components/MilestoneTracker";
import AIInsights from "@/components/AIInsights";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Supply Chain Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time visibility and AI-powered insights for your operations
          </p>
        </div>

        <MetricsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Map />
          </div>
          <div>
            <MilestoneTracker />
          </div>
        </div>

        <AIInsights />
      </main>
    </div>
  );
};

export default Dashboard;
