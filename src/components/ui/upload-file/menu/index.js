import React from "react";
import PropTypes from "prop-types";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const MenuUI = ({
  handleClose = () => {},
  open = false,
  anchorEl = null,
  width = "100%",
  menuItems = [],
  ...rest
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{
        width,
        top: 10,
        zIndex: "10 !important",
        "& .MuiPopover-paper": {
          width: "100%",
        },
      }}
      {...rest}
    >
      {menuItems.map(({ renderer = "", handleClick = () => {}, key }) => (
        <MenuItem key={key} onClick={handleClick}>
          {renderer}
        </MenuItem>
      ))}
    </Menu>
  );
};

MenuUI.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  anchorEl: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  menuItems: PropTypes.array,
};

export default MenuUI;
