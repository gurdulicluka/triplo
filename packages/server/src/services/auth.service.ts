import jwt from "jsonwebtoken";

class AuthService {
	private readonly JWT_SECRET: string;
	private readonly REFRESH_TOKEN_SECRET: string;

	// Token expiration in seconds
	private readonly ACCESS_TOKEN_EXPIRATION: number = 30 * 60; // 30 minutes
	private readonly REFRESH_TOKEN_EXPIRATION: number = 7 * 24 * 60 * 60; // 7 days

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

	public generateToken(userId: number): string {
		return jwt.sign({ userId }, this.JWT_SECRET, {
			expiresIn: this.ACCESS_TOKEN_EXPIRATION,
		});
	}

	public generateRefreshToken(userId: number): string {
		return jwt.sign({ userId }, this.REFRESH_TOKEN_SECRET, {
			expiresIn: this.REFRESH_TOKEN_EXPIRATION,
		});
	}

	public validateToken(token: string): { userId: number } | null {
		try {
			return jwt.verify(token, this.JWT_SECRET) as { userId: number };
		} catch (error) {
			console.error("Token validation failed:", error);
			return null;
		}
	}

	public validateRefreshToken(token: string): { userId: number } | null {
		try {
			return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as { userId: number };
		} catch (error) {
			console.error("Refresh token validation failed:", error);
			return null;
		}
	}
}

export const authService = new AuthService();
