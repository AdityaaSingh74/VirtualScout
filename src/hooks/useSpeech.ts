import { useState, useEffect, useRef, useCallback } from "react";

const cleanForSpeech = (text: string): string => {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/_/g, "")
    .replace(/•/g, "")
    .replace(/\n+/g, ". ")
    .replace(/\s{2,}/g, " ")
    .replace(/\.{2,}/g, ".")
    // strip emojis using a broad range
    .replace(
      /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}]/gu,
      ""
    )
    .trim();
};

export const useSpeech = () => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Store voices in a REF so speak() always reads the latest list
  // without needing voices in its dependency array
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const recognitionRef = useRef<any>(null);
  const isVoiceEnabledRef = useRef(true);

  // Keep ref in sync with state
  useEffect(() => {
    isVoiceEnabledRef.current = isVoiceEnabled;
  }, [isVoiceEnabled]);

  // Load voices — async in most browsers
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      if (list.length > 0) voicesRef.current = list;
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Fallback poll in case onvoiceschanged never fires (some browsers)
    const poll = setInterval(() => {
      if (voicesRef.current.length === 0) loadVoices();
      else clearInterval(poll);
    }, 300);

    return () => {
      clearInterval(poll);
      try { window.speechSynthesis.onvoiceschanged = null; } catch (_) {}
    };
  }, []);

  // Init speech recognition once
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    try {
      const recog = new SR();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = "en-US";
      recog.onstart = () => setIsListening(true);
      recog.onend   = () => setIsListening(false);
      recog.onerror = () => setIsListening(false);
      recognitionRef.current = recog;
    } catch (_) {}

    return () => {
      try { recognitionRef.current?.abort(); } catch (_) {}
    };
  }, []);

  /**
   * speak() — uses voicesRef so it always has the latest voice list
   * even on first call.
   */
  const speak = useCallback((text: string) => {
    if (!isVoiceEnabledRef.current) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    // Cancel any ongoing speech
    try { window.speechSynthesis.cancel(); } catch (_) {}

    const cleaned = cleanForSpeech(text);
    if (!cleaned) return;

    // Retry loop: wait up to 2 s for voices to load
    let attempts = 0;
    const trySpeak = () => {
      const voices = voicesRef.current;

      // If voices still empty, retry after 200 ms (up to 10 times)
      if (voices.length === 0 && attempts < 10) {
        attempts++;
        setTimeout(trySpeak, 200);
        return;
      }

      try {
        const utterance = new SpeechSynthesisUtterance(cleaned);

        const preferred = voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.toLowerCase().includes("google") ||
              v.name.toLowerCase().includes("samantha") ||
              v.name.toLowerCase().includes("daniel") ||
              v.name.toLowerCase().includes("ava") ||
              v.name.toLowerCase().includes("zira"))
        );
        utterance.voice = preferred ?? voices.find((v) => v.lang.startsWith("en")) ?? null;
        utterance.rate   = 1.0;
        utterance.pitch  = 1.05;
        utterance.volume = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend   = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
      } catch (_) {
        setIsSpeaking(false);
      }
    };

    trySpeak();
  }, []); // no deps — reads via refs

  const stopSpeaking = useCallback(() => {
    try { window.speechSynthesis?.cancel(); } catch (_) {}
    setIsSpeaking(false);
  }, []);

  const toggleListening = useCallback(
    (onResult: (transcript: string) => void) => {
      const recog = recognitionRef.current;
      if (!recog) {
        alert("Voice input not supported in this browser. Please use Chrome or Edge.");
        return;
      }
      try {
        if (isListening) {
          recog.abort();
        } else {
          recog.onresult = (e: any) => {
            try {
              onResult(e.results[0][0].transcript);
            } catch (_) {}
          };
          recog.start();
        }
      } catch (_) {
        setIsListening(false);
      }
    },
    [isListening]
  );

  const toggleVoice = useCallback(() => {
    setIsVoiceEnabled((prev) => {
      const next = !prev;
      isVoiceEnabledRef.current = next;
      if (!next) stopSpeaking();
      return next;
    });
  }, [stopSpeaking]);

  return {
    isVoiceEnabled,
    isListening,
    isSpeaking,
    speak,
    stopSpeaking,
    toggleListening,
    toggleVoice,
  };
};
