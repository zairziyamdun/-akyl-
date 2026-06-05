import { logInfo } from "./common/logger.js";
import { env } from "./config/env.js";
import app from "./app.js";

app.listen(env.PORT, () => {
  logInfo(`AKYL Backend running on port ${env.PORT}`, {
    nodeEnv: env.NODE_ENV,
    frontendUrl: env.FRONTEND_URL,
  });
});
