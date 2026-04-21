import { useState } from "react";
import { ArrowLeft, Maximize2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatInterface from "./ChatInterface";
import AvatarGuide from "./AvatarGuide";
import StreetViewEmbed from "./StreetViewEmbed";
import LocationMenu from "./LocationMenu";
import { CAMPUS_LOCATIONS, CampusLocation } from "@/data/campusLocations";

interface TourLayoutProps {
  onBack: () => void;
}

const TourLayout = ({ onBack }: TourLayoutProps) => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<CampusLocation>(CAMPUS_LOCATIONS[0]);

  const handleLocationChange = (location: CampusLocation) => {
    setCurrentLocation(location);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* 360 View */}
      <div className="flex-1 relative bg-gradient-to-br from-muted to-muted/50">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="glass-card border-0 hover:bg-card/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <LocationMenu
              currentLocation={currentLocation}
              onLocationChange={handleLocationChange}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="glass-card border-0 hover:bg-card/80 md:hidden"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="glass-card border-0 hover:bg-card/80"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Street View / Kuula Embed */}
        <StreetViewEmbed location={currentLocation} />
      </div>

      {/* Chat Panel */}
      <div
        className={`
          fixed md:relative bottom-0 left-0 right-0 md:bottom-auto
          h-[60vh] md:h-auto md:w-96 lg:w-[420px]
          bg-card border-t md:border-t-0 md:border-l border-border
          shadow-2xl md:shadow-none
          transition-transform duration-300
          ${isChatOpen ? "translate-y-0" : "translate-y-full md:translate-y-0"}
          z-30
        `}
      >
        {/* Mobile drag handle */}
        <div className="md:hidden flex justify-center py-2">
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-12 h-1.5 rounded-full bg-border"
          />
        </div>

        {/* Chat header */}
        <div className="hidden md:flex items-center gap-3 p-4 border-b border-border">
          <AvatarGuide state="idle" size="sm" />
          <div>
            <h3 className="font-display font-semibold">Campus Guide</h3>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>

        <div className="h-[calc(100%-3rem)] md:h-[calc(100vh-5rem)]">
          <ChatInterface onLocationChange={handleLocationChange} />
        </div>
      </div>
    </div>
  );
};

export default TourLayout;
