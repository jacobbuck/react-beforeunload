import PropTypes from "prop-types";
import React from "react";

class Beforeunload extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    onBeforeunload: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener("beforeunload", this.handleBeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeunload);
  }

  handleBeforeunload = event => {
    const { onBeforeunload } = this.props;
    let returnValue;

    if (onBeforeunload) {
      returnValue = onBeforeunload(event);
    }

    if (typeof returnValue === "string") {
      event.returnValue = returnValue;
      return returnValue;
    }
  };

  render() {
    const { children = null } = this.props;
    return children;
  }
}

export default Beforeunload;
