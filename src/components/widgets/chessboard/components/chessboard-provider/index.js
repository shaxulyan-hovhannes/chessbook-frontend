import { createContext, useState } from "react";
import * as _ from "lodash";
import { Chess } from "chess.js";

import {
  CHESSBOARD_DEFAULT_SIZE,
  POS_X_STORAGE_KEY,
  POS_Y_STORAGE_KEY,
  CHESSBOARD_WIDTH_STORAGE_KEY,
  CHESSBOARD_HEIGHT_STORAGE_KEY,
} from "constants/chessboard";

export const ChessboardContext = createContext();

const ChessboardProvider = ({ children }) => {
  const [game, setGame] = useState(new Chess());

  console.log("GAME PGN", game.pgn());

  const [showChessboard, setShowChessboard] = useState(false);

  const [chessboardWidth, setChessboardWidth] = useState(
    CHESSBOARD_DEFAULT_SIZE
  );
  const [chessboardHeight, setChessboardHeight] = useState(
    CHESSBOARD_DEFAULT_SIZE
  );
  const [currentMove, setCurrentMove] = useState(1);

  const [movesHistory, setMovesHistory] = useState({});

  const [boardOrientation, setBoardOrientation] = useState("white");

  const toggleShow = (bool = null) => {
    setShowChessboard(bool ?? !showChessboard);
  };

  const onDrop = (sourceSquare, targetSquare, piece) => {
    try {
      const gameCopy = _.cloneDeep(game);

      const movePayload = {
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      };

      const move = gameCopy.move(movePayload);

      if (move === null) return false;

      const newMovesHistory = {
        ...movesHistory,
        [currentMove]: move,
      };

      const movesHistoryLength = Object.keys(newMovesHistory).length;

      console.log({
        currentMove,
        movesHistoryLength,
      });

      if (currentMove < movesHistoryLength) {
        let moveIndex = currentMove;

        while (++moveIndex <= movesHistoryLength) {
          delete newMovesHistory[moveIndex];
        }
      }

      setMovesHistory(newMovesHistory);

      setCurrentMove(currentMove + 1);

      setGame(gameCopy);

      return true;
    } catch (err) {
      console.log("Illegal move");
    }
  };

  const onStartPosition = () => {
    try {
      if (currentMove <= 1) {
        return;
      }

      const gameCopy = _.cloneDeep(game);

      let moveIndex = currentMove;

      while (moveIndex >= 1) {
        gameCopy.undo();

        moveIndex--;
      }

      setGame(gameCopy);
      setCurrentMove(1);
    } catch (err) {
      throw err;
    }
  };

  const onUndoPosition = () => {
    try {
      if (currentMove <= 1) return;

      const gameCopy = _.cloneDeep(game);

      gameCopy.undo();

      setGame(gameCopy);

      setCurrentMove(currentMove - 1);

      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const onRedoPosition = () => {
    try {
      const movesHistoryLength = Object.keys(movesHistory).length;

      if (currentMove > movesHistoryLength) return;

      const gameCopy = _.cloneDeep(game);

      const targetMoveItem = movesHistory[currentMove];

      gameCopy.move({
        from: targetMoveItem.from,
        to: targetMoveItem.to,
      });

      setGame(gameCopy);

      setCurrentMove(currentMove + 1);

      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const onFinalPosition = () => {
    try {
      const movesHistoryLength = Object.keys(movesHistory).length;

      if (currentMove > movesHistoryLength) return;

      const gameCopy = _.cloneDeep(game);

      let moveIndex = currentMove;

      while (moveIndex <= movesHistoryLength) {
        const { from, to } = movesHistory[moveIndex];

        gameCopy.move({
          from: from,
          to: to,
        });
        moveIndex++;
      }

      setGame(gameCopy);
      setCurrentMove(movesHistoryLength + 1);

      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const handleFlipBoard = () => {
    if (boardOrientation === "white") {
      setBoardOrientation("black");
    } else {
      setBoardOrientation("white");
    }
  };

  const handleDoubleClickCapture = ({ target }) => {
    const targetClassList = Array.from(target.classList);
    const targetParentNode = target.parentNode;
    const targetDataset = Object.keys({
      ...target.dataset,
    });
    const targetParentNodeDataset = Object.keys({
      ...targetParentNode.dataset,
    });

    if (
      (targetClassList &&
        targetClassList.includes("chessboard-fixed-wrapper")) ||
      (targetParentNode.nodeName === "DIV" &&
        typeof targetParentNode.dataset.square === "string" &&
        !!targetParentNode.dataset.square.length) ||
      (target.nodeName === "svg" && !targetDataset.includes("noClose")) ||
      (target.nodeName === "path" &&
        !targetParentNodeDataset.includes("noClose"))
    ) {
      localStorage.removeItem(POS_X_STORAGE_KEY);
      localStorage.removeItem(POS_Y_STORAGE_KEY);
      localStorage.removeItem(CHESSBOARD_WIDTH_STORAGE_KEY);
      localStorage.removeItem(CHESSBOARD_HEIGHT_STORAGE_KEY);

      setChessboardWidth(CHESSBOARD_DEFAULT_SIZE);
      setChessboardHeight(CHESSBOARD_DEFAULT_SIZE);

      toggleShow(false);
    }
  };

  const onResizeStop = (e, direction, ref) => {
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

    const boardMinSize = Math.floor(CHESSBOARD_DEFAULT_SIZE / 2);

    const halfOfWidth = Math.round((width / 100) * 50);

    if (Math.round(width + halfOfWidth) < height) {
      width += halfOfWidth;
    }

    if (width < boardMinSize || height < boardMinSize) {
      width = boardMinSize;
      height = width;
    }

    if (height < width) {
      width = height;
    }

    setChessboardWidth(width);
    setChessboardHeight(height);

    localStorage.setItem(CHESSBOARD_WIDTH_STORAGE_KEY, width);
    localStorage.setItem(CHESSBOARD_HEIGHT_STORAGE_KEY, height);
  };

  const value = {
    game,
    showChessboard,
    setShowChessboard,
    chessboardWidth,
    setChessboardWidth,
    chessboardHeight,
    setChessboardHeight,
    handleDoubleClickCapture,
    onResizeStop,
    toggleShow,
    onDrop,
    onStartPosition,
    onUndoPosition,
    onRedoPosition,
    onFinalPosition,
    boardOrientation,
    handleFlipBoard,
  };

  return (
    <ChessboardContext.Provider value={value}>
      {children}
    </ChessboardContext.Provider>
  );
};

export default ChessboardProvider;
