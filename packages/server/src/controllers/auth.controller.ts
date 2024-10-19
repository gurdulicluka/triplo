import type { IncomingMessage, ServerResponse } from "node:http";
import bcrypt from "bcrypt";
import { InvalidCredentialsError } from "../dtos/error/CustomError";
import { userSchema } from "../schemas/user.schema";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { collectRequestBody } from "../utils/request.utils";
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
			const body = await collectRequestBody(req);
			const userData = JSON.parse(body);
			const parsedData = userSchema.parse(userData);

			const hashedPassword = await bcrypt.hash(parsedData.password, 10);

			const userWithHashedPassword = {
				...parsedData,
				password: hashedPassword,
			};

			const user = await this.userService.createUser(userWithHashedPassword);

			const accessToken = this.authService.generateToken(user.id);
			const refreshToken = this.authService.generateRefreshToken(user.id);

			await this.authService.upsertValidRefreshToken({
				token: refreshToken,
				userId: user.id,
			});

			HttpResponseHandler.successResponse(res, { accessToken, refreshToken });
		} catch (error) {
			HttpResponseHandler.errorResponse(error, req, res);
		}
	};

	/* ------------------------------- LOGIN USER ------------------------------- */
	public login = async (req: IncomingMessage, res: ServerResponse) => {
		try {
			const body = await collectRequestBody(req);
			const { email, password } = JSON.parse(body);

			const user = await this.userService.getUserByEmail(email);

			if (!user) {
				throw new InvalidCredentialsError();
			}

			await this.authService.verifyPassword(password, user.password);

			const accessToken = this.authService.generateToken(user.id);
			const refreshToken = this.authService.generateRefreshToken(user.id);

			await this.authService.upsertValidRefreshToken({
				token: refreshToken,
				userId: user.id,
			});

			HttpResponseHandler.successResponse(res, { accessToken, refreshToken });
		} catch (error) {
			HttpResponseHandler.errorResponse(error, req, res);
		}
	};

	/* ----------------------------- REFRESH SESSION ---------------------------- */
	public refreshSession = async (req: IncomingMessage, res: ServerResponse) => {
		try {
			const body = await collectRequestBody(req);
			const { refreshToken: originalRefreshToken } = JSON.parse(body);

			const payload =
				this.authService.validateRefreshToken(originalRefreshToken);

			const accessToken = this.authService.generateToken(payload.userId);
			const refreshToken = this.authService.generateRefreshToken(
				payload.userId,
			);

			await this.authService.upsertValidRefreshToken({
				token: refreshToken,
				userId: payload.userId,
			});

			HttpResponseHandler.successResponse(res, { accessToken, refreshToken });
		} catch (error) {
			HttpResponseHandler.errorResponse(error, req, res);
		}
	};
}

export const authController = new AuthController();
