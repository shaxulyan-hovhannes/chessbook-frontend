import { useState, useEffect } from "react";

const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (!!anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);

  return {
    open,
    anchorEl,
    handleClick,
    handleClose,
  };
};

export default useMenu;
