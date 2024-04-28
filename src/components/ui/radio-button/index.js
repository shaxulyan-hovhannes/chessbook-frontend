import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const RadioButtonMUI = ({ label, value, ...rest }) => {
  return (
    <FormControlLabel
      value={value}
      control={
        <Radio
          sx={{
            padding: "5px",
            color: "var( --main-theme-color)",
            "& .MuiSvgIcon-root": {
              fontSize: 19,
            },
            "&.Mui-checked": {
              color: "var( --main-theme-color)",
            },
          }}
        />
      }
      label={label}
      {...rest}
    />
  );
};

export default RadioButtonMUI;
