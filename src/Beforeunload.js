import PropTypes from 'prop-types';
import useBeforeunload from './useBeforeunload';

const Beforeunload = ({ children = null, onBeforeunload }) => {
  useBeforeunload(onBeforeunload);
  return children;
};

if (process.env.NODE_ENV !== 'production') {
  Beforeunload.propTypes = {
    children: PropTypes.any,
    onBeforeunload: PropTypes.func.isRequired,
  };
}

export default Beforeunload;
