import "reflect-metadata";
import { createServer } from "node:http";

import { initializeDatabase } from "./config/database";
import { router } from "./routes/router";
import { authService } from "./services/auth.service";
import { logger } from "./utils/logger.utils";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
	try {
		await initializeDatabase();

		const server = createServer(router);
		server.listen(PORT, () => {
			logger.debug(`Server running on port ${PORT}`);
		});
	} catch (error) {
		logger.error("Error connecting to the database", error);
	}
};

startServer().catch((error) => {
	logger.error("Error starting server:", error);
});

const auth = authService;
