import { useEffect, useContext } from "react";

import { ChessboardContext } from "components/widgets/chessboard/components/chessboard-provider";

import {
  CHESSBOARD_MAX_SIZE,
  POS_X_STORAGE_KEY,
  POS_Y_STORAGE_KEY,
  CHESSBOARD_WIDTH_STORAGE_KEY,
  CHESSBOARD_HEIGHT_STORAGE_KEY,
} from "constants/chessboard";

const useChessboard = () => {
  const {
    game,
    showChessboard,
    setShowChessboard,
    chessboardWidth,
    setChessboardWidth,
    chessboardHeight,
    setChessboardHeight,
    onResizeStop,
    handleDoubleClickCapture,
    toggleShow,
    onDrop,
    onStartPosition,
    onUndoPosition,
    onRedoPosition,
    onFinalPosition,
    boardOrientation,
    handleFlipBoard,
    showAnnotationsBoard,
    handleOpenAnnotationBoard,
    handleCloseAnnotationsBoard,
    parsedPGN,
    selectedMove,
    handleSetPosition,
  } = useContext(ChessboardContext);

  const chessboardPositionX =
    parseInt(localStorage.getItem(POS_X_STORAGE_KEY)) || 20;
  const chessboardPositionY =
    parseInt(localStorage.getItem(POS_Y_STORAGE_KEY)) || 50;

  useEffect(() => {
    const storageChessboardWidth = parseInt(
      localStorage.getItem(CHESSBOARD_WIDTH_STORAGE_KEY)
    );

    const storageChessboardHeight = parseInt(
      localStorage.getItem(CHESSBOARD_HEIGHT_STORAGE_KEY)
    );

    if (storageChessboardWidth > 0) {
      setChessboardWidth(storageChessboardWidth);
    }

    if (storageChessboardHeight > 0) {
      setChessboardHeight(storageChessboardHeight);
    }

    if (chessboardPositionX > 20 || chessboardPositionY > 50) {
      setShowChessboard(true);
    }
  }, [
    chessboardPositionX,
    chessboardPositionY,
    setChessboardHeight,
    setChessboardWidth,
    setShowChessboard,
  ]);

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
    }, 150);
    // ADD-TO-DO Need to refactor
  }, [
    showChessboard,
    chessboardWidth,
    chessboardHeight,
    chessboardPositionX,
    chessboardPositionY,
  ]);

  return {
    game,
    showChessboard,
    toggleShow,
    chessboardWidth,
    chessboardHeight,
    handleDoubleClickCapture,
    onResizeStop,
    onDrop,
    onStartPosition,
    onUndoPosition,
    onRedoPosition,
    onFinalPosition,
    boardOrientation,
    handleFlipBoard,
    showAnnotationsBoard,
    handleOpenAnnotationBoard,
    handleCloseAnnotationsBoard,
    parsedPGN,
    selectedMove,
    handleSetPosition,
  };
};

export default useChessboard;
