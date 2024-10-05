import type { IncomingMessage } from "node:http";

function collectRequestBody(req: IncomingMessage): Promise<string> {
	return new Promise((resolve, reject) => {
		let body = "";
		req.on("data", (chunk) => {
			body += chunk.toString();
		});
		req.on("end", () => {
			resolve(body);
		});
		req.on("error", (err) => {
			reject(err);
		});
	});
}

export { collectRequestBody };
