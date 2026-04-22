import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, RotateCcw, MapPin, BookOpen, Coffee, Beaker, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ChatMessage from "./ChatMessage";
import { CAMPUS_LOCATIONS, findLocationByKeyword, CampusLocation, CATEGORY_LABELS } from "@/data/campusLocations";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

interface ChatInterfaceProps {
  onLocationChange?: (location: CampusLocation) => void;
}

const getTime = () =>
  new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

// ─── The AI Brain ─────────────────────────────────────────────────────────────
const getResponse = (input: string): { text: string; location: CampusLocation | null } => {
  const q = input.toLowerCase().trim();
  const matched = findLocationByKeyword(input);

  // Navigate to matched location with a rich description
  if (matched) {
    const tips: Record<string, string> = {
      "oc": "💡 **Pro tip:** The OC gets busy between 12–2 PM. Grab a window seat on the balcony for the best view!",
      "oc-balcony": "💡 **Pro tip:** Sunset from the OC Balcony is absolutely stunning. Don't miss it!",
      "drobotics-lab": "💡 **Pro tip:** You can join the Drobotics Club to get hands-on access to drones and robotic kits.",
      "mughal-garden": "💡 **Pro tip:** Great spot for studying outdoors — quiet, shaded, and beautiful.",
      "temple": "💡 **Pro tip:** Visiting during the morning is the most peaceful time.",
      "basketball-ground": "💡 **Pro tip:** Pickup games happen every evening after 5 PM — jump right in!",
      "dhyan-kaksh": "💡 **Pro tip:** Morning meditation sessions are held here on Tuesdays and Thursdays.",
    };

    const tip = tips[matched.id] ?? "";
    return {
      text: `${matched.icon} **${matched.name}**\n\n${matched.details}${tip ? "\n\n" + tip : ""}\n\n*I've navigated the 360° view to this location for you!*`,
      location: matched,
    };
  }

  // Greetings
  if (/^(hi|hey|hello|hola|howdy|good\s*(morning|afternoon|evening))/.test(q)) {
    return {
      text: `Hey there! 👋 I'm **Scout**, your personal AI campus guide!\n\nI can:\n• 📍 Navigate you to **any campus location** in 360°\n• 🎓 Tell you about **academic facilities & labs**\n• ☕ Show you the **OC, gardens & hangout spots**\n• 💡 Share **insider tips & campus facts**\n\nWhat would you like to explore first?`,
      location: null,
    };
  }

  // What can you do / help
  if (/(what can you do|help|what are you|how do you work|features)/.test(q)) {
    return {
      text: `Great question! Here's what I can do:\n\n🗺️ **Navigate** — "Take me to the Drobotics Lab"\n📖 **Describe** — "Tell me about the OC Balcony"\n🔍 **Discover** — "What labs does the campus have?"\n📍 **Explore categories** — "Show me outdoor spots"\n💡 **Share tips** — "Any tips for the temple?"\n\nJust type naturally and I'll figure it out!`,
      location: null,
    };
  }

  // Labs category
  if (/(lab|labs|science|research|drobotics|ece|physics|robot|drone)/.test(q)) {
    const labs = CAMPUS_LOCATIONS.filter(l => l.category === "labs" || l.id.includes("lab"));
    if (labs.length > 0) {
      return {
        text: `🔬 **Campus Labs & Research Facilities**\n\nHere's what's available:\n\n${labs.map(l => `${l.icon} **${l.name}** — ${l.description}`).join("\n")}\n\nWhich one would you like to explore?`,
        location: null,
      };
    }
  }

  // Outdoor / nature
  if (/(outdoor|nature|garden|green|park|relax|chill|peaceful|quiet)/.test(q)) {
    const outdoors = CAMPUS_LOCATIONS.filter(l =>
      ["mughal-garden", "botanical-garden", "basketball-ground", "temple", "mughal-garden-2"].includes(l.id)
    );
    return {
      text: `🌿 **Outdoor Spots on Campus**\n\n${outdoors.map(l => `${l.icon} **${l.name}** — ${l.description}`).join("\n")}\n\nPerfect for a break between classes! Which one catches your eye?`,
      location: null,
    };
  }

  // Food / cafe
  if (/(food|eat|hungry|coffee|cafe|cafeteria|drink|snack|oc)/.test(q)) {
    const food = CAMPUS_LOCATIONS.find(l => l.id === "oc");
    if (food) {
      return {
        text: `☕ **Hungry?** The OC (Open Cafeteria) is the place to be!\n\n${food.details}\n\nShall I take you there?`,
        location: null,
      };
    }
  }

  // Academic / classes
  if (/(class|classroom|lecture|floor|academic|study|professor|faculty|seminar)/.test(q)) {
    const academic = CAMPUS_LOCATIONS.filter(l => l.category === "academic");
    return {
      text: `🎓 **Academic Block Overview**\n\n${academic.map(l => `${l.icon} **${l.name}** — ${l.description}`).join("\n")}\n\nWant a 360° view of any of these?`,
      location: null,
    };
  }

  // Sports / fitness
  if (/(sport|basketball|fitness|exercise|game|play|active)/.test(q)) {
    const sports = CAMPUS_LOCATIONS.find(l => l.id === "basketball-ground");
    if (sports) {
      return {
        text: `🏀 **Sports Facilities**\n\n${sports.details}\n\nPickup games happen every evening. Want to see it in 360°?`,
        location: null,
      };
    }
  }

  // Hostel / accommodation
  if (/(hostel|accommodation|stay|dormitory|room|housing)/.test(q)) {
    const hostel = CAMPUS_LOCATIONS.find(l => l.id === "girls-hostel");
    if (hostel) {
      return {
        text: `🏠 **Accommodation on Campus**\n\n${hostel.details}\n\nWant me to show you the Girls Hostel in 360°?`,
        location: null,
      };
    }
  }

  // Show all locations
  if (/(all|every|list|show me|what locations|where can)/.test(q)) {
    const categories = ["campus", "academic", "labs", "oc", "general"] as const;
    let text = "📍 **All Campus Locations**\n\n";
    for (const cat of categories) {
      const locs = CAMPUS_LOCATIONS.filter(l => l.category === cat && !l.isPlaceholder);
      if (locs.length > 0) {
        text += `**${CATEGORY_LABELS[cat].icon} ${CATEGORY_LABELS[cat].label}**\n`;
        text += locs.map(l => `  ${l.icon} ${l.name}`).join("\n") + "\n\n";
      }
    }
    text += "Just ask about any of these to jump right to it!";
    return { text, location: null };
  }

  // Fun facts
  if (/(fun fact|interesting|trivia|did you know|cool|amazing|wow)/.test(q)) {
    const facts = [
      "🌱 The Botanical Garden has over 50 species of plants, many of which are rare to this Himalayan region.",
      "🤖 The Drobotics Lab has produced award-winning autonomous drone projects at national tech fests!",
      "🌅 The OC Balcony has a view of the Shivalik hills — best experienced at golden hour.",
      "🧘 The Dhyan Kaksh was inspired by mindfulness practices and is one of the few meditation halls in any Indian university.",
      "🏀 The basketball ground has hosted inter-college tournaments with teams from across Himachal Pradesh.",
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    return { text: `✨ **Did you know?**\n\n${fact}\n\nWant to explore that location?`, location: null };
  }

  // Goodbye
  if (/(bye|goodbye|see you|later|thanks|thank you|thx|ty)/.test(q)) {
    return {
      text: `You're welcome! 😊 It was great being your guide!\n\nCome back anytime to explore more of the campus. Happy learning! 🎓✨`,
      location: null,
    };
  }

  // Fallback
  return {
    text: `Hmm, I'm not quite sure about that one! 🤔\n\nBut here are some things you can try:\n• Ask about a specific place: *"Show me the Drobotics Lab"*\n• Browse by type: *"What labs are there?"*\n• Explore outdoors: *"Show me outdoor spots"*\n• List everything: *"Show all locations"*\n• Get a fun fact: *"Tell me something interesting"*`,
    location: null,
  };
};

// ─── Suggested Prompts ────────────────────────────────────────────────────────
const SUGGESTIONS = [
  { label: "Show all locations", icon: <MapPin className="w-3 h-3" /> },
  { label: "What labs are there?", icon: <Beaker className="w-3 h-3" /> },
  { label: "Take me to the OC", icon: <Coffee className="w-3 h-3" /> },
  { label: "Outdoor spots", icon: <Compass className="w-3 h-3" /> },
  { label: "Academic block", icon: <BookOpen className="w-3 h-3" /> },
  { label: "Tell me something interesting", icon: <Sparkles className="w-3 h-3" /> },
];

// ─── Component ───────────────────────────────────────────────────────────────
const ChatInterface = ({ onLocationChange }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: `Hey there! 👋 I'm **Scout**, your AI campus guide!\n\nI can navigate you anywhere on campus, describe locations, share insider tips, and answer your questions.\n\nTry asking: *"Take me to the Drobotics Lab"* or click a suggestion below!`,
      isBot: true,
      timestamp: getTime(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageText = (text || inputValue).trim();
    if (!messageText || isTyping) return;

    setInputValue("");
    setShowSuggestions(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: getTime(),
    };
    setMessages(prev => [...prev, userMessage]);

    setIsTyping(true);
    const delay = 600 + Math.random() * 800;
    await new Promise(r => setTimeout(r, delay));
    setIsTyping(false);

    const response = getResponse(messageText);
    if (response.location && onLocationChange) {
      onLocationChange(response.location);
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response.text,
      isBot: true,
      timestamp: getTime(),
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome-reset",
        text: `Hey there! 👋 I'm **Scout**, your AI campus guide!\n\nI can navigate you anywhere on campus, describe locations, share insider tips, and answer your questions.\n\nTry asking: *"Take me to the Drobotics Lab"* or click a suggestion below!`,
        isBot: true,
        timestamp: getTime(),
      },
    ]);
    setShowSuggestions(true);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full bg-background/50">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span className="text-xs font-medium text-muted-foreground">Scout is online</span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
          title="Clear conversation"
        >
          <RotateCcw className="w-3 h-3" />
          Clear
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 scroll-smooth">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isBot={message.isBot}
            timestamp={message.timestamp}
          />
        ))}

        {isTyping && <ChatMessage message="" isBot isTyping />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div className="px-4 pb-2">
          <p className="text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wide">Suggested</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s.label}
                onClick={() => handleSend(s.label)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-xs font-medium text-muted-foreground transition-all duration-200 shadow-sm"
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="flex gap-2 items-end">
          <div className="relative flex-1">
            <Textarea
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Scout anything about the campus..."
              rows={1}
              className="min-h-[44px] max-h-[100px] resize-none pr-10 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/40 rounded-xl text-sm leading-relaxed py-3"
            />
            <Sparkles className="absolute right-3 bottom-3.5 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
          </div>
          <Button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="h-11 w-11 rounded-xl shadow-lg flex-shrink-0 bg-primary hover:bg-primary/90 disabled:opacity-40 transition-all"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground/50 mt-2 text-center">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
