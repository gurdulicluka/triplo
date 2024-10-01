import "reflect-metadata";
import { createServer } from "node:http";

import { initializeDatabase } from "./config/database";
import { router } from "./routes/router";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
	try {
		await initializeDatabase();

		const server = createServer(router);
		server.listen(PORT, () => {
			logger.info(`Server running on port ${PORT}`);
		});
	} catch (error) {
		logger.info("Error connecting to the database", error);
	}
};

startServer().catch((error) => {
	logger.info("Error starting server:", error);
});
