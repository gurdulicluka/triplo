import type { IncomingMessage, ServerResponse } from "node:http";
import { userSchema } from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { validateParam } from "../utils/params.utils";
import { collectRequestBody } from "../utils/request.utils";
import { HttpResponseHandler } from "../utils/response.utils";

const userService = new UserService();

/* ------------------------------- CREATE USER ------------------------------ */
async function createUser(req: IncomingMessage, res: ServerResponse) {
	try {
		const body = await collectRequestBody(req);
		const userData = JSON.parse(body);
		const parsedData = userSchema.parse(userData);
		const user = await userService.createUser(parsedData);
		HttpResponseHandler.successResponse(res, user);
	} catch (error) {
		HttpResponseHandler.errorResponse(error, req, res);
	}
}

/* -------------------------------- GET USER -------------------------------- */
async function getUser(
	req: IncomingMessage,
	res: ServerResponse,
	params: { [key: string]: string },
) {
	const userId = validateParam(res, params.id, "Invalid user ID");
	if (!userId) return;

	try {
		const user = await userService.getUserById(userId);
		HttpResponseHandler.successResponse(res, user);
	} catch (error) {
		HttpResponseHandler.errorResponse(error, req, res);
	}
}

/* ------------------------------ GET ALL USER ------------------------------ */
async function getAllUsers(req: IncomingMessage, res: ServerResponse) {
	try {
		const users = await userService.getAllUsers();
		HttpResponseHandler.successResponse(res, users);
	} catch (error) {
		HttpResponseHandler.errorResponse(error, req, res);
	}
}

/* ------------------------------- DELETE USER ------------------------------ */
async function deleteUser(
	req: IncomingMessage,
	res: ServerResponse,
	params: { [key: string]: string },
) {
	const userId = validateParam(res, params.id, "Invalid ID format");
	if (!userId) return;

	try {
		await userService.deleteUser(userId);
		HttpResponseHandler.successResponse(res, { id: userId });
	} catch (error) {
		HttpResponseHandler.errorResponse(error, req, res);
	}
}

/* ------------------------------- UPDATE USER ------------------------------ */
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

		HttpResponseHandler.successResponse(res, user);
	} catch (error) {
		HttpResponseHandler.errorResponse(error, req, res);
	}
}

export { getAllUsers, getUser, createUser, deleteUser, updateUser };
