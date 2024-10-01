import { DataSource } from "typeorm";
import { User } from "../models/user.model";
import { logger } from "../utils/logger";

const db = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 8084,
	database: "postgres",
	username: "postgres",
	password: "postgres",
	entities: [User],
	synchronize: true,
	logging: false,
});

const initializeDatabase = async () => {
	try {
		await db.initialize();
		logger.info("Data Source has been initialized!");
	} catch (err) {
		logger.error("Error during Data Source initialization", err);
		throw err;
	}
};

export { db, initializeDatabase };
