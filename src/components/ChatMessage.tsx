import { useEffect, useState } from "react";
import AvatarGuide from "./AvatarGuide";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  isTyping?: boolean;
}

const ChatMessage = ({ message, isBot, isTyping = false }: ChatMessageProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isBot && !isTyping) {
      // Typewriter effect for bot messages
      let index = 0;
      setDisplayedText("");
      setIsAnimating(true);

      const timer = setInterval(() => {
        if (index < message.length) {
          setDisplayedText(message.slice(0, index + 1));
          index++;
        } else {
          setIsAnimating(false);
          clearInterval(timer);
        }
      }, 20);

      return () => clearInterval(timer);
    } else {
      setDisplayedText(message);
      setIsAnimating(false);
    }
  }, [message, isBot, isTyping]);

  if (isTyping) {
    return (
      <div className="flex items-end gap-3 animate-fade-in">
        <AvatarGuide state="thinking" size="sm" />
        <div className="chat-bubble-bot px-4 py-3 max-w-[80%]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-typing" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-typing" style={{ animationDelay: "200ms" }} />
            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-typing" style={{ animationDelay: "400ms" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-end gap-3 ${
        isBot ? "animate-slide-in-left" : "flex-row-reverse animate-slide-in-right"
      }`}
    >
      {isBot && <AvatarGuide state={isAnimating ? "talking" : "idle"} size="sm" />}
      <div
        className={`px-4 py-3 max-w-[80%] ${
          isBot ? "chat-bubble-bot" : "chat-bubble-user"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{displayedText}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
