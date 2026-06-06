import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import {
  loginHandler,
  logoutHandler,
  meHandler,
  registerHandler,
} from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

const router = Router();

router.post("/register", validateBody(registerSchema), registerHandler);
router.post("/login", validateBody(loginSchema), loginHandler);
router.get("/me", authMiddleware, meHandler);
router.post("/logout", authMiddleware, logoutHandler);

export default router;
