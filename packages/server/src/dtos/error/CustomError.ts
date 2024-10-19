import { ApplicationErrorCodeEnum } from "../../enums/error.enum";
import { BaseError } from "./BaseError";

// TODO Refactor errors, make the structure make more sense, currenctly messages are overlapping information or duplicate

const errorDetails = {
	NotFound: "Resource not found.",
	InvalidCredentials:
		"The provided login credentials are incorrect. Please try again.",
	DataValidation: "Data validation failed.",
	ResourceConflict: "Resource conflict occurred.",
	UnauthorizedAccess: "Unauthorized access.",
	InternalServerError: "An internal server error occurred.",
	ForbiddenAction: "Action is forbidden.",
};

class NotFoundError extends BaseError {
	constructor(userMessage: string) {
		super({
			userMessage,
			statusCode: 404,
			title: "Not Found",
			errorCode: ApplicationErrorCodeEnum.NotFound,
			details: errorDetails.NotFound,
		});
	}
}

class InvalidCredentialsError extends BaseError {
	constructor() {
		super({
			userMessage: errorDetails.InvalidCredentials,
			statusCode: 401,
			title: "Invalid Credentials",
			errorCode: ApplicationErrorCodeEnum.InvalidCredentials,
			details: errorDetails.InvalidCredentials,
		});
	}
}

class DataValidationError extends BaseError {
	constructor(userMessage: string) {
		super({
			userMessage,
			statusCode: 400,
			title: "Bad Request",
			errorCode: ApplicationErrorCodeEnum.DataValidationError,
			details: errorDetails.DataValidation,
		});
	}
}

class ResourceConflictError extends BaseError {
	constructor(userMessage: string) {
		super({
			userMessage,
			statusCode: 409,
			title: "Conflict",
			errorCode: ApplicationErrorCodeEnum.ResourceConflict,
			details: errorDetails.ResourceConflict,
		});
	}
}

class UnauthorizedAccessError extends BaseError {
	constructor(userMessage: string) {
		super({
			userMessage,
			statusCode: 401,
			title: "Unauthorized",
			errorCode: ApplicationErrorCodeEnum.UnauthorizedAccess,
			details: errorDetails.UnauthorizedAccess,
		});
	}
}

class InternalServerError extends BaseError {
	constructor(userMessage: string) {
		super({
			userMessage,
			statusCode: 500,
			title: "Internal Server Error",
			errorCode: ApplicationErrorCodeEnum.InternalServerError,
			details: errorDetails.InternalServerError,
		});
	}
}

class ForbiddenActionError extends BaseError {
	constructor(userMessage: string) {
		super({
			userMessage,
			statusCode: 403,
			title: "Forbidden",
			errorCode: ApplicationErrorCodeEnum.ForbiddenAction,
			details: errorDetails.ForbiddenAction,
		});
	}
}

class RouteNotFoundError extends BaseError {
	constructor(userMessage: string) {
		super({
			userMessage,
			statusCode: 404,
			title: "Route Not Found",
			errorCode: ApplicationErrorCodeEnum.NotFound,
			details: "No matching route was found for the requested URL and method.",
		});
	}
}

export {
	ForbiddenActionError,
	InternalServerError,
	InvalidCredentialsError,
	NotFoundError,
	ResourceConflictError,
	UnauthorizedAccessError,
	DataValidationError,
	RouteNotFoundError,
};
