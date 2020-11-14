import PropTypes from 'prop-types';
import useBeforeunload from './useBeforeunload';

const Beforeunload = ({ children = null, onBeforeunload }) => {
  useBeforeunload(onBeforeunload);
  return children;
};

Beforeunload.propTypes /* remove-proptypes */ = {
  children: PropTypes.any,
  onBeforeunload: PropTypes.func.isRequired,
};

export default Beforeunload;
