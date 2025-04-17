import { KeyboardEvent, useCallback, useEffect, useLayoutEffect, useRef } from "react";

type keys = string[];
type eventHandler = (event: KeyboardEvent) => void;
type node = null | HTMLElement;

export default function useKeyPress( keys:keys, callback:eventHandler, node:node = null) {
  //Callback ref pattern to remove the callback from the dependency array
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  })

  const handleKeyPress = useCallback((event: Event) => {
    const e = event as unknown as KeyboardEvent
      if (keys.some((key:string) => e.key === key)) {
        callbackRef.current(e);
      }
  }, [keys]);
  
  useEffect(() => {
    // target is either the provided node or the document
    const targetNode = node ?? document;
    
    if (targetNode) {
      targetNode.addEventListener("keydown", handleKeyPress);
    }

    return () =>
      targetNode &&
      targetNode.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress, node]);
}