import { useEffect, useState } from "react";
import { Loader2, Construction } from "lucide-react";
import { CampusLocation } from "@/data/campusLocations";

interface StreetViewEmbedProps {
  location: CampusLocation;
}

const StreetViewEmbed = ({ location }: StreetViewEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [location.id]);

  const isKuula = location.embedUrl.includes("kuula.co");

  if (location.isPlaceholder || !location.embedUrl) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted gap-4">
        <Construction className="w-16 h-16 text-muted-foreground" />
        <div className="text-center max-w-sm px-4">
          <p className="font-display font-semibold text-lg">{location.icon} {location.name}</p>
          <p className="text-muted-foreground mt-2">{location.description}</p>
          <p className="text-sm text-muted-foreground/70 mt-3">🚧 360° panorama coming soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-muted">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground font-medium">Loading {location.name}...</p>
        </div>
      )}

      {/* Location badge */}
      <div className="absolute top-20 left-4 z-20">
        <div className="glass-card px-4 py-2 flex items-center gap-2">
          <span className="text-xl">{location.icon}</span>
          <div>
            <p className="font-display font-semibold text-sm">{location.name}</p>
            <p className="text-xs text-muted-foreground">{location.description}</p>
          </div>
        </div>
      </div>

      <iframe
        src={location.embedUrl}
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allow={isKuula ? "accelerometer; gyroscope; fullscreen" : undefined}
        onLoad={() => setIsLoading(false)}
        title={`360° view of ${location.name}`}
      />
    </div>
  );
};

export default StreetViewEmbed;
