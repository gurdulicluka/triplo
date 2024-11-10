import type { IncomingMessage } from "node:http";
import { ZodError, type z } from "zod";

/**
 * Parses the JSON request body and validates it against a Zod schema.
 */
async function parseRequestBody<T>(req: IncomingMessage, schema: z.ZodSchema<T>): Promise<T> {
	return new Promise((resolve, reject) => {
		let body = "";

		req.on("data", (chunk) => {
			body += chunk.toString();
		});

		req.on("end", () => {
			try {
				const parsedBody = JSON.parse(body);
				const result = schema.safeParse(parsedBody);

				if (!result.success) {
					throw new ZodError(result.error.errors);
				}

				resolve(result.data);
			} catch (err) {
				reject(err);
			}
		});

		req.on("error", (err) => {
			reject(err);
		});
	});
}

/**
 * Extracts authentication tokens from the request headers and cookies.
 */
function getAuthHeadersFromRequest(req: IncomingMessage) {
	const accessToken = req.headers.authorization?.split(" ")[1];
	const cookies = req.headers.cookie;
	const refreshToken = cookies
		?.split("; ")
		.find((cookie) => cookie.startsWith("refreshToken="))
		?.split("=")[1];

	return { accessToken, refreshToken };
}

export { parseRequestBody, getAuthHeadersFromRequest };
