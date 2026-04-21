import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "./ChatMessage";
import { CAMPUS_LOCATIONS, findLocationByKeyword, CampusLocation } from "@/data/campusLocations";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  locationId?: string;
}

interface ChatInterfaceProps {
  onLocationChange?: (location: CampusLocation) => void;
}

const getResponse = (input: string): { text: string; location: CampusLocation | null } => {
  const lowerInput = input.toLowerCase();
  const matchedLocation = findLocationByKeyword(input);
  
  if (matchedLocation) {
    return {
      text: `${matchedLocation.icon} **${matchedLocation.name}**\n\n${matchedLocation.details}\n\n*I've updated the 360° view to show you this location!*`,
      location: matchedLocation
    };
  }
  
  if (lowerInput.includes("hello") || lowerInput.includes("hey") || lowerInput.includes("hi")) {
    return {
      text: "Hello! 👋 Welcome to our campus tour! I'm your virtual guide. You can ask me about any location, or click on the location chips to explore:\n\n" + 
            CAMPUS_LOCATIONS.map(l => `${l.icon} ${l.name}`).join("\n") +
            "\n\nWhat would you like to see first?",
      location: null
    };
  }
  
  return {
    text: "I'd be happy to show you around! Try asking about specific locations like:\n\n" +
          CAMPUS_LOCATIONS.map(l => `• ${l.name}`).join("\n") +
          "\n\nOr click on any location chip at the bottom of the map!",
    location: null
  };
};

const QUICK_ACTIONS = CAMPUS_LOCATIONS.filter(l => !l.isPlaceholder).map(loc => ({
  label: loc.name,
  icon: loc.icon,
  locationId: loc.id
}));

const ChatInterface = ({ onLocationChange }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Welcome to our campus! 🎓 I'm your virtual guide. Click on any location chip to explore, or ask me about:\n\n" + 
            CAMPUS_LOCATIONS.map(l => `${l.icon} ${l.name}`).join("\n") +
            "\n\nWhat would you like to see first?",
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate typing delay
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));
    setIsTyping(false);

    // Get bot response
    const response = getResponse(messageText);
    
    // If a location was matched, navigate to it
    if (response.location && onLocationChange) {
      onLocationChange(response.location);
    }

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response.text,
      isBot: true,
      locationId: response.location?.id,
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isBot={message.isBot}
          />
        ))}
        {isTyping && <ChatMessage message="" isBot isTyping />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={() => handleSend(`Tell me about the ${action.label}`)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted hover:bg-muted/80 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about the campus..."
              className="pr-10 h-12 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/50"
            />
            <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <Button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 shadow-lg"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
