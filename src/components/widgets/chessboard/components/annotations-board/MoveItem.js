import React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";

import useChessboard from "hooks/useChessboard";

import { getCssVariable, hexToRgba } from "utils/common";

const MoveItem = ({ moveNumber = "", whiteMove = "", blackMove = "" }) => {
  const { selectedMove, handleSetPosition } = useChessboard();

  const buttonHoverBgColor = hexToRgba(
    getCssVariable("--main-theme-color"),
    0.2
  );

  return (
    <div className="chessboard-annotations-board-moves-item">
      <div>{moveNumber}</div>
      <div>
        {whiteMove ? (
          <Button
            sx={{
              backgroundColor:
                selectedMove?.san === whiteMove && selectedMove?.color === "w"
                  ? "var(--main-theme-color)"
                  : "inherit",
              color:
                selectedMove?.san === whiteMove && selectedMove?.color === "w"
                  ? "white"
                  : "var(--main-theme-color)",
              "&:hover": {
                color: "var(--main-theme-color)",
                backgroundColor: buttonHoverBgColor,
              },
            }}
            onClick={() => handleSetPosition(whiteMove)}
          >
            {whiteMove}
          </Button>
        ) : null}
        {blackMove ? " - " : ""}
        {blackMove ? (
          <Button
            sx={{
              backgroundColor:
                selectedMove?.san === blackMove && selectedMove?.color === "b"
                  ? "var(--main-theme-color)"
                  : "inherit",
              color:
                selectedMove?.san === blackMove && selectedMove?.color === "b"
                  ? "white"
                  : "var(--main-theme-color)",
              "&:hover": {
                color: "var(--main-theme-color)",
                backgroundColor: buttonHoverBgColor,
              },
            }}
            onClick={() => handleSetPosition(blackMove)}
          >
            {blackMove}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

MoveItem.propTypes = {
  moveNumber: PropTypes.string,
  whiteMove: PropTypes.string,
  blackMove: PropTypes.string,
};

export default MoveItem;
