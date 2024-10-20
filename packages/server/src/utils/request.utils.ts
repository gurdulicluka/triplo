import type { IncomingMessage } from "node:http";
import { ZodError, type z } from "zod";

async function parseRequestBody<T>(
	req: IncomingMessage,
	schema: z.ZodSchema<T>,
): Promise<T> {
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

export { parseRequestBody };
