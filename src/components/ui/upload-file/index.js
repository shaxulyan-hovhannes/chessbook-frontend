import React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { readFileAsBase64 } from "utils/upload";

const VisuallyHiddenInput = ({ accept = ".pdf", ...rest }) => {
  return (
    <input
      type="file"
      accept={accept}
      {...rest}
      className="upload-visually-hidden-input"
    />
  );
};

VisuallyHiddenInput.propTypes = {
  accept: PropTypes.string,
};

const UploadFile = ({ onUploadSuccess = () => {}, ...rest }) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{
        backgroundColor: "var(--main-theme-color)",
        "&:hover": {
          backgroundColor: "var(--main-theme-color)",
        },
      }}
      onChange={async (event) => {
        const file = event.target.files[0];

        try {
          const base64String = await readFileAsBase64(file);

          onUploadSuccess(base64String);
        } catch (error) {
          console.error("Ошибка при чтении файла:", error);
        }
      }}
      {...rest}
    >
      Upload PDF book
      <VisuallyHiddenInput type="file" />
    </Button>
  );
};

UploadFile.propTypes = {
  onUploadSuccess: PropTypes.func,
};

export default UploadFile;
