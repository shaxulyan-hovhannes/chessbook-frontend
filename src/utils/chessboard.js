const parsePGN = (pgn = "") => {
  if (typeof pgn !== "string" || !pgn.length) return [];

  return pgn.match(/\d+\.\s\S+(?:\s\S+)?/g) ?? [];
};

export { parsePGN };
