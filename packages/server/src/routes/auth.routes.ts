import type { Route } from ".";
import { authController } from "../controllers/auth.controller";

export const authRoutes: Route[] = [
	{
		method: "POST",
		url: "/auth/login",
		handler: authController.login,
		publicRoute: true,
	},
	{
		method: "POST",
		url: "/auth/register",
		handler: authController.register,
		publicRoute: true,
	},
];
