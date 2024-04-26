import React, { lazy, Suspense, useEffect } from "react";

const PDFViewer = lazy(() => import("components/widgets/pdf-viewer"));
const ChessboardWidget = lazy(() => import("components/widgets/chessboard"));

function App() {
  // useEffect(() => {
  //   const arr = [3, 2, 4, 1];

  //   const sort = (arr) => {
  //     const sortedArr = [...arr];

  //     for (let i = 0; i < sortedArr.length - 1; i++) {
  //       for (let j = 0; j < sortedArr.length; j++) {
  //         const prevItem = sortedArr[j - 1];
  //         const item = sortedArr[j];

  //         if (item < prevItem) {
  //           sortedArr[j - 1] = item;
  //           sortedArr[j] = prevItem;
  //         }
  //       }
  //     }

  //     return sortedArr;
  //   };

  //   const sortedArr = sort(arr);

  //   console.log("ORIGIN ARR", arr);
  //   console.log("SORTED ARR", sortedArr);

  //   const insertItem = (arr, target) => {
  //     let inserted = false;
  //     const newArr = [];

  //     for (let i = 0; i < arr.length; i++) {
  //       const cur = arr[i];
  //       // if (cur > target) {
  //       //   console.log("I", i);
  //       // }
  //       // if (i === arr.length - 1 && cur < target) {
  //       //   return [...arr, target];
  //       // }

  //       // if (cur > target && !inserted) {
  //       //   newArr.push(target, cur);

  //       //   inserted = true;
  //       // } else {
  //       //   newArr.push(cur);
  //       // }

  //       if (cur < target) {
  //         console.log("YES", i, cur, target);
  //         for (let j = arr.length - 1; j <= i; j--) {
  //           console.log({ i, j, arrj: arr[j] });
  //           arr[j + 1] = arr[j];
  //         }
  //         arr[i] = target;

  //         console.log("AAAAAAAA", arr);

  //         return arr;
  //       }
  //     }

  //     return newArr;
  //   };

  //   console.log("INSERT", insertItem([1, 2, 4, 5], 3));
  // }, []);

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
