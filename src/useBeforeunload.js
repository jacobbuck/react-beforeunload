import { useEffect, useRef } from 'react';

export const useBeforeunload = (handler) => {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });
  const hasHandler = typeof handler === 'function';
  useEffect(() => {
    if (hasHandler) {
      const listener = (event) => {
        const returnValue = handlerRef.current(event);
        // Handle legacy `event.returnValue` property
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
        if (typeof returnValue === 'string') {
          return (event.returnValue = returnValue);
        }
        // Chrome doesn't support `event.preventDefault()` on `BeforeUnloadEvent`,
        // instead it requires `event.returnValue` to be set
        // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload#browser_compatibility
        if (event.defaultPrevented) {
          return (event.returnValue = '');
        }
      };
      window.addEventListener('beforeunload', listener);
      return () => {
        window.removeEventListener('beforeunload', listener);
      };
    }
  }, [hasHandler]);
};
