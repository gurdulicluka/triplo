import type { IncomingMessage } from "node:http";
import { UnauthorizedAccessError } from "../dtos/error/CustomError";
import { AuthService } from "../services/auth.service";
import { getAuthHeadersFromRequest } from "../utils/request.utils";

class AuthMiddleware {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	public validateSession(req: IncomingMessage) {
		const { accessToken, refreshToken } = getAuthHeadersFromRequest(req);

		if (!accessToken || !refreshToken) {
			throw new UnauthorizedAccessError("Access unauthorized");
		}

		this.authService.validateAccessToken(accessToken);
		this.authService.validateRefreshToken(refreshToken);

		return true;
	}
}

export { AuthMiddleware };
