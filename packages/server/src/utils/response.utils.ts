import type { ServerResponse } from "node:http";
// import type { ZodIssue } from "zod";

function sendJsonResponse(
	res: ServerResponse,
	statusCode: number,
	// biome-ignore lint/suspicious/noExplicitAny: It can actually be anything as a response
	data: any,
) {
	res.statusCode = statusCode;
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify(data));
}

export { sendJsonResponse };
