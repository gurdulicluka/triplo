import type { IncomingMessage, ServerResponse } from "node:http";
import {
	type RegisterRequest,
	type UpdateUserRequest,
	registerSchema,
	updateUserSchema,
} from "@triplo/common";
import { UserService } from "../services/user.service";
import { validateParam } from "../utils/params.utils";
import { parseRequestBody } from "../utils/request.utils";
import { HttpResponseHandler } from "../utils/response.utils";

class UserController {
	private userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	/* ------------------------------- CREATE USER ------------------------------ */
	createUser = async (req: IncomingMessage, res: ServerResponse) => {
		try {
			const body = await parseRequestBody<RegisterRequest>(req, registerSchema);
			const user = await this.userService.createUser(body);

			HttpResponseHandler.successResponse(res, user);
		} catch (error) {
			HttpResponseHandler.errorResponse(error, req, res);
		}
	};

	/* ------------------------------- DELETE USER ------------------------------ */
	deleteUser = async (req: IncomingMessage, res: ServerResponse, params: { [key: string]: string }) => {
		try {
			const userId = validateParam(params.id);
			await this.userService.deleteUser(userId);
			HttpResponseHandler.successResponse(res, { id: userId });
		} catch (error) {
			HttpResponseHandler.errorResponse(error, req, res);
		}
	};

	/* ------------------------------- UPDATE USER ------------------------------ */
	updateUser = async (req: IncomingMessage, res: ServerResponse, params: { [key: string]: string }) => {
		try {
			const userId = validateParam(params.id);
			const body = await parseRequestBody<UpdateUserRequest>(req, updateUserSchema);

			const user = await this.userService.updateUser(userId, body);

			HttpResponseHandler.successResponse(res, user);
		} catch (error) {
			HttpResponseHandler.errorResponse(error, req, res);
		}
	};
}

export const userController = new UserController();
