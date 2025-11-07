import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { TrendingUp, Map, Brain, Package, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/hero-supply-chain.jpg";

const Index = () => {
  const features = [
    {
      icon: Map,
      title: "Real-Time Tracking",
      description: "Monitor shipments globally with live updates and location tracking.",
    },
    {
      icon: Brain,
      title: "AI Optimization",
      description: "Get intelligent recommendations for routes, costs, and efficiency.",
    },
    {
      icon: Clock,
      title: "Milestone Management",
      description: "Track every step of your supply chain with detailed milestone tracking.",
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecast demand and identify potential disruptions before they happen.",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Proactive alerts for weather, delays, and supply chain risks.",
    },
    {
      icon: Package,
      title: "Inventory Insights",
      description: "Optimize inventory levels with AI-powered demand forecasting.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Complete{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Supply Chain Visibility
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track, optimize, and predict your entire supply chain with AI-powered insights and real-time monitoring
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  <TrendingUp className="h-5 w-5" />
                  View Dashboard
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Supply Chain Excellence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to give you complete control and visibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 border-border"
                style={{ boxShadow: "var(--shadow-elevated)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-secondary">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join industry leaders using ChainVision for complete supply chain visibility
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="gap-2">
              Get Started Now
              <TrendingUp className="h-5 w-5" />
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
};

export default Index;
