import cors from "cors";
import express from "express";

import { env } from "./config/env.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import consultationRoutes from "./modules/consultation/consultation.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
  }),
);
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/consultation", consultationRoutes);

app.use(errorMiddleware);

export default app;
