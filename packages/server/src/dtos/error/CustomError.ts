import type { IncomingMessage } from "node:http";
import { ApplicationErrorCodeEnum } from "../../enums/error.enum";
import { BaseError } from "./BaseError";
// TODO details revisit if you need details, just use message for the frontend?
interface ErrorParams {
	req: IncomingMessage; // Accept the IncomingMessage object
	details: string; // Optional details for the error
}

class NotFoundError extends BaseError {
	constructor({ req, details }: ErrorParams) {
		super({
			message: "Resource not found",
			statusCode: 404,
			title: "Not Found",
			path: req.url || "Unknown path",
			errorCode: ApplicationErrorCodeEnum.NotFound,
			details,
			method: req.method || "Unknown method",
		});
	}
}

class InvalidCredentialsError extends BaseError {
	constructor({ req, details }: ErrorParams) {
		super({
			message:
				"The provided username or password is incorrect. Please try again.",
			statusCode: 401,
			title: "Invalid Credentials",
			path: req.url || "Unknown path",
			errorCode: ApplicationErrorCodeEnum.InvalidCredentials,
			details,
			method: req.method || "Unknown method",
		});
	}
}

class DataValidationError extends BaseError {
	constructor({ req, details }: ErrorParams) {
		super({
			message: "Data validation failed",
			statusCode: 400,
			title: "Bad Request",
			path: req.url || "Unknown path",
			errorCode: ApplicationErrorCodeEnum.DataValidationError,
			details,
			method: req.method || "Unknown method",
		});
	}
}

class ResourceConflictError extends BaseError {
	constructor({ req, details }: ErrorParams) {
		super({
			message: "Resource conflict occurred",
			statusCode: 409,
			title: "Conflict",
			path: req.url || "Unknown path",
			errorCode: ApplicationErrorCodeEnum.ResourceConflict,
			details,
			method: req.method || "Unknown method",
		});
	}
}

class UnauthorizedAccessError extends BaseError {
	constructor({ req, details }: ErrorParams) {
		super({
			message: "Unauthorized access",
			statusCode: 403,
			title: "Forbidden",
			path: req.url || "Unknown path",
			errorCode: ApplicationErrorCodeEnum.UnauthorizedAccess,
			details,
			method: req.method || "Unknown method",
		});
	}
}

class InternalServerError extends BaseError {
	constructor({ req, details }: ErrorParams) {
		super({
			message: "An internal server error occurred",
			statusCode: 500,
			title: "Internal Server Error",
			path: req.url || "Unknown path",
			errorCode: ApplicationErrorCodeEnum.InternalServerError,
			details,
			method: req.method || "Unknown method",
		});
	}
}

class ForbiddenActionError extends BaseError {
	constructor({ req, details }: ErrorParams) {
		super({
			message: "Action is forbidden",
			statusCode: 403,
			title: "Forbidden",
			path: req.url || "Unknown path",
			errorCode: ApplicationErrorCodeEnum.ForbiddenAction,
			details,
			method: req.method || "Unknown method",
		});
	}
}

type ApplicationErrors =
	| NotFoundError
	| InvalidCredentialsError
	| DataValidationError
	| ResourceConflictError
	| UnauthorizedAccessError
	| InternalServerError
	| ForbiddenActionError;

export {
	ForbiddenActionError,
	InternalServerError,
	InvalidCredentialsError,
	NotFoundError,
	ResourceConflictError,
	UnauthorizedAccessError,
	DataValidationError,
	type ApplicationErrors,
};
