import { SCREEN_WIDTH } from "./common";

const CHESSBOARD_MAX_SIZE = SCREEN_WIDTH / 3;
const CHESSBOARD_DEFAULT_SIZE = 400;

const POS_X_STORAGE_KEY = "chessboard-pos-x";
const POS_Y_STORAGE_KEY = "chessboard-pos-y";
const CHESSBOARD_WIDTH_STORAGE_KEY = "chessboard-width";
const CHESSBOARD_HEIGHT_STORAGE_KEY = "chessboard-height";

const ANNOTATIONS_BOARD_RADIO_FORM_DATA = [
  {
    key: 1,
    label: "Left",
    value: "left",
  },
  {
    key: 2,
    label: "Bottom",
    value: "bottom",
  },
  {
    key: 3,
    label: "Right",
    value: "right",
  },
];

export {
  CHESSBOARD_MAX_SIZE,
  CHESSBOARD_DEFAULT_SIZE,
  POS_X_STORAGE_KEY,
  POS_Y_STORAGE_KEY,
  CHESSBOARD_WIDTH_STORAGE_KEY,
  CHESSBOARD_HEIGHT_STORAGE_KEY,
  ANNOTATIONS_BOARD_RADIO_FORM_DATA,
};
