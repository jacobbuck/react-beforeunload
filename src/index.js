import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export const useBeforeunload = handler => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleBeforeunload = event => {
      let returnValue;

      if (handlerRef.current) {
        returnValue = handlerRef.current(event);
      }

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
  }, []);
};

export const Beforeunload = props => {
  const { children = null, onBeforeunload } = props;

  useBeforeunload(onBeforeunload);

  return children;
};

Beforeunload.propTypes = {
  children: PropTypes.any,
  onBeforeunload: PropTypes.func.isRequired,
};
