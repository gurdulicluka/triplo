import type { IncomingMessage, ServerResponse } from "node:http";
import * as userController from "../controllers/user.controller";

type Route = {
	method: string;
	url: string;

	handler: (
		req: IncomingMessage,
		res: ServerResponse,
		params: { [key: string]: string },
	) => Promise<void>;
};

const routes: Route[] = [
	// USER
	{ method: "GET", url: "/users", handler: userController.getAllUsers },
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
	// AUTH
];

export { routes };
export type { Route };
