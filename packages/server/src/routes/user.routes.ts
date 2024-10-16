import type { Route } from ".";
import { userController } from "../controllers/user.controller";

// TODO Disable accessing all users in future if that feature is not needed
export const userRoutes: Route[] = [
	{
		method: "GET",
		url: "/users",
		handler: userController.getAllUsers,
	},
	{ method: "GET", url: "/users/:id", handler: userController.getUser },
	{ method: "POST", url: "/users/create", handler: userController.createUser },
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
