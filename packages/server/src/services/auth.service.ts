import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { db } from "../config/database";
import { InvalidCredentialsError } from "../dtos/error/CustomError";
import { RefreshToken } from "../models/refreshToken.model";

interface ValidateTokenReturn extends JwtPayload {
	userId: number;
}

/* 
TODO 
Implement session refresh handled by access token being present in the local storage without any other parameters,
refesh token is stored in http cookie.

Backend will check on every request if the access token is about to expire (valid for <5min),
if it is about to expire it will generate a new access token and refresh token.
The access token will be sent in response header and refresh token in http cookie.

The frontend will handle that in middleware on every response it will look for those headers,
if the headers are present it will set the accessToken accordingly.

Check if refresh token stored in the http cookie needs to be handled additionally on the frontend as well.

Try to make all those functions and checks declared only in the authMiddleware.
 */

class AuthService {
	private refreshTokenRepository = db.getRepository(RefreshToken);
	private readonly JWT_SECRET: string;
	private readonly JWT_REFRESH_SECRET: string;

	private readonly ACCESS_TOKEN_EXPIRATION: number = 30 * 60; // 30 minutes
	private readonly REFRESH_TOKEN_EXPIRATION: number = 30 * 24 * 60 * 60; // 30 days

	private readonly FALLBACK_JWT_SECRET: string = "undefined";
	private readonly FALLBACK_REFRESH_SECRET: string = "undefined";

	constructor() {
		this.JWT_SECRET = process.env.JWT_SECRET ?? this.FALLBACK_JWT_SECRET;
		this.JWT_REFRESH_SECRET =
			process.env.JWT_REFRESH_SECRET ?? this.FALLBACK_REFRESH_SECRET;

		if (this.JWT_SECRET === "undefined") {
			throw new Error("JWT_SECRET is missing in environment variables.");
		}

		if (this.JWT_REFRESH_SECRET === "undefined") {
			throw new Error(
				"JWT_REFRESH_SECRET is missing in environment variables.",
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
	public generateAccessToken = (userId: number): string => {
		return jwt.sign({ userId }, this.JWT_SECRET, {
			expiresIn: this.ACCESS_TOKEN_EXPIRATION,
		});
	};

	/* -------------------------- VALIDATE ACCESS TOKEN ------------------------- */
	public validateAccessToken = (token: string): ValidateTokenReturn => {
		return jwt.verify(token, this.JWT_SECRET) as ValidateTokenReturn;
	};

	/* ------------------------- GENERATE REFRESH TOKEN ------------------------- */
	public generateRefreshToken = (userId: number): string => {
		return jwt.sign({ userId }, this.JWT_REFRESH_SECRET, {
			expiresIn: this.REFRESH_TOKEN_EXPIRATION,
		});
	};

	/* ------------------------- VALIDATE REFRESH TOKEN ------------------------- */
	public validateRefreshToken = (token: string): ValidateTokenReturn => {
		return jwt.verify(token, this.JWT_REFRESH_SECRET) as ValidateTokenReturn;
	};

	/* -------------------------- ROTATE REFRESH TOKEN -------------------------- */
	/* 
	Used on register, login and session refresh to rotate refresh tokens
	 */
	public upsertValidRefreshToken = async (
		data: Partial<RefreshToken>,
	): Promise<void> => {
		await this.refreshTokenRepository.upsert(data, ["userId"]);
	};
}

export { AuthService };
