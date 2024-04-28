import { useState, useEffect } from "react";

const useChessboard = () => {
  const [showChessboard, setShowChessboard] = useState(false);

  const toggleShowChessboard = () => {
    setShowChessboard(!showChessboard);
  };

  return {
    toggleShowChessboard,
  };
};

export default useChessboard;
