import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

const Map = () => {
  // Sample shipment locations
  const shipments = [
    { id: 1, name: "SH-4782", lat: 35, lng: 139, status: "in-transit" },
    { id: 2, name: "SH-4801", lat: 40, lng: -74, status: "delivered" },
    { id: 3, name: "SH-4803", lat: 51, lng: 0, status: "in-transit" },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Navigation className="h-5 w-5 text-primary" />
          Live Shipment Tracking
        </h3>
        <p className="text-sm text-muted-foreground">
          {shipments.length} active shipments
        </p>
      </div>
      
      <div className="relative w-full h-[400px] bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg overflow-hidden border border-border">
        {/* Map placeholder with visual representation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative w-full h-64">
              {/* Simulated map with shipment markers */}
              <svg className="w-full h-full opacity-20" viewBox="0 0 800 400">
                <path
                  d="M 100,200 Q 250,100 400,200 T 700,200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                />
              </svg>
              
              {/* Shipment markers */}
              {shipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="absolute"
                  style={{
                    left: `${(shipment.lng + 180) / 3.6}%`,
                    top: `${(90 - shipment.lat) / 1.8}%`,
                  }}
                >
                  <div className="relative group cursor-pointer">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        shipment.status === "delivered"
                          ? "bg-success"
                          : "bg-secondary animate-pulse"
                      }`}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                      <div className="bg-card border border-border rounded-lg shadow-lg p-2 whitespace-nowrap">
                        <p className="text-xs font-medium">{shipment.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {shipment.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <p>Interactive map requires Mapbox integration</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
          <span className="text-muted-foreground">In Transit</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-muted-foreground">Delivered</span>
        </div>
      </div>
    </Card>
  );
};

export default Map;
