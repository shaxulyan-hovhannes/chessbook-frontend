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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        backgroundColor: "#d8d8d8",
        border: "1px solid #e2e2e2",
        boxSizing: "content-box",
        padding: 20,
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
