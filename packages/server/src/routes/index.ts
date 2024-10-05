import type { IncomingMessage, ServerResponse } from "node:http";
import * as userController from "../controllers/user.controller";
import { logger } from "../utils/logger.utils";
import { sendJsonResponse } from "../utils/response.utils";
import { matchRoute } from "../utils/router.utils";
import { userRoutes } from "./user.routes";

type Route = {
	method: string;
	url: string;

	handler: (
		req: IncomingMessage,
		res: ServerResponse,
		params: { [key: string]: string },
	) => Promise<void>;
};

const routes: Route[] = [...userRoutes];

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

export { routes, router };
export type { Route };
