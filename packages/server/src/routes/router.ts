import type { IncomingMessage, ServerResponse } from "node:http";
import { routes } from ".";
import { logger } from "../utils/logger.utils";
import { HttpResponseHandler } from "../utils/response.utils";
import { matchRoute } from "../utils/router.utils";

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

	HttpResponseHandler.sendHttpResponse(res, 500, {
		error: "Something went wrong",
	});
	return;
}

export { router };
