import type { IncomingMessage } from "node:http";
import { UnauthorizedAccessError } from "../dtos/error/CustomError";
import { AuthService } from "../services/auth.service";
import { getAuthHeadersFromRequest } from "../utils/request.utils";

export const handleValidateAccessToken = (req: IncomingMessage) => {
	const authService = new AuthService();
	const { accessToken } = getAuthHeadersFromRequest(req);

	if (!accessToken) {
		throw new UnauthorizedAccessError("Access unauthorized");
	}

	authService.validateAccessToken(accessToken);

	return true;
};
