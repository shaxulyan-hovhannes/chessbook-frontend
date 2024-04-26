import React from "react";
import PropTypes from "prop-types";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

const MenuUI = ({
  handleClose = () => {},
  open = false,
  anchorEl = null,
  width = "100%",
  menuItems = [
    {
      renderer: (
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <FormatListNumberedIcon />
          Annotations
        </div>
      ),
      handleClick: () => {},
      key: "1",
    },
    {
      renderer: (
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <AccountTreeIcon />
          Analysis
        </div>
      ),
      handleClick: () => {},
      key: "2",
    },
  ],
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
