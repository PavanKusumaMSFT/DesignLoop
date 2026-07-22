import { useState, useEffect, useRef, RefObject } from "react";

export interface UseTypewriterOptions {
  /** The full text to type out. */
  text: string;
  /** Typing starts when this becomes true. */
  enabled: boolean;
  /** Milliseconds per character (default 20). */
  speed?: number;
  /** Scrollable container — auto-scrolled every N characters. */
  scrollRef?: RefObject<HTMLDivElement | null>;
  /** How often to auto-scroll (default 10 characters). */
  scrollEveryNChars?: number;
  /** Called once when typing finishes. */
  onComplete?: () => void;
}

export interface UseTypewriterResult {
  /** The portion of `text` revealed so far. */
  typedText: string;
  /** True once the full text has been typed out. */
  isComplete: boolean;
}

/**
 * Reusable typewriter hook — types `text` character-by-character when `enabled`
 * becomes true.  Auto-scrolls a container ref and fires `onComplete` at the end.
 */
export function useTypewriter({
  text,
  enabled,
  speed = 20,
  scrollRef,
  scrollEveryNChars = 10,
  onComplete,
}: UseTypewriterOptions): UseTypewriterResult {
  const [typedText, setTypedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  // Capture onComplete in a ref so the interval callback never goes stale.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Capture text in a ref so typing always uses the value present when
  // `enabled` first turned true (matches existing behaviour — the effect
  // dependency list intentionally does NOT re-trigger on text changes).
  const textRef = useRef(text);
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    if (!enabled) return;

    let currentIndex = 0;
    const targetText = textRef.current;

    const typeInterval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setTypedText(targetText.slice(0, currentIndex));
        currentIndex++;
        // Auto-scroll every N characters
        if (
          scrollRef?.current &&
          currentIndex % scrollEveryNChars === 0
        ) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      } else {
        clearInterval(typeInterval);
        setIsComplete(true);
        onCompleteRef.current?.();
      }
    }, speed);

    return () => clearInterval(typeInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return { typedText, isComplete };
}
