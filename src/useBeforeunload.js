import { useEffect } from 'react';
import useLatest from 'use-latest';

const useBeforeunload = (handler) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof handler !== 'function' && handler != null) {
      throw new TypeError(
        `Expected \`handler\` to be of type \`function\`, but received type \`${typeof handler}\``
      );
    }
  }

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
