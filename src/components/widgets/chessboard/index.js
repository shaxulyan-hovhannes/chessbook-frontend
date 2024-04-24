import { useState, useEffect } from "react";

import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

import Fab from "@mui/material/Fab";
import RNDWidget from "../rnd-widget";

import {
  CHESSBOARD_MAX_SIZE,
  CHESSBOARD_DEFAULT_SIZE,
  POS_X_STORAGE_KEY,
  POS_Y_STORAGE_KEY,
  CHESSBOARD_WIDTH_STORAGE_KEY,
  CHESSBOARD_HEIGHT_STORAGE_KEY,
} from "constants/chessboard";

const ChessboardWidget = () => {
  const [showChessboard, setShowChessboard] = useState(false);
  const [chessboardWidth, setChessboardWidth] = useState(
    CHESSBOARD_DEFAULT_SIZE
  );
  const [chessboardHeight, setChessboardHeight] = useState(
    CHESSBOARD_DEFAULT_SIZE
  );

  const [game, setGame] = useState(new Chess());

  const chessboardPositionX =
    parseInt(localStorage.getItem(POS_X_STORAGE_KEY)) || 0;
  const chessboardPositionY =
    parseInt(localStorage.getItem(POS_Y_STORAGE_KEY)) || 0;

  function onDrop(sourceSquare, targetSquare, piece) {
    try {
      const gameCopy = Object.create(game);
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });
      setGame(gameCopy);

      if (move === null) return false;

      return true;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      const chessboard = document.querySelector('div[data-boardid="myBoard"]');

      if (showChessboard && chessboard) {
        chessboard.classList?.add("no-drag");

        chessboard.style.maxWidth = `${CHESSBOARD_MAX_SIZE}px`;
        chessboard.style.maxHeight = `${CHESSBOARD_MAX_SIZE}px`;

        const rndElement = document.querySelector(".chessboard-fixed-wrapper");

        rndElement.style.left = `${chessboardPositionX}px`;
        rndElement.style.top = `${chessboardPositionY}px`;
      }
    }, 300);
  }, [showChessboard, chessboardWidth, chessboardHeight]);

  useEffect(() => {
    const storageChessboardWidth = parseInt(
      localStorage.getItem("chessboard-width")
    );

    const storageChessboardHeight = parseInt(
      localStorage.getItem("chessboard-height")
    );

    if (storageChessboardWidth > 0) {
      setChessboardWidth(storageChessboardWidth);
    }

    if (storageChessboardHeight > 0) {
      setChessboardHeight(storageChessboardHeight);
    }

    if (chessboardPositionX || chessboardPositionY) {
      setShowChessboard(true);
    }
  }, []);

  return showChessboard ? (
    <RNDWidget
      title="Double click for close the chessboard"
      onDoubleClick={() => {
        localStorage.removeItem(POS_X_STORAGE_KEY);
        localStorage.removeItem(POS_Y_STORAGE_KEY);
        localStorage.removeItem(CHESSBOARD_WIDTH_STORAGE_KEY);
        localStorage.removeItem(CHESSBOARD_HEIGHT_STORAGE_KEY);

        setChessboardWidth(CHESSBOARD_DEFAULT_SIZE);
        setChessboardHeight(CHESSBOARD_DEFAULT_SIZE);

        setShowChessboard(false);
      }}
      className="chessboard-fixed-wrapper"
      cancel=".no-drag"
      size={{ width: chessboardWidth, height: chessboardHeight }}
      default={{
        x: Math.round(chessboardPositionX / 2),
        y: Math.round(chessboardPositionY / 2),
      }}
      maxWidth={CHESSBOARD_MAX_SIZE}
      maxHeight={CHESSBOARD_MAX_SIZE}
      onResizeStop={(e, direction, ref) => {
        let width = parseInt(ref.style.width);
        let height = parseInt(ref.style.height);

        if (direction === "left" || direction === "right") {
          height = width;
        } else if (
          direction === "topRight" ||
          direction === "topLeft" ||
          direction === "bottomRight" ||
          direction === "bottomLeft"
        ) {
          width = Math.max(width, height);
          height = width;
        }

        localStorage.setItem(CHESSBOARD_WIDTH_STORAGE_KEY, width);
        localStorage.setItem(CHESSBOARD_HEIGHT_STORAGE_KEY, height);

        setChessboardWidth(width);
        setChessboardHeight(height);
      }}
      onDrag={(e, data) => {
        const rndNode = data.node;

        rndNode.style.left = `${data.lastX}px`;
        rndNode.style.top = `${data.lastY}px`;

        localStorage.setItem(POS_X_STORAGE_KEY, data.lastX);
        localStorage.setItem(POS_Y_STORAGE_KEY, data.lastY);
      }}
    >
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
      />
    </RNDWidget>
  ) : (
    <div className="chessboard-show">
      <Fab
        onClick={() => {
          setShowChessboard(!showChessboard);
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
