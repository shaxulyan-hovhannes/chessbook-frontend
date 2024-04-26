import { useState, useEffect } from "react";
import * as _ from "lodash";

import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

import Fab from "@mui/material/Fab";
import RNDWidget from "../rnd-widget";
import Button from "@mui/material/Button";

import StartIcon from "@mui/icons-material/Start";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import ListIcon from "@mui/icons-material/List";
import MenuUI from "components/ui/upload-file/menu";
import { ReactComponent as LogoIcon } from "assets/icons/logo-icon.svg";

import useMenu from "hooks/useMenu";

import {
  CHESSBOARD_MAX_SIZE,
  CHESSBOARD_DEFAULT_SIZE,
  POS_X_STORAGE_KEY,
  POS_Y_STORAGE_KEY,
  CHESSBOARD_WIDTH_STORAGE_KEY,
  CHESSBOARD_HEIGHT_STORAGE_KEY,
  CHESSBOARD_START_POSITION,
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
  const [gamePosition, setGamePosition] = useState(game.fen());
  const [currentMove, setCurrentMove] = useState(0);
  const [gameHistory, setGameHistory] = useState([
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0",
  ]);

  // console.log("GAME", game);

  const [boardOrientation, setBoardOrientation] = useState("white");

  const { handleClick, handleClose, open, anchorEl } = useMenu();

  const chessboardPositionX =
    parseInt(localStorage.getItem(POS_X_STORAGE_KEY)) || 0;
  const chessboardPositionY =
    parseInt(localStorage.getItem(POS_Y_STORAGE_KEY)) || 0;

  const onDrop = (sourceSquare, targetSquare, piece) => {
    try {
      const gameCopy = _.cloneDeep(game);
      console.log("DROP MOVE", {
        sourceSquare,
        targetSquare,
      });

      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });

      const position = gameCopy.fen();

      setGamePosition(position);
      setGameHistory([...gameHistory, position]);
      console.log("POSITION", gamePosition);

      setGame(gameCopy);
      setCurrentMove(currentMove + 1);

      if (move === null) return false;

      return true;
    } catch (err) {
      console.log("Illegal move");
    }
  };

  const handleFlipBoard = () => {
    if (boardOrientation === "white") {
      setBoardOrientation("black");
    } else {
      setBoardOrientation("white");
    }
  };

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
      onDoubleClickCapture={({ target }) => {
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

          setShowChessboard(false);
        }
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
      <>
        <h1
          style={{
            position: "absolute",
            zIndex: 111,
            top: -42,
            left: 0,
            fontSize: `clamp(0.5rem, ${
              Math.min(chessboardHeight, chessboardWidth) / 14
            }px, 28px)`,
          }}
        >
          <LogoIcon style={{ width: 32, height: 32 }} />
          CHESS-
          <span style={{ color: "var(--main-theme-color" }}>AMARANTH</span> 0.
          <span style={{ color: "var(--main-theme-color" }}>1</span>
        </h1>
        <Chessboard
          id="myBoard"
          position={gamePosition}
          onPieceDrop={onDrop}
          customDarkSquareStyle={{
            backgroundColor: "var(--main-theme-color)",
          }}
          customLightSquareStyle={{
            backgroundColor: "white",
          }}
          boardOrientation={boardOrientation}
          getPositionObject={(curPosition) => {
            // console.log("cUR", { curPosition, pos: game.fen() });
          }}
        />
        <div
          className="no-drag chessboard-tools"
          title={"Features list"}
          style={{ top: chessboardHeight + 10 }}
        >
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
            onClick={() => {}}
            variant="contained"
            sx={{
              backgroundColor: "var(--main-theme-color)",
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
            onClick={() => {
              try {
                const gameCopy = _.cloneDeep(game);

                // gameCopy.move(gameHistory[currentMove - 1]);

                setGamePosition(gameCopy.fen());
                // console.log("POSITION", gamePosition);

                setGame(gameCopy);
                setCurrentMove(currentMove - 1);

                return true;
              } catch (err) {
                console.log(err);
              }
            }}
            variant="contained"
            sx={{
              backgroundColor: "var(--main-theme-color)",
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
            onClick={() => {
              try {
                const gameCopy = _.cloneDeep(game);

                return true;
              } catch (err) {
                console.log(err);
              }
            }}
            variant="contained"
            sx={{
              backgroundColor: "var(--main-theme-color)",
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
            onClick={() => {}}
            variant="contained"
            sx={{
              backgroundColor: "var(--main-theme-color)",
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
      </>
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
