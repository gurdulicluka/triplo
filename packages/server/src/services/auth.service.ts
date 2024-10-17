import bcrypt from "bcrypt";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import {
	InvalidCredentialsError,
	UnauthorizedAccessError,
} from "../dtos/error/CustomError";

class AuthService {
	private readonly JWT_SECRET: string;
	private readonly REFRESH_TOKEN_SECRET: string;

	// Token expiration in seconds
	private readonly ACCESS_TOKEN_EXPIRATION: number = 30 * 60; // 30 minutes
	private readonly REFRESH_TOKEN_EXPIRATION: number = 30 * 24 * 60 * 60; // 30 days

	constructor() {
		this.JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
		this.REFRESH_TOKEN_SECRET =
			process.env.JWT_REFRESH_SECRET || "default_refresh_token_secret";

		// Check if secrets are provided
		if (this.JWT_SECRET === "default_jwt_secret") {
			console.warn(
				"Warning: Using default JWT secret. Please set JWT_SECRET in environment variables.",
			);
		}
		if (this.REFRESH_TOKEN_SECRET === "default_refresh_token_secret") {
			console.warn(
				"Warning: Using default refresh token secret. Please set JWT_REFRESH_SECRET in environment variables.",
			);
		}
	}

	public verifyPassword = async (
		password: string,
		hashedPassword: string,
	): Promise<boolean> => {
		const isPasswordValid = await bcrypt.compare(password, hashedPassword);
		if (!isPasswordValid) {
			throw new InvalidCredentialsError();
		}
		return isPasswordValid;
	};

	public generateToken = (userId: number): string => {
		return jwt.sign({ userId }, this.JWT_SECRET, {
			expiresIn: this.ACCESS_TOKEN_EXPIRATION,
		});
	};

	public generateRefreshToken = (userId: number): string => {
		return jwt.sign({ userId }, this.REFRESH_TOKEN_SECRET, {
			expiresIn: this.REFRESH_TOKEN_EXPIRATION,
		});
	};

	public validateToken = (token: string): { userId: number } | null => {
		try {
			return jwt.verify(token, this.JWT_SECRET) as { userId: number };
		} catch (error) {
			if (error instanceof TokenExpiredError) {
				throw new UnauthorizedAccessError("Token has expired.");
			}
			throw new UnauthorizedAccessError("Invalid token.");
		}
	};

	public validateRefreshToken = (token: string): { userId: number } | null => {
		try {
			return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as { userId: number };
		} catch (error) {
			if (error instanceof TokenExpiredError) {
				throw new UnauthorizedAccessError("Refresh token has expired.");
			}
			throw new UnauthorizedAccessError("Invalid refresh token.");
		}
	};
}

export { AuthService };
