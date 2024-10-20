import { DataValidationError } from "../dtos/error/CustomError";

function validateParam(param: string) {
	const parsedParam = Number.parseInt(param, 10);

	if (Number.isNaN(parsedParam)) {
		throw new DataValidationError("Parameter invalid");
	}
	return parsedParam;
}

export { validateParam };
