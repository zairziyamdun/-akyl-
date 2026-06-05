import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import healthRouter from "./routes/health.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;
const frontendUrl = process.env.FRONTEND_URL?.trim() || "http://localhost:3000";

app.use(
  cors({
    origin: frontendUrl,
  }),
);
app.use(express.json());

app.use("/health", healthRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`AKYL backend listening on http://localhost:${port}`);
});
