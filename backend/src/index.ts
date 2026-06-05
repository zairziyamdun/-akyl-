import cors from "cors";
import express from "express";

import { logInfo } from "./common/logger.js";
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

app.listen(env.PORT, () => {
  logInfo(`AKYL Backend running on port ${env.PORT}`, {
    nodeEnv: env.NODE_ENV,
    frontendUrl: env.FRONTEND_URL,
  });
});
