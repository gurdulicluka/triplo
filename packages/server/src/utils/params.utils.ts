import type { ServerResponse } from "node:http";
import { HttpResponseHandler } from "./response.utils";

// TODO Make it throw an error in controller layer
function validateParam(res: ServerResponse, param: string, message: string) {
	const parsedParam = Number.parseInt(param, 10);
	if (Number.isNaN(parsedParam)) {
		HttpResponseHandler.sendHttpResponse(res, 400, { error: message });
		return;
	}
	return parsedParam;
}

export { validateParam };
