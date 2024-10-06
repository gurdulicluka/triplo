import { addColors, createLogger, format, level, transports } from "winston";
const { combine, colorize, label, timestamp, printf } = format;

const myCustomFormat = format.combine(
	format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
	colorize({ level: true, message: true }),
	label({ label: ">>>" }),
	timestamp({ format: "DD/MM/YY HH:MM" }),
	printf(
		(info) =>
			` ${info.label} ${info.timestamp}  [${info.level}]: ${info.message}`,
	),
);

addColors({
	info: "bold blue",
	warn: "bold yellow",
	error: "bold red",
	debug: "bold green",
});

const logger = createLogger({
	level: "debug",
	transports: [
		new transports.Console({ format: combine(myCustomFormat) }),
		new transports.File({ filename: "errors.log", level: "error" }),
	],
});

export { logger };
