import React, { lazy, Suspense } from "react";

import ChessboardProvider from "components/widgets/chessboard/components/chessboard-provider";

const PDFViewer = lazy(() => import("components/widgets/pdf-viewer"));
const ChessboardWidget = lazy(() => import("components/widgets/chessboard"));

function App() {
  return (
    <ChessboardProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Suspense fallback="">
          <PDFViewer />
        </Suspense>
        <Suspense fallback="">
          <ChessboardWidget />
        </Suspense>
      </div>
    </ChessboardProvider>
  );
}

export default App;
