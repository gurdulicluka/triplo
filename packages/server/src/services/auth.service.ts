import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { db } from "../config/database";
import { InvalidCredentialsError } from "../dtos/error/CustomError";
import { RefreshToken } from "../models/refreshToken.model";

interface ValidateTokenReturn extends JwtPayload {
	userId: number;
}

class AuthService {
	private readonly JWT_SECRET: string;
	private readonly REFRESH_TOKEN_SECRET: string;
	private refreshTokenRepository = db.getRepository(RefreshToken);

	// Token expiration in seconds
	private readonly ACCESS_TOKEN_EXPIRATION: number = 30 * 60; // 30 minutes
	private readonly REFRESH_TOKEN_EXPIRATION: number = 30 * 24 * 60 * 60; // 30 days

	constructor() {
		this.JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
		this.REFRESH_TOKEN_SECRET =
			process.env.JWT_REFRESH_SECRET || "default_refresh_token_secret";

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

	/* ----------------------------- VERIFY PASSWORD ---------------------------- */
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

	/* -------------------------- GENERATE ACCESS TOKEN ------------------------- */
	public generateToken = (userId: number): string => {
		return jwt.sign({ userId }, this.JWT_SECRET, {
			expiresIn: this.ACCESS_TOKEN_EXPIRATION,
		});
	};

	/* ------------------------- GENERATE REFRESH TOKEN ------------------------- */
	public generateRefreshToken = (userId: number): string => {
		return jwt.sign({ userId }, this.REFRESH_TOKEN_SECRET, {
			expiresIn: this.REFRESH_TOKEN_EXPIRATION,
		});
	};

	/* -------------------------- VALIDATE ACCESS TOKEN ------------------------- */
	public validateToken = (token: string): ValidateTokenReturn => {
		return jwt.verify(token, this.JWT_SECRET) as ValidateTokenReturn;
	};

	/* ------------------------- VALIDATE REFRESH TOKEN ------------------------- */
	public validateRefreshToken = (token: string): ValidateTokenReturn => {
		return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as ValidateTokenReturn;
	};

	/* -------------------------- ROTATE REFRESH TOKEN -------------------------- */
	// Used on register, login and session refresh to rotate refresh tokens
	public upsertValidRefreshToken = async (
		data: Partial<RefreshToken>,
	): Promise<void> => {
		await this.refreshTokenRepository.upsert(data, ["userId"]);
	};
}

export { AuthService };
