import app from "./app.js";
import logger from "./lib/logger.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server is running on port http://localhost:${PORT}`);
    logger.info(`Log level: ${process.env.LOG_LEVEL || "info"}`);
    logger.info(`Environment: ${process.env.NODE_ENV}`);
});
