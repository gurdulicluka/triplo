import type { IncomingMessage, ServerResponse } from "node:http";
import { ZodError } from "zod";
import type { ApplicationErrors } from "../dtos/error/CustomError";

class HttpResponseHandler {
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

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	static successResponse(res: ServerResponse, data: any) {
		HttpResponseHandler.sendHttpResponse(res, 200, data);
	}

	static errorResponse(
		error: ApplicationErrors | ZodError,
		req: IncomingMessage,
		res: ServerResponse,
	) {
		const method = req.method || "Unknown method";
		const url = req.url || "Unknown URL";

		// Handle validation errors from Zod
		if (error instanceof ZodError) {
			console.error(`Validation Error: ${method} ${url}`, error);

			HttpResponseHandler.sendHttpResponse(res, 400, {
				success: false,
				error: "Validation failed",
				details: error.issues,
			});
			return;
		}

		HttpResponseHandler.sendHttpResponse(res, error.statusCode, error);
	}
}

export { HttpResponseHandler };
