import { Router } from "express";
import type { z } from "zod";

import {
  authMiddleware,
  roleMiddleware,
} from "../../middleware/auth.middleware.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import {
  createHouseHandler,
  deleteHouseHandler,
  getHouseDashboardHandler,
  getHouseHandler,
  listHousesHandler,
  updateHouseHandler,
} from "./houses.controller.js";
import {
  createHouseSchema,
  updateHouseSchema,
  type CreateHouseBody,
  type UpdateHouseBody,
} from "./houses.schema.js";

const router = Router();

const houseReaders = ["admin", "manager"] as const;
const adminOnly = ["admin"] as const;

router.get(
  "/",
  authMiddleware,
  roleMiddleware([...houseReaders]),
  listHousesHandler,
);

router.get(
  "/:id/dashboard",
  authMiddleware,
  roleMiddleware([...houseReaders]),
  getHouseDashboardHandler,
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware([...houseReaders]),
  getHouseHandler,
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware([...adminOnly]),
  validateBody(createHouseSchema as z.ZodType<CreateHouseBody>),
  createHouseHandler,
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware([...adminOnly]),
  validateBody(updateHouseSchema as z.ZodType<UpdateHouseBody>),
  updateHouseHandler,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([...adminOnly]),
  deleteHouseHandler,
);

export default router;
