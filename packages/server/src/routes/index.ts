import type { IncomingMessage, ServerResponse } from "node:http";
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

export { routes };
export type { Route };
