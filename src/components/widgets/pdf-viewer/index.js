import { useState, useRef, useEffect } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import UploadFile from "components/ui/upload-file";

import url from "assets/documents/document.pdf";
// import { PDF_BASE64 } from "constants/tmp-data";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  PDF_PAGES_INITIAL_LIMIT,
  PDF_PAGES_INCREMENT_AMOUNT,
  PDF_MAX_SCALE,
  PDF_MIN_SCALE,
  SCROLL_TOP_STORAGE_KEY,
  PAGE_NUMBER_STORAGE_KEY,
  SCALE_STORAGE_KEY,
} from "constants/pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const VisuallyHiddenInput = () => {
  return (
    <input
      type="file"
      style={{
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
      }}
    />
  );
};

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(PDF_MIN_SCALE);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(
    parseFloat(localStorage.getItem(SCALE_STORAGE_KEY)) || PDF_MIN_SCALE
  );
  const [uploadedBook, setUploadedBook] = useState(url);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(
      numPages > PDF_PAGES_INITIAL_LIMIT
        ? Math.max(
            PDF_PAGES_INITIAL_LIMIT,
            localStorage.getItem(PAGE_NUMBER_STORAGE_KEY)
          )
        : numPages
    );
  };

  const calculatePageOffsets = (container, numPages) => {
    const pageOffsets = [];
    let offset = 0;

    for (let i = 0; i < numPages; i++) {
      pageOffsets.push(offset);
      offset += container.querySelector(
        `[data-page-number="${i + 1}"]`
      )?.clientHeight;
    }

    return pageOffsets;
  };

  const handleZoomIn = () => {
    if (scale < PDF_MAX_SCALE) {
      const newScale = scale + 0.1;

      setScale(newScale);

      localStorage.setItem(SCALE_STORAGE_KEY, newScale);
    }
  };

  const handleZoomOut = () => {
    if (scale > PDF_MIN_SCALE) {
      const newScale = scale - 0.1;

      setScale(newScale);

      localStorage.setItem(SCALE_STORAGE_KEY, newScale);
    }
  };

  useEffect(() => {
    function handleScroll() {
      if (numPages < PDF_PAGES_INITIAL_LIMIT) return;

      const container = containerRef.current;
      const pageOffsets = calculatePageOffsets(container, numPages);

      if (container && container.scrollTop) {
        localStorage.setItem(
          SCROLL_TOP_STORAGE_KEY,
          container.scrollTop > 10 ? container.scrollTop : 0
        );
      }

      const currentPageIndex = pageOffsets.findIndex(
        (offset) => offset > container.scrollTop
      );

      if (currentPageIndex > -1) {
        setPageNumber(currentPageIndex);
        // ADD-TO-DO fix issue scroll to the top
        localStorage.setItem(PAGE_NUMBER_STORAGE_KEY, currentPageIndex);
      }

      if (
        container &&
        container.scrollTop + container.clientHeight >=
          container.scrollHeight - 50
      ) {
        if (pageNumber < numPages) {
          setNumPages(numPages + PDF_PAGES_INCREMENT_AMOUNT);
          localStorage.setItem(
            PAGE_NUMBER_STORAGE_KEY,
            numPages + PDF_PAGES_INCREMENT_AMOUNT
          );
        }
      }
    }

    containerRef.current.addEventListener("scroll", handleScroll);
    return () => {
      containerRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [numPages]);

  useEffect(() => {
    setTimeout(() => {
      const pdfScrollTop = localStorage.getItem(SCROLL_TOP_STORAGE_KEY);
      const lastReadPageNumber = localStorage.getItem(PAGE_NUMBER_STORAGE_KEY);

      containerRef.current.scrollTop = pdfScrollTop || 0;

      setPageNumber(lastReadPageNumber || 1);
    }, 600);
  }, [pageNumber]);

  return (
    <div className="pdf">
      <nav className="pdf-navbar">
        <div>
          Page {pageNumber} / {numPages}
        </div>
        <Stack spacing={1} direction="row">
          <Button
            onClick={handleZoomIn}
            variant="contained"
            disabled={scale >= PDF_MAX_SCALE}
            sx={{
              backgroundColor: "var(--main-theme-color)",
              "&:hover": {
                backgroundColor: "var(--main-theme-color)",
              },
            }}
          >
            +
          </Button>
          <Button
            onClick={handleZoomOut}
            variant="contained"
            disabled={scale <= PDF_MIN_SCALE}
            sx={{
              backgroundColor: "var(--main-theme-color)",
              "&:hover": {
                backgroundColor: "var(--main-theme-color)",
              },
            }}
          >
            -
          </Button>
          <UploadFile
            onUploadSuccess={(data) => {
              setUploadedBook(`data:application/pdf;base64,${data}`);
            }}
          />
        </Stack>
      </nav>
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "calc(100% - 50px)",
        }}
        ref={containerRef}
      >
        <Document
          file={uploadedBook || url}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              renderAnnotationLayer={false}
              renderTextLayer={false}
              options={{ canvasRenderer: true }}
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
