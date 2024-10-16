import type { Route } from ".";
import { authController } from "../controllers/auth.controller";

export const authRoutes: Route[] = [
	{ method: "POST", url: "/register", handler: authController.register },
	{ method: "POST", url: "/login", handler: authController.login },
];
