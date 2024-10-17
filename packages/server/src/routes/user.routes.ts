import type { Route } from ".";
import { userController } from "../controllers/user.controller";

export const userRoutes: Route[] = [
	{
		method: "DELETE",
		url: "/user/delete/:id",
		handler: userController.deleteUser,
	},
	{
		method: "PUT",
		url: "/user/update/:id",
		handler: userController.updateUser,
	},
];
