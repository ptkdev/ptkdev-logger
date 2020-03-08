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
	INFO: {id: "INFO", label: " | INFORMATION    ", bgcolor: chalk.bgRgb(46, 204, 113).white.bold, color: chalk.rgb(46, 204, 113)},
	WARNING: {id: "WARNING", label: " | WARNING        ", bgcolor: chalk.bgRgb(243, 156, 18).white.bold, color: chalk.rgb(243, 156, 18)},
	ERROR: {id: "ERROR", label: " | ERROR          ", bgcolor: chalk.bgRgb(192, 57, 43).white.bold, color: chalk.rgb(192, 57, 43)},
	DEBUG: {id: "DEBUG", label: " | DEBUG          ", bgcolor: chalk.bgRgb(155, 89, 182).white.bold, color: chalk.rgb(155, 89, 182)},
	DOCS: {id: "DOCS", label: " | DOCUMENTATION  ", bgcolor: chalk.bgRgb(236, 135, 191).white.bold, color: chalk.rgb(236, 135, 191)},
	STACKOVERFLOW: {id: "STACKOVERFLOW", label: " | STACKOVERFLOW  ", bgcolor: chalk.bgRgb(41, 128, 185).white.bold, color: chalk.rgb(41, 128, 185)},
	SPONSOR: {id: "SPONSOR", label: " | SPONSOR        ", bgcolor: chalk.bgRgb(22, 160, 133).white.bold, color: chalk.rgb(22, 160, 133)},
	TIME: {id: "TIME", label: " | TIME           ", bgcolor: chalk.bgRgb(44, 62, 80).white.bold, color: chalk.rgb(44, 62, 80)}
};