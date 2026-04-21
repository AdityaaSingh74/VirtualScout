import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CampusLocation,
  CATEGORY_LABELS,
  getLocationsByCategory,
} from "@/data/campusLocations";
import { useState } from "react";

interface LocationMenuProps {
  currentLocation: CampusLocation;
  onLocationChange: (location: CampusLocation) => void;
}

const CATEGORY_ORDER = ["campus", "academic", "labs", "oc", "general"];

const LocationMenu = ({ currentLocation, onLocationChange }: LocationMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (location: CampusLocation) => {
    onLocationChange(location);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="glass-card border-0 hover:bg-card/80"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-4 pb-2 border-b border-border">
          <SheetTitle className="font-display text-lg flex items-center gap-2">
            🗺️ Campus Locations
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <Accordion type="multiple" defaultValue={CATEGORY_ORDER} className="px-2 py-2">
            {CATEGORY_ORDER.map((cat) => {
              const meta = CATEGORY_LABELS[cat];
              const locations = getLocationsByCategory(cat);
              if (!locations.length) return null;

              return (
                <AccordionItem key={cat} value={cat} className="border-b-0">
                  <AccordionTrigger className="py-3 px-2 text-sm hover:no-underline">
                    <span className="flex items-center gap-2 font-display font-semibold">
                      {meta.icon} {meta.label}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="flex flex-col gap-1">
                      {locations.map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => handleSelect(loc)}
                          disabled={loc.isPlaceholder}
                          className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all
                            ${currentLocation.id === loc.id
                              ? "bg-primary/10 text-primary font-medium"
                              : loc.isPlaceholder
                                ? "opacity-50 cursor-not-allowed text-muted-foreground"
                                : "hover:bg-muted text-foreground cursor-pointer"
                            }
                          `}
                        >
                          <span className="text-base shrink-0">{loc.icon}</span>
                          <div className="min-w-0">
                            <p className="truncate">{loc.name}</p>
                            {loc.isPlaceholder && (
                              <p className="text-xs text-muted-foreground/60">Coming soon</p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default LocationMenu;
