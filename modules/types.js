/**
 * Types
 * =====================
 * Color and tags of debug and log message
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Ilya Chubarov [@agoalofalife] <agoalofalife@gmail.com>
 *
 * @license: MIT License
 *
 */
const chalk = require("chalk");

module.exports = {
	DEBUG: {
		bgcolor: chalk.bgRgb(155, 89, 182).white.bold,
		color: chalk.rgb(155, 89, 182),
		id: "DEBUG",
		label: " | INFORMATION    "
	},
	DOCS: {
		bgcolor: chalk.bgRgb(236, 135, 191).white.bold,
		color: chalk.rgb(236, 135, 191),
		id: "DOCS",
		label: " | DOCUMENTATION  "
	},
	ERROR: {
		bgcolor: chalk.bgRgb(192, 57, 43).white.bold,
		color: chalk.rgb(192, 57, 43),
		id: "ERROR",
		label: " | ERROR          "
	},
	INFO: {
		bgcolor: chalk.bgRgb(76, 175, 80).white.bold,
		color: chalk.rgb(76, 175, 80),
		id: "INFO",
		label: " | INFORMATION    "
	},
	SPONSOR: {
		bgcolor: chalk.bgRgb(22, 160, 133).white.bold,
		color: chalk.rgb(22, 160, 133),
		id: "SPONSOR",
		label: " | SPONSOR        "
	},
	STACKOVERFLOW: {
		bgcolor: chalk.bgRgb(41, 128, 185).white.bold,
		color: chalk.rgb(41, 128, 185),
		id: "STACKOVERFLOW",
		label: " | STACKOVERFLOW  "
	},
	TIME: {
		bgcolor: chalk.bgRgb(44, 62, 80).white.bold,
		color: chalk.rgb(44, 62, 80),
		id: "TIME",
		label: " | TIME           "
	},
	WARNING: {
		bgcolor: chalk.bgRgb(243, 156, 18).white.bold,
		color: chalk.rgb(243, 156, 18),
		id: "WARNING",
		label: " | WARNING        "
	}
};