import type { IncomingMessage } from "node:http";
import type { Route } from "../routes/types.ts";
import { logger } from "./logger.ts";
import { getSegmentedUrlArray, ignoreQueryParams } from "./url.ts";

function matchRoute(
	req: IncomingMessage,
	route: Route,
): { isMatch: boolean; params?: { [key: string]: string } } {
	const requestMap = {
		method: req.method,
		pathname: ignoreQueryParams(req.url),
	};

	const routeMap = {
		method: route.method,
		pathname: route.url,
	};

	// Check if HTTP methods match
	if (requestMap.method !== routeMap.method) {
		return { isMatch: false };
	}

	// Segment the request and defined route paths
	const requestSegments = getSegmentedUrlArray(requestMap.pathname);
	const routeSegments = getSegmentedUrlArray(routeMap.pathname);

	if (requestSegments.length !== routeSegments.length) {
		return { isMatch: false };
	}

	const params: { [key: string]: string } = {};

	// Compare segments
	for (let i = 0; i < routeSegments.length; i++) {
		const routeSegment = routeSegments[i];
		const requestSegment = requestSegments[i];

		if (routeSegment.startsWith(":")) {
			// This is a parameter
			const paramName = routeSegment.slice(1);
			params[paramName] = requestSegment;
		} else if (routeSegment !== requestSegment) {
			// If segments don't match, return false
			return { isMatch: false };
		}
	}

	logger.info(`Matched ${req.url} for a ${req.method} request`);
	return { isMatch: true, params };
}

export { matchRoute };
