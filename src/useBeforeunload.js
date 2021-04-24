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
      let returnValue;
      if (handlerRef.current != null) {
        returnValue = handlerRef.current(event);
      }

      // Chrome requires `returnValue` to be set.
      if (event.defaultPrevented) {
        event.returnValue = '';
      }

      if (typeof returnValue === 'string') {
        event.returnValue = returnValue;
        return returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeunload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useBeforeunload;
