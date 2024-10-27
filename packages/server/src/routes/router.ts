import type { IncomingMessage, ServerResponse } from "node:http";
import { routes } from ".";
import { NotFoundError } from "../dtos/error/CustomError";
import { handleValidateAccessToken } from "../middleware/authMiddleware";
import { HttpResponseHandler } from "../utils/response.utils";
import { matchRoute } from "../utils/router.utils";

async function router(req: IncomingMessage, res: ServerResponse) {
	try {
		let routeMatched = false;

		for (const route of routes) {
			const { isMatch, params } = matchRoute(req, route);

			if (isMatch) {
				routeMatched = true;

				// Validate access token on private routes
				if (!route.publicRoute) {
					const isAuthorized = handleValidateAccessToken(req);
					if (!isAuthorized) return;
				}

				// Proceed to route handler
				await route.handler(req, res, params || {});
				return;
			}
		}

		// If no route matched, throw an error after checking all routes
		if (!routeMatched) {
			throw new NotFoundError("No route was found matching the request URL.");
		}
	} catch (error) {
		HttpResponseHandler.errorResponse(error, req, res);
	}
}

export { router };
