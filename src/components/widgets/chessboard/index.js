import React from "react";

import { Chessboard } from "react-chessboard";

import Fab from "@mui/material/Fab";
import RNDWidget from "../rnd-widget";
import ChessboardTools from "./components/chessboard-tools";

import { ReactComponent as LogoIcon } from "assets/icons/logo-icon.svg";

import useChessboard from "hooks/useChessboard";

import {
  CHESSBOARD_MAX_SIZE,
  POS_X_STORAGE_KEY,
  POS_Y_STORAGE_KEY,
} from "constants/chessboard";

const ChessboardWidget = () => {
  const {
    game,
    showChessboard,
    toggleShow,
    onResizeStop,
    handleDoubleClickCapture,
    chessboardWidth,
    chessboardHeight,
    onDrop,
    boardOrientation,
  } = useChessboard();

  const chessboardPositionX =
    parseInt(localStorage.getItem(POS_X_STORAGE_KEY)) || 0;
  const chessboardPositionY =
    parseInt(localStorage.getItem(POS_Y_STORAGE_KEY)) || 0;

  return showChessboard ? (
    <RNDWidget
      title="Double click for close the chessboard"
      onDoubleClickCapture={handleDoubleClickCapture}
      className="chessboard-fixed-wrapper"
      cancel=".no-drag"
      size={{ width: chessboardWidth, height: chessboardHeight }}
      default={{
        x: Math.round(chessboardPositionX / 2),
        y: Math.round(chessboardPositionY / 2),
      }}
      maxWidth={CHESSBOARD_MAX_SIZE}
      maxHeight={CHESSBOARD_MAX_SIZE}
      onResize={() => {
        return false;
      }}
      onResizeStop={onResizeStop}
      onDrag={(e, data) => {
        const rndNode = data.node;

        rndNode.style.left = `${data.lastX}px`;
        rndNode.style.top = `${data.lastY}px`;

        localStorage.setItem(POS_X_STORAGE_KEY, data.lastX);
        localStorage.setItem(POS_Y_STORAGE_KEY, data.lastY);
      }}
    >
      <>
        <div
          className="chessboard-logo"
          style={{
            fontSize: `clamp(0.5rem, ${
              Math.min(chessboardHeight, chessboardWidth) / 14
            }px, 28px)`,
          }}
        >
          <LogoIcon style={{ width: 32, height: 32 }} />
          CHESS-
          <span style={{ color: "var(--main-theme-color" }}>AMARANTH</span> 0.
          <span style={{ color: "var(--main-theme-color" }}>1</span>
        </div>
        <Chessboard
          id="myBoard"
          position={game.fen()}
          onPieceDrop={onDrop}
          customDarkSquareStyle={{
            backgroundColor: "var(--main-theme-color)",
          }}
          customLightSquareStyle={{
            backgroundColor: "white",
          }}
          boardOrientation={boardOrientation}
        />
        <ChessboardTools />
      </>
    </RNDWidget>
  ) : (
    <div className="chessboard-show">
      <Fab
        onClick={() => {
          toggleShow();
        }}
        variant="extended"
        size="medium"
        color="primary"
        sx={{
          backgroundColor: "var(--main-theme-color)",
          "&:hover": {
            backgroundColor: "var(--main-theme-color)",
          },
        }}
      >
        Show Chessboard
      </Fab>
    </div>
  );
};

export default ChessboardWidget;
