import type { IncomingMessage, ServerResponse } from "node:http";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import { QueryFailedError } from "typeorm";
import { ZodError } from "zod";
import {
	DataValidationError,
	ForbiddenActionError,
	InternalServerError,
	InvalidCredentialsError,
	NotFoundError,
	ResourceConflictError,
	UnauthorizedAccessError,
} from "../dtos/error/CustomError";
import { PostgresErrorCodeEnum } from "../enums/error.enum";

class HttpResponseHandler {
	/* -------------------------------------------------------------------------- */
	/*                        GENERIC HTTP RESPONSE HANDLER                       */
	/* -------------------------------------------------------------------------- */
	private static sendHttpResponse(
		res: ServerResponse,
		statusCode: number,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		data: any,
	) {
		res.statusCode = statusCode;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(data));
	}

	// Used in auth responses
	static attachAuthHeadersToResponse(res: ServerResponse, accessToken: string, refreshToken: string) {
		res.setHeader("Authorization", `Bearer ${accessToken}`);
		res.setHeader("Set-Cookie", `refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; SameSite=Strict`);
	}

	/* -------------------------------------------------------------------------- */
	/*                           SUCCESS RESPONSE HANDLE                          */
	/* -------------------------------------------------------------------------- */
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	static successResponse(res: ServerResponse, data: any) {
		HttpResponseHandler.sendHttpResponse(res, 200, data);
	}

	/* -------------------------------------------------------------------------- */
	/*                           ERROR RESPONSE HANDLER                           */
	/* -------------------------------------------------------------------------- */
	static errorResponse(error: unknown, req: IncomingMessage, res: ServerResponse) {
		const applicationErrors = [
			NotFoundError,
			InvalidCredentialsError,
			DataValidationError,
			ResourceConflictError,
			UnauthorizedAccessError,
			InternalServerError,
			ForbiddenActionError,
		];

		/* --------------------------- JWT ERRORS HANDLING -------------------------- */
		// TODO Rethrow better errors for these
		if (
			error instanceof JsonWebTokenError ||
			error instanceof NotBeforeError ||
			error instanceof TokenExpiredError
		) {
			HttpResponseHandler.sendHttpResponse(res, 401, error);
			return;
		}

		/* --------------------------- ZOD ERROR HANDLING --------------------------- */
		// TODO ZodError make more user friendly error response, generic structure
		if (error instanceof ZodError) {
			HttpResponseHandler.sendHttpResponse(res, 400, error.errors);
			return;
		}

		/* ------------------------- POSTGRES ERROR HANDLING ------------------------ */
		// TODO Database error handling (e.g. user already exists UNIQUE COLUMN CONSTRAINT take codes from enum)
		if (error instanceof QueryFailedError) {
			if (error.driverError.code === PostgresErrorCodeEnum.UniqueViolation) {
				HttpResponseHandler.sendHttpResponse(res, 409, error.driverError);
			}
			return;
		}

		/* ----------------------- APPLICATION ERROR HANDLING ----------------------- */
		for (const ApplicationError of applicationErrors) {
			if (error instanceof ApplicationError) {
				error.method = req.method || "Unknown method";
				error.path = req.url || "Unknown URL";

				HttpResponseHandler.sendHttpResponse(res, error.statusCode, error);
				return;
			}
		}

		/* ----------------------------------- 500 ---------------------------------- */
		HttpResponseHandler.sendHttpResponse(res, 500, "Internal server error");
	}
}

export { HttpResponseHandler };
