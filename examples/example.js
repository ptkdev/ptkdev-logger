/**
 * Logger: example
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
const Logger = require("./../modules/logger"); // in your project use: require("@ptkdev/logger");

const options = {
	"language": "en", // set language of log type, NOTE: please help with translations! (optional, default en - values: en|it|pl|es|pt|de|ru)
	"colors": true,  // enable/disable colors in terminal (optional, default enabled - values: true|enabled or false|disabled)
	"debug": true,   // enable/disable all logs with method debug (optional, default enabled - values: true|enabled or false|disabled)
	"info": true,    // enable/disable all logs with method info (optional, default enabled - values: true|enabled or false|disabled)
	"warning": true, // enable/disable all logs with method warning (optional, default enabled -  values: true|enabled or false|disabled)
	"error": true,   // enable/disable all logs with method errors (optional, default enabled - values: true|enabled or false|disabled)
	"sponsor": true, // enable/disable all logs with method sponsor (optional, default enabled - values: true|enabled or false|disabled)
	"write": true,   // write the logs into a file, you need set path values (optional, default disabled - values: true|enabled or false|disabled)
	"type": "log",   // format of logs in files (optional, default log - values: log|json)
	"rotate": {
		"size": "10M",  // Rotates the file when size exceeds 10 megabytes (optional, default 10M - values: 10B (byte) / 10K (kilobyte)/ 10M (megabyte)/ 10G (gigabyte))
		"encoding": "utf8"
	},
	"path": {        // if write is true, the library writes the logs to a path
		"debug_log": "./debug.log",  // all logs
		"error_log": "./errors.log", // only errors logs
	},
	"palette": {
		"info": {
			"label": "#ffffff", // label on left
			"text": "#4CAF50",  // log message
			"background": "#4CAF50" // background
		},
		"warning": {
			"label": "#ffffff",
			"text": "#FF9800",
			"background": "#FF9800"
		},
		"error": {
			"label": "#ffffff",
			"text": "#FF5252",
			"background": "#FF5252"
		},
		"stackoverflow": {
			"label": "#ffffff",
			"text": "#9C27B0",
			"background": "#9C27B0"
		},
		"docs": {
			"label": "#ffffff",
			"text": "#FF4081",
			"background": "#FF4081"
		},
		"debug": {
			"label": "#ffffff",
			"text": "#1976D2",
			"background": "#1976D2"
		},
		"sponsor": {
			"label": "#ffffff",
			"text": "#607D8B",
			"background": "#607D8B"
		},
		"time": {
			"label": "#ffffff",
			"background": "#795548"
		}
	}
};

const logger = new Logger(options);
logger.info("your info message", "your tag");
logger.warning("your warning message", "your tag");
logger.error("your error message", "your tag");
logger.debug("your debug message", "your tag");
logger.sponsor("your sponsor message", "your tag");
logger.stackoverflow("your stackoverflow message", "your tag");
logger.docs("your docs message", "https://docs.yoursite.com", "your tag");