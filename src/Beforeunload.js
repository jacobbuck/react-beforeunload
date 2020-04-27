import PropTypes from 'prop-types';
import useBeforeunload from './useBeforeunload';

const Beforeunload = (props) => {
  useBeforeunload(props.onBeforeunload);
  return props.children;
};

Beforeunload.defaultProps = {
  children: null,
};

Beforeunload.propTypes = {
  children: PropTypes.any,
  onBeforeunload: PropTypes.func.isRequired,
};

export default Beforeunload;
