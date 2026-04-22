import { useEffect, useState } from "react";
import AvatarGuide from "./AvatarGuide";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  isTyping?: boolean;
  timestamp?: string;
}

// Parses **bold** and newlines from text
const renderMarkdown = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={j} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
};

const ChatMessage = ({ message, isBot, isTyping = false, timestamp }: ChatMessageProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isBot && !isTyping && message) {
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
      }, 12);

      return () => clearInterval(timer);
    } else {
      setDisplayedText(message);
      setIsAnimating(false);
    }
  }, [message, isBot, isTyping]);

  if (isTyping) {
    return (
      <div className="flex items-end gap-3 animate-fade-in">
        <div className="flex-shrink-0">
          <AvatarGuide state="thinking" size="sm" />
        </div>
        <div className="chat-bubble-bot px-4 py-3 max-w-[80%] flex items-center gap-1.5">
          <span className="w-2 h-2 bg-primary/50 rounded-full animate-typing" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-primary/50 rounded-full animate-typing" style={{ animationDelay: "200ms" }} />
          <span className="w-2 h-2 bg-primary/50 rounded-full animate-typing" style={{ animationDelay: "400ms" }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-end gap-3 ${isBot ? "" : "flex-row-reverse"}`}>
      {isBot && (
        <div className="flex-shrink-0">
          <AvatarGuide state={isAnimating ? "talking" : "idle"} size="sm" />
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[78%] ${isBot ? "" : "items-end"}`}>
        <div
          className={`px-4 py-3 text-sm leading-relaxed ${
            isBot
              ? "chat-bubble-bot rounded-2xl rounded-bl-sm"
              : "chat-bubble-user rounded-2xl rounded-br-sm"
          }`}
        >
          <span className="whitespace-pre-wrap">{renderMarkdown(displayedText)}</span>
          {isBot && isAnimating && (
            <span className="inline-block w-0.5 h-3.5 bg-primary ml-0.5 animate-pulse rounded-full align-middle" />
          )}
        </div>
        {timestamp && (
          <span className="text-[10px] text-muted-foreground px-1">{timestamp}</span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
