const PDF_PAGES_INITIAL_LIMIT = 20;

const PDF_PAGES_INCREMENT_AMOUNT = 10;

const PDF_MAX_SCALE = 2;

const PDF_MIN_SCALE = 1;

const PDF_WORKER_SRC_LOCAL = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const SCROLL_TOP_STORAGE_KEY = "pdf_scroll_top";
const PAGE_NUMBER_STORAGE_KEY = "page_number";
const SCALE_STORAGE_KEY = "pdf_viewer_scale";

export {
  PDF_PAGES_INITIAL_LIMIT,
  PDF_PAGES_INCREMENT_AMOUNT,
  PDF_MAX_SCALE,
  PDF_MIN_SCALE,
  PDF_WORKER_SRC_LOCAL,
  SCROLL_TOP_STORAGE_KEY,
  PAGE_NUMBER_STORAGE_KEY,
  SCALE_STORAGE_KEY,
};
