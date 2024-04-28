import React from "react";

import MenuUI from "components/ui/upload-file/menu";
import Button from "@mui/material/Button";

import useChessboard from "hooks/useChessboard";
import useMenu from "hooks/useMenu";

import StartIcon from "@mui/icons-material/Start";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import ListIcon from "@mui/icons-material/List";

const ChessboardTools = () => {
  const {
    chessboardWidth,
    onStartPosition,
    onUndoPosition,
    onRedoPosition,
    onFinalPosition,
    handleFlipBoard,
    handleOpenAnnotationBoard,
  } = useChessboard();

  const { handleClick, handleClose, open, anchorEl } = useMenu();

  return (
    <div className="no-drag chessboard-tools" title={"Features list"}>
      {/* Menu list */}
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          backgroundColor: "var(--main-theme-color)",
          "&:hover": {
            backgroundColor: "var(--main-theme-color)",
          },
        }}
        className="no-drag"
      >
        <ListIcon data-no-close />
      </Button>
      <Button
        title="Go to the start position"
        onClick={onStartPosition}
        variant="contained"
        sx={{
          backgroundColor: "var(--main-theme-color)",
          border: "1px solid white",
          "&:hover": {
            backgroundColor: "var(--main-theme-color)",
          },
        }}
        className="no-drag"
      >
        <StartIcon
          data-no-close
          sx={{
            transform: "rotateY(180deg)",
          }}
        />
      </Button>
      {/* Undo move */}
      <Button
        title="Undo the move"
        // disabled={currentMove <= 1}
        onClick={onUndoPosition}
        variant="contained"
        sx={{
          backgroundColor: "var(--main-theme-color)",
          border: "1px solid white",
          "&:hover": {
            backgroundColor: "var(--main-theme-color)",
          },
        }}
        className="no-drag"
      >
        <ArrowForwardIosIcon
          data-no-close
          sx={{
            transform: "rotateY(180deg)",
          }}
        />
      </Button>
      <Button
        title="Flip the board"
        onClick={handleFlipBoard}
        variant="contained"
        sx={{
          backgroundColor: "var(--main-theme-color)",
          "&:hover": {
            backgroundColor: "var(--main-theme-color)",
          },
        }}
        className="no-drag"
      >
        <FlipCameraAndroidIcon data-no-close />
      </Button>
      {/* Redo move */}
      <Button
        title="Redo the move"
        onClick={onRedoPosition}
        variant="contained"
        sx={{
          backgroundColor: "var(--main-theme-color)",
          border: "1px solid white",
          "&:hover": {
            backgroundColor: "var(--main-theme-color)",
          },
        }}
        className="no-drag"
      >
        <ArrowForwardIosIcon data-no-close />
      </Button>
      <Button
        title="Go to the final position"
        onClick={onFinalPosition}
        variant="contained"
        sx={{
          backgroundColor: "var(--main-theme-color)",
          border: "1px solid white",
          "&:hover": {
            backgroundColor: "var(--main-theme-color)",
          },
        }}
        className="no-drag"
      >
        <StartIcon data-no-close />
      </Button>
      <MenuUI
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        width={chessboardWidth}
      />
    </div>
  );
};

export default ChessboardTools;
