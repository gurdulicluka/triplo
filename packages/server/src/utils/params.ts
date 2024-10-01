import type { ServerResponse } from "node:http";
import { sendJsonResponse } from "./response";

const validateParam = (res: ServerResponse, param: string, message: string) => {
	const parsedParam = Number.parseInt(param, 10);
	if (Number.isNaN(parsedParam)) {
		sendJsonResponse(res, 400, { error: message });
		return;
	}
	return parsedParam;
};

export { validateParam };
