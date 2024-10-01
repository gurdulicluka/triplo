import type { IncomingMessage, ServerResponse } from "node:http";

type Route = {
	method: string;
	url: string;

	handler: (
		req: IncomingMessage,
		res: ServerResponse,
		params: { [key: string]: string },
	) => Promise<void>;
};

export type { Route };
