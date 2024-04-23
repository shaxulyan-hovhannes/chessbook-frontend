import React, { lazy, Suspense } from "react";

const PDFViewer = lazy(() => import("components/widgets/pdf-viewer"));
const ChessboardWidget = lazy(() => import("components/widgets/chessboard"));

function App() {
  return (
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
  );
}

export default App;
