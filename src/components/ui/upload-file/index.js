import React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { readFileAsBase64 } from "utils/upload";

const VisuallyHiddenInput = () => {
  return <input type="file" className="upload-visually-hidden-input" />;
};

const UploadFile = ({ onUploadSuccess = () => {} }) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      onChange={async (event) => {
        const file = event.target.files[0];

        try {
          const base64String = await readFileAsBase64(file);

          console.log(base64String);

          onUploadSuccess(base64String);
        } catch (error) {
          console.error("Ошибка при чтении файла:", error);
        }
      }}
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
