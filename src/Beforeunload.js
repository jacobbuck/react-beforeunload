import PropTypes from 'prop-types';
import useBeforeunload from './useBeforeunload';

const Beforeunload = (props) => {
  useBeforeunload(props.onBeforeunload);
  return props.children;
};

Beforeunload.defaultProps = {
  children: null,
};

if (process.env.NODE_ENV !== 'production') {
  Beforeunload.propTypes = {
    children: PropTypes.any,
    onBeforeunload: PropTypes.func.isRequired,
  };
}

export default Beforeunload;
