import { addColors, createLogger, format, level, transports } from "winston";
const { combine, colorize, label, timestamp, printf } = format;

const myCustomFormat = format.combine(
	format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
	colorize({ level: true, message: true }),
	label({ label: "--->" }),
	timestamp({ format: "DD-MM-YYYY HH:MM:SS" }),
	printf(
		(info) =>
			` ${info.label} ${info.timestamp}  [${info.level}]: ${info.message}`,
	),
);

addColors({
	info: "bold blue",
	warn: "italic yellow",
	error: "bold red",
	debug: "italic green",
});

const logger = createLogger({
	level: "info",
	transports: [
		new transports.Console({ format: combine(myCustomFormat) }),
		// Logs only errors to a dedicated errors file
		new transports.File({ filename: "errors.log", level: "error" }),
	],
});

export { logger };
