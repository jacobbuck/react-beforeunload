import { useEffect } from 'react';
import invariant from 'tiny-invariant';
import useLatest from 'use-latest';

const useBeforeunload = (handler) => {
  invariant(
    handler == null || typeof handler === 'function',
    'Expected `handler` to be a function'
  );

  const handlerRef = useLatest(handler);

  useEffect(() => {
    const handleBeforeunload = (event) => {
      const returnValue = handlerRef.current?.(event);

      if (typeof returnValue === 'string') {
        event.returnValue = returnValue;
        return returnValue;
      }

      // Chrome doesn't support `event.preventDefault()` on `BeforeUnloadEvent`,
      // instead it requires `event.returnValue` to be set.
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload#browser_compatibility
      if (event.defaultPrevented) {
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeunload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useBeforeunload;
