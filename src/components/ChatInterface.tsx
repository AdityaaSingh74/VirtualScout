import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, RotateCcw, MapPin, BookOpen, Coffee, Beaker, Compass, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ChatMessage from "./ChatMessage";
import { CAMPUS_LOCATIONS, findLocationByKeyword, CampusLocation, CATEGORY_LABELS } from "@/data/campusLocations";
import { useSpeech } from "@/hooks/useSpeech";

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

// ─── AI Brain ─────────────────────────────────────────────────────────────────
const getResponse = (input: string): { text: string; location: CampusLocation | null } => {
  const q = input.toLowerCase().trim();
  const matched = findLocationByKeyword(input);

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

  if (/^(hi|hey|hello|hola|howdy|good\s*(morning|afternoon|evening))/.test(q)) {
    return { text: `Hey there! 👋 I'm **Scout**, your personal AI campus guide!\n\nI can:\n• 📍 Navigate you to **any campus location** in 360°\n• 🎓 Tell you about **academic facilities & labs**\n• ☕ Show you the **OC, gardens & hangout spots**\n• 💡 Share **insider tips & campus facts**\n\nWhat would you like to explore first?`, location: null };
  }

  if (/(what can you do|help|what are you|how do you work|features)/.test(q)) {
    return { text: `Great question! Here's what I can do:\n\n🗺️ **Navigate** — "Take me to the Drobotics Lab"\n📖 **Describe** — "Tell me about the OC Balcony"\n🔍 **Discover** — "What labs does the campus have?"\n📍 **Explore categories** — "Show me outdoor spots"\n💡 **Share tips** — "Any tips for the temple?"\n\nJust type naturally and I'll figure it out!`, location: null };
  }

  if (/(lab|labs|science|research|drobotics|ece|physics|robot|drone)/.test(q)) {
    const labs = CAMPUS_LOCATIONS.filter(l => l.category === "labs" || l.id.includes("lab"));
    if (labs.length > 0) return { text: `🔬 **Campus Labs & Research Facilities**\n\nHere's what's available:\n\n${labs.map(l => `${l.icon} **${l.name}** — ${l.description}`).join("\n")}\n\nWhich one would you like to explore?`, location: null };
  }

  if (/(outdoor|nature|garden|green|park|relax|chill|peaceful|quiet)/.test(q)) {
    const outdoors = CAMPUS_LOCATIONS.filter(l => ["mughal-garden","botanical-garden","basketball-ground","temple","mughal-garden-2"].includes(l.id));
    return { text: `🌿 **Outdoor Spots on Campus**\n\n${outdoors.map(l => `${l.icon} **${l.name}** — ${l.description}`).join("\n")}\n\nPerfect for a break between classes! Which one catches your eye?`, location: null };
  }

  if (/(food|eat|hungry|coffee|cafe|cafeteria|drink|snack|oc)/.test(q)) {
    const food = CAMPUS_LOCATIONS.find(l => l.id === "oc");
    if (food) return { text: `☕ **Hungry?** The OC (Open Cafeteria) is the place to be!\n\n${food.details}\n\nShall I take you there?`, location: null };
  }

  if (/(class|classroom|lecture|floor|academic|study|professor|faculty|seminar)/.test(q)) {
    const academic = CAMPUS_LOCATIONS.filter(l => l.category === "academic");
    return { text: `🎓 **Academic Block Overview**\n\n${academic.map(l => `${l.icon} **${l.name}** — ${l.description}`).join("\n")}\n\nWant a 360° view of any of these?`, location: null };
  }

  if (/(sport|basketball|fitness|exercise|game|play|active)/.test(q)) {
    const sports = CAMPUS_LOCATIONS.find(l => l.id === "basketball-ground");
    if (sports) return { text: `🏀 **Sports Facilities**\n\n${sports.details}\n\nPickup games happen every evening. Want to see it in 360°?`, location: null };
  }

  if (/(hostel|accommodation|stay|dormitory|room|housing)/.test(q)) {
    const hostel = CAMPUS_LOCATIONS.find(l => l.id === "girls-hostel");
    if (hostel) return { text: `🏠 **Accommodation on Campus**\n\n${hostel.details}\n\nWant me to show you the Girls Hostel in 360°?`, location: null };
  }

  if (/(all|every|list|show me|what locations|where can)/.test(q)) {
    const categories = ["campus", "academic", "labs", "oc", "general"] as const;
    let text = "📍 **All Campus Locations**\n\n";
    for (const cat of categories) {
      const locs = CAMPUS_LOCATIONS.filter(l => l.category === cat && !l.isPlaceholder);
      if (locs.length > 0) { text += `**${CATEGORY_LABELS[cat].icon} ${CATEGORY_LABELS[cat].label}**\n`; text += locs.map(l => `  ${l.icon} ${l.name}`).join("\n") + "\n\n"; }
    }
    text += "Just ask about any of these to jump right to it!";
    return { text, location: null };
  }

  if (/(fun fact|interesting|trivia|did you know|cool|amazing|wow)/.test(q)) {
    const facts = [
      "🌱 The Botanical Garden has over 50 species of plants, many of which are rare to this Himalayan region.",
      "🤖 The Drobotics Lab has produced award-winning autonomous drone projects at national tech fests!",
      "🌅 The OC Balcony has a view of the Shivalik hills — best experienced at golden hour.",
      "🧘 The Dhyan Kaksh is one of the few dedicated meditation halls in any Indian university.",
      "🏀 The basketball ground has hosted inter-college tournaments from across Himachal Pradesh.",
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    return { text: `✨ **Did you know?**\n\n${fact}\n\nWant to explore that location?`, location: null };
  }

  if (/(bye|goodbye|see you|later|thanks|thank you|thx|ty)/.test(q)) {
    return { text: `You're welcome! 😊 It was great being your guide!\n\nCome back anytime to explore more of the campus. Happy learning! 🎓✨`, location: null };
  }

  return { text: `Hmm, I'm not quite sure about that one! 🤔\n\nBut here are some things you can try:\n• Ask about a specific place: *"Show me the Drobotics Lab"*\n• Browse by type: *"What labs are there?"*\n• Explore outdoors: *"Show me outdoor spots"*\n• List everything: *"Show all locations"*\n• Get a fun fact: *"Tell me something interesting"*`, location: null };
};

const SUGGESTIONS = [
  { label: "Show all locations", icon: <MapPin className="w-3 h-3" /> },
  { label: "What labs are there?", icon: <Beaker className="w-3 h-3" /> },
  { label: "Take me to the OC", icon: <Coffee className="w-3 h-3" /> },
  { label: "Outdoor spots", icon: <Compass className="w-3 h-3" /> },
  { label: "Academic block", icon: <BookOpen className="w-3 h-3" /> },
  { label: "Tell me something interesting", icon: <Sparkles className="w-3 h-3" /> },
];

// ─── Component ────────────────────────────────────────────────────────────────
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

  const {
    isVoiceEnabled,
    isListening,
    isSpeaking,
    speak,
    stopSpeaking,
    toggleListening,
    toggleVoice,
  } = useSpeech();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageText = (text || inputValue).trim();
    if (!messageText || isTyping) return;

    stopSpeaking();
    setInputValue("");
    setShowSuggestions(false);

    const userMessage: Message = { id: Date.now().toString(), text: messageText, isBot: false, timestamp: getTime() };
    setMessages(prev => [...prev, userMessage]);

    setIsTyping(true);
    await new Promise(r => setTimeout(r, 700 + Math.random() * 600));
    setIsTyping(false);

    const response = getResponse(messageText);
    if (response.location && onLocationChange) onLocationChange(response.location);

    const botMessage: Message = { id: (Date.now() + 1).toString(), text: response.text, isBot: true, timestamp: getTime() };
    setMessages(prev => [...prev, botMessage]);

    speak(response.text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleReset = () => {
    stopSpeaking();
    const welcomeText = `Hey there! 👋 I'm **Scout**, your AI campus guide!\n\nI can navigate you anywhere on campus, describe locations, share insider tips, and answer your questions.\n\nTry asking: *"Take me to the Drobotics Lab"* or click a suggestion below!`;
    setMessages([{ id: `welcome-${Date.now()}`, text: welcomeText, isBot: true, timestamp: getTime() }]);
    setShowSuggestions(true);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full bg-background/50">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full shadow-[0_0_6px] ${isSpeaking ? "bg-blue-400 shadow-blue-400/80 animate-pulse" : "bg-emerald-400 shadow-emerald-400/80"} transition-colors duration-300`} />
          <span className="text-xs font-medium text-muted-foreground">
            {isSpeaking ? "Scout is speaking..." : "Scout is online"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleVoice}
            className={`flex items-center justify-center p-1.5 rounded-md transition-colors ${isVoiceEnabled ? "text-primary bg-primary/10 hover:bg-primary/20" : "text-muted-foreground hover:bg-muted"}`}
            title={isVoiceEnabled ? "Mute Scout" : "Unmute Scout"}
          >
            {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <div className="w-[1px] h-4 bg-border mx-1" />
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted"
            title="Clear conversation"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 scroll-smooth">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message.text} isBot={message.isBot} timestamp={message.timestamp} />
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

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="flex gap-2 items-end">
          <div className="relative flex-1">
            <Textarea
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "🎤 Listening... speak now" : "Ask Scout anything about campus..."}
              rows={1}
              className={`min-h-[44px] max-h-[100px] resize-none pr-[4.5rem] bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/40 rounded-xl text-sm leading-relaxed py-3 transition-all ${isListening ? "ring-2 ring-red-400/60 bg-red-50/10" : ""}`}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <button
                onClick={() => toggleListening((transcript) => setInputValue(transcript))}
                className={`p-1.5 rounded-lg transition-all ${isListening ? "bg-red-500/20 text-red-500" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                title={isListening ? "Stop listening" : "Speak to Scout"}
              >
                {isListening ? (
                  <Mic className="w-4 h-4 animate-pulse" />
                ) : (
                  <MicOff className="w-4 h-4" />
                )}
              </button>
              <Sparkles className="w-4 h-4 text-muted-foreground/50 pointer-events-none mx-0.5" />
            </div>
          </div>
          <Button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="h-11 w-11 rounded-xl shadow-lg flex-shrink-0 disabled:opacity-40 transition-all"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground/40 mt-2 text-center">
          Enter to send · Shift+Enter for new line · 🔊 toggle voice
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
