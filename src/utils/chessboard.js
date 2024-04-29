const parseMovesHistoryToPGN = (movesHistory = []) => {
  if (!Array.isArray(movesHistory) || !movesHistory.length) {
    return [];
  }

  const output = [];

  let moveNumber = 1;

  for (let i = 0; i < movesHistory.length; i += 2) {
    const whiteMove = movesHistory[i]?.san ?? "";

    const blackMove = movesHistory[i + 1]?.san ?? "";

    output.push({ moveNumber: `${moveNumber}.`, whiteMove, blackMove });

    moveNumber++;
  }

  return output;
};

export { parseMovesHistoryToPGN };
