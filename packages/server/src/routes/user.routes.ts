import type { Route } from ".";
import { userController } from "../controllers/user.controller";

export const userRoutes: Route[] = [
	{
		method: "DELETE",
		url: "/users/delete/:id",
		handler: userController.deleteUser,
	},
	{
		method: "PUT",
		url: "/users/update/:id",
		handler: userController.updateUser,
	},
];
