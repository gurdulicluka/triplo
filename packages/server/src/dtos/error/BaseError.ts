import { v4 as uuidv4 } from "uuid";

interface BaseErrorParams {
	statusCode: number; // HTTP status code
	title: string; // Error title
	details: string; // More detailed error info
	errorCode: string; // Specific error code
	userMessage: string; // User-friendly error userMessage
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
		userMessage,
		statusCode,
		title,
		errorCode,
		details,
	}: BaseErrorParams) {
		super(details);
		this.userMessage = userMessage;
		this.statusCode = statusCode;
		this.title = title;
		this.details = details;
		this.errorCode = errorCode;
		this.requestId = uuidv4();
		this.timestamp = new Date().toISOString();
		Error.captureStackTrace(this, this.constructor);
	}
}

export { BaseError };
