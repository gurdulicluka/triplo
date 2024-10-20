import type { IncomingMessage, ServerResponse } from "node:http";
import { UnauthorizedAccessError } from "../dtos/error/CustomError";
import { AuthService } from "../services/auth.service";
import { HttpResponseHandler } from "../utils/response.utils";

export const handleValidateAccessToken = (
	req: IncomingMessage,
	res: ServerResponse,
) => {
	const authService = new AuthService();
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			throw new UnauthorizedAccessError("Access unauthorized");
		}

		const token = authHeader.split(" ")[1];

		authService.validateAccessToken(token);

		return true;
	} catch (error) {
		HttpResponseHandler.errorResponse(error, req, res);
		return false;
	}
};
