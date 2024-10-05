enum PostgresErrorCodeEnum {
	UniqueViolation = "23505",
	CheckViolation = "23514",
	NotNullViolation = "23502",
	ForeignKeyViolation = "23503",
}

enum ApplicationErrorCodeEnum {
	NotFound = "NOT_FOUND", // Error when a user is not found
	InvalidCredentials = "INVALID_CREDENTIALS", // Error for authentication failures
	DataValidationError = "DATA_VALIDATION_ERROR", // Error for input validation issues
	ResourceConflict = "RESOURCE_CONFLICT", // Error for conflicting resource operations
	UnauthorizedAccess = "UNAUTHORIZED_ACCESS", // Error for unauthorized access attempts
	InternalServerError = "INTERNAL_SERVER_ERROR", // General server error
	ForbiddenAction = "FORBIDDEN_ACTION", // Error for forbidden actions
}

type PostgresErrorCodeType = keyof typeof PostgresErrorCodeEnum;
type ApplicationErrorCodeType = keyof typeof ApplicationErrorCodeEnum;

export { ApplicationErrorCodeEnum, PostgresErrorCodeEnum };
export type { PostgresErrorCodeType, ApplicationErrorCodeType };
