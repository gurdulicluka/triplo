import { v4 as uuidv4 } from "uuid";

interface BaseErrorParams {
	statusCode: number;
	title: string;
	path: string;
	details: string; // More detailed error info
	errorCode: string; // Specific error code
	message: string; // User-friendly error message
	method: string; // HTTP method that caused the error
}

class BaseError extends Error {
	statusCode: number;
	title: string;
	timestamp: string;
	path: string;
	details: string;
	errorCode: string;
	userMessage: string;
	method: string;
	requestId: string;

	constructor({
		message,
		statusCode,
		title,
		path,
		errorCode,
		details,
		method,
	}: BaseErrorParams) {
		super(message);
		this.statusCode = statusCode;
		this.title = title;
		this.timestamp = new Date().toISOString();
		this.path = path;
		this.details = details;
		this.errorCode = errorCode;
		this.method = method;
		this.requestId = uuidv4();
		Error.captureStackTrace(this, this.constructor);
	}
}

export { BaseError };
