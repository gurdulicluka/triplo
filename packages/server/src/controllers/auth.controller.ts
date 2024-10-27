import type { IncomingMessage, ServerResponse } from "node:http";
import { type LoginRequest, type RegisterRequest, loginSchema, registerSchema } from "@triplo/common";
import bcrypt from "bcrypt";
import { InvalidCredentialsError } from "../dtos/error/CustomError";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { parseRequestBody } from "../utils/request.utils";
import { HttpResponseHandler } from "../utils/response.utils";

class AuthController {
	private userService: UserService;
	private authService: AuthService;

	constructor() {
		this.userService = new UserService();
		this.authService = new AuthService();
	}

	/* ------------------------------- REGISTER USER ------------------------------ */
	public register = async (req: IncomingMessage, res: ServerResponse) => {
		try {
			const body = await parseRequestBody<RegisterRequest>(req, registerSchema);

			const hashedPassword = await bcrypt.hash(body.password, 10);

			const userWithHashedPassword = { ...body, password: hashedPassword };

			const user = await this.userService.createUser(userWithHashedPassword);

			const accessToken = this.authService.generateAccessToken(user.id);
			const refreshToken = this.authService.generateRefreshToken(user.id);

			await this.authService.upsertValidRefreshToken({ token: refreshToken, userId: user.id });

			HttpResponseHandler.attachAuthHeadersToResponse(res, accessToken, refreshToken);
			HttpResponseHandler.successResponse(res, { status: "success" });
		} catch (error) {
			HttpResponseHandler.errorResponse(error, req, res);
		}
	};

	/* ------------------------------- LOGIN USER ------------------------------- */
	public login = async (req: IncomingMessage, res: ServerResponse) => {
		try {
			const { email, password } = await parseRequestBody<LoginRequest>(req, loginSchema);

			const user = await this.userService.getUserByEmail(email);

			if (!user) {
				throw new InvalidCredentialsError();
			}

			await this.authService.verifyPassword(password, user.password);

			const accessToken = this.authService.generateAccessToken(user.id);
			const refreshToken = this.authService.generateRefreshToken(user.id);

			await this.authService.upsertValidRefreshToken({ token: refreshToken, userId: user.id });

			HttpResponseHandler.attachAuthHeadersToResponse(res, accessToken, refreshToken);
			HttpResponseHandler.successResponse(res, { status: "success" });
		} catch (error) {
			HttpResponseHandler.errorResponse(error, req, res);
		}
	};
}

export const authController = new AuthController();
