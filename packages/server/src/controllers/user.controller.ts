import type { IncomingMessage, ServerResponse } from "node:http";
import { userSchema } from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { handleError } from "../utils/error.utils";
import { validateParam } from "../utils/params.utils";
import { collectRequestBody } from "../utils/request.utils";
import { sendJsonResponse } from "../utils/response.utils";

const userService = new UserService();

// CREATE
async function createUser(req: IncomingMessage, res: ServerResponse) {
	try {
		const body = await collectRequestBody(req);
		console.log("RUNNING AFTER COLLECT BODY");
		const userData = JSON.parse(body);
		const parsedData = userSchema.parse(userData);
		const user = await userService.createUser(parsedData);
		sendJsonResponse(res, 201, user);
	} catch (error) {
		handleError(error, res);
	}
}

// GET
async function getUser(
	_req: IncomingMessage,
	res: ServerResponse,
	params: { [key: string]: string },
) {
	const userId = validateParam(res, params.id, "Invalid user ID");

	if (!userId) return;

	try {
		const user = await userService.getUserById(userId);
		if (user) {
			sendJsonResponse(res, 200, user);
		} else {
			sendJsonResponse(res, 400, { error: "User not found" });
		}
	} catch (error) {
		sendJsonResponse(res, 500, { error: error });
	}
}

// GET ALL
async function getAllUsers(_req: IncomingMessage, res: ServerResponse) {
	try {
		const users = await userService.getAllUsers();
		if (users) {
			sendJsonResponse(res, 200, users);
		} else {
			sendJsonResponse(res, 400, { error: "No users indexed" });
		}
	} catch (error) {
		sendJsonResponse(res, 500, { error: error });
	}
}

// DELETE
async function deleteUser(
	_req: IncomingMessage,
	res: ServerResponse,
	params: { [key: string]: string },
) {
	const userId = validateParam(res, params.id, "Invalid user ID");
	if (!userId) return;

	try {
		const wasDeleted = await userService.deleteUser(userId);

		// If no user was deleted, return a 404 response
		if (!wasDeleted) {
			sendJsonResponse(res, 404, { error: "User not found" });
			return;
		}

		sendJsonResponse(res, 200, { message: "User deleted successfully" });
	} catch (error) {
		sendJsonResponse(res, 500, { error: error });
	}
}

// PUT
async function updateUser(
	req: IncomingMessage,
	res: ServerResponse,
	params: { [key: string]: string },
) {
	const userId = validateParam(res, params.id, "Invalid user ID");
	if (!userId) return;

	try {
		const body = await collectRequestBody(req);
		const userData = JSON.parse(body);
		const parsedData = userSchema.parse(userData);
		const user = await userService.updateUser(userId, parsedData);

		if (user) {
			sendJsonResponse(res, 200, user);
		} else {
			sendJsonResponse(res, 400, { error: "User not found" });
		}
	} catch (error) {
		handleError(error, res);
	}
}

export { getAllUsers, getUser, createUser, deleteUser, updateUser };
