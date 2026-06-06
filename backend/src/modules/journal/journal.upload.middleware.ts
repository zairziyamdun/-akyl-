import multer from "multer";

const memoryStorage = multer.memoryStorage();

export const uploadCoverMiddleware = multer({
  storage: memoryStorage,
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
}).single("cover");

export const uploadPdfMiddleware = multer({
  storage: memoryStorage,
  limits: { fileSize: 50 * 1024 * 1024, files: 1 },
}).single("pdf");
