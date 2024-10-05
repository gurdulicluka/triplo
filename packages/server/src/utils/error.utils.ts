import type { ServerResponse } from "node:http";
import { ZodError } from "zod";
import { sendJsonResponse } from "./response.utils";

const errorResponse = (error: unknown, res: ServerResponse) => {
	if (error instanceof ZodError) {
		console.log(error);
		sendJsonResponse(res, 400, { error: error.issues });
		return;
	}
	sendJsonResponse(res, 500, { error: "Internal Server Error" });
	return;
};

export { errorResponse };
