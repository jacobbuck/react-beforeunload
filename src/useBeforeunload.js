import { useEffect, useRef } from 'react';

/**
 * React hook that listens to `beforeunload` window event.
 * @function
 * @param {?function(BeforeUnloadEvent): ?string} handler - Event listener
 *   called on `beforeunload` window event. It activates a confirmation dialog
 *   when `event.preventDefault()` is called or a string is returned.
 */
export const useBeforeunload = (handler) => {
  const enabled = typeof handler === 'function';

  // Persist handler in ref
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (enabled) {
      const listener = (event) => {
        const returnValue = handlerRef.current(event);

        if (typeof returnValue === 'string') {
          event.preventDefault();
          // Handle legacy `event.returnValue` and `return` activation.
          // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event#compatibility_notes
          return (event.returnValue = returnValue);
        }

        // Chrome doesn't support `event.preventDefault()` on `BeforeUnloadEvent`.
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event#compatibility_notes
        if (event.defaultPrevented) {
          return (event.returnValue = '');
        }
      };

      window.addEventListener('beforeunload', listener);
      return () => {
        window.removeEventListener('beforeunload', listener);
      };
    }
  }, [enabled]);
};
