import type { IncomingMessage, ServerResponse } from "node:http";
import {
	DataValidationError,
	ForbiddenActionError,
	InternalServerError,
	InvalidCredentialsError,
	NotFoundError,
	ResourceConflictError,
	UnauthorizedAccessError,
} from "../dtos/error/CustomError";

class HttpResponseHandler {
	public static sendHttpResponse(
		res: ServerResponse,
		statusCode: number,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		data: any,
	) {
		res.statusCode = statusCode;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(data));
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	static successResponse(res: ServerResponse, data: any) {
		HttpResponseHandler.sendHttpResponse(res, 200, data);
	}

	// TODO ZodError handling
	// TODO Database error handling (e.g. user already exists UNIQUE COLUMN CONSTRAINT take codes from enum)
	static errorResponse(
		error: unknown,
		req: IncomingMessage,
		res: ServerResponse,
	) {
		const customErrors = [
			NotFoundError,
			InvalidCredentialsError,
			DataValidationError,
			ResourceConflictError,
			UnauthorizedAccessError,
			InternalServerError,
			ForbiddenActionError,
		];

		for (const CustomError of customErrors) {
			if (error instanceof CustomError) {
				error.method = req.method || "Unknown method";
				error.path = req.url || "Unknown URL";

				HttpResponseHandler.sendHttpResponse(res, error.statusCode, error);
				return;
			}

			HttpResponseHandler.sendHttpResponse(res, 500, "Internal server error");
		}
	}
}

export { HttpResponseHandler };