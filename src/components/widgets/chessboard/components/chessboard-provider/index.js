import { createContext, useMemo, useState } from "react";

import useChessboard from "hooks/useChessboard";

export const ChessboardContext = createContext();

const ChessboardProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [buyersHistoryItems, setBuyersHistoryItems] = useState([]);

  const { toggleShowChessboard } = useChessboard();

  const handleSetProducts = async (products) => {
    setProducts(products);
  };

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSetBuyersHistoryItems = (items) => {
    setBuyersHistoryItems(items);
  };

  const value = useMemo(
    () => ({
      toggleShowChessboard,
    }),
    [handleSetProducts, products, selectedProduct]
  );

  return (
    <ChessboardContext.Provider value={value}>
      {children}
    </ChessboardContext.Provider>
  );
};

export default ChessboardProvider;
