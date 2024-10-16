import type { IncomingMessage, ServerResponse } from "node:http";
import { authRoutes } from "./auth.routes";
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

const routes: Route[] = [...userRoutes, ...authRoutes];

export { routes };
export type { Route };
