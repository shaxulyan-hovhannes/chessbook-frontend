import React, { useState } from "react";

import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import RadioButtonMUI from "components/ui/radio-button";
import MoveItem from "./MoveItem";

import useChessboard from "hooks/useChessboard";

import { ANNOTATIONS_BOARD_RADIO_FORM_DATA } from "constants/chessboard";

import CloseIcon from "@mui/icons-material/Close";

const ChessboardAnnotationsBoard = () => {
  const { chessboardWidth, parsedPGN } = useChessboard();

  const [boardPosition, setBoardPosition] = useState(
    ANNOTATIONS_BOARD_RADIO_FORM_DATA[1].value
  );

  return (
    <div
      className={`chessboard-annotations-board chessboard-annotations-board-${boardPosition}`}
      style={{ width: chessboardWidth }}
      title=""
    >
      <div className="chessboard-annotations-board-header">
        <p>Annotations</p>
        <Button>
          <CloseIcon data-no-close />
        </Button>
      </div>
      <div>
        <RadioGroup
          row
          value={boardPosition}
          onChange={(_, value) => {
            setBoardPosition(value);
          }}
        >
          {ANNOTATIONS_BOARD_RADIO_FORM_DATA.map((radio) => (
            <RadioButtonMUI {...radio} />
          ))}
        </RadioGroup>
      </div>
      <div className="chessboard-annotations-board-moves">
        {parsedPGN.map((move) => (
          <MoveItem {...move} key={JSON.stringify(move)} />
        ))}
      </div>
    </div>
  );
};

export default ChessboardAnnotationsBoard;
