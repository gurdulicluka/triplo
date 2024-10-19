import { DataSource } from "typeorm";
import { RefreshToken } from "../models/refreshToken.model";
import { AuthUser } from "../models/user.model";
import { logger } from "../utils/logger.utils";

const db = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 8084,
	database: "postgres",
	username: "postgres",
	password: "postgres",
	entities: [AuthUser, RefreshToken],
	synchronize: true,
	logging: false,
});

const initializeDatabase = async () => {
	try {
		await db.initialize();
		logger.debug("Data Source has been initialized!");
	} catch (err) {
		logger.error("Error during Data Source initialization", err);
		throw err;
	}
};

export { db, initializeDatabase };
