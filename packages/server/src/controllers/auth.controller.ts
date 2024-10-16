import type { IncomingMessage, ServerResponse } from "node:http";
import bcrypt from "bcrypt";
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

	// TODO seems to be working but take another look if its need any more validating or make a utility out of lines 23-25
	// TODO send back to the frontend a little bit more information, maybe encode the email and username inside as well
	// TODO SEND when both of the tokens expire in seconds and the datetime as well (reference hello app localstorage)
	/* ------------------------------- REGISTER USER ------------------------------ */
	public register = async (req: IncomingMessage, res: ServerResponse) => {
		try {
			// Get body and validate schema
			const body = await collectRequestBody(req);
			const userData = JSON.parse(body);
			const parsedData = userSchema.parse(userData);

			// Hash the user's password
			const hashedPassword = await bcrypt.hash(parsedData.password, 10);

			// Replace user's password with the hashed one
			const userWithHashedPassword = {
				...parsedData,
				password: hashedPassword,
			};

			// Save user to the database with hashed password
			const user = await this.userService.createUser(userWithHashedPassword);

			// Generate tokens
			const accessToken = this.authService.generateToken(user.id);
			const refreshToken = this.authService.generateRefreshToken(user.id);

			// Return tokens to the frontend
			HttpResponseHandler.successResponse(res, { accessToken, refreshToken });
		} catch (error) {
			HttpResponseHandler.errorResponse(error, req, res);
		}
	};

	/* -------------------------------- USER LOGIN -------------------------------- */
	public async login(req: IncomingMessage, res: ServerResponse) {
		try {
			const body = await collectRequestBody(req);
			const { email, password } = JSON.parse(body);

			// Find user by email
			const user = await this.userService.getUserByEmail(email);

			if (!user) {
				return HttpResponseHandler.errorResponse("User not found", req, res);
			}

			// Compare the password with hashed password
			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid) {
				return HttpResponseHandler.errorResponse("Invalid password", req, res);
			}

			// Generate tokens
			const accessToken = this.authService.generateToken(user.id);
			const refreshToken = this.authService.generateRefreshToken(user.id);

			// Return tokens to the frontend
			HttpResponseHandler.successResponse(res, { accessToken, refreshToken });
		} catch (error) {
			HttpResponseHandler.errorResponse(error, req, res);
		}
	}

	/* ------------------------------- REFRESH ACCESS TOKEN ------------------------------ */
	public async refreshAccessToken(req: IncomingMessage, res: ServerResponse) {
		try {
			// Extract the refresh token from the Authorization header
			const authHeader = req.headers.authorization;
			if (!authHeader || !authHeader.startsWith("Bearer ")) {
				return HttpResponseHandler.errorResponse(
					"Missing or invalid authorization header",
					req,
					res,
				);
			}

			const refreshToken = authHeader.split(" ")[1]; // Extract the refresh token

			// Validate the refresh token
			const payload = this.authService.validateRefreshToken(refreshToken);
			if (!payload) {
				return HttpResponseHandler.errorResponse(
					"Invalid or expired refresh token",
					req,
					res,
				);
			}

			// Generate a new access token using the userId from the refresh token
			const newAccessToken = this.authService.generateToken(payload.userId);

			// Send the new access token to the frontend
			HttpResponseHandler.successResponse(res, { accessToken: newAccessToken });
		} catch (error) {
			console.error("Error during refresh token process:", error);
			HttpResponseHandler.errorResponse(error, req, res);
		}
	}
}

export const authController = new AuthController();
