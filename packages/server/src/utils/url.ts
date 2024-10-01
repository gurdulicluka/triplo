const ignoreQueryParams = (url: string | undefined): string | undefined => {
	return url?.split("?")[0];
};

const getSegmentedUrlArray = (pathname: string | undefined): string[] => {
	return pathname?.split("/").filter((segment) => segment !== "") || [];
};

export { ignoreQueryParams, getSegmentedUrlArray };
