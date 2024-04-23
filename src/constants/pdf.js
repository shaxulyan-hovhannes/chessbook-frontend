const PDF_PAGES_INITIAL_LIMIT = 20;

const PDF_PAGES_INCREMENT_AMOUNT = 10;

const PDF_MAX_SCALE = 1.5;

const PDF_MIN_SCALE = 1;

const PDF_WORKER_SRC_LOCAL = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export {
  PDF_PAGES_INITIAL_LIMIT,
  PDF_PAGES_INCREMENT_AMOUNT,
  PDF_MAX_SCALE,
  PDF_MIN_SCALE,
  PDF_WORKER_SRC_LOCAL,
};
