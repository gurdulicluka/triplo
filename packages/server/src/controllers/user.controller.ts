import type { IncomingMessage, ServerResponse } from "node:http";
import { userSchema } from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { validateParam } from "../utils/params.utils";
import { collectRequestBody } from "../utils/request.utils";
import { HttpResponseHandler } from "../utils/response.utils";

class UserController {
	private userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	/* ------------------------------- CREATE USER ------------------------------ */
	public createUser = async (req: IncomingMessage, res: ServerResponse) => {
		try {
			const body = await collectRequestBody(req);
			const userData = JSON.parse(body);
			const parsedData = userSchema.parse(userData);
			const user = await this.userService.createUser(parsedData);

			HttpResponseHandler.successResponse(res, user);
		} catch (error) {
			HttpResponseHandler.errorResponse(error, req, res);
		}
	};

	/* -------------------------------- GET USER -------------------------------- */
	// public getUser = async (
	// 	req: IncomingMessage,
	// 	res: ServerResponse,
	// 	params: { [key: string]: string },
	// ) => {
	// 	const userId = validateParam(res, params.id, "Invalid user ID");
	// 	if (!userId) return;

	// 	try {
	// 		const user = await this.userService.getUserById(userId);
	// 		HttpResponseHandler.successResponse(res, user);
	// 	} catch (error) {
	// 		HttpResponseHandler.errorResponse(error, req, res);
	// 	}
	// };

	/* ------------------------------ GET ALL USERS ----------------------------- */
	// public getAllUsers = async (req: IncomingMessage, res: ServerResponse) => {
	// 	try {
	// 		const users = await this.userService.getAllUsers();

	// 		HttpResponseHandler.successResponse(res, users);
	// 	} catch (error) {
	// 		HttpResponseHandler.errorResponse(error, req, res);
	// 	}
	// };

	/* ------------------------------- DELETE USER ------------------------------ */
	public deleteUser = async (
		req: IncomingMessage,
		res: ServerResponse,
		params: { [key: string]: string },
	) => {
		const userId = validateParam(res, params.id, "Invalid ID format");
		if (!userId) return;

		try {
			await this.userService.deleteUser(userId);
			HttpResponseHandler.successResponse(res, { id: userId });
		} catch (error) {
			HttpResponseHandler.errorResponse(error, req, res);
		}
	};

	/* ------------------------------- UPDATE USER ------------------------------ */
	public updateUser = async (
		req: IncomingMessage,
		res: ServerResponse,
		params: { [key: string]: string },
	) => {
		const userId = validateParam(res, params.id, "Invalid user ID");
		if (!userId) return;

		try {
			const body = await collectRequestBody(req);
			const userData = JSON.parse(body);
			const parsedData = userSchema.parse(userData);
			const user = await this.userService.updateUser(userId, parsedData);

			HttpResponseHandler.successResponse(res, user);
		} catch (error) {
			HttpResponseHandler.errorResponse(error, req, res);
		}
	};
}

export const userController = new UserController();
