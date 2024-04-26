import React from "react";
import PropTypes from "prop-types";

import { Rnd } from "react-rnd";

const RNDWidget = ({ children, ...rest }) => {
  return (
    <Rnd
      bounds="window"
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      {...rest}
    >
      {children}
    </Rnd>
  );
};

RNDWidget.propTypes = {
  children: PropTypes.node,
};

export default RNDWidget;
