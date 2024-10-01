import type { IncomingMessage, ServerResponse } from "node:http";
import { logger } from "../utils/logger";
import { sendJsonResponse } from "../utils/response";
import { matchRoute } from "../utils/router.utils";
import { routes } from "./routes";

async function router(req: IncomingMessage, res: ServerResponse) {
	for (const route of routes) {
		const { isMatch, params } = matchRoute(req, route);

		if (isMatch) {
			await route.handler(req, res, params || {});
			return;
		}
	}

	logger.error(
		`Route ${req.url} or ${req.method} method on this route does not exist`,
	);

	sendJsonResponse(res, 404, {
		error: `Route ${req.url} or ${req.method} method on this route does not exist`,
	});
	return;
}

export { router };
