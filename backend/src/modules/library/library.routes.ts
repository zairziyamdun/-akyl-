import { Router } from "express";
import multer from "multer";

import {
  authMiddleware,
  optionalAuthMiddleware,
  roleMiddleware,
} from "../../middleware/auth.middleware.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import {
  createMaterialHandler,
  deleteMaterialHandler,
  getMaterialHandler,
  listMaterialsHandler,
  updateMaterialHandler,
  uploadImageHandler,
} from "./library.controller.js";
import {
  createLibraryMaterialSchema,
  updateLibraryMaterialSchema,
} from "./library.schema.js";
import { LIBRARY_IMAGE_MAX_BYTES } from "./library.image.js";

const router = Router();

const adminOnly = [authMiddleware, roleMiddleware(["admin"])];

const uploadImageMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: LIBRARY_IMAGE_MAX_BYTES, files: 1 },
}).single("image");

/** Public: published materials. Admin with ?all=1 also gets drafts. */
router.get("/materials", optionalAuthMiddleware, listMaterialsHandler);
router.get("/materials/:id", optionalAuthMiddleware, getMaterialHandler);

router.post(
  "/materials",
  ...adminOnly,
  validateBody(createLibraryMaterialSchema),
  createMaterialHandler,
);

router.patch(
  "/materials/:id",
  ...adminOnly,
  validateBody(updateLibraryMaterialSchema),
  updateMaterialHandler,
);

router.delete("/materials/:id", ...adminOnly, deleteMaterialHandler);

router.post(
  "/upload-image",
  ...adminOnly,
  uploadImageMiddleware,
  uploadImageHandler,
);

export default router;
