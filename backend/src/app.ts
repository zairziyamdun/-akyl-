import cors from "cors";
import express from "express";

import { env, getAllowedOrigins } from "./config/env.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import consultationRoutes from "./modules/consultation/consultation.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import journalRoutes from "./modules/journal/journal.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      const allowed = getAllowedOrigins();
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
  }),
);
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/consultation", consultationRoutes);

app.use(errorMiddleware);

export default app;
